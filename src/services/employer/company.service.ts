/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { revalidateTag } from "next/cache";
import { serverFetch } from "@/lib/server-fetch";

export async function submitEmployerVerificationDocuments(
  _prevState: any,
  formData: FormData,
) {
  try {
    const uploadForm = new FormData();
    uploadForm.append("data", JSON.stringify({}));

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
        uploadForm.append(field, file);
      }
    }

    const response = await serverFetch.post("/employers/me/verification-documents", {
      body: uploadForm,
    });

    const result = await response.json();

    if (result.success) {
      revalidateTag("user-info", { expire: 0 });
    }

    return result;
  } catch (error: any) {
    return {
      success: false,
      message:
        process.env.NODE_ENV === "development"
          ? error.message
          : "Could not submit verification documents.",
    };
  }
}
