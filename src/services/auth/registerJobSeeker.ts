/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { serverFetch } from "@/lib/server-fetch";
import { zodValidator } from "@/lib/zodValidator";
import { z } from "zod";
import { loginUser } from "./loginUser";

// Zod schema for job seeker registration
const seekerSchema = z.object({
  fullName: z.string().min(2, "Full name is required"),
  email: z.string().email("Valid email is required"),
  phone: z.string().regex(/^01[3-9]\d{8}$/).optional(),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export async function registerJobSeeker(
  _prevState: any,
  formData: FormData
) {
  try {
    const payload = {
      fullName: formData.get("fullName"),
      email: formData.get("email"),
      phone: formData.get("phone"),
      password: formData.get("password"),
    };

    const validation = zodValidator(payload, seekerSchema);
    if (!validation.success) {
      return validation;
    }

    const data = {
      password: validation.data!.password,
      fullName: validation.data!.fullName,
      email: validation.data!.email,
      phone: validation.data!.phone || undefined,
    };
    const form = new FormData();
    form.append("data", JSON.stringify(data));

    const res = await serverFetch.post("/users/register/job-seeker", {
      body: form,
    });

    const result = await res.json();

    if (result.success) {
      await loginUser(null, formData);
    }

    return result;
  } catch (err: any) {
    console.error(err);
    return {
      success: false,
      message:
        process.env.NODE_ENV === "development"
          ? err.message
          : "Registration failed. Please try again.",
    };
  }
}