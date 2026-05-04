/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { serverFetch } from "@/lib/server-fetch";
import type { PublicJobsResponse } from "@/types/job.interface";

export async function getPublicJobs(queryString?: string): Promise<PublicJobsResponse> {
  try {
    const response = await serverFetch.get(
      `/jobs${queryString ? `?${queryString}` : ""}`,
      {
        next: { tags: ["public-jobs"], revalidate: 180 },
      },
    );

    return await response.json();
  } catch (error: any) {
    return {
      success: false,
      message:
        process.env.NODE_ENV === "development"
          ? error.message
          : "Failed to fetch jobs",
      data: [],
      meta: null,
    };
  }
}
