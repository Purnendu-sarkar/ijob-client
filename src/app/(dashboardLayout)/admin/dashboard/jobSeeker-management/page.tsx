import JobSeekersFilter from "@/components/modules/Admin/JobSeekersManagement/JobSeekersFilter";
import JobSeekersManagementHeader from "@/components/modules/Admin/JobSeekersManagement/JobSeekersManagementHeader";
import JobSeekersTable from "@/components/modules/Admin/JobSeekersManagement/JobSeekersTable";
import TablePagination from "@/components/shared/TablePagination";
import { TableSkeleton } from "@/components/shared/TableSkeleton";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { queryStringFormatter } from "@/lib/formatters";
import { getJobSeekers } from "@/services/admin/jobSeekersManagement";
import { mapJobSeekerFromBackend } from "@/types/jobSeeker.interface";
import { Suspense } from "react";

const JobSeekersTableSection = async ({
  queryString,
}: {
  queryString: string;
}) => {
  const result = await getJobSeekers(queryString);

  if (!result?.success) {
    return (
      <Alert variant="destructive">
        <AlertTitle>Failed to load job seekers</AlertTitle>
        <AlertDescription>
          <p>{result?.message || "Something went wrong. Please try again."}</p>
        </AlertDescription>
      </Alert>
    );
  }

  const jobSeekers = (result?.data || []).map(mapJobSeekerFromBackend);

  const total = Number(result?.meta?.total ?? 0);
  const limit = Number(result?.meta?.limit ?? 10);
  const currentPage = Number(result?.meta?.page ?? 1);
  const totalPages = Math.max(1, Math.ceil(total / limit));
  const from = total === 0 ? 0 : (currentPage - 1) * limit + 1;
  const to = Math.min(currentPage * limit, total);

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-1 rounded-xl border bg-card px-4 py-3 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
        <p>
          Showing <span className="font-medium text-foreground">{from}</span> to{" "}
          <span className="font-medium text-foreground">{to}</span> of{" "}
          <span className="font-medium text-foreground">{total}</span> job seeker
          profiles
        </p>
        <p>
          Page <span className="font-medium text-foreground">{currentPage}</span>{" "}
          of <span className="font-medium text-foreground">{totalPages}</span>
        </p>
      </div>
      <JobSeekersTable jobSeekers={jobSeekers} />
      {totalPages > 1 && (
        <TablePagination currentPage={currentPage} totalPages={totalPages} />
      )}
    </div>
  );
};

const AdminJobSeekersManagementPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) => {
  const searchParamsObj = await searchParams;
  const queryString = queryStringFormatter(searchParamsObj);

  return (
    <div className="space-y-6">
      <JobSeekersManagementHeader />

      <JobSeekersFilter />

      <Suspense fallback={<TableSkeleton columns={9} rows={10} />}>
        <JobSeekersTableSection queryString={queryString} />
      </Suspense>
    </div>
  );
};

export default AdminJobSeekersManagementPage;
