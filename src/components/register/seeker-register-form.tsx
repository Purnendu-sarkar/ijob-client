"use client";

import { useActionState, useEffect } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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
    <form action={formAction} className="space-y-5">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Full Name */}
        <div className="space-y-2">
          <Label htmlFor="fullName">Full Name *</Label>
          <Input id="fullName" name="fullName" placeholder="Md. Rahim Khan" />
          <InputFieldError field="fullName" state={state} />
        </div>

        {/* Email */}
        <div className="space-y-2">
          <Label htmlFor="email">Email *</Label>
          <Input
            id="email"
            name="email"
            type="email"
            placeholder="rahim@example.com"
          />
          <InputFieldError field="email" state={state} />
        </div>

        {/* Phone (optional) */}
        <div className="space-y-2">
          <Label htmlFor="phone">Phone Number</Label>
          <Input id="phone" name="phone" placeholder="01XXXXXXXXX" />
          <InputFieldError field="phone" state={state} />
        </div>

        {/* Password */}
        <div className="space-y-2">
          <Label htmlFor="password">Password *</Label>
          <Input id="password" name="password" type="password" />
          <InputFieldError field="password" state={state} />
        </div>
      </div>

      {/* More fields  — dateOfBirth, gender etc */}

      <Button type="submit" className="w-full" disabled={isPending}>
        {isPending ? "Creating Account..." : "Register as Job Seeker"}
      </Button>
    </form>
  );
};

export default SeekerRegisterForm;
