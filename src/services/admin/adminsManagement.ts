
/* eslint-disable @typescript-eslint/no-explicit-any */
"use server"

import page from "@/app/(dashboardLayout)/admin/dashboard/admins-management/page";
import { serverFetch } from "@/lib/server-fetch";
import { zodValidator } from "@/lib/zodValidator";
import { createAdminZodSchema, updateAdminZodSchema } from "@/zod/admin.validation";
import { revalidateTag } from 'next/cache';

/**
 * CREATE ADMIN
 * API: POST /user/create-admin
 */
export async function createAdmin(_prevState: any, formData: FormData) {
  const name = (formData.get("name") as string)?.trim() || "";
  const email = (formData.get("email") as string)?.trim() || "";
  const phone = (formData.get("phone") as string)?.trim() || "";
  const password = (formData.get("password") as string) || "";
  const file = formData.get("file") as File | null;

  const validationPayload = {
    password,
    admin: {
      name,
      email,
      phone,
    },
  };

  const validated = zodValidator(validationPayload, createAdminZodSchema);

  if (!validated.success || !validated.data) {
    return {
      success: false,
      message: "Validation failed",
      formData: validationPayload,
      errors: validated.errors || [],
    };
  }

  // Type-safe data
  const data = validated.data as {
    password: string;
    admin: {
      name: string;
      email: string;
      phone: string | undefined;
    };
  };

  const backendPayload = {
    password: data.password,
    admin: {
      name: data.admin.name,
      email: data.admin.email,
      phone: data.admin.phone || null,
    },
  };

  const newFormData = new FormData();
  newFormData.append("data", JSON.stringify(backendPayload));

  if (file instanceof File && file.size > 0) {
    newFormData.append("file", file);
  }

  try {
    const response = await serverFetch.post("/users/create-admin", {
      body: newFormData,
    });

    const result = await response.json();

    if (result.success) {
      revalidateTag("admins-list", "admins-page-1");

    }

    return result;
  } catch (error: any) {
    console.error("Create admin error:", error);
    return {
      success: false,
      message: process.env.NODE_ENV === "development"
        ? error.message
        : "Failed to create admin",
    };
  }
}

/**
 * GET ALL ADMINS
 * API: GET /admin?queryParams
 */
export async function getAdmins(queryString?: string) {
  try {
    const searchParams = new URLSearchParams(queryString);
    const page = searchParams.get("page") || "1";
    const searchTerm = searchParams.get("searchTerm") || "all";
    const response = await serverFetch.get(`/admin${queryString ? `?${queryString}` : ""}`, {
      next: {
        tags: [
          "admins-list",
          `admins-page-${page}`,
          `admins-search-${searchTerm}`,
        ],
        revalidate: 180
      }
    });
    const result = await response.json();
    return result;
  } catch (error: any) {
    console.log(error);
    return {
      success: false,
      message: `${process.env.NODE_ENV === 'development' ? error.message : 'Something went wrong'}`
    };
  }
}

/**
 * GET ADMIN BY ID
 * API: GET /admin/:id
 */
export async function getAdminById(id: string) {
  try {
    const response = await serverFetch.get(`/admin/${id}`, {
      next: {
        tags: [`admin-${id}`, "admins-list"],
        revalidate: 180, // more responsive admin profile updates
      }
    });
    const result = await response.json();
    return result;
  } catch (error: any) {
    console.log(error);
    return {
      success: false,
      message: `${process.env.NODE_ENV === 'development' ? error.message : 'Something went wrong'}`
    };
  }
}

/**
 * UPDATE ADMIN
 * API: PATCH /admin/:id
 */
/* ===================== UPDATE ADMIN ===================== */
export async function updateAdmin(id: string, _prevState: any, formData: FormData) {
  const validationPayload = {
    name: formData.get("name") as string,
    phone: formData.get("phone") as string,
  };

  const validated = zodValidator(validationPayload, updateAdminZodSchema);

  if (!validated.success || !validated.data) {
    return {
      success: false,
      message: "Validation failed",
      formData: validationPayload,
      errors: validated.errors,
    };
  }

  try {
    const response = await serverFetch.patch(`/admin/${id}`, {
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(validated.data),
    });

    const result = await response.json();

    if (result.success) {
      revalidateTag(`admins-page-${page}`, "default");
    }

    return result;
  } catch (error: any) {
    console.error("Update admin error:", error);
    return {
      success: false,
      message: process.env.NODE_ENV === "development"
        ? error.message
        : "Failed to update admin",
    };
  }
}

/**
 * SOFT DELETE ADMIN
 * API: DELETE /admin/soft/:id
 */
export async function softDeleteAdmin(id: string) {
  try {
    const response = await serverFetch.delete(`/admin/soft/${id}`)
    const result = await response.json();
    if (result.success) {
      revalidateTag('admins-list', { expire: 0 });
      revalidateTag('admins-page-1', { expire: 0 });
      revalidateTag('admin-dashboard-meta', { expire: 0 });
    }
    return result;
  } catch (error: any) {
    console.log(error);
    return {
      success: false,
      message: `${process.env.NODE_ENV === 'development' ? error.message : 'Something went wrong'}`
    };
  }
}

/**
 * HARD DELETE ADMIN
 * API: DELETE /admin/:id
 */
export async function deleteAdmin(id: string) {
  try {
    const response = await serverFetch.delete(`/admin/${id}`)
    const result = await response.json();
    if (result.success) {
      revalidateTag('admins-list', { expire: 0 });
      revalidateTag('admins-page-1', { expire: 0 });
      revalidateTag('admin-dashboard-meta', { expire: 0 });
    }
    return result;
  } catch (error: any) {
    console.log(error);
    return {
      success: false,
      message: `${process.env.NODE_ENV === 'development' ? error.message : 'Something went wrong'}`
    };
  }
}
