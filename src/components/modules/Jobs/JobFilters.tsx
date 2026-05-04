"use client";

import ClearFiltersButton from "@/components/shared/ClearFiltersButton";
import SearchFilter from "@/components/shared/SearchFilter";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { SlidersHorizontal } from "lucide-react";

const employmentTypeOptions = [
  { label: "All job types", value: "" },
  { label: "Full Time", value: "Full Time" },
  { label: "Part Time", value: "Part Time" },
  { label: "Contract", value: "Contract" },
  { label: "Internship", value: "Internship" },
  { label: "Freelance", value: "Freelance" },
];

const workplaceTypeOptions = [
  { label: "Any workplace", value: "" },
  { label: "Onsite", value: "Onsite" },
  { label: "Hybrid", value: "Hybrid" },
  { label: "Remote", value: "Remote" },
];

const postedWithinOptions = [
  { label: "Any posted date", value: "" },
  { label: "Last 24 hours", value: "1" },
  { label: "Last 7 days", value: "7" },
  { label: "Last 30 days", value: "30" },
];

const JobFiltersContent = () => (
  <div className="space-y-5">
    <div>
      <h2 className="text-lg font-semibold">Filter Jobs</h2>
      <p className="text-sm text-muted-foreground">
        Narrow jobs by role, company, salary, and experience.
      </p>
    </div>

    <div className="space-y-3">
      <SearchFilter paramName="id" placeholder="Search title, company, keyword..." />
      <SearchFilter paramName="companyName" placeholder="Company name" />
    </div>

    <div className="grid grid-cols-1 gap-3">
      <SearchFilter
        paramName="employmentType"
        type="select"
        options={employmentTypeOptions}
      />
      <SearchFilter
        paramName="workplaceType"
        type="select"
        options={workplaceTypeOptions}
      />
      <SearchFilter
        paramName="postedWithin"
        type="select"
        options={postedWithinOptions}
      />
    </div>

    <div className="space-y-2">
      <p className="text-sm font-medium">Experience Range</p>
      <div className="grid grid-cols-2 gap-2">
        <SearchFilter paramName="experienceMin" placeholder="Min years" />
        <SearchFilter paramName="experienceMax" placeholder="Max years" />
      </div>
    </div>

    <div className="space-y-2">
      <p className="text-sm font-medium">Salary Range</p>
      <div className="grid grid-cols-2 gap-2">
        <SearchFilter paramName="salaryMin" placeholder="Min BDT" />
        <SearchFilter paramName="salaryMax" placeholder="Max BDT" />
      </div>
    </div>

    <ClearFiltersButton className="w-full" label="Clear filters" />
  </div>
);

export const DesktopJobFilters = () => {
  return (
    <aside className="hidden lg:block">
      <div className="sticky top-24 rounded-2xl border bg-card p-5 shadow-sm">
        <JobFiltersContent />
      </div>
    </aside>
  );
};

export const MobileJobFilters = () => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" className="lg:hidden">
          <SlidersHorizontal className="h-4 w-4" />
          Filters
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-[320px] overflow-y-auto p-5">
        <SheetHeader className="sr-only">
          <SheetTitle>Job filters</SheetTitle>
        </SheetHeader>
        <JobFiltersContent />
      </SheetContent>
    </Sheet>
  );
};
