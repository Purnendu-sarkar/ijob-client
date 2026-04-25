export interface IJobSeekerUser {
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

export interface IJobSeekerProfile {
    id: string;
    userId: string;
    fullName: string | null;
    dateOfBirth: string | null;
    gender: string | null;
    currentLocationId: string | null;
    expectedSalaryMin: number | null;
    expectedSalaryMax: number | null;
    experienceYears: number | null;
    about: string | null;
    preferredJobTypes: string[];
    preferredLocations: string[];
    profileCompletion: number | null;
    isProfileVerified: boolean;
    createdAt: string;
    updatedAt: string;
    user: IJobSeekerUser;
}

// Frontend friendly interface
export interface IJobSeeker {
    id: string;
    userId: string;
    name: string;
    email: string;
    phone: string | null;
    profilePhoto: string | null;
    dateOfBirth: string | null;
    gender: string | null;
    experienceYears: number | null;
    expectedSalaryRange: string | null; // e.g. "15,000 - 25,000 BDT"
    about: string | null;
    preferredJobTypes: string[];
    preferredLocations: string[];
    profileCompletion: number;
    isProfileVerified: boolean;
    isDeleted: boolean;
    createdAt: string;
    updatedAt: string;
}

export const mapJobSeekerFromBackend = (profile: IJobSeekerProfile): IJobSeeker => ({
    id: profile.id,
    userId: profile.userId,
    name: profile.user.fullName || profile.fullName || "N/A",
    email: profile.user.email,
    phone: profile.user.phone,
    profilePhoto: profile.user.profilePhotoUrl,
    dateOfBirth: profile.dateOfBirth,
    gender: profile.gender,
    experienceYears: profile.experienceYears,
    expectedSalaryRange: profile.expectedSalaryMin && profile.expectedSalaryMax
        ? `${profile.expectedSalaryMin.toLocaleString()} - ${profile.expectedSalaryMax.toLocaleString()} BDT`
        : null,
    about: profile.about,
    preferredJobTypes: profile.preferredJobTypes || [],
    preferredLocations: profile.preferredLocations || [],
    profileCompletion: profile.profileCompletion || 0,
    isProfileVerified: profile.isProfileVerified,
    isDeleted: profile.user.status === "DELETED",
    createdAt: profile.createdAt,
    updatedAt: profile.updatedAt,
});