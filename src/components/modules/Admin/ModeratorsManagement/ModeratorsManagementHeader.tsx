"use client";

import ManagementPageHeader from "@/components/shared/ManagementPageHeader";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import ModeratorFormDialog from "./ModeratorFormDialog";

const ModeratorsManagementHeader = () => {
  const router = useRouter();
  const [, startTransition] = useTransition();
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const [dialogKey, setDialogKey] = useState(0);

  const handleSuccess = () => {
    startTransition(() => {
      router.refresh();
    });
  };

  const handleOpenDialog = () => {
    setDialogKey((prev) => prev + 1);
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
  };

  return (
    <>
      <ModeratorFormDialog
        key={dialogKey}
        open={isDialogOpen}
        onClose={handleCloseDialog}
        onSuccess={handleSuccess}
      />

      <ManagementPageHeader
        title="Moderators Management"
        description="Manage moderator accounts and assigned regions"
        action={{
          label: "Add Moderator",
          icon: Plus,
          onClick: handleOpenDialog,
        }}
      />
    </>
  );
};

export default ModeratorsManagementHeader;
