"use client";

import { useActionState, useEffect } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import InputFieldError from "@/components/shared/InputFieldError";
import { registerJobSeeker } from "@/services/auth/registerJobSeeker";

const SeekerRegisterForm = () => {
  const [state, formAction, isPending] = useActionState(
    registerJobSeeker,
    null,
  );

  useEffect(() => {
    if (state?.success === false && state?.message) {
      toast.error(state.message);
    }
    if (state?.success) {
      toast.success("Account created! Redirecting...");
    }
  }, [state]);

  return (
    <form action={formAction} className="space-y-6">
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="seeker-fullName">Full Name *</Label>
          <Input
            id="seeker-fullName"
            name="fullName"
            placeholder="Md. Rahim Khan"
            required
          />
          <InputFieldError field="fullName" state={state} />
        </div>

        <div className="space-y-2">
          <Label htmlFor="seeker-phone">Phone Number</Label>
          <Input
            id="seeker-phone"
            name="phone"
            placeholder="01XXXXXXXXX"
            inputMode="tel"
          />
          <InputFieldError field="phone" state={state} />
        </div>

        <div className="space-y-2">
          <Label htmlFor="seeker-email">Email</Label>
          <Input
            id="seeker-email"
            name="email"
            type="email"
            placeholder="rahim@example.com"
          />
          <InputFieldError field="email" state={state} />
        </div>

        <div className="space-y-2">
          <Label htmlFor="seeker-experienceYears">Experience Years</Label>
          <Input
            id="seeker-experienceYears"
            name="experienceYears"
            type="number"
            min="0"
            placeholder="0"
          />
          <InputFieldError field="experienceYears" state={state} />
        </div>

        <div className="space-y-2">
          <Label htmlFor="seeker-password">Password *</Label>
          <Input
            id="seeker-password"
            name="password"
            type="password"
            required
          />
          <InputFieldError field="password" state={state} />
        </div>

        <div className="space-y-2">
          <Label htmlFor="seeker-confirmPassword">Confirm Password *</Label>
          <Input
            id="seeker-confirmPassword"
            name="confirmPassword"
            type="password"
            required
          />
          <InputFieldError field="confirmPassword" state={state} />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="seeker-skills">Skills</Label>
          <Input
            id="seeker-skills"
            name="skills"
            placeholder="Sales, Excel, Customer Support"
          />
          <InputFieldError field="skills" state={state} />
        </div>

        <div className="space-y-2">
          <Label htmlFor="seeker-preferredLocations">Preferred Locations</Label>
          <Input
            id="seeker-preferredLocations"
            name="preferredLocations"
            placeholder="Dhaka, Gazipur, Remote"
          />
          <InputFieldError field="preferredLocations" state={state} />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="seeker-education">Education</Label>
        <Textarea
          id="seeker-education"
          name="education"
          rows={3}
          placeholder="BBA, National University"
        />
        <InputFieldError field="education" state={state} />
      </div>

      <div className="space-y-2">
        <Label htmlFor="seeker-resumeFile">CV / Resume</Label>
        <Input
          id="seeker-resumeFile"
          name="resumeFile"
          type="file"
          accept="application/pdf,image/png,image/jpeg,image/webp"
        />
        <InputFieldError field="resumeFile" state={state} />
      </div>

      <Button type="submit" className="w-full" disabled={isPending} size="lg">
        {isPending ? "Creating account..." : "Register as Job Seeker"}
      </Button>
    </form>
  );
};

export default SeekerRegisterForm;
