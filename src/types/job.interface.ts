export interface PublicJobCompany {
  id: string;
  name: string;
  slug: string;
  logoUrl: string | null;
  verificationStatus: "PENDING" | "VERIFIED" | "REJECTED";
}

export interface PublicJob {
  id: string;
  companyId: string;
  title: string;
  slug: string;
  description: string;
  employmentType: string;
  workplaceType: string;
  experienceMin: number | null;
  experienceMax: number | null;
  salaryMin: number | null;
  salaryMax: number | null;
  currency: string;
  vacancies: number;
  applicationDeadline: string | null;
  status: "DRAFT" | "PENDING_REVIEW" | "PUBLISHED" | "PAUSED" | "CLOSED" | "FLAGGED";
  createdAt: string;
  updatedAt: string;
  publishedAt: string | null;
  company: PublicJobCompany;
}

export interface PublicJobsMeta {
  page: number;
  limit: number;
  total: number;
}

export interface PublicJobsResponse {
  success: boolean;
  message: string;
  meta?: PublicJobsMeta | null;
  data?: PublicJob[] | null;
}
