"use client";

import { useState } from "react";
import { useFormik } from "formik";
import ThemeButton from "../buttons/ThemeButton";
import { ArrowUpRightIcon } from "@/public/icons";
import { services } from "@/app/data/services";
import { contactSchema, type ContactFormValues } from "@/app/lib/contact-schema";
import ThemeDropdown from "./ThemeDropdown";
import ThemeInput from "./ThemeInput";
import ThemeTextarea from "./ThemeTextarea";

const serviceOptions = services.map((service) => ({ label: service.title, value: service.slug }));

const initialValues: ContactFormValues = { name: "", email: "", service: "", message: "" };

type Status = { type: "success" | "error"; message: string } | null;

export function ContactForm() {
  const [status, setStatus] = useState<Status>(null);
  const [honeypot, setHoneypot] = useState("");

  const formik = useFormik<ContactFormValues>({
    initialValues,
    validationSchema: contactSchema,
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      setStatus(null);
      try {
        const response = await fetch("/api/contact", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ...values, website: honeypot }),
        });
        const result = await response.json().catch(() => null);
        if (response.ok && result?.ok) {
          resetForm();
          setStatus({ type: "success", message: "Thank you! Your message is on its way to our team. We'll reply to your email soon." });
        } else {
          setStatus({ type: "error", message: result?.message ?? "Something went wrong. Please try again." });
        }
      } catch {
        setStatus({ type: "error", message: "We couldn't reach the server. Please check your connection and try again." });
      } finally {
        setSubmitting(false);
      }
    },
  });

  const fieldError = (field: keyof ContactFormValues) => formik.touched[field] ? formik.errors[field] : undefined;

  return (
    <form noValidate onSubmit={formik.handleSubmit} className="rounded-3xl bg-white p-6 shadow-2xl shadow-black/15 md:p-8">
      {/* honeypot: hidden from people, tempting for bots */}
      <div aria-hidden="true" className="absolute -left-2499.75 h-0 w-0 overflow-hidden opacity-0">
        <label>Website<input type="text" name="website" tabIndex={-1} autoComplete="off" value={honeypot} onChange={(event) => setHoneypot(event.target.value)} /></label>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <ThemeInput id="name" name="name" label="Your name" placeholder="How should we address you?" required value={formik.values.name} onChange={formik.handleChange} onBlur={formik.handleBlur} errorMessage={fieldError("name")} />
        <ThemeInput id="email" name="email" type="email" label="Work email" placeholder="you@company.com" required value={formik.values.email} onChange={formik.handleChange} onBlur={formik.handleBlur} errorMessage={fieldError("email")} />
        <div className="sm:col-span-2">
          <ThemeDropdown id="service" name="service" label="What can we help with?" options={serviceOptions} required value={formik.values.service} onChange={(value) => formik.setFieldValue("service", value, true)} onBlur={() => formik.setFieldTouched("service", true, true)} errorMessage={fieldError("service")} />
        </div>
        <div className="sm:col-span-2">
          <ThemeTextarea id="message" name="message" label="A little about the project" rows={4} placeholder="What are you hoping to build or improve?" required value={formik.values.message} onChange={formik.handleChange} onBlur={formik.handleBlur} errorMessage={fieldError("message")} />
        </div>
      </div>

      <ThemeButton type="submit" fullWidth disabled={formik.isSubmitting} icon={<ArrowUpRightIcon className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />} className="mt-6 disabled:cursor-not-allowed disabled:opacity-60">
        {formik.isSubmitting ? "Sending your message..." : "Start the conversation"}
      </ThemeButton>

      <div aria-live="polite">
        {status ? (
          <p role={status.type === "error" ? "alert" : "status"} className={`mt-4 rounded-2xl px-4 py-3 text-sm leading-6 ${status.type === "success" ? "bg-emerald-50 text-emerald-700" : "bg-red-50 text-red-700"}`}>{status.message}</p>
        ) : (
          <p className="mt-3 text-center text-xs leading-5 text-slate-400">Your message goes straight to our team, and we reply to the email you provide.</p>
        )}
      </div>
    </form>
  );
}
