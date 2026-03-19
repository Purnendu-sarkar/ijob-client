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

// Minimal company shape (you'll probably have a full Company type later)
export interface Company {
  id: string;
  name: string;
  slug?: string | null;
  logoUrl?: string | null;
  description?: string | null;
  website?: string | null;
  // ... other fields
}