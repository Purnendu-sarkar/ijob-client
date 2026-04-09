"use client";

import InputFieldError from "@/components/shared/InputFieldError";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  createModerator,
  updateModerator,
} from "@/services/admin/moderatorsManagement";
import { IModerator } from "@/types/moderator.interface";
import Image from "next/image";
import { useActionState, useEffect, useRef, useState } from "react";
import { toast } from "sonner";

interface Props {
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
  moderator?: IModerator | null;
}

const ModeratorFormDialog = ({
  open,
  onClose,
  onSuccess,
  moderator,
}: Props) => {
  const formRef = useRef<HTMLFormElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const isEdit = !!moderator?.id;

  const [state, formAction, isPending] = useActionState(
    isEdit ? updateModerator.bind(null, moderator!.id) : createModerator,
    null,
  );

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const prevStateRef = useRef(state);

  useEffect(() => {
    if (state === prevStateRef.current) return;
    prevStateRef.current = state;

    if (state?.success) {
      toast.success(state.message || "Moderator saved successfully!");
      formRef.current?.reset();

      setTimeout(() => {
        setSelectedFile(null);
      }, 0);

      onSuccess();
      onClose();
    } else if (state?.message && !state.success) {
      toast.error(state.message);
    }
  }, [state, onSuccess, onClose]);

  const handleClose = () => {
    setSelectedFile(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
    formRef.current?.reset();
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-h-[90vh] flex flex-col p-0 sm:max-w-lg">
        <DialogHeader className="px-6 pt-6 pb-4">
          <DialogTitle>
            {isEdit ? "Edit Moderator" : "Add New Moderator"}
          </DialogTitle>
        </DialogHeader>

        <form
          ref={formRef}
          action={formAction}
          className="flex flex-col flex-1 min-h-0"
        >
          <div className="flex-1 overflow-y-auto px-6 space-y-5 pb-6">
            <Field>
              <FieldLabel htmlFor="name">Full Name</FieldLabel>
              <Input
                id="name"
                name="name"
                defaultValue={state?.formData?.name || moderator?.name || ""}
                placeholder="Enter full name"
              />
              <InputFieldError field="name" state={state} />
            </Field>

            <Field>
              <FieldLabel htmlFor="email">Email Address</FieldLabel>
              <Input
                id="email"
                name="email"
                type="email"
                defaultValue={state?.formData?.email || moderator?.email || ""}
                disabled={isEdit}
                placeholder="moderator@example.com"
              />
              <InputFieldError field="email" state={state} />
            </Field>

            <Field>
              <FieldLabel htmlFor="phone">Contact Number</FieldLabel>
              <Input
                id="phone"
                name="phone"
                defaultValue={state?.formData?.phone || moderator?.phone || ""}
                placeholder="01XXXXXXXXX"
              />
              <InputFieldError field="phone" state={state} />
            </Field>

            <Field>
              <FieldLabel htmlFor="bio">Bio / Note</FieldLabel>
              <Input
                id="bio"
                name="bio"
                defaultValue={state?.formData?.bio || moderator?.bio || ""}
                placeholder="Short description or note"
              />
              <InputFieldError field="bio" state={state} />
            </Field>

            {!isEdit && (
              <>
                <Field>
                  <FieldLabel htmlFor="password">Password</FieldLabel>
                  <Input
                    id="password"
                    name="password"
                    type="password"
                    placeholder="Minimum 6 characters"
                  />
                  <InputFieldError field="password" state={state} />
                </Field>

                <Field>
                  <FieldLabel htmlFor="file">Profile Photo</FieldLabel>
                  {selectedFile && (
                    <div className="mb-3">
                      <Image
                        src={URL.createObjectURL(selectedFile)}
                        alt="Preview"
                        width={80}
                        height={80}
                        className="rounded-full object-cover border"
                      />
                    </div>
                  )}
                  <Input
                    ref={fileInputRef}
                    id="file"
                    name="file"
                    type="file"
                    accept="image/*"
                    onChange={(e) =>
                      setSelectedFile(e.target.files?.[0] || null)
                    }
                  />
                </Field>
              </>
            )}

            {/* Assigned Regions - Simple multi input (you can improve with multi-select later) */}
            <Field>
              <FieldLabel>Assigned Regions (comma separated)</FieldLabel>
              <Input
                id="assignedRegions"
                name="assignedRegions"
                defaultValue={moderator?.assignedRegions?.join(", ") || ""}
                placeholder="Dhaka, Khulna, Chittagong"
              />
              <p className="text-xs text-muted-foreground mt-1">
                Example: Dhaka, Khulna, Sylhet
              </p>
            </Field>
          </div>

          <div className="flex justify-end gap-3 px-6 py-4 border-t bg-muted/50">
            <Button
              type="button"
              variant="outline"
              onClick={handleClose}
              disabled={isPending}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isPending}>
              {isPending
                ? "Saving..."
                : isEdit
                ? "Update Moderator"
                : "Create Moderator"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ModeratorFormDialog;
