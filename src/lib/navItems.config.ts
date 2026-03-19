// src/config/navItems.config.ts
import { UserRole, getDefaultDashboardRoute } from "@/lib/auth-utils";
import type { NavSection } from "@/types/dashboard.interface";

// ───────────────────────────────────────────────
// Common navigation items — visible to ALL roles
// ───────────────────────────────────────────────
export const getCommonNavItems = (role: UserRole): NavSection[] => {
    const defaultDashboard = getDefaultDashboardRoute(role);

    return [
        {
            // No section title → main navigation group
            items: [
                {
                    title: "Home",
                    href: "/",
                    icon: "Home",
                    roles: ["JOB_SEEKER", "EMPLOYER", "MODERATOR", "ADMIN"],
                },
                {
                    title: "Dashboard",
                    href: defaultDashboard,
                    icon: "LayoutDashboard",
                    roles: ["JOB_SEEKER", "EMPLOYER", "MODERATOR", "ADMIN"],
                },
                {
                    title: "My Profile",
                    href: "/my-profile",
                    icon: "User",
                    roles: ["JOB_SEEKER", "EMPLOYER", "MODERATOR", "ADMIN"],
                },
            ],
        },

        {
            title: "Settings",
            items: [
                {
                    title: "Account",
                    href: "/settings",
                    icon: "Settings",
                    roles: ["JOB_SEEKER", "EMPLOYER", "MODERATOR", "ADMIN"],
                },
                {
                    title: "Change Password",
                    href: "/change-password",
                    icon: "Lock",
                    roles: ["JOB_SEEKER", "EMPLOYER", "MODERATOR", "ADMIN"],
                },
            ],
        },
    ];
};

// ───────────────────────────────────────────────
// JOB SEEKER specific sidebar items
// ───────────────────────────────────────────────
export const getSeekerNavItems = async (): Promise<NavSection[]> => {
    // You can replace 0 with real count fetched via API later
    const pendingApplications = 0; // placeholder

    return [
        {
            title: "Jobs",
            items: [
                {
                    title: "Find Jobs",
                    href: "/seeker/jobs",
                    icon: "Search",
                    roles: ["JOB_SEEKER"],
                },
                {
                    title: "Saved Jobs",
                    href: "/seeker/saved",
                    icon: "Bookmark",
                    roles: ["JOB_SEEKER"],
                },
                {
                    title: "My Applications",
                    href: "/seeker/applications",
                    icon: "Send",
                    badge: pendingApplications > 0 ? pendingApplications : undefined,
                    roles: ["JOB_SEEKER"],
                },
                {
                    title: "Job Alerts",
                    href: "/seeker/alerts",
                    icon: "Bell",
                    roles: ["JOB_SEEKER"],
                },
            ],
        },

        {
            title: "Career Profile",
            items: [
                {
                    title: "My Resume",
                    href: "/seeker/resume",
                    icon: "FileText",
                    roles: ["JOB_SEEKER"],
                },
                {
                    title: "Profile & Skills",
                    href: "/seeker/profile",
                    icon: "UserCog",
                    roles: ["JOB_SEEKER"],
                },
                {
                    title: "Preferences",
                    href: "/seeker/preferences",
                    icon: "Sliders",
                    roles: ["JOB_SEEKER"],
                },
            ],
        },
    ];
};

// ───────────────────────────────────────────────
// EMPLOYER specific sidebar items
// ───────────────────────────────────────────────
export const getEmployerNavItems = async (): Promise<NavSection[]> => {
    const newApplications = 0; // placeholder — replace with real data later

    return [
        {
            title: "Hiring",
            items: [
                {
                    title: "Post a Job",
                    href: "/employer/jobs/new",
                    icon: "PlusCircle",
                    roles: ["EMPLOYER"],
                },
                {
                    title: "My Jobs",
                    href: "/employer/jobs",
                    icon: "Briefcase",
                    roles: ["EMPLOYER"],
                },
                {
                    title: "Applications",
                    href: "/employer/applications",
                    icon: "Users",
                    badge: newApplications > 0 ? newApplications : undefined,
                    roles: ["EMPLOYER"],
                },
            ],
        },

        {
            title: "Company",
            items: [
                {
                    title: "Company Profile",
                    href: "/employer/company",
                    icon: "Building2",
                    roles: ["EMPLOYER"],
                },
                // {
                //   title: "Team",
                //   href: "/employer/team",
                //   icon: "Users",
                //   roles: ["EMPLOYER"],
                //   // disabled: true,   // optional — if your NavItem supports it
                // },
            ],
        },
    ];
};

// ───────────────────────────────────────────────
// MODERATOR items (also visible to ADMIN)
// ───────────────────────────────────────────────
export const getModeratorNavItems = async (): Promise<NavSection[]> => {
    const pendingReviews = 0; // placeholder

    return [
        {
            title: "Moderation",
            items: [
                {
                    title: "Job Review Queue",
                    href: "/moderator/jobs",
                    icon: "FileCheck",
                    badge: pendingReviews > 0 ? pendingReviews : undefined,
                    roles: ["MODERATOR", "ADMIN"],
                },
                {
                    title: "Reports & Flags",
                    href: "/moderator/reports",
                    icon: "Flag",
                    roles: ["MODERATOR", "ADMIN"],
                },
                {
                    title: "Flagged Users",
                    href: "/moderator/users",
                    icon: "UserX",
                    roles: ["MODERATOR", "ADMIN"],
                },
            ],
        },
    ];
};

// ───────────────────────────────────────────────
// ADMIN items (includes moderator items + more)
// ───────────────────────────────────────────────
export const getAdminNavItems = async (): Promise<NavSection[]> => {
    return [
        ...(await getModeratorNavItems()), // reuse moderator items

        {
            title: "Administration",
            items: [
                {
                    title: "Users",
                    href: "/admin/users",
                    icon: "Users",
                    roles: ["ADMIN"],
                },
                {
                    title: "Companies",
                    href: "/admin/companies",
                    icon: "Building",
                    roles: ["ADMIN"],
                },
                {
                    title: "Taxonomy",
                    href: "/admin/taxonomy",
                    icon: "Tags",
                    roles: ["ADMIN"],
                },
                {
                    title: "Audit Logs",
                    href: "/admin/audit-logs",
                    icon: "History",
                    roles: ["ADMIN"],
                },
            ],
        },
    ];
};

// ───────────────────────────────────────────────
// Main exported function — combine everything
// ───────────────────────────────────────────────
export const getNavItemsByRole = async (role: UserRole): Promise<NavSection[]> => {
    const common = getCommonNavItems(role);

    switch (role) {
        case "JOB_SEEKER":
            return [...common, ...(await getSeekerNavItems())];

        case "EMPLOYER":
            return [...common, ...(await getEmployerNavItems())];

        case "MODERATOR":
            return [...common, ...(await getModeratorNavItems())];

        case "ADMIN":
            return [...common, ...(await getAdminNavItems())];

        default:
            return common;
    }
};