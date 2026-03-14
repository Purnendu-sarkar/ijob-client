/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { serverFetch } from "@/lib/server-fetch";
import { zodValidator } from "@/lib/zodValidator";
import { employerRegisterSchema } from "@/zod/auth.validation";

export async function registerEmployer(_prevState: any, formData: FormData) {
  try {
    const rawData = {
      fullName: formData.get("fullName") as string,
      email: formData.get("email") as string,
      password: formData.get("password") as string,
      confirmPassword: formData.get("confirmPassword") as string,
      companyName: formData.get("companyName") as string,
      companyWebsite: formData.get("companyWebsite") as string | undefined,
      companyDescription: formData.get("companyDescription") as string | undefined,
      designation: formData.get("designation") as string | undefined,
    };

    const validation = zodValidator(rawData, employerRegisterSchema);
    if (!validation.success) {
      return {
        success: false,
        message: "Validation error",
        errors: validation.errors,
      };
    }

    const payload = {
      fullName: rawData.fullName,
      email: rawData.email,
      password: rawData.password,
      companyName: rawData.companyName,
      companyWebsite: rawData.companyWebsite || undefined,
      companyDescription: rawData.companyDescription || undefined,
      designation: rawData.designation || undefined,
    };

    const form = new FormData();
    form.append("data", JSON.stringify(payload));

    const file = formData.get("file");
    if (file instanceof Blob && file.size > 0) {
      form.append("file", file);
    }

    // Correct route — matches your user.routes.ts
    const res = await serverFetch.post("/users/register/employer", {
      body: form,
    });

    const result = await res.json();

    if (!result.success) {
      return {
        success: false,
        message: result.message || "Registration failed from server",
      };
    }

    return result;
  } catch (err: any) {
    console.error("Employer registration error:", err);
    return {
      success: false,
      message:
        process.env.NODE_ENV === "development"
          ? err.message
          : "Registration failed. Please try again later.",
    };
  }
}