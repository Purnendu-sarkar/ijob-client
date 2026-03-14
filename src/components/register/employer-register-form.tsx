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
    if (state?.success === false) {
      if (state?.message) {
        toast.error(state.message);
      }
      // Optional: field-specific toast if you want
    }

    if (state?.success) {
      toast.success(
        "Employer account & company created successfully! (Verification pending)",
      );
      // You can redirect here if you want
      // window.location.href = "/login";
    }
  }, [state]);

  return (
    <form action={formAction} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Your Full Name */}
        <div className="space-y-2">
          <Label htmlFor="fullName">Your Full Name *</Label>
          <Input
            id="fullName"
            name="fullName"
            placeholder="Mr. Karim Ahmed"
            required
          />
          <InputFieldError field="fullName" state={state} />
        </div>

        {/* Email */}
        <div className="space-y-2">
          <Label htmlFor="email">Email *</Label>
          <Input
            id="email"
            name="email"
            type="email"
            placeholder="hr@company.com"
            required
          />
          <InputFieldError field="email" state={state} />
        </div>

        {/* Password */}
        <div className="space-y-2">
          <Label htmlFor="password">Password *</Label>
          <Input
            id="password"
            name="password"
            type="password"
            placeholder="••••••••"
            required
          />
          <InputFieldError field="password" state={state} />
        </div>

        {/* Confirm Password */}
        <div className="space-y-2">
          <Label htmlFor="confirmPassword">Confirm Password *</Label>
          <Input
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            placeholder="••••••••"
            required
          />
          <InputFieldError field="confirmPassword" state={state} />
        </div>

        {/* Company Name */}
        <div className="space-y-2 md:col-span-2">
          <Label htmlFor="companyName">Company Name *</Label>
          <Input
            id="companyName"
            name="companyName"
            placeholder="ABC Solutions Ltd."
            required
          />
          <InputFieldError field="companyName" state={state} />
        </div>

        {/* Company Website */}
        <div className="space-y-2">
          <Label htmlFor="companyWebsite">Company Website</Label>
          <Input
            id="companyWebsite"
            name="companyWebsite"
            type="url"
            placeholder="https://www.company.com"
          />
          <InputFieldError field="companyWebsite" state={state} />
        </div>

        {/* Designation */}
        <div className="space-y-2">
          <Label htmlFor="designation">Your Designation</Label>
          <Input
            id="designation"
            name="designation"
            placeholder="HR Manager / Founder"
          />
          <InputFieldError field="designation" state={state} />
        </div>
      </div>

      {/* Company Description */}
      <div className="space-y-2">
        <Label htmlFor="companyDescription">Company Description</Label>
        <Textarea
          id="companyDescription"
          name="companyDescription"
          placeholder="Tell us about your company..."
          rows={4}
        />
        <InputFieldError field="companyDescription" state={state} />
      </div>

      {/* Company Logo */}
      <div className="space-y-2">
        <Label htmlFor="file">Company Logo (optional)</Label>
        <Input
          id="file"
          name="file"
          type="file"
          accept="image/png, image/jpeg, image/webp"
        />
        <InputFieldError field="file" state={state} />
      </div>

      <div className="pt-4">
        <Button type="submit" className="w-full" disabled={isPending} size="lg">
          {isPending ? "Creating account..." : "Register Employer Account"}
        </Button>
      </div>
    </form>
  );
};

export default EmployerRegisterForm;
