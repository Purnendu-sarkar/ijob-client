"use client";

import { useActionState, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { CheckCircle2, Mail, Phone, ShieldCheck } from "lucide-react";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import InputFieldError from "@/components/shared/InputFieldError";
import {
  confirmContactVerification,
  requestContactVerification,
} from "@/services/auth/auth.service";

type ContactOption = {
  identifier: string;
  channel: "EMAIL" | "SMS";
  label: string;
  helper: string;
  icon: "email" | "phone";
  verified: boolean;
};

type Props = {
  email?: string | null;
  phone?: string | null;
  emailVerifiedAt?: string | null;
  phoneVerifiedAt?: string | null;
};

const ContactVerificationPanel = ({
  email,
  phone,
  emailVerifiedAt,
  phoneVerifiedAt,
}: Props) => {
  const router = useRouter();
  const [requestState, requestAction, isRequestPending] = useActionState(
    requestContactVerification,
    null,
  );
  const [confirmState, confirmAction, isConfirmPending] = useActionState(
    confirmContactVerification,
    null,
  );

  const options = useMemo<ContactOption[]>(() => {
    const nextOptions: ContactOption[] = [];

    if (email) {
      nextOptions.push({
        identifier: email,
        channel: "EMAIL",
        label: email,
        helper: "Email verification",
        icon: "email",
        verified: Boolean(emailVerifiedAt),
      });
    }

    if (phone) {
      nextOptions.push({
        identifier: phone,
        channel: "SMS",
        label: phone,
        helper: "Phone verification",
        icon: "phone",
        verified: Boolean(phoneVerifiedAt),
      });
    }

    return nextOptions;
  }, [email, emailVerifiedAt, phone, phoneVerifiedAt]);

  const [selectedIdentifier, setSelectedIdentifier] = useState(
    options.find((option) => !option.verified)?.identifier || options[0]?.identifier || "",
  );

  // Adjust state during render if options change and current selection is invalid
  // This avoids the 'set-state-in-effect' warning and is a recommended React pattern
  if (selectedIdentifier && !options.some(o => o.identifier === selectedIdentifier) && options[0]) {
    setSelectedIdentifier(options[0].identifier);
  } else if (!selectedIdentifier && options[0]) {
    setSelectedIdentifier(options[0].identifier);
  }

  const selectedOption =
    options.find((option) => option.identifier === selectedIdentifier) || options[0];

  useEffect(() => {
    if (requestState?.success) {
      const debugCode = requestState?.data?.debugCode;
      toast.success(
        debugCode
          ? `Verification code sent. Development code: ${debugCode}`
          : requestState.message || "Verification code sent.",
      );
    } else if (requestState?.message) {
      toast.error(requestState.message);
    }
  }, [requestState]);

  useEffect(() => {
    if (confirmState?.success) {
      toast.success("Contact verified successfully.");
      router.refresh();
    } else if (confirmState?.message) {
      toast.error(confirmState.message);
    }
  }, [confirmState, router]);

  if (!selectedOption) {
    return (
      <Card className="mx-auto max-w-xl">
        <CardHeader>
          <CardTitle>Verify contact</CardTitle>
          <CardDescription>
            Add an email or phone number to your profile before verification.
          </CardDescription>
        </CardHeader>
      </Card>
    );
  }

  return (
    <Card className="mx-auto max-w-2xl">
      <CardHeader className="space-y-3">
        <div className="flex size-11 items-center justify-center rounded-full bg-primary/10 text-primary">
          <ShieldCheck className="size-5" />
        </div>
        <div>
          <CardTitle>Verify your contact</CardTitle>
          <CardDescription>
            Confirm your contact before using the dashboard.
          </CardDescription>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid gap-3 sm:grid-cols-2">
          {options.map((option) => {
            const Icon = option.icon === "email" ? Mail : Phone;
            const isSelected = selectedIdentifier === option.identifier;

            return (
              <button
                type="button"
                key={`${option.channel}-${option.identifier}`}
                onClick={() => setSelectedIdentifier(option.identifier)}
                className={`flex items-center gap-3 rounded-md border p-3 text-left transition ${
                  isSelected ? "border-primary bg-primary/5" : "hover:bg-muted/60"
                }`}
              >
                <Icon className="size-4 text-muted-foreground" />
                <span className="min-w-0 flex-1">
                  <span className="block truncate text-sm font-medium">{option.label}</span>
                  <span className="block text-xs text-muted-foreground">{option.helper}</span>
                </span>
                {option.verified ? (
                  <Badge variant="secondary" className="gap-1">
                    <CheckCircle2 className="size-3" />
                    Verified
                  </Badge>
                ) : null}
              </button>
            );
          })}
        </div>

        <form action={requestAction}>
          <input type="hidden" name="identifier" value={selectedOption.identifier} />
          <input type="hidden" name="channel" value={selectedOption.channel} />
          <Button type="submit" variant="outline" disabled={isRequestPending}>
            {isRequestPending ? "Sending..." : "Send verification code"}
          </Button>
        </form>

        <form action={confirmAction} className="space-y-4">
          <input type="hidden" name="identifier" value={selectedOption.identifier} />
          <input type="hidden" name="channel" value={selectedOption.channel} />
          <div className="space-y-2">
            <Label htmlFor="verification-code">Verification code</Label>
            <Input
              id="verification-code"
              name="code"
              inputMode="numeric"
              maxLength={6}
              placeholder="123456"
              autoComplete="one-time-code"
              required
            />
            <InputFieldError field="code" state={confirmState} />
          </div>
          <Button type="submit" disabled={isConfirmPending}>
            {isConfirmPending ? "Verifying..." : "Verify contact"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default ContactVerificationPanel;
