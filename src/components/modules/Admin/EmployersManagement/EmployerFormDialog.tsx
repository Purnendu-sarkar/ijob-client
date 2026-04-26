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
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { updateEmployer } from "@/services/admin/employersManagement";
import {
  IEmployer,
  IEmployerProfile,
  mapEmployerFromBackend,
} from "@/types/employer.interface";
import { Badge } from "@/components/ui/badge";
import { useActionState, useEffect, useRef, useState } from "react";
import { toast } from "sonner";

interface Props {
  open: boolean;
  onClose: () => void;
  onSuccess: (updatedEmployer?: IEmployer) => void;
  employer?: IEmployer | null;
}

const EmployerFormDialog = ({ open, onClose, onSuccess, employer }: Props) => {
  const formRef = useRef<HTMLFormElement>(null);
  const isEdit = !!employer?.id;
  const [companyVerificationStatus, setCompanyVerificationStatus] = useState(
    employer?.companyVerificationStatus || "PENDING",
  );

  const [state, formAction, isPending] = useActionState(
    updateEmployer.bind(null, employer?.id || ""),
    null,
  );

  const prevStateRef = useRef(state);

  useEffect(() => {
    if (state === prevStateRef.current) return;
    prevStateRef.current = state;

    if (state?.success) {
      const updatedEmployer = state?.data
        ? mapEmployerFromBackend(state.data as IEmployerProfile)
        : undefined;

      toast.success(state.message || "Employer profile updated successfully!");
      onSuccess(updatedEmployer);
      onClose();
    } else if (state?.message && !state.success) {
      toast.error(state.message);
    }
  }, [state, onSuccess, onClose]);

  const handleClose = () => {
    formRef.current?.reset();
    setCompanyVerificationStatus(
      employer?.companyVerificationStatus || "PENDING",
    );
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-h-[90vh] flex flex-col p-0 sm:max-w-3xl">
        <DialogHeader className="px-6 pt-6 pb-4">
          <DialogTitle>
            {isEdit ? "Edit Employer Profile" : "Employer Details"}
          </DialogTitle>
        </DialogHeader>

        <form
          ref={formRef}
          action={formAction}
          className="flex flex-col flex-1 min-h-0"
        >
          <div className="flex-1 overflow-y-auto px-6 space-y-6 pb-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <Field>
                <FieldLabel htmlFor="name">Full Name</FieldLabel>
                <Input
                  id="name"
                  name="name"
                  defaultValue={employer?.name || ""}
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
                  defaultValue={employer?.email || ""}
                  disabled
                />
              </Field>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <Field>
                <FieldLabel htmlFor="phone">Contact Number</FieldLabel>
                <Input
                  id="phone"
                  name="phone"
                  defaultValue={employer?.phone || ""}
                  placeholder="01XXXXXXXXX"
                  onChange={(e) => {
                    let value = e.target.value.replace(/[^0-9]/g, "");
                    if (value.length > 11) value = value.slice(0, 11);
                    e.target.value = value;
                  }}
                />
                <InputFieldError field="phone" state={state} />
              </Field>

              <Field>
                <FieldLabel htmlFor="designation">Designation</FieldLabel>
                <Input
                  id="designation"
                  name="designation"
                  defaultValue={employer?.designation || ""}
                  placeholder="HR Manager"
                />
                <InputFieldError field="designation" state={state} />
              </Field>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <Field>
                <FieldLabel htmlFor="companyName">Company Name</FieldLabel>
                <Input
                  id="companyName"
                  name="companyName"
                  defaultValue={employer?.company.name || ""}
                  placeholder="Company name"
                />
                <InputFieldError field="companyName" state={state} />
              </Field>

              <Field>
                <FieldLabel htmlFor="companyWebsite">
                  Company Website
                </FieldLabel>
                <Input
                  id="companyWebsite"
                  name="companyWebsite"
                  defaultValue={employer?.company.website || ""}
                  placeholder="https://company.com"
                />
                <InputFieldError field="companyWebsite" state={state} />
              </Field>
            </div>

            <Field>
              <FieldLabel htmlFor="companyAddress">Company Address</FieldLabel>
              <Input
                id="companyAddress"
                name="companyAddress"
                defaultValue={employer?.company.address || ""}
                placeholder="Company location"
              />
              <InputFieldError field="companyAddress" state={state} />
            </Field>

            <Field>
              <FieldLabel htmlFor="companyDescription">
                Company Description
              </FieldLabel>
              <Textarea
                id="companyDescription"
                name="companyDescription"
                defaultValue={employer?.company.description || ""}
                placeholder="Short company description..."
                className="min-h-28"
              />
              <InputFieldError field="companyDescription" state={state} />
            </Field>

            <Field>
              <div className="grid gap-2">
                <FieldLabel htmlFor="companyVerificationStatus">
                  Company Verification Status
                </FieldLabel>
                <select
                  id="companyVerificationStatus"
                  name="companyVerificationStatus"
                  value={companyVerificationStatus}
                  onChange={(e) =>
                    setCompanyVerificationStatus(
                      e.target.value as "PENDING" | "VERIFIED" | "REJECTED",
                    )
                  }
                  className="h-10 rounded-md border border-input bg-background px-3 text-sm"
                >
                  <option value="PENDING">Pending</option>
                  <option value="VERIFIED">Verified</option>
                  <option value="REJECTED">Rejected</option>
                </select>
                <p className="text-xs text-muted-foreground">
                  {companyVerificationStatus === "VERIFIED"
                    ? "This company is approved for hiring."
                    : companyVerificationStatus === "REJECTED"
                    ? "This company is marked as rejected."
                    : "Review the company before approving it."}
                </p>
              </div>
            </Field>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label className="text-sm font-medium mb-2 block">
                  Company Verification
                </Label>
                <Badge
                  variant={
                    companyVerificationStatus === "VERIFIED"
                      ? "default"
                      : companyVerificationStatus === "REJECTED"
                      ? "destructive"
                      : "secondary"
                  }
                >
                  {companyVerificationStatus}
                </Badge>
              </div>

              <div>
                <Label className="text-sm font-medium mb-2 block">
                  Company Slug
                </Label>
                <div className="text-sm text-muted-foreground">
                  {employer?.company.slug || "-"}
                </div>
              </div>
            </div>
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
              {isPending ? "Updating..." : "Update Employer"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EmployerFormDialog;
