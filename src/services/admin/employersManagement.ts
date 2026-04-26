/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { serverFetch } from "@/lib/server-fetch";
import { revalidateTag } from "next/cache";

export async function getEmployers(queryString?: string) {
  try {
    const response = await serverFetch.get(
      `/employers${queryString ? `?${queryString}` : ""}`,
      {
        next: { tags: ["employers-list"], revalidate: 180 },
      },
    );
    return await response.json();
  } catch (error: any) {
    console.error(error);
    return { success: false, message: "Failed to fetch employers" };
  }
}

export async function updateEmployer(
  id: string,
  _prevState: any,
  formData: FormData,
) {
  const payload: any = {};

  if (formData.get("name")) payload.name = formData.get("name");
  if (formData.get("phone")) payload.phone = formData.get("phone");
  if (formData.get("designation")) payload.designation = formData.get("designation");
  if (formData.get("companyName")) payload.companyName = formData.get("companyName");
  if (formData.get("companyDescription")) payload.companyDescription = formData.get("companyDescription");
  if (formData.get("companyWebsite")) payload.companyWebsite = formData.get("companyWebsite");
  if (formData.get("companyAddress")) payload.companyAddress = formData.get("companyAddress");
  if (formData.get("companyVerificationStatus")) {
    payload.companyVerificationStatus = formData.get("companyVerificationStatus");
  }

  try {
    const response = await serverFetch.patch(`/employers/${id}`, {
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const result = await response.json();
    if (result.success) {
      revalidateTag("employers-list", "default");
    }
    return result;
  } catch (error: any) {
    return {
      success: false,
      message:
        process.env.NODE_ENV === "development"
          ? error.message
          : "Failed to update employer",
    };
  }
}

export async function softDeleteEmployer(id: string) {
  try {
    const response = await serverFetch.delete(`/employers/soft/${id}`);
    const result = await response.json();
    if (result.success) revalidateTag("employers-list", "default");
    return result;
  } catch (error) {
    return { success: false, message: "Failed to soft delete employer" };
  }
}

export async function hardDeleteEmployer(id: string) {
  try {
    const response = await serverFetch.delete(`/employers/${id}`);
    const result = await response.json();
    if (result.success) revalidateTag("employers-list", "default");
    return result;
  } catch (error) {
    return { success: false, message: "Failed to permanently delete employer" };
  }
}

