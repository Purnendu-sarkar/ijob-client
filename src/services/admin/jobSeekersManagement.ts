/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { serverFetch } from "@/lib/server-fetch";
import { revalidateTag } from "next/cache";

/* ===================== GET ALL JOB SEEKERS ===================== */
export async function getJobSeekers(queryString?: string) {
  try {
    const response = await serverFetch.get(`/job-seekers${queryString ? `?${queryString}` : ""}`, {
      next: { tags: ["jobseekers-list"], revalidate: 180 },
    });
    return await response.json();
  } catch (error: any) {
    console.error(error);
    return { success: false, message: "Failed to fetch job seekers" };
  }
}

/* ===================== UPDATE JOB SEEKER ===================== */
export async function updateJobSeeker(id: string, _prevState: any, formData: FormData) {
  const payload: any = {};

  if (formData.get("fullName")) payload.fullName = formData.get("fullName");
  if (formData.get("dateOfBirth")) payload.dateOfBirth = formData.get("dateOfBirth");
  if (formData.get("gender")) payload.gender = formData.get("gender");
  if (formData.get("expectedSalaryMin")) payload.expectedSalaryMin = Number(formData.get("expectedSalaryMin"));
  if (formData.get("expectedSalaryMax")) payload.expectedSalaryMax = Number(formData.get("expectedSalaryMax"));
  if (formData.get("experienceYears")) payload.experienceYears = Number(formData.get("experienceYears"));
  if (formData.get("about")) payload.about = formData.get("about");
  if (formData.get("isProfileVerified")) payload.isProfileVerified = formData.get("isProfileVerified") === "true";

  try {
    const response = await serverFetch.patch(`/job-seekers/${id}`, {
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const result = await response.json();
    if (result.success) {
      revalidateTag("jobseekers-list", "default");
    }
    return result;
  } catch (error: any) {
    return {
      success: false,
      message: process.env.NODE_ENV === "development" ? error.message : "Failed to update job seeker",
    };
  }
}

/* ===================== SOFT DELETE ===================== */
export async function softDeleteJobSeeker(id: string) {
  try {
    const response = await serverFetch.delete(`/job-seekers/soft/${id}`);
    const result = await response.json();
    if (result.success) revalidateTag("jobseekers-list", "default");
    return result;
  } catch (error) {
    return { success: false, message: "Failed to soft delete" };
  }
}

/* ===================== HARD DELETE (Admin Only) ===================== */
export async function hardDeleteJobSeeker(id: string) {
  try {
    const response = await serverFetch.delete(`/job-seekers/${id}`);
    const result = await response.json();
    if (result.success) revalidateTag("jobseekers-list", "default");
    return result;
  } catch (error) {
    return { success: false, message: "Failed to permanently delete" };
  }
}