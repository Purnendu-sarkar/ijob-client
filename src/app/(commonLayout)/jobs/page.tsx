import { DesktopJobFilters, MobileJobFilters } from "@/components/modules/Jobs/JobFilters";
import JobSortSelect from "@/components/modules/Jobs/JobSortSelect";
import PublicJobCard from "@/components/modules/Jobs/PublicJobCard";
import TablePagination from "@/components/shared/TablePagination";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Card, CardContent } from "@/components/ui/card";
import { queryStringFormatter } from "@/lib/formatters";
import { getPublicJobs } from "@/services/jobs/jobs.service";
import type { Metadata } from "next";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Find Jobs",
  description:
    "Browse published jobs from verified companies in Bangladesh with filters for type, workplace, salary, and experience.",
};

const PublicJobsPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) => {
  const searchParamsObj = await searchParams;
  const queryString = queryStringFormatter(searchParamsObj);
  const result = await getPublicJobs(queryString);

  const jobs = result?.data || [];
  const meta = result?.meta;
  const total = meta?.total || 0;
  const totalPages = Math.max(1, Math.ceil(total / (meta?.limit || 10)));

  return (
    <main className="min-h-screen bg-muted/30">
      <section className="border-b bg-background">
        <div className="container mx-auto px-4 py-10 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-3">
            <p className="text-sm font-semibold uppercase tracking-wide text-primary">
              Public Job Search
            </p>
            <h1 className="text-3xl font-bold tracking-tight sm:text-5xl">
              Find jobs from verified employers
            </h1>
            <p className="text-muted-foreground">
              Search by title, company, salary, experience, and work style. No login
              needed until you are ready to apply.
            </p>
          </div>
        </div>
      </section>

      <section className="container mx-auto grid gap-6 px-4 py-8 sm:px-6 lg:grid-cols-[300px_1fr] lg:px-8">
        <DesktopJobFilters />

        <div className="space-y-5">
          <div className="flex flex-col gap-3 rounded-2xl border bg-card p-4 shadow-sm sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-xl font-semibold">Available Jobs</h2>
              <p className="text-sm text-muted-foreground">
                {total} published {total === 1 ? "job" : "jobs"} found
              </p>
            </div>
            <div className="flex items-center gap-2">
              <MobileJobFilters />
              <JobSortSelect />
            </div>
          </div>

          {!result?.success ? (
            <Alert variant="destructive">
              <AlertTitle>Failed to load jobs</AlertTitle>
              <AlertDescription>
                {result?.message || "Something went wrong. Please try again."}
              </AlertDescription>
            </Alert>
          ) : jobs.length === 0 ? (
            <Card>
              <CardContent className="flex min-h-65 flex-col items-center justify-center gap-3 text-center">
                <h3 className="text-xl font-semibold">No jobs match your filters</h3>
                <p className="max-w-md text-sm text-muted-foreground">
                  Try clearing filters or searching with a broader keyword.
                </p>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-4">
              {jobs.map((job) => (
                <PublicJobCard key={job.id} job={job} />
              ))}
            </div>
          )}

          {result?.success && totalPages > 1 ? (
            <div className="rounded-2xl border bg-card p-4 shadow-sm">
              <TablePagination currentPage={meta?.page || 1} totalPages={totalPages} />
            </div>
          ) : null}
        </div>
      </section>
    </main>
  );
};

export default PublicJobsPage;
