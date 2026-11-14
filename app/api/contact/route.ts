import { ValidationError } from "yup";
import { services } from "@/app/data/services";
import { contactSchema } from "@/app/lib/contact-schema";
import { isMailConfigured, sendContactEmail } from "@/app/lib/mailer";

// Light in-memory throttle (per server instance): 5 messages per IP per 10 minutes.
const hits = new Map<string, number[]>();
const WINDOW_MS = 10 * 60 * 1000;
const MAX_HITS = 5;

function rateLimited(ip: string) {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((time) => now - time < WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  return recent.length > MAX_HITS;
}

const json = (body: Record<string, unknown>, status = 200) => Response.json(body, { status });

export async function POST(request: Request) {
  let payload: Record<string, unknown>;
  try {
    payload = await request.json();
  } catch {
    return json({ ok: false, message: "Invalid request." }, 400);
  }

  // Honeypot: real visitors never fill this hidden field. Pretend success so bots move on.
  if (typeof payload.website === "string" && payload.website.trim() !== "") return json({ ok: true });

  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  if (rateLimited(ip)) return json({ ok: false, message: "Too many messages. Please try again in a few minutes." }, 429);

  let values;
  try {
    values = await contactSchema.validate(payload, { abortEarly: false, stripUnknown: true });
  } catch (error) {
    if (error instanceof ValidationError) return json({ ok: false, message: error.errors[0] ?? "Please check your details.", errors: error.errors }, 422);
    return json({ ok: false, message: "Please check your details." }, 422);
  }

  if (!isMailConfigured()) {
    console.error("[contact] Email is not configured. Set SMTP_USER and SMTP_PASS in .env.local (see .env.example).");
    return json({ ok: false, message: "Our contact form is being set up. Please email us directly for now." }, 503);
  }

  try {
    const serviceLabel = services.find((service) => service.slug === values.service)?.title ?? values.service;
    await sendContactEmail({ name: values.name, email: values.email, serviceLabel, message: values.message });
    return json({ ok: true });
  } catch (error) {
    console.error("[contact] Failed to send email:", error);
    return json({ ok: false, message: "We couldn't send your message right now. Please try again shortly." }, 502);
  }
}
