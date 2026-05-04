/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { revalidateTag } from "next/cache";
import { serverFetch } from "@/lib/server-fetch";
import { zodValidator } from "@/lib/zodValidator";
import { createJobSchema } from "@/zod/job.validation";

const parseOptionalNumber = (value: FormDataEntryValue | null) => {
  if (value === null) return undefined;
  const str = value.toString().trim();
  if (!str) return undefined;
  const num = Number(str);
  return Number.isFinite(num) ? num : undefined;
};

export async function createJob(_prevState: any, formData: FormData) {
  const raw = {
    title: (formData.get("title") as string) || "",
    description: (formData.get("description") as string) || "",
    employmentType: (formData.get("employmentType") as string) || "",
    workplaceType: (formData.get("workplaceType") as string) || "",
    experienceMin: parseOptionalNumber(formData.get("experienceMin")),
    experienceMax: parseOptionalNumber(formData.get("experienceMax")),
    salaryMin: parseOptionalNumber(formData.get("salaryMin")),
    salaryMax: parseOptionalNumber(formData.get("salaryMax")),
    currency: ((formData.get("currency") as string) || "BDT").trim() || "BDT",
    vacancies: parseOptionalNumber(formData.get("vacancies")),
    applicationDeadline: (formData.get("applicationDeadline") as string) || "",
  };

  const payloadForValidation = {
    ...raw,
    experienceMin: typeof raw.experienceMin === "number" ? Math.trunc(raw.experienceMin) : undefined,
    experienceMax: typeof raw.experienceMax === "number" ? Math.trunc(raw.experienceMax) : undefined,
    vacancies: typeof raw.vacancies === "number" ? Math.trunc(raw.vacancies) : undefined,
  };

  const validated = zodValidator(payloadForValidation, createJobSchema);
  if (!validated.success || !validated.data) {
    return {
      success: false,
      message: "Validation failed",
      errors: validated.errors || [],
    };
  }

  const data = validated.data as any;

  const deadlineRaw =
    typeof data.applicationDeadline === "string"
      ? data.applicationDeadline.trim()
      : "";
  let deadline: string | undefined = undefined;
  if (deadlineRaw) {
    const date = new Date(deadlineRaw);
    if (!isNaN(date.getTime())) {
      deadline = date.toISOString();
    } else {
      deadline = undefined;
    }
  }

  const backendPayload = {
    title: data.title.trim(),
    description: data.description.trim(),
    employmentType: data.employmentType,
    workplaceType: data.workplaceType,
    experienceMin: data.experienceMin,
    experienceMax: data.experienceMax,
    salaryMin: data.salaryMin,
    salaryMax: data.salaryMax,
    currency: data.currency || "BDT",
    vacancies: data.vacancies,
    applicationDeadline: deadline,
  };

  try {
    const response = await serverFetch.post("/jobs", {
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(backendPayload),
      next: { tags: ["employer-jobs"] },
    });

    const result = await response.json();

    if (result?.success) {
      revalidateTag("employer-jobs", "jobs-list");
    }

    return result;
  } catch (error: any) {
    return {
      success: false,
      message:
        process.env.NODE_ENV === "development"
          ? error.message
          : "Failed to post job",
    };
  }
}

export async function getJobs(filter?: { companyId?: string }) {
  try {
    const params = filter?.companyId ? `?companyId=${encodeURIComponent(filter.companyId)}` : "";
    const response = await serverFetch.get(`/jobs${params}`, {
      next: { tags: ["jobs-list"], revalidate: 180 },
    });
    return await response.json();
  } catch (error: any) {
    return {
      success: false,
      message:
        process.env.NODE_ENV === "development"
          ? error.message
          : "Failed to fetch jobs",
    };
  }
}
