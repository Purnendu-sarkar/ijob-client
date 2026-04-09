import { z } from "zod";

export const createModeratorZodSchema = z.object({
  password: z.string().min(6, "Password must be at least 6 characters").max(128),
  moderator: z.object({
    name: z.string().min(2, "Name must be at least 2 characters").max(100),
    email: z.string().email("Invalid email format"),
    phone: z
      .string()
      .regex(/^(01[3-9]\d{8})$/, "Invalid Bangladeshi phone number")
      .optional()
      .or(z.literal("")),
    bio: z.string().max(500).optional(),
    assignedRegions: z.array(z.string()).optional().default([]),
  }),
});

export const updateModeratorZodSchema = z.object({
  name: z.string().min(2, "Name is required").max(100).optional(),
  phone: z
    .string()
    .regex(/^(01[3-9]\d{8})$/, "Invalid Bangladeshi phone number")
    .optional()
    .or(z.literal("")),
  bio: z.string().max(500).optional(),
  assignedRegions: z.array(z.string()).optional(),
});