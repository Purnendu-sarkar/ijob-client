export type CompanyVerificationStatus = "PENDING" | "VERIFIED" | "REJECTED";

export interface Company {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  website: string | null;
  logoUrl: string | null;
  address: string | null;
  verificationStatus: CompanyVerificationStatus;
  createdAt: string;
  updatedAt: string;
}

export interface EmployerProfile {
  id: string;
  userId: string;
  companyId: string;
  company: Company;
  designation?: string | null;
  contactName?: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface IEmployerUser {
  id: string;
  email: string;
  phone: string | null;
  fullName: string | null;
  profilePhotoUrl: string | null;
  role: string;
  status: string;
  needPasswordChange: boolean;
  lastLoginAt: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface IEmployerProfile {
  id: string;
  userId: string;
  designation: string | null;
  createdAt: string;
  updatedAt: string;
  user: IEmployerUser;
  company: Company;
}

export interface IEmployer {
  id: string;
  userId: string;
  name: string;
  email: string;
  phone: string | null;
  profilePhoto: string | null;
  designation: string | null;
  company: Company;
  companyVerificationStatus: CompanyVerificationStatus;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
}

export const mapEmployerFromBackend = (profile: IEmployerProfile): IEmployer => ({
  id: profile.id,
  userId: profile.userId,
  name: profile.user.fullName || profile.company.name || "N/A",
  email: profile.user.email,
  phone: profile.user.phone,
  profilePhoto: profile.user.profilePhotoUrl,
  designation: profile.designation,
  company: profile.company,
  companyVerificationStatus: profile.company.verificationStatus,
  isDeleted: profile.user.status === "DELETED",
  createdAt: profile.createdAt,
  updatedAt: profile.updatedAt,
});
