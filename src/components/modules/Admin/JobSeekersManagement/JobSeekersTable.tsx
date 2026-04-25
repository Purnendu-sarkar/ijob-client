"use client";

import DeleteConfirmationDialog from "@/components/shared/DeleteConfirmationDialog";
import ManagementTable from "@/components/shared/ManagementTable";
import {
  softDeleteJobSeeker,
  hardDeleteJobSeeker,
} from "@/services/admin/jobSeekersManagement";
import { IJobSeeker } from "@/types/jobSeeker.interface";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { toast } from "sonner";
import JobSeekerFormDialog from "./JobSeekerFormDialog";
import { jobSeekersColumns } from "./jobSeekersColumns";
import JobSeekerViewDetailDialog from "./JobSeekerViewDetailDialog";

interface JobSeekersTableProps {
  jobSeekers: IJobSeeker[];
}

const JobSeekersTable = ({ jobSeekers }: JobSeekersTableProps) => {
  const router = useRouter();
  const [, startTransition] = useTransition();

  const [viewingJobSeeker, setViewingJobSeeker] = useState<IJobSeeker | null>(
    null,
  );
  const [editingJobSeeker, setEditingJobSeeker] = useState<IJobSeeker | null>(
    null,
  );
  const [deletingJobSeeker, setDeletingJobSeeker] = useState<IJobSeeker | null>(
    null,
  );
  const [isDeleting, setIsDeleting] = useState(false);
  const [deleteType, setDeleteType] = useState<"soft" | "hard">("soft");

  const handleRefresh = () => {
    startTransition(() => router.refresh());
  };

  const handleView = (seeker: IJobSeeker) => setViewingJobSeeker(seeker);
  const handleEdit = (seeker: IJobSeeker) => setEditingJobSeeker(seeker);

  const handleSoftDelete = (seeker: IJobSeeker) => {
    setDeleteType("soft");
    setDeletingJobSeeker(seeker);
  };

  const handleHardDelete = (seeker: IJobSeeker) => {
    setDeleteType("hard");
    setDeletingJobSeeker(seeker);
  };

  const confirmDelete = async () => {
    if (!deletingJobSeeker) return;

    setIsDeleting(true);
    let result;

    if (deleteType === "soft") {
      result = await softDeleteJobSeeker(deletingJobSeeker.id);
    } else {
      result = await hardDeleteJobSeeker(deletingJobSeeker.id);
    }

    setIsDeleting(false);

    if (result.success) {
      toast.success(
        result.message ||
          `${deleteType === "soft" ? "Soft" : "Hard"} delete successful`,
      );
      setDeletingJobSeeker(null);
      handleRefresh();
    } else {
      toast.error(result.message || "Failed to delete job seeker");
    }
  };

  return (
    <>
      <ManagementTable
        data={jobSeekers}
        columns={jobSeekersColumns}
        onView={handleView}
        onEdit={handleEdit}
        onDelete={handleSoftDelete}
        onHardDelete={handleHardDelete} // Optional: if your ManagementTable supports it
        getRowKey={(seeker) => seeker.id}
        emptyMessage="No job seekers found"
      />

      {/* Edit Dialog */}
      <JobSeekerFormDialog
        open={!!editingJobSeeker}
        onClose={() => setEditingJobSeeker(null)}
        jobSeeker={editingJobSeeker!}
        onSuccess={() => {
          setEditingJobSeeker(null);
          handleRefresh();
        }}
      />

      {/* View Detail Dialog */}
      <JobSeekerViewDetailDialog
        open={!!viewingJobSeeker}
        onClose={() => setViewingJobSeeker(null)}
        jobSeeker={viewingJobSeeker}
      />

      {/* Delete Confirmation */}
      <DeleteConfirmationDialog
        open={!!deletingJobSeeker}
        onOpenChange={(open) => !open && setDeletingJobSeeker(null)}
        onConfirm={confirmDelete}
        title={
          deleteType === "soft"
            ? "Soft Delete Job Seeker"
            : "Permanent Delete Job Seeker"
        }
        description={`Are you sure you want to ${
          deleteType === "soft" ? "soft delete" : "permanently delete"
        } ${deletingJobSeeker?.name}?`}
        isDeleting={isDeleting}
      />
    </>
  );
};

export default JobSeekersTable;
