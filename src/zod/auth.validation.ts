import z from "zod";

const emptyToUndefined = (value: unknown) => {
  if (typeof value !== "string") return value;
  const trimmed = value.trim();
  return trimmed.length ? trimmed : undefined;
};

const emailSchema = z.preprocess(
  emptyToUndefined,
  z.string().email("Valid email is required").optional(),
);

const phoneSchema = z.preprocess(
  emptyToUndefined,
  z
    .string()
    .regex(/^(?:\+?88)?01[3-9]\d{8}$/, "Invalid Bangladeshi phone number")
    .optional(),
);

const contactRefinement = (data: { email?: string; phone?: string }) =>
  Boolean(data.email || data.phone);

export const seekerRegisterSchema = z
  .object({
    fullName: z.string().min(2, "Full name is required"),
    email: emailSchema,
    phone: phoneSchema,
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string().min(6, "Confirm your password"),
    experienceYears: z.preprocess(
      emptyToUndefined,
      z.coerce.number().int().min(0).optional(),
    ),
    skills: z.preprocess(emptyToUndefined, z.string().optional()),
    education: z.preprocess(emptyToUndefined, z.string().optional()),
    preferredLocations: z.preprocess(emptyToUndefined, z.string().optional()),
  })
  .refine(contactRefinement, {
    message: "Email or phone number is required",
    path: ["email"],
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export const employerRegisterSchema = z
  .object({
    fullName: z.string().min(2, { message: "Full name is required" }),
    email: emailSchema,
    phone: phoneSchema,
    password: z.string().min(6, { message: "Password must be at least 6 characters" }),
    confirmPassword: z.string(),
    companyName: z.string().min(2, { message: "Company name is required" }),
    companyWebsite: z.preprocess(
      emptyToUndefined,
      z.string().url({ message: "Invalid website URL" }).optional(),
    ),
    companyDescription: z.preprocess(emptyToUndefined, z.string().max(2000).optional()),
    companyAddress: z.preprocess(emptyToUndefined, z.string().max(300).optional()),
    companyIndustry: z.preprocess(emptyToUndefined, z.string().max(100).optional()),
    companySize: z.preprocess(emptyToUndefined, z.string().max(50).optional()),
    tradeLicenseNumber: z.preprocess(emptyToUndefined, z.string().max(100).optional()),
    designation: z.preprocess(emptyToUndefined, z.string().max(100).optional()),
  })
  .refine(contactRefinement, {
    message: "Email or phone number is required",
    path: ["email"],
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export const loginValidationZodSchema = z.object({
  identifier: z.string().min(5, "Email or phone is required"),
  password: z
    .string("Password is required")
    .min(6, {
      error: "Password is required and must be at least 6 characters long",
    })
    .max(100, {
      error: "Password must be at most 100 characters long",
    }),
});

export const changePasswordSchema = z
  .object({
    oldPassword: z.string().min(6, "Password must be at least 6 characters"),
    newPassword: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string().min(6, "Password must be at least 6 characters"),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

export const resetPasswordSchema = z
  .object({
    newPassword: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string().min(6, "Password must be at least 6 characters"),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

export const forgotPasswordSchema = z.object({
  email: z.email("Please enter a valid email address"),
});

export type SeekerRegisterInput = z.infer<typeof seekerRegisterSchema>;
export type EmployerRegisterInput = z.infer<typeof employerRegisterSchema>;
export type LoginInput = z.infer<typeof loginValidationZodSchema>;
export type ChangePasswordInput = z.infer<typeof changePasswordSchema>;
export type ResetPasswordInput = z.infer<typeof resetPasswordSchema>;
export type ForgotPasswordInput = z.infer<typeof forgotPasswordSchema>;
