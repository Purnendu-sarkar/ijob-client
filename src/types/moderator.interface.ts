export interface ModeratorProfile {
  id: string;
  userId: string;

  bio?: string | null;
  assignedRegions?: string[];
  createdAt: string;
  updatedAt: string;
}