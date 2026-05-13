/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { serverFetch } from "@/lib/server-fetch";
import { zodValidator } from "@/lib/zodValidator";
import { employerRegisterSchema } from "@/zod/auth.validation";
import { loginUser } from "./loginUser";

export async function registerEmployer(_prevState: any, formData: FormData) {
  try {
    const rawData = {
      fullName: formData.get("fullName") as string,
      email: formData.get("email") as string,
      phone: formData.get("phone") as string,
      password: formData.get("password") as string,
      confirmPassword: formData.get("confirmPassword") as string,
      companyName: formData.get("companyName") as string,
      companyWebsite: formData.get("companyWebsite") as string | undefined,
      companyDescription: formData.get("companyDescription") as string | undefined,
      companyAddress: formData.get("companyAddress") as string | undefined,
      companyIndustry: formData.get("companyIndustry") as string | undefined,
      companySize: formData.get("companySize") as string | undefined,
      tradeLicenseNumber: formData.get("tradeLicenseNumber") as string | undefined,
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
      email: validation.data!.email || undefined,
      phone: validation.data!.phone || undefined,
      password: rawData.password,
      companyName: rawData.companyName,
      companyWebsite: validation.data!.companyWebsite || undefined,
      companyDescription: validation.data!.companyDescription || undefined,
      companyAddress: validation.data!.companyAddress || undefined,
      companyIndustry: validation.data!.companyIndustry || undefined,
      companySize: validation.data!.companySize || undefined,
      tradeLicenseNumber: validation.data!.tradeLicenseNumber || undefined,
      designation: validation.data!.designation || undefined,
    };

    const form = new FormData();
    form.append("data", JSON.stringify(payload));

    const logoFile = formData.get("logoFile") || formData.get("file");
    if (logoFile instanceof Blob && logoFile.size > 0) {
      form.append("logoFile", logoFile);
    }

    const documentFields = [
      "tradeLicenseFile",
      "nidFile",
      "tinFile",
      "binFile",
      "otherDocumentFile",
    ];

    for (const field of documentFields) {
      const file = formData.get(field);
      if (file instanceof Blob && file.size > 0) {
        form.append(field, file);
      }
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

    await loginUser(null, formData);

    return result;
  } catch (err: any) {
    if (err?.digest?.startsWith("NEXT_REDIRECT")) {
      throw err;
    }
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
