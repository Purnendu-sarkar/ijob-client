export interface AdminProfile {
    id: string;
    userId: string;

    permissions?: Record<string, boolean> | null;
    department?: string | null;

    createdAt: string;
    updatedAt: string;
}