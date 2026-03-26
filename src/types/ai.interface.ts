export interface AISuggestedJob {
  id: string;
  title: string;
  slug?: string;
  companyName: string;
  companyLogo?: string;
  employmentType?: string;     
  workplaceType?: string;      
  salaryMin?: number;
  salaryMax?: number;
  location?: string;
  experience?: number;
  description?: string;
}