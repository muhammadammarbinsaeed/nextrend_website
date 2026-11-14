import * as Yup from "yup";
import { services } from "@/app/data/services";

/** Shared by the contact form (client) and /api/contact (server) so both validate identically. */
export const contactSchema = Yup.object({
  name: Yup.string().trim().min(2, "Please enter at least 2 characters.").max(80, "Please keep your name under 80 characters.").required("Your name is required."),
  email: Yup.string().trim().email("Please enter a valid email address.").required("Your work email is required."),
  service: Yup.string().oneOf(services.map((service) => service.slug), "Please select a valid service.").required("Please select a service."),
  message: Yup.string().trim().min(20, "Please share at least 20 characters about your project.").max(2000, "Please keep your message under 2,000 characters.").required("Please tell us a little about your project."),
});

export type ContactFormValues = Yup.InferType<typeof contactSchema>;
