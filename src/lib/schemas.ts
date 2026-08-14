import { z } from "zod";

export const leadSchema = z.object({
  fullName: z.string().trim().min(2, "Please enter your full name").max(100),
  email: z.string().trim().email("Enter a valid email").max(255),
  phone: z
    .string()
    .trim()
    .min(8, "Enter a valid phone number")
    .max(20)
    .regex(/^[0-9+\-\s()]+$/, "Enter a valid phone number"),
  propertyType: z.enum(["Apartment", "Villa", "Office", "Retail"]),
  spaceSize: z.string().trim().max(20).optional().or(z.literal("")),
  budgetRange: z.string().trim().max(60).optional().or(z.literal("")),
  message: z.string().trim().max(1000).optional().or(z.literal("")),
});

export type LeadInput = z.infer<typeof leadSchema>;

export const bookingSchema = leadSchema.omit({ message: true }).extend({
  service: z.string().trim().min(2).max(80),
  slotDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Pick a date"),
  slotTime: z.string().trim().min(3).max(12),
  notes: z.string().trim().max(1000).optional().or(z.literal("")),
});

export type BookingInput = z.infer<typeof bookingSchema>;