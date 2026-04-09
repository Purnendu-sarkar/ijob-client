/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { serverFetch } from "@/lib/server-fetch";
import { zodValidator } from "@/lib/zodValidator";
import { createModeratorZodSchema, updateModeratorZodSchema } from "@/zod/moderator.validation";
import { revalidateTag } from "next/cache";

/* ===================== CREATE MODERATOR ===================== */
export async function createModerator(_prevState: any, formData: FormData) {
  const name = (formData.get("name") as string)?.trim() || "";
  const email = (formData.get("email") as string)?.trim() || "";
  const phone = (formData.get("phone") as string)?.trim() || "";
  const password = (formData.get("password") as string) || "";
  const bio = (formData.get("bio") as string)?.trim() || "";
  const assignedRegions = formData.getAll("assignedRegions") as string[];
  const file = formData.get("file") as File | null;

  const validationPayload = {
    password,
    moderator: {
      name,
      email,
      phone: phone || undefined,
      bio: bio || undefined,
      assignedRegions: assignedRegions.length ? assignedRegions : [],
    },
  };

  const validated = zodValidator(validationPayload, createModeratorZodSchema);

  if (!validated.success || !validated.data) {
    return {
      success: false,
      message: "Validation failed",
      formData: validationPayload,
      errors: validated.errors,
    };
  }

  const backendPayload = {
    password: validated.data.password,
    moderator: validated.data.moderator,
  };

  const newFormData = new FormData();
  newFormData.append("data", JSON.stringify(backendPayload));

  if (file instanceof File && file.size > 0) {
    newFormData.append("file", file);
  }

  try {
    const response = await serverFetch.post("/moderators/create-moderator", {
      body: newFormData,
    });

    const result = await response.json();

    if (result.success) {
      revalidateTag("moderators-list", "default");
    }

    return result;
  } catch (error: any) {
    console.error("Create moderator error:", error);
    return {
      success: false,
      message: process.env.NODE_ENV === "development" ? error.message : "Failed to create moderator",
    };
  }
}

/* ===================== GET ALL MODERATORS ===================== */
export async function getModerators(queryString?: string) {
  try {
    const response = await serverFetch.get(`/moderators${queryString ? `?${queryString}` : ""}`, {
      next: { tags: ["moderators-list"], revalidate: 180 },
    });
    return await response.json();
  } catch (error: any) {
    console.error(error);
    return { success: false, message: "Something went wrong" };
  }
}

/* ===================== UPDATE MODERATOR ===================== */
export async function updateModerator(id: string, _prevState: any, formData: FormData) {
  const name = (formData.get("name") as string)?.trim();
  const phone = (formData.get("phone") as string)?.trim();
  const bio = (formData.get("bio") as string)?.trim();
  const assignedRegions = formData.getAll("assignedRegions") as string[];

  const validationPayload = {
    name,
    phone,
    bio,
    assignedRegions: assignedRegions.length ? assignedRegions : undefined,
  };

  const validated = zodValidator(validationPayload, updateModeratorZodSchema);

  if (!validated.success || !validated.data) {
    return {
      success: false,
      message: "Validation failed",
      errors: validated.errors,
    };
  }

  try {
    const response = await serverFetch.patch(`/moderators/${id}`, {
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(validated.data),
    });

    const result = await response.json();

    if (result.success) {
      revalidateTag("moderators-list", "default");
    }

    return result;
  } catch (error: any) {
    console.error("Update moderator error:", error);
    return {
      success: false,
      message: process.env.NODE_ENV === "development" ? error.message : "Failed to update moderator",
    };
  }
}

/* ===================== SOFT DELETE ===================== */
export async function softDeleteModerator(id: string) {
  try {
    const response = await serverFetch.delete(`/moderators/soft/${id}`);
    const result = await response.json();
    if (result.success) revalidateTag("moderators-list", "default");
    return result;
  } catch (error: any) {
    return { success: false, message: "Failed to delete moderator" };
  }
}