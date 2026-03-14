/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { serverFetch } from "@/lib/server-fetch";
import { zodValidator } from "@/lib/zodValidator";
import { loginUser } from "./loginUser";
import { seekerRegisterSchema } from "@/zod/auth.validation";

export async function registerJobSeeker(_prevState: any, formData: FormData) {
  try {
    const payload = {
      fullName: formData.get("fullName") as string,
      email: formData.get("email") as string,
      phone: formData.get("phone") as string | null,
      password: formData.get("password") as string,
    };

    const validation = zodValidator(payload, seekerRegisterSchema);
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
      // Auto-login after successful registration
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