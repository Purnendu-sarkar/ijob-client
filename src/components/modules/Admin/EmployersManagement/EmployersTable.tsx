"use client";

import DeleteConfirmationDialog from "@/components/shared/DeleteConfirmationDialog";
import ManagementTable from "@/components/shared/ManagementTable";
import {
  hardDeleteEmployer,
  softDeleteEmployer,
} from "@/services/admin/employersManagement";
import { IEmployer } from "@/types/employer.interface";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import EmployerFormDialog from "./EmployerFormDialog";
import { employersColumns } from "./employersColumn";
import EmployerViewDetailDialog from "./EmployerViewDetailDialog";

interface EmployersTableProps {
  employers: IEmployer[];
}

const EmployersTable = ({ employers }: EmployersTableProps) => {
  const [rows, setRows] = useState<IEmployer[]>(employers);
  const [viewingEmployer, setViewingEmployer] = useState<IEmployer | null>(null);
  const [editingEmployer, setEditingEmployer] = useState<IEmployer | null>(null);
  const [deletingEmployer, setDeletingEmployer] = useState<IEmployer | null>(null);
  const [deleteType, setDeleteType] = useState<"soft" | "hard">("soft");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    setRows(employers);
  }, [employers]);

  const handleView = (employer: IEmployer) => setViewingEmployer(employer);
  const handleEdit = (employer: IEmployer) => setEditingEmployer(employer);

  const handleSoftDelete = (employer: IEmployer) => {
    setDeleteType("soft");
    setDeletingEmployer(employer);
  };

  const handleHardDelete = (employer: IEmployer) => {
    setDeleteType("hard");
    setDeletingEmployer(employer);
  };

  const confirmDelete = async () => {
    if (!deletingEmployer) return;

    setIsDeleting(true);
    const result =
      deleteType === "soft"
        ? await softDeleteEmployer(deletingEmployer.id)
        : await hardDeleteEmployer(deletingEmployer.id);
    setIsDeleting(false);

    if (result.success) {
      toast.success(
        result.message ||
          `${deleteType === "soft" ? "Soft" : "Hard"} delete successful`,
      );
      setDeletingEmployer(null);
      setRows((currentRows) =>
        deleteType === "soft"
          ? currentRows.map((row) =>
              row.id === deletingEmployer.id ? { ...row, isDeleted: true } : row,
            )
          : currentRows.filter((row) => row.id !== deletingEmployer.id),
      );
    } else {
      toast.error(result.message || "Failed to delete employer");
    }
  };

  return (
    <>
      <ManagementTable
        data={rows}
        columns={employersColumns}
        onView={handleView}
        onEdit={handleEdit}
        onDelete={handleSoftDelete}
        onHardDelete={handleHardDelete}
        getRowKey={(employer) => employer.id}
        emptyMessage="No employers found"
      />

      <EmployerFormDialog
        key={editingEmployer?.id || "employer-form"}
        open={!!editingEmployer}
        onClose={() => setEditingEmployer(null)}
        employer={editingEmployer}
        onSuccess={(updatedEmployer) => {
          if (updatedEmployer) {
            setRows((currentRows) =>
              currentRows.map((row) =>
                row.id === updatedEmployer.id ? updatedEmployer : row,
              ),
            );
          }
          setEditingEmployer(null);
        }}
      />

      <EmployerViewDetailDialog
        open={!!viewingEmployer}
        onClose={() => setViewingEmployer(null)}
        employer={viewingEmployer}
      />

      <DeleteConfirmationDialog
        open={!!deletingEmployer}
        onOpenChange={(open) => !open && setDeletingEmployer(null)}
        onConfirm={confirmDelete}
        title={
          deleteType === "soft"
            ? "Soft Delete Employer"
            : "Permanent Delete Employer"
        }
        description={`Are you sure you want to ${
          deleteType === "soft" ? "soft delete" : "permanently delete"
        } ${deletingEmployer?.name}?`}
        isDeleting={isDeleting}
      />
    </>
  );
};

export default EmployersTable;

