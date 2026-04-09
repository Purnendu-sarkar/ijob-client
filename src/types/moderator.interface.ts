export interface IModeratorUser {
  id: string;
  email: string;
  phone: string | null;
  fullName: string | null;
  profilePhotoUrl: string | null;
  role: string;
  status: string;
  createdAt: string;
  updatedAt: string;
}

export interface IModeratorProfile {
  id: string;
  userId: string;
  bio: string | null;
  assignedRegions: string[];
  createdAt: string;
  updatedAt: string;
  user: IModeratorUser;
}

// Frontend usable interface (same pattern as IAdmin)
export interface IModerator {
  id: string;
  userId: string;
  name: string;
  email: string;
  phone: string | null;
  profilePhoto: string | null;
  bio: string | null;
  assignedRegions: string[];
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
}

// Mapping function
export const mapModeratorFromBackend = (mod: IModeratorProfile): IModerator => ({
  id: mod.id,
  userId: mod.userId,
  name: mod.user.fullName || "N/A",
  email: mod.user.email,
  phone: mod.user.phone,
  profilePhoto: mod.user.profilePhotoUrl,
  bio: mod.bio,
  assignedRegions: mod.assignedRegions || [],
  isDeleted: mod.user.status === "DELETED",
  createdAt: mod.createdAt,
  updatedAt: mod.updatedAt,
});