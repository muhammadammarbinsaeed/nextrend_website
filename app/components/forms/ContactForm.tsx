"use client";

import { useFormik } from "formik";
import * as Yup from "yup";
import ThemeButton from "../buttons/ThemeButton";
import { ArrowUpRightIcon } from "@/public/icons";
import { services } from "@/app/data/services";
import ThemeDropdown from "./ThemeDropdown";
import ThemeInput from "./ThemeInput";
import ThemeTextarea from "./ThemeTextarea";

const serviceOptions = services.map((service) => ({ label: service.title, value: service.slug }));

const contactSchema = Yup.object({
  name: Yup.string().trim().min(2, "Please enter at least 2 characters.").max(80, "Please keep your name under 80 characters.").required("Your name is required."),
  email: Yup.string().trim().email("Please enter a valid email address.").required("Your work email is required."),
  service: Yup.string().oneOf(services.map((service) => service.slug), "Please select a valid service.").required("Please select a service."),
  message: Yup.string().trim().min(20, "Please share at least 20 characters about your project.").max(2000, "Please keep your message under 2,000 characters.").required("Please tell us a little about your project."),
});

type ContactFormValues = Yup.InferType<typeof contactSchema>;

const initialValues: ContactFormValues = { name: "", email: "", service: "", message: "" };

export function ContactForm() {
  const formik = useFormik<ContactFormValues>({
    initialValues,
    validationSchema: contactSchema,
    onSubmit: (values, { setSubmitting }) => {
      const selectedService = serviceOptions.find((option) => option.value === values.service)?.label ?? values.service;
      const subject = encodeURIComponent(`Project enquiry: ${selectedService}`);
      const body = encodeURIComponent(`Name: ${values.name}\nEmail: ${values.email}\nService: ${selectedService}\n\nProject details:\n${values.message}`);

      window.location.href = `mailto:hello@nextrend.tech?subject=${subject}&body=${body}`;
      setSubmitting(false);
    },
  });

  const fieldError = (field: keyof ContactFormValues) => formik.touched[field] ? formik.errors[field] : undefined;

  return (
    <form noValidate onSubmit={formik.handleSubmit} className="rounded-3xl bg-white p-6 shadow-2xl shadow-black/15 md:p-8">
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
        {formik.isSubmitting ? "Preparing your message..." : "Start the conversation"}
      </ThemeButton>
      <p className="mt-3 text-center text-xs leading-5 text-slate-400">Submitting opens your email app so you stay in control of what is sent.</p>
    </form>
  );
}
