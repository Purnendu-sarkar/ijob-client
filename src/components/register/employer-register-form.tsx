"use client";

import { useActionState, useEffect } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import InputFieldError from "@/components/shared/InputFieldError";
import { registerEmployer } from "@/services/auth/registerEmployer";

const EmployerRegisterForm = () => {
  const [state, formAction, isPending] = useActionState(registerEmployer, null);

  useEffect(() => {
    if (state?.success === false && state?.message) {
      toast.error(state.message);
    }

    if (state?.success) {
      toast.success("Employer account created. Redirecting...");
    }
  }, [state]);

  return (
    <form action={formAction} className="space-y-6">
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="employer-fullName">Your Full Name *</Label>
          <Input
            id="employer-fullName"
            name="fullName"
            placeholder="Karim Ahmed"
            required
          />
          <InputFieldError field="fullName" state={state} />
        </div>

        <div className="space-y-2">
          <Label htmlFor="employer-designation">Designation</Label>
          <Input
            id="employer-designation"
            name="designation"
            placeholder="HR Manager / Founder"
          />
          <InputFieldError field="designation" state={state} />
        </div>

        <div className="space-y-2">
          <Label htmlFor="employer-phone">Phone Number</Label>
          <Input
            id="employer-phone"
            name="phone"
            placeholder="01XXXXXXXXX"
            inputMode="tel"
          />
          <InputFieldError field="phone" state={state} />
        </div>

        <div className="space-y-2">
          <Label htmlFor="employer-email">Email</Label>
          <Input
            id="employer-email"
            name="email"
            type="email"
            placeholder="hr@company.com"
          />
          <InputFieldError field="email" state={state} />
        </div>

        <div className="space-y-2">
          <Label htmlFor="employer-password">Password *</Label>
          <Input
            id="employer-password"
            name="password"
            type="password"
            required
          />
          <InputFieldError field="password" state={state} />
        </div>

        <div className="space-y-2">
          <Label htmlFor="employer-confirmPassword">Confirm Password *</Label>
          <Input
            id="employer-confirmPassword"
            name="confirmPassword"
            type="password"
            required
          />
          <InputFieldError field="confirmPassword" state={state} />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
        <div className="space-y-2 md:col-span-2">
          <Label htmlFor="employer-companyName">Company Name *</Label>
          <Input
            id="employer-companyName"
            name="companyName"
            placeholder="ABC Solutions Ltd."
            required
          />
          <InputFieldError field="companyName" state={state} />
        </div>

        <div className="space-y-2">
          <Label htmlFor="employer-companyWebsite">Company Website</Label>
          <Input
            id="employer-companyWebsite"
            name="companyWebsite"
            type="url"
            placeholder="https://www.company.com"
          />
          <InputFieldError field="companyWebsite" state={state} />
        </div>

        <div className="space-y-2">
          <Label htmlFor="employer-companyIndustry">Industry</Label>
          <Input
            id="employer-companyIndustry"
            name="companyIndustry"
            placeholder="Software, Retail, Manufacturing"
          />
          <InputFieldError field="companyIndustry" state={state} />
        </div>

        <div className="space-y-2">
          <Label htmlFor="employer-companySize">Company Size</Label>
          <Input
            id="employer-companySize"
            name="companySize"
            placeholder="1-10, 11-50, 51-200"
          />
          <InputFieldError field="companySize" state={state} />
        </div>

        <div className="space-y-2">
          <Label htmlFor="employer-tradeLicenseNumber">Trade License Number</Label>
          <Input
            id="employer-tradeLicenseNumber"
            name="tradeLicenseNumber"
            placeholder="TRD-123456"
          />
          <InputFieldError field="tradeLicenseNumber" state={state} />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="employer-companyAddress">Company Address</Label>
        <Textarea
          id="employer-companyAddress"
          name="companyAddress"
          rows={3}
          placeholder="House, road, area, city"
        />
        <InputFieldError field="companyAddress" state={state} />
      </div>

      <div className="space-y-2">
        <Label htmlFor="employer-companyDescription">Company Description</Label>
        <Textarea
          id="employer-companyDescription"
          name="companyDescription"
          placeholder="Tell us about your company"
          rows={4}
        />
        <InputFieldError field="companyDescription" state={state} />
      </div>

      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="employer-logoFile">Company Logo</Label>
          <Input
            id="employer-logoFile"
            name="logoFile"
            type="file"
            accept="image/png,image/jpeg,image/webp"
          />
          <InputFieldError field="logoFile" state={state} />
        </div>

        <div className="space-y-2">
          <Label htmlFor="employer-tradeLicenseFile">Trade License</Label>
          <Input
            id="employer-tradeLicenseFile"
            name="tradeLicenseFile"
            type="file"
            accept="application/pdf,image/png,image/jpeg,image/webp"
          />
          <InputFieldError field="tradeLicenseFile" state={state} />
        </div>

        <div className="space-y-2">
          <Label htmlFor="employer-nidFile">NID / Contact Person ID</Label>
          <Input
            id="employer-nidFile"
            name="nidFile"
            type="file"
            accept="application/pdf,image/png,image/jpeg,image/webp"
          />
          <InputFieldError field="nidFile" state={state} />
        </div>

        <div className="space-y-2">
          <Label htmlFor="employer-tinFile">TIN / BIN</Label>
          <Input
            id="employer-tinFile"
            name="tinFile"
            type="file"
            accept="application/pdf,image/png,image/jpeg,image/webp"
          />
          <InputFieldError field="tinFile" state={state} />
        </div>
      </div>

      <Button type="submit" className="w-full" disabled={isPending} size="lg">
        {isPending ? "Creating account..." : "Register Employer Account"}
      </Button>
    </form>
  );
};

export default EmployerRegisterForm;
