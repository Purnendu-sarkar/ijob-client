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
import { createAdmin, updateAdmin } from "@/services/admin/adminsManagement";
import { IAdmin } from "@/types/admin.interface";
import Image from "next/image";
import { useActionState, useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { startTransition } from "react";

interface Props {
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
  admin?: IAdmin | null;
}

const AdminFormDialog = ({ open, onClose, onSuccess, admin }: Props) => {
  const formRef = useRef<HTMLFormElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const isEdit = !!admin?.id;

  const [state, formAction, isPending] = useActionState(
    isEdit ? updateAdmin.bind(null, admin!.id) : createAdmin,
    null,
  );

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const prevStateRef = useRef(state);

  useEffect(() => {
    if (state === prevStateRef.current) return;
    prevStateRef.current = state;

    if (state?.success) {
      toast.success(state.message || "Successfully!");
      formRef.current?.reset();

      startTransition(() => {
        setSelectedFile(null);
      });

      onSuccess();
      onClose();
    } else if (state?.message && !state.success) {
      toast.error(state.message);
      console.log("Error:", state.message);
    }
  }, [state, onSuccess, onClose]);

  const handleClose = () => {
    setSelectedFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
    formRef.current?.reset();
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-h-[90vh] flex flex-col p-0 sm:max-w-lg">
        <DialogHeader className="px-6 pt-6 pb-4">
          <DialogTitle>{isEdit ? "Edit Admin" : "Add New Admin"}</DialogTitle>
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
                defaultValue={state?.formData?.name || admin?.name || ""}
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
                defaultValue={state?.formData?.email || admin?.email || ""}
                disabled={isEdit}
                placeholder="admin@example.com"
              />
              <InputFieldError field="email" state={state} />
            </Field>

            <Field>
              <FieldLabel htmlFor="phone">Contact Number</FieldLabel>
              <Input
                id="phone"
                name="phone"
                defaultValue={state?.formData?.phone || admin?.phone || ""}
                placeholder="01XXXXXXXXX"
                onChange={(e) => {
                  let value = e.target.value.replace(/[^0-9]/g, "");
                  if (value.length > 11) value = value.slice(0, 11);
                  e.target.value = value;
                }}
              />
              <InputFieldError field="phone" state={state} />
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
                  <InputFieldError field="profilePhoto" state={state} />
                </Field>
              </>
            )}
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
                ? "Update Admin"
                : "Create Admin"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AdminFormDialog;
