export interface IUser {
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

export interface IAdminProfile {
  id: string;
  userId: string;
  permissions: Record<string, boolean> | null;
  department: string | null;
  createdAt: string;
  updatedAt: string;
  user: IUser;
}

// Interface for the frontend admin representation
export interface IAdmin {
  id: string;
  userId: string;
  name: string;
  email: string;
  phone: string | null;
  profilePhoto: string | null;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
  // extra fields if needed
  department?: string | null;
  permissions?: Record<string, boolean> | null;
}

// Helper function to convert backend response to frontend IAdmin
export const mapAdminFromBackend = (adminProfile: IAdminProfile): IAdmin => ({
  id: adminProfile.id,
  userId: adminProfile.userId,
  name: adminProfile.user.fullName || "N/A",
  email: adminProfile.user.email,
  phone: adminProfile.user.phone,
  profilePhoto: adminProfile.user.profilePhotoUrl,
  isDeleted: adminProfile.user.status === "DELETED",
  createdAt: adminProfile.createdAt,
  updatedAt: adminProfile.updatedAt,
  department: adminProfile.department,
  permissions: adminProfile.permissions,
});
