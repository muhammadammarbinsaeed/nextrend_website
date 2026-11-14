import nodemailer from "nodemailer";

/**
 * Mail settings come from environment variables (see .env.example), so switching to a
 * different SMTP provider or port later needs no code change.
 */
function readConfig() {
  const user = process.env.SMTP_USER?.trim();
  const pass = process.env.SMTP_PASS?.replace(/\s+/g, ""); // Gmail shows app passwords in 4 groups with spaces
  if (!user || !pass) return null;

  const port = Number(process.env.SMTP_PORT ?? 465);
  const secure = process.env.SMTP_SECURE ? process.env.SMTP_SECURE === "true" : port === 465;

  return {
    transport: { host: process.env.SMTP_HOST?.trim() || "smtp.gmail.com", port, secure, auth: { user, pass } },
    to: process.env.CONTACT_TO_EMAIL?.trim() || user,
    from: process.env.CONTACT_FROM_EMAIL?.trim() || `Nextrend Website <${user}>`,
  };
}

export const isMailConfigured = () => readConfig() !== null;

const escapeHtml = (value: string) => value.replace(/[&<>"']/g, (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[char]!);

export type ContactMessage = { name: string; email: string; serviceLabel: string; message: string };

export async function sendContactEmail({ name, email, serviceLabel, message }: ContactMessage) {
  const config = readConfig();
  if (!config) throw new Error("MAIL_NOT_CONFIGURED");

  const transporter = nodemailer.createTransport(config.transport);

  await transporter.sendMail({
    from: config.from,
    to: config.to,
    replyTo: `${name.replace(/[\r\n<>"]/g, "")} <${email}>`,
    subject: `New project enquiry: ${serviceLabel}`,
    text: `Name: ${name}\nEmail: ${email}\nService: ${serviceLabel}\n\nProject details:\n${message}`,
    html: `<div style="font-family:Arial,sans-serif;font-size:15px;line-height:1.6;color:#0d1220">
      <h2 style="margin:0 0 16px">New project enquiry</h2>
      <table cellpadding="6" style="border-collapse:collapse">
        <tr><td><b>Name</b></td><td>${escapeHtml(name)}</td></tr>
        <tr><td><b>Email</b></td><td><a href="mailto:${escapeHtml(email)}">${escapeHtml(email)}</a></td></tr>
        <tr><td><b>Service</b></td><td>${escapeHtml(serviceLabel)}</td></tr>
      </table>
      <p style="margin:20px 0 6px"><b>Project details</b></p>
      <p style="white-space:pre-wrap;margin:0">${escapeHtml(message)}</p>
    </div>`,
  });
}
