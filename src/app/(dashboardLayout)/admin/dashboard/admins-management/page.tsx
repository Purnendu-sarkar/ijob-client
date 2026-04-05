import AdminsFilter from "@/components/modules/Admin/AdminsManagement/AdminsFilter";
import AdminsManagementHeader from "@/components/modules/Admin/AdminsManagement/AdminsManagementHeader";
import AdminsTable from "@/components/modules/Admin/AdminsManagement/AdminsTable";
import TablePagination from "@/components/shared/TablePagination";
import { TableSkeleton } from "@/components/shared/TableSkeleton";
import { queryStringFormatter } from "@/lib/formatters";
import { getAdmins } from "@/services/admin/adminsManagement";
import { mapAdminFromBackend } from "@/types/admin.interface";
import { Suspense } from "react";

const AdminAdminsManagementPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) => {
  const searchParamsObj = await searchParams;
  const queryString = queryStringFormatter(searchParamsObj);

  const result = await getAdmins(queryString);

  // Map backend response to frontend IAdmin format
  const admins = (result?.data || []).map(mapAdminFromBackend);

  const totalPages = Math.ceil(
    (result?.meta?.total || 1) / (result?.meta?.limit || 10),
  );

  return (
    <div className="space-y-6">
      <AdminsManagementHeader />

      <AdminsFilter />

      <Suspense fallback={<TableSkeleton columns={8} rows={10} />}>
        <AdminsTable admins={admins} />
        <TablePagination
          currentPage={result?.meta?.page || 1}
          totalPages={totalPages}
        />
      </Suspense>
    </div>
  );
};

export default AdminAdminsManagementPage;
