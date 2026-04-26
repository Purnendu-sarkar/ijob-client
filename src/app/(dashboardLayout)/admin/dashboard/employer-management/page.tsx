import EmployersFilter from "@/components/modules/Admin/EmployersManagement/EmployersFilter";
import EmployersManagementHeader from "@/components/modules/Admin/EmployersManagement/EmployersManagementHeader";
import EmployersTable from "@/components/modules/Admin/EmployersManagement/EmployersTable";
import TablePagination from "@/components/shared/TablePagination";
import { TableSkeleton } from "@/components/shared/TableSkeleton";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { queryStringFormatter } from "@/lib/formatters";
import { getEmployers } from "@/services/admin/employersManagement";
import { mapEmployerFromBackend } from "@/types/employer.interface";
import { Suspense } from "react";

const EmployersTableSection = async ({
  queryString,
}: {
  queryString: string;
}) => {
  const result = await getEmployers(queryString);

  if (!result?.success) {
    return (
      <Alert variant="destructive">
        <AlertTitle>Failed to load employers</AlertTitle>
        <AlertDescription>
          <p>{result?.message || "Something went wrong. Please try again."}</p>
        </AlertDescription>
      </Alert>
    );
  }

  const employers = (result?.data || []).map(mapEmployerFromBackend);
  const totalPages = Math.max(
    1,
    Math.ceil((result?.meta?.total || 1) / (result?.meta?.limit || 10)),
  );

  return (
    <>
      <EmployersTable employers={employers} />
      <TablePagination
        currentPage={result?.meta?.page || 1}
        totalPages={totalPages}
      />
    </>
  );
};

const AdminEmployersManagementPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) => {
  const searchParamsObj = await searchParams;
  const queryString = queryStringFormatter(searchParamsObj);

  return (
    <div className="space-y-6">
      <EmployersManagementHeader />
      <EmployersFilter />
      <Suspense fallback={<TableSkeleton columns={8} rows={10} />}>
        <EmployersTableSection queryString={queryString} />
      </Suspense>
    </div>
  );
};

export default AdminEmployersManagementPage;
