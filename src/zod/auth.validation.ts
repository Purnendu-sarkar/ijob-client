import z from "zod";

// ── Job Seeker ───────────────────────────────────────────────
export const seekerRegisterSchema = z.object({
    fullName: z.string().min(2, "Full name is required"),
    email: z.string().email("Valid email is required"),
    phone: z
        .string()
        .regex(/^01[3-9]\d{8}$/, "Invalid Bangladeshi phone number")
        .optional(),
    password: z.string().min(6, "Password must be at least 6 characters"),
});

// ── Employer ─────────────────────────────────────────────────
export const employerRegisterSchema = z
    .object({
        fullName: z.string().min(2, { message: "Full name is required" }),
        email: z.string().email({ message: "Valid email is required" }),
        password: z.string().min(6, { message: "Password must be at least 6 characters" }),
        confirmPassword: z.string(),
        companyName: z.string().min(2, { message: "Company name is required" }),
        companyWebsite: z
            .string()
            .url({ message: "Invalid website URL" })
            .optional()
            .or(z.literal("")),
        companyDescription: z.string().max(2000).optional(),
        designation: z.string().max(100).optional(),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: "Passwords do not match",
        path: ["confirmPassword"],
    });

// ── Login  ─────────────────────────────────────────────────
export const loginValidationZodSchema = z.object({
    email: z.email({
        message: "Email is required",
    }),
    password: z.string("Password is required").min(6, {
        error: "Password is required and must be at least 6 characters long",
    }).max(100, {
        error: "Password must be at most 100 characters long",
    }),
});

// ── Change Password  ───────────────────────────────────────
export const changePasswordSchema = z
    .object({
        oldPassword: z.string().min(6, "Password must be at least 6 characters"),
        newPassword: z.string().min(6, "Password must be at least 6 characters"),
        confirmPassword: z
            .string()
            .min(6, "Password must be at least 6 characters"),
    })
    .refine((data) => data.newPassword === data.confirmPassword, {
        message: "Passwords don't match",
        path: ["confirmPassword"],
    });


export type SeekerRegisterInput = z.infer<typeof seekerRegisterSchema>;
export type EmployerRegisterInput = z.infer<typeof employerRegisterSchema>;
export type LoginInput = z.infer<typeof loginValidationZodSchema>;
export type ChangePasswordInput = z.infer<typeof changePasswordSchema>;