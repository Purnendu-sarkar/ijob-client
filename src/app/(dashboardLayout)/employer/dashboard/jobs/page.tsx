/* eslint-disable @typescript-eslint/no-explicit-any */
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { getJobs } from "@/services/employer/jobs";
import { getUserInfo } from "@/services/auth/getUserInfo";
import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";

const EmployerJobsPage = async () => {
  const user = await getUserInfo();

  if (!user || user.role !== "EMPLOYER") {
    redirect("/login");
  }

  const companyId = user.employerProfile?.company?.id;
  const verificationStatus = user.employerProfile?.company?.verificationStatus;

  if (verificationStatus !== "VERIFIED") {
    redirect("/employer/dashboard/pending-verification");
  }

  const result = await getJobs({ companyId });

  if (!result?.success) {
    return (
      <Alert variant="destructive">
        <AlertTitle>Failed to load jobs</AlertTitle>
        <AlertDescription>{result?.message || "Something went wrong."}</AlertDescription>
      </Alert>
    );
  }

  const jobs: any[] = result?.data || [];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">My Jobs</h1>
        <p className="text-muted-foreground">
          View your posted jobs and their current status.
        </p>
      </div>

      {jobs.length === 0 ? (
        <Card>
          <CardHeader>
            <CardTitle>No jobs yet</CardTitle>
            <CardDescription>Post your first job to start receiving applications.</CardDescription>
          </CardHeader>
        </Card>
      ) : (
        <div className="grid gap-4">
          {jobs.map((job) => (
            <Card key={job.id}>
              <CardHeader className="border-b">
                <div className="flex items-start justify-between gap-4">
                  <div className="space-y-1">
                    <CardTitle className="text-base">{job.title}</CardTitle>
                    <CardDescription>
                      {job.employmentType} • {job.workplaceType}
                    </CardDescription>
                  </div>
                  <Badge variant="secondary">{job.status}</Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="text-sm text-muted-foreground">
                  Salary:{" "}
                  <span className="text-foreground">
                    {job.salaryMin ?? "—"} - {job.salaryMax ?? "—"} {job.currency || "BDT"}
                  </span>
                </div>
                <div className="text-sm text-muted-foreground">
                  Deadline:{" "}
                  <span className="text-foreground">
                    {job.applicationDeadline
                      ? new Date(job.applicationDeadline).toLocaleDateString("en-GB")
                      : "—"}
                  </span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default EmployerJobsPage;

