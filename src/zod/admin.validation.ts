import { z } from "zod";

export const createAdminZodSchema = z.object({
  password: z
    .string()
    .min(1, "Password is required")
    .min(6, "Password must be at least 6 characters")
    .max(128, "Password is too long"),

  admin: z.object({
    name: z
      .string()
      .min(1, "Name is required")
      .min(2, "Name must be at least 2 characters")
      .max(100),

    email: z
      .string()
      .min(1, "Email is required")
      .email("Invalid email address"),

    phone: z
      .string()
      .regex(/^(01[3-9]\d{8})$/, "Invalid Bangladeshi phone number (01XXXXXXXXX)")
      .optional()
      .or(z.literal("")),
  }),
});

export const updateAdminZodSchema = z.object({
  name: z.string().min(1, "Name is required").max(100),
  phone: z
    .string()
    .regex(/^(01[3-9]\d{8})$/, "Invalid Bangladeshi phone number (01XXXXXXXXX)")
    .optional()
    .or(z.literal("")),
});