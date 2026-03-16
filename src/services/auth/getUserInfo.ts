/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { cookies } from "next/headers";
import { serverFetch } from "@/lib/server-fetch";
import jwt, { JwtPayload } from "jsonwebtoken";

export enum UserRole {
  JOB_SEEKER = "JOB_SEEKER",
  EMPLOYER = "EMPLOYER",
  MODERATOR = "MODERATOR",
  ADMIN = "ADMIN",
}

// Interfaces
export interface BaseUserInfo {
  id: string;
  email: string;
  phone?: string | null;
  fullName?: string | null;
  profilePhotoUrl?: string | null;
  role: UserRole;
  needPasswordChange: boolean;
  status?: string;
  lastLoginAt?: string | null;
  createdAt?: string;
  updatedAt?: string;
}

export interface JobSeekerProfile {
  fullName?: string | null;
  dateOfBirth?: string | null;
  gender?: string | null;
  currentLocationId?: string | null;
  expectedSalaryMin?: number | null;
  expectedSalaryMax?: number | null;
  experienceYears?: number | null;
  about?: string | null;
  preferredJobTypes?: string[];
  preferredLocations?: string[];
  profileCompletion?: number;
}

export interface EmployerProfile {
  designation?: string | null;
  contactName?: string | null;
  company: {
    id: string;
    name: string;
    slug: string;
    logoUrl?: string | null;
    description?: string | null;
    website?: string | null;
    address?: string | null;
    verificationStatus: string;
  } | null;
}

export interface ModeratorProfile {
  bio?: string | null;
  assignedRegions?: string[];
}

export interface AdminProfile {
  department?: string | null;
  permissions?: any | null;
}

// Discriminated union + profile optional 
export type UserInfo = BaseUserInfo & {
  jobSeekerProfile?: JobSeekerProfile;
  employerProfile?: EmployerProfile;
  moderatorProfile?: ModeratorProfile;
  adminProfile?: AdminProfile;
};

// ────────────────────────────────────────────────
// Main function
// ────────────────────────────────────────────────

export const getUserInfo = async (): Promise<UserInfo | null> => {
  try {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get("accessToken")?.value;

    if (!accessToken) return null;

    // Quick JWT check (optional)
    try {
      jwt.verify(accessToken, process.env.JWT_SECRET!) as JwtPayload;
    } catch {
      return null;
    }

    const res = await serverFetch.get("/auth/me", {
      next: { tags: ["user-info"], revalidate: 300 },
    });

    if (!res.ok) {
      console.error(`Failed /auth/me → ${res.status}`);
      return null;
    }

    const json = await res.json();
    if (!json.success || !json.data) return null;

    const user = json.data;

    const base: BaseUserInfo = {
      id: user.id,
      email: user.email,
      phone: user.phone ?? null,
      fullName: user.fullName ?? null,
      profilePhotoUrl: user.profilePhotoUrl ?? null,
      role: user.role as UserRole,
      needPasswordChange: !!user.needPasswordChange,
      status: user.status,
      lastLoginAt: user.lastLoginAt ?? null,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };

    // Role-specific profile
    const profileData: Partial<Pick<UserInfo, "jobSeekerProfile" | "employerProfile" | "moderatorProfile" | "adminProfile">> = {};

    switch (user.role) {
      case UserRole.JOB_SEEKER:
        if (user.jobSeekerProfile) profileData.jobSeekerProfile = user.jobSeekerProfile;
        break;

      case UserRole.EMPLOYER:
        if (user.employerProfile) profileData.employerProfile = user.employerProfile;
        break;

      case UserRole.MODERATOR:
        if (user.moderatorProfile) profileData.moderatorProfile = user.moderatorProfile;
        break;

      case UserRole.ADMIN:
        if (user.adminProfile) profileData.adminProfile = user.adminProfile;
        break;

      default:
        console.warn(`Unknown role received: ${user.role}`);
    }

    return {
      ...base,
      ...profileData,
    };
  } catch (error) {
    console.error("getUserInfo error:", error);
    return null;
  }
};