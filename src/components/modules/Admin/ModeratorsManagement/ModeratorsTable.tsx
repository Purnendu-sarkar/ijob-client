"use client";

import DeleteConfirmationDialog from "@/components/shared/DeleteConfirmationDialog";
import ManagementTable from "@/components/shared/ManagementTable";
import { softDeleteModerator } from "@/services/admin/moderatorsManagement";
import { IModerator } from "@/types/moderator.interface";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { toast } from "sonner";
import ModeratorFormDialog from "./ModeratorFormDialog";
import { moderatorsColumns } from "./moderatorsColumn";
import ModeratorViewDetailDialog from "./ModeratorViewDetailDialog";

interface ModeratorsTableProps {
  moderators: IModerator[];
}

const ModeratorsTable = ({ moderators }: ModeratorsTableProps) => {
  const router = useRouter();
  const [, startTransition] = useTransition();

  const [deletingModerator, setDeletingModerator] = useState<IModerator | null>(
    null,
  );
  const [viewingModerator, setViewingModerator] = useState<IModerator | null>(
    null,
  );
  const [editingModerator, setEditingModerator] = useState<IModerator | null>(
    null,
  );
  const [isDeleting, setIsDeleting] = useState(false);

  const handleRefresh = () => {
    startTransition(() => router.refresh());
  };

  const handleView = (mod: IModerator) => setViewingModerator(mod);
  const handleEdit = (mod: IModerator) => setEditingModerator(mod);
  const handleDelete = (mod: IModerator) => setDeletingModerator(mod);

  const confirmDelete = async () => {
    if (!deletingModerator) return;

    setIsDeleting(true);
    const result = await softDeleteModerator(deletingModerator.id!);
    setIsDeleting(false);

    if (result.success) {
      toast.success(result.message || "Moderator deleted successfully");
      setDeletingModerator(null);
      handleRefresh();
    } else {
      toast.error(result.message || "Failed to delete moderator");
    }
  };

  return (
    <>
      <ManagementTable
        data={moderators}
        columns={moderatorsColumns}
        onView={handleView}
        onEdit={handleEdit}
        onDelete={handleDelete}
        getRowKey={(mod) => mod.id!}
        emptyMessage="No moderators found"
      />

      {/* Edit Dialog */}
      <ModeratorFormDialog
        open={!!editingModerator}
        onClose={() => setEditingModerator(null)}
        moderator={editingModerator!}
        onSuccess={() => {
          setEditingModerator(null);
          handleRefresh();
        }}
      />

      {/* View Dialog */}
      <ModeratorViewDetailDialog
        open={!!viewingModerator}
        onClose={() => setViewingModerator(null)}
        moderator={viewingModerator}
      />

      {/* Delete Confirmation */}
      <DeleteConfirmationDialog
        open={!!deletingModerator}
        onOpenChange={(open) => !open && setDeletingModerator(null)}
        onConfirm={confirmDelete}
        title="Delete Moderator"
        description={`Are you sure you want to delete ${deletingModerator?.name}?`}
        isDeleting={isDeleting}
      />
    </>
  );
};

export default ModeratorsTable;
