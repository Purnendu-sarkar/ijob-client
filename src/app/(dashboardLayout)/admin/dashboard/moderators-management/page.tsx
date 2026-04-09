import ModeratorsFilter from "@/components/modules/Admin/ModeratorsManagement/ModeratorsFilter";
import ModeratorsManagementHeader from "@/components/modules/Admin/ModeratorsManagement/ModeratorsManagementHeader";
import ModeratorsTable from "@/components/modules/Admin/ModeratorsManagement/ModeratorsTable";
import TablePagination from "@/components/shared/TablePagination";
import { TableSkeleton } from "@/components/shared/TableSkeleton";
import { queryStringFormatter } from "@/lib/formatters";
import { getModerators } from "@/services/admin/moderatorsManagement";
import { mapModeratorFromBackend } from "@/types/moderator.interface";
import { Suspense } from "react";

const AdminModeratorsManagementPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) => {
  const searchParamsObj = await searchParams;
  const queryString = queryStringFormatter(searchParamsObj);

  const result = await getModerators(queryString);

  const moderators = (result?.data || []).map(mapModeratorFromBackend);

  const totalPages = Math.ceil(
    (result?.meta?.total || 1) / (result?.meta?.limit || 10),
  );

  return (
    <div className="space-y-6">
      <ModeratorsManagementHeader />

      <ModeratorsFilter />

      <Suspense fallback={<TableSkeleton columns={8} rows={10} />}>
        <ModeratorsTable moderators={moderators} />
        <TablePagination
          currentPage={result?.meta?.page || 1}
          totalPages={totalPages}
        />
      </Suspense>
    </div>
  );
};

export default AdminModeratorsManagementPage;
