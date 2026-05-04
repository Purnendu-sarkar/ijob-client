"use client";

import InputFieldError from "@/components/shared/InputFieldError";
import { Button } from "@/components/ui/button";
import { Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { createJob } from "@/services/employer/jobs";
import { useActionState, useEffect, useRef } from "react";
import { toast } from "sonner";

const CreateJobForm = () => {
  const formRef = useRef<HTMLFormElement>(null);
  const [state, formAction, isPending] = useActionState(createJob, null);

  useEffect(() => {
    if (!state) return;

    if (state?.success) {
      toast.success(state?.message || "Job posted successfully!");
      formRef.current?.reset();
    } else if (state?.message) {
      toast.error(state.message);
    }
  }, [state]);

  return (
    <form ref={formRef} action={formAction} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <Field className="md:col-span-2">
          <FieldLabel htmlFor="title">Job Title *</FieldLabel>
          <Input
            id="title"
            name="title"
            placeholder="Junior Frontend Developer (React/Next.js)"
            required
          />
          <InputFieldError field="title" state={state} />
        </Field>

        <Field>
          <FieldLabel htmlFor="employmentType">Employment Type *</FieldLabel>
          <select
            id="employmentType"
            name="employmentType"
            required
            defaultValue=""
            className="h-10 w-full rounded-md border border-input bg-background px-3 text-sm"
          >
            <option value="" disabled>
              Select type
            </option>
            <option value="Full Time">Full Time</option>
            <option value="Part Time">Part Time</option>
            <option value="Contract">Contract</option>
            <option value="Internship">Internship</option>
            <option value="Freelance">Freelance</option>
          </select>
          <InputFieldError field="employmentType" state={state} />
        </Field>

        <Field>
          <FieldLabel htmlFor="workplaceType">Workplace Type *</FieldLabel>
          <select
            id="workplaceType"
            name="workplaceType"
            required
            defaultValue=""
            className="h-10 w-full rounded-md border border-input bg-background px-3 text-sm"
          >
            <option value="" disabled>
              Select type
            </option>
            <option value="Onsite">Onsite</option>
            <option value="Hybrid">Hybrid</option>
            <option value="Remote">Remote</option>
          </select>
          <InputFieldError field="workplaceType" state={state} />
        </Field>
      </div>

      <Field>
        <FieldLabel htmlFor="description">Job Description *</FieldLabel>
        <Textarea
          id="description"
          name="description"
          placeholder="Write a clear job description, requirements, and benefits..."
          rows={8}
          required
        />
        <InputFieldError field="description" state={state} />
      </Field>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <Field>
          <FieldLabel htmlFor="experienceMin">Experience Min (years)</FieldLabel>
          <Input id="experienceMin" name="experienceMin" type="number" min={0} />
          <InputFieldError field="experienceMin" state={state} />
        </Field>
        <Field>
          <FieldLabel htmlFor="experienceMax">Experience Max (years)</FieldLabel>
          <Input id="experienceMax" name="experienceMax" type="number" min={0} />
          <InputFieldError field="experienceMax" state={state} />
        </Field>
        <Field>
          <FieldLabel htmlFor="vacancies">Vacancies</FieldLabel>
          <Input id="vacancies" name="vacancies" type="number" min={1} defaultValue={1} />
          <InputFieldError field="vacancies" state={state} />
        </Field>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <Field>
          <FieldLabel htmlFor="salaryMin">Salary Min</FieldLabel>
          <Input id="salaryMin" name="salaryMin" type="number" min={0} />
          <InputFieldError field="salaryMin" state={state} />
        </Field>
        <Field>
          <FieldLabel htmlFor="salaryMax">Salary Max</FieldLabel>
          <Input id="salaryMax" name="salaryMax" type="number" min={0} />
          <InputFieldError field="salaryMax" state={state} />
        </Field>
        <Field>
          <FieldLabel htmlFor="currency">Currency</FieldLabel>
          <Input id="currency" name="currency" defaultValue="BDT" />
          <InputFieldError field="currency" state={state} />
        </Field>
      </div>


      <Field className="max-w-sm">
        <FieldLabel htmlFor="applicationDeadline">Application Deadline</FieldLabel>
        {/** Compute today's date in YYYY-MM-DD format, stable for SSR hydration */}
        {(() => {
          const today = new Date();
          const yyyy = today.getFullYear();
          const mm = String(today.getMonth() + 1).padStart(2, '0');
          const dd = String(today.getDate()).padStart(2, '0');
          const minDate = `${yyyy}-${mm}-${dd}`;
          return (
            <Input id="applicationDeadline" name="applicationDeadline" type="date" min={minDate} />
          );
        })()}
        <InputFieldError field="applicationDeadline" state={state} />
      </Field>

      <div className="flex justify-end gap-3">
        <Button type="submit" disabled={isPending}>
          {isPending ? "Posting..." : "Post Job"}
        </Button>
      </div>
    </form>
  );
};

export default CreateJobForm;

