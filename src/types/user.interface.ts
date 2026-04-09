import { UserRole } from "@/lib/auth-utils";
import { AdminProfile, JobSeekerProfile, ModeratorProfile } from "@/services/auth/getUserInfo";
import { EmployerProfile } from "./employer.interface";



export interface UserInfo {
  id: string;
  email: string;
  phone?: string;
  role: UserRole;
  needPasswordChange: boolean;
  status: "ACTIVE" | "SUSPENDED" | "DELETED";
  fullName?: string;
  profilePhotoUrl?: string;
  lastLoginAt?: string | null;
  createdAt: string;
  updatedAt: string;

  // Role-specific profile (only one should be present)
  jobSeekerProfile?: JobSeekerProfile | null;
  employerProfile?: EmployerProfile | null;
  moderatorProfile?: ModeratorProfile | null;
  adminProfile?: AdminProfile | null;
}