// ================================
// User Roles
// ================================
export type UserRole = "JOB_SEEKER" | "EMPLOYER" | "MODERATOR" | "ADMIN";

// ================================
// Route Config Type
// ================================
export type RouteConfig = {
    exact: string[];
    patterns: RegExp[];
};

// ================================
// Public Auth Routes
// ================================
export const authRoutes = ["/login", "/register", "/forgot-password", "/reset-password"];

// ================================
// Common Protected Routes
// (accessible by all logged users)
// ================================
export const commonProtectedRoutes: RouteConfig = {
    exact: ["/my-profile", "/settings", "/change-password", "/reset-password"],
    patterns: [],
};

// ================================
// Role Specific Routes
// ================================
export const seekerProtectedRoutes: RouteConfig = {
    exact: [],
    patterns: [/^\/seeker/],
};

export const employerProtectedRoutes: RouteConfig = {
    exact: [],
    patterns: [/^\/employer/],
};

export const moderatorProtectedRoutes: RouteConfig = {
    exact: [],
    patterns: [/^\/moderator/],
};

export const adminProtectedRoutes: RouteConfig = {
    exact: [],
    patterns: [/^\/admin/],
};

// ================================
// Check if route is auth route
// ================================
export const isAuthRoute = (pathname: string) => {
    return authRoutes.includes(pathname);
};

// ================================
// Match route with config
// ================================
export const isRouteMatches = (
    pathname: string,
    routes: RouteConfig
): boolean => {
    if (routes.exact.includes(pathname)) {
        return true;
    }

    return routes.patterns.some((pattern) => pattern.test(pathname));
};

// ================================
// Get route owner (RBAC)
// ================================
export const getRouteOwner = (
    pathname: string
): UserRole | "COMMON" | null => {
    if (isRouteMatches(pathname, adminProtectedRoutes)) {
        return "ADMIN";
    }

    if (isRouteMatches(pathname, moderatorProtectedRoutes)) {
        return "MODERATOR";
    }

    if (isRouteMatches(pathname, employerProtectedRoutes)) {
        return "EMPLOYER";
    }

    if (isRouteMatches(pathname, seekerProtectedRoutes)) {
        return "JOB_SEEKER";
    }

    if (isRouteMatches(pathname, commonProtectedRoutes)) {
        return "COMMON";
    }

    return null;
};

// ================================
// Default Dashboard per role
// ================================
export const getDefaultDashboardRoute = (
    role: UserRole
): string => {
    switch (role) {
        case "JOB_SEEKER":
            return "/seeker/dashboard";

        case "EMPLOYER":
            return "/employer/dashboard";

        case "MODERATOR":
            return "/moderator/dashboard";

        case "ADMIN":
            return "/admin/dashboard";

        default:
            return "/";
    }
};

// ================================
// Validate redirect safety
// Prevent role escalation
// ================================
export const isValidRedirectForRole = (
    redirectPath: string,
    role: UserRole
): boolean => {
    const routeOwner = getRouteOwner(redirectPath);

    // Public routes
    if (routeOwner === null) {
        return true;
    }

    // Common protected routes
    if (routeOwner === "COMMON") {
        return true;
    }

    // Role matched
    if (routeOwner === role) {
        return true;
    }

    return false;
};