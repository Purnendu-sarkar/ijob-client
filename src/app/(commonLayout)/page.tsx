import { Metadata } from "next";
import { getUserInfo } from "@/services/auth/getUserInfo";
import Image from "next/image";
import Link from "next/link";
import JobPortalLoader from "@/components/shared/job-portal-loader";

export const metadata: Metadata = {
  title: "iJob Bangladesh - Find Your Dream Job",
  description:
    "Search thousands of jobs in Bangladesh. Connect with top employers, apply easily, and grow your career with iJob Bangladesh.",
};

export default async function HomePage() {
  const user = await getUserInfo();

  return (
    <main className="min-h-screen bg-gray-50">
      {/* <Hero /> */}
      <div className="max-w-5xl mx-auto px-5 sm:px-8 pt-16 pb-12">
        <JobPortalLoader  text="Loading jobs..." />
        {user ? (
          <div className="bg-white rounded-2xl shadow-md border border-gray-200 p-6 mb-12">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
              {/* Avatar */}
              {user.profilePhotoUrl ? (
                <Image
                  src={user.profilePhotoUrl}
                  alt="Profile"
                  width={80}
                  height={80}
                  className="rounded-full object-cover border-4 border-blue-100"
                />
              ) : (
                <div className="w-20 h-20 rounded-full bg-linear-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white text-3xl font-bold shadow-inner">
                  {user.fullName?.charAt(0)?.toUpperCase() ||
                    user.email.charAt(0).toUpperCase()}
                </div>
              )}

              {/* User Details */}
              <div className="flex-1">
                <h2 className="text-2xl font-bold text-gray-900">
                  {user.fullName || user.email.split("@")[0]}
                </h2>
                <h2 className="text-2xl font-bold text-gray-900">
                  {user.email || user.email.split("@")[0]}
                </h2>

                <div className="mt-1 flex items-center gap-3">
                  <span
                    className={`inline-block px-3 py-1 text-sm font-medium rounded-full ${
                      user.role === "JOB_SEEKER"
                        ? "bg-green-100 text-green-800"
                        : user.role === "EMPLOYER"
                        ? "bg-blue-100 text-blue-800"
                        : user.role === "MODERATOR"
                        ? "bg-purple-100 text-purple-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {user.role === "JOB_SEEKER"
                      ? "Job Seeker"
                      : user.role === "EMPLOYER"
                      ? "Employer"
                      : user.role === "MODERATOR"
                      ? "Moderator"
                      : "Admin"}
                  </span>

                  {user.role === "EMPLOYER" &&
                    user.employerProfile?.company?.name && (
                      <span className="text-gray-600 text-sm">
                        • {user.employerProfile.company.name}
                      </span>
                    )}
                </div>

                <p className="mt-2 text-gray-600">
                  {user.role === "JOB_SEEKER"
                    ? "Start your job search today!"
                    : user.role === "EMPLOYER"
                    ? "Find new candidates and grow your team"
                    : "Manage the platform"}
                </p>

                {/* Quick Actions */}
                <div className="mt-4 flex flex-wrap gap-3">
                  <Link
                    href="/dashboard"
                    className="inline-flex items-center px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition"
                  >
                    Go to Dashboard
                  </Link>
                  <Link
                    href="/profile"
                    className="inline-flex items-center px-4 py-2 bg-gray-100 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-200 transition"
                  >
                    View Profile
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ) : (
          // Unauthenticated Hero
          <div className="bg-blue-50 border border-blue-200 rounded-2xl p-6 mb-12 text-center">
            <h2 className="text-xl font-semibold text-blue-900 mb-3">
              Welcome to iJob Bangladesh!
            </h2>
            <p className="text-gray-700 mb-5">
              Login or create a new account — thousands of job opportunities are
              waiting for you.
            </p>
            <div className="flex justify-center gap-4">
              <Link
                href="/login"
                className="px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700"
              >
                Login
              </Link>
              <Link
                href="/register"
                className="px-6 py-3 bg-white text-blue-600 border border-blue-600 font-medium rounded-lg hover:bg-blue-50"
              >
                Create Account
              </Link>
            </div>
          </div>
        )}

        {/* Hero Section */}
        <section className="text-center">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-gray-900 mb-6 leading-tight">
            Find your dream job.
          </h1>

          <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto mb-10">
            Bangladesh&#39;s most trusted job platform — apply easily, get
            interviews quickly.
          </p>

          {/* Search placeholder */}
          <div className="max-w-4xl mx-auto bg-white p-4 rounded-xl shadow-lg border border-gray-200">
            <p className="text-gray-400 italic">
              Search by job type, company, or location...
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}
