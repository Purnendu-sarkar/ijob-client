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
import { Switch } from "@/components/ui/switch";
import { updateJobSeeker } from "@/services/admin/jobSeekersManagement";
import { IJobSeeker } from "@/types/jobSeeker.interface";
import { Badge } from "@/components/ui/badge";
import { useActionState, useEffect, useRef } from "react";
import { toast } from "sonner";

interface Props {
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
  jobSeeker?: IJobSeeker | null;
}

const JobSeekerFormDialog = ({
  open,
  onClose,
  onSuccess,
  jobSeeker,
}: Props) => {
  const formRef = useRef<HTMLFormElement>(null);
  const isEdit = !!jobSeeker?.id;

  const [state, formAction, isPending] = useActionState(
    updateJobSeeker.bind(null, jobSeeker?.id || ""),
    null,
  );

  const prevStateRef = useRef(state);

  useEffect(() => {
    if (state === prevStateRef.current) return;
    prevStateRef.current = state;

    if (state?.success) {
      toast.success(
        state.message || "Job Seeker profile updated successfully!",
      );
      onSuccess();
      onClose();
    } else if (state?.message && !state.success) {
      toast.error(state.message);
    }
  }, [state, onSuccess, onClose]);

  const handleClose = () => {
    formRef.current?.reset();
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-h-[90vh] flex flex-col p-0 sm:max-w-2xl">
        <DialogHeader className="px-6 pt-6 pb-4">
          <DialogTitle>
            {isEdit ? "Edit Job Seeker Profile" : "Job Seeker Details"}
          </DialogTitle>
        </DialogHeader>

        <form
          ref={formRef}
          action={formAction}
          className="flex flex-col flex-1 min-h-0"
        >
          <div className="flex-1 overflow-y-auto px-6 space-y-6 pb-6">
            {/* Basic Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <Field>
                <FieldLabel htmlFor="fullName">Full Name</FieldLabel>
                <Input
                  id="fullName"
                  name="fullName"
                  defaultValue={
                    state?.formData?.fullName || jobSeeker?.name || ""
                  }
                  placeholder="Enter full name"
                />
                <InputFieldError field="fullName" state={state} />
              </Field>

              <Field>
                <FieldLabel htmlFor="email">Email Address</FieldLabel>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  defaultValue={jobSeeker?.email || ""}
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
                  defaultValue={jobSeeker?.phone || ""}
                  placeholder="01XXXXXXXXX"
                  disabled
                />
              </Field>

              <Field>
                <FieldLabel htmlFor="experienceYears">
                  Experience (Years)
                </FieldLabel>
                <Input
                  id="experienceYears"
                  name="experienceYears"
                  type="number"
                  defaultValue={jobSeeker?.experienceYears || ""}
                  placeholder="0"
                />
              </Field>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <Field>
                <FieldLabel htmlFor="expectedSalaryMin">
                  Expected Salary Min (BDT)
                </FieldLabel>
                <Input
                  id="expectedSalaryMin"
                  name="expectedSalaryMin"
                  type="number"
                  defaultValue={
                    jobSeeker?.expectedSalaryRange
                      ? jobSeeker.expectedSalaryRange
                          .split(" - ")[0]
                          ?.replace(/[^0-9]/g, "")
                      : ""
                  }
                  placeholder="15000"
                />
              </Field>

              <Field>
                <FieldLabel htmlFor="expectedSalaryMax">
                  Expected Salary Max (BDT)
                </FieldLabel>
                <Input
                  id="expectedSalaryMax"
                  name="expectedSalaryMax"
                  type="number"
                  defaultValue={
                    jobSeeker?.expectedSalaryRange
                      ? jobSeeker.expectedSalaryRange
                          .split(" - ")[1]
                          ?.replace(/[^0-9]/g, "")
                      : ""
                  }
                  placeholder="30000"
                />
              </Field>
            </div>

            <Field>
              <FieldLabel htmlFor="about">About / Summary</FieldLabel>
              <textarea
                id="about"
                name="about"
                defaultValue={jobSeeker?.about || ""}
                className="w-full min-h-25 rounded-md border border-input bg-background px-3 py-2 text-sm"
                placeholder="Write a short professional summary..."
              />
            </Field>

            {/* Verification Status */}
            <Field>
              <div className="flex items-center justify-between">
                <div>
                  <FieldLabel>Profile Verified</FieldLabel>
                  <p className="text-xs text-muted-foreground">
                    Mark as verified after manual review
                  </p>
                </div>
                <Switch
                  name="isProfileVerified"
                  defaultChecked={jobSeeker?.isProfileVerified || false}
                />
              </div>
            </Field>

            {/* Preferred Job Types & Locations (Read-only for now) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label className="text-sm font-medium mb-2 block">
                  Preferred Job Types
                </Label>
                <div className="flex flex-wrap gap-1">
                  {jobSeeker?.preferredJobTypes?.length ? (
                    jobSeeker.preferredJobTypes.map((type, i) => (
                      <Badge key={i} variant="outline">
                        {type}
                      </Badge>
                    ))
                  ) : (
                    <span className="text-muted-foreground text-sm">
                      Not specified
                    </span>
                  )}
                </div>
              </div>

              <div>
                <Label className="text-sm font-medium mb-2 block">
                  Preferred Locations
                </Label>
                <div className="flex flex-wrap gap-1">
                  {jobSeeker?.preferredLocations?.length ? (
                    jobSeeker.preferredLocations.map((loc, i) => (
                      <Badge key={i} variant="outline">
                        {loc}
                      </Badge>
                    ))
                  ) : (
                    <span className="text-muted-foreground text-sm">
                      Not specified
                    </span>
                  )}
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
              {isPending ? "Updating..." : "Update Profile"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default JobSeekerFormDialog;
