"use client";

import ClearFiltersButton from "@/components/shared/ClearFiltersButton";
import RefreshButton from "@/components/shared/RefreshButton";
import SearchFilter from "@/components/shared/SearchFilter";

const JobSeekersFilter = () => {
  return (
    <div className="space-y-3 rounded-xl border bg-card p-4">
      <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
        <SearchFilter
          paramName="searchTerm"
          placeholder="Search by name, email or phone..."
          className="flex-1 min-w-0"
        />
        <RefreshButton />
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <SearchFilter paramName="email" placeholder="Email" />
        <SearchFilter paramName="phone" placeholder="Phone" />
        <SearchFilter
          paramName="gender"
          placeholder="Gender"
          type="select"
          options={[
            { label: "All Gender", value: "" },
            { label: "Male", value: "MALE" },
            { label: "Female", value: "FEMALE" },
            { label: "Other", value: "OTHER" },
          ]}
        />
        <SearchFilter
          paramName="isProfileVerified"
          placeholder="Verification Status"
          type="select"
          options={[
            { label: "All Profiles", value: "" },
            { label: "Verified Only", value: "true" },
            { label: "Unverified", value: "false" },
          ]}
        />
        <ClearFiltersButton />
      </div>
    </div>
  );
};

export default JobSeekersFilter;
