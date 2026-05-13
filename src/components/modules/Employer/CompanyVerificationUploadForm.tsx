"use client";

import { useActionState, useEffect } from "react";
import { toast } from "sonner";
import { Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import InputFieldError from "@/components/shared/InputFieldError";
import { submitEmployerVerificationDocuments } from "@/services/employer/company.service";

const CompanyVerificationUploadForm = () => {
  const [state, formAction, isPending] = useActionState(
    submitEmployerVerificationDocuments,
    null,
  );

  useEffect(() => {
    if (state?.success) {
      toast.success("Verification documents submitted.");
    } else if (state?.message) {
      toast.error(state.message);
    }
  }, [state]);

  return (
    <form action={formAction} className="grid grid-cols-1 gap-4 md:grid-cols-2">
      <div className="space-y-2">
        <Label htmlFor="pending-tradeLicenseFile">Trade License</Label>
        <Input
          id="pending-tradeLicenseFile"
          name="tradeLicenseFile"
          type="file"
          accept="application/pdf,image/png,image/jpeg,image/webp"
        />
        <InputFieldError field="tradeLicenseFile" state={state} />
      </div>

      <div className="space-y-2">
        <Label htmlFor="pending-nidFile">NID / Contact Person ID</Label>
        <Input
          id="pending-nidFile"
          name="nidFile"
          type="file"
          accept="application/pdf,image/png,image/jpeg,image/webp"
        />
        <InputFieldError field="nidFile" state={state} />
      </div>

      <div className="space-y-2">
        <Label htmlFor="pending-tinFile">TIN</Label>
        <Input
          id="pending-tinFile"
          name="tinFile"
          type="file"
          accept="application/pdf,image/png,image/jpeg,image/webp"
        />
        <InputFieldError field="tinFile" state={state} />
      </div>

      <div className="space-y-2">
        <Label htmlFor="pending-binFile">BIN / Other Document</Label>
        <Input
          id="pending-binFile"
          name="binFile"
          type="file"
          accept="application/pdf,image/png,image/jpeg,image/webp"
        />
        <InputFieldError field="binFile" state={state} />
      </div>

      <div className="md:col-span-2">
        <Button type="submit" disabled={isPending}>
          <Upload className="size-4" />
          {isPending ? "Submitting..." : "Submit Documents"}
        </Button>
      </div>
    </form>
  );
};

export default CompanyVerificationUploadForm;
