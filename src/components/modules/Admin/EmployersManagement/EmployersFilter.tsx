"use client";

import ClearFiltersButton from "@/components/shared/ClearFiltersButton";
import RefreshButton from "@/components/shared/RefreshButton";
import SearchFilter from "@/components/shared/SearchFilter";

const EmployersFilter = () => {
  return (
    <div className="space-y-3">
      <div className="flex items-center gap-3">
        <SearchFilter
          paramName="searchTerm"
          placeholder="Search by name, email, phone or company..."
          className="flex-1"
        />
        <RefreshButton />
      </div>

      <div className="flex items-center gap-3 flex-wrap">
        <SearchFilter paramName="email" placeholder="Email" />
        <SearchFilter paramName="phone" placeholder="Phone" />
        <SearchFilter paramName="companyName" placeholder="Company" />
        <SearchFilter
          paramName="companyVerificationStatus"
          placeholder="Company Verification"
          type="select"
          options={[
            { label: "All Status", value: "" },
            { label: "Pending", value: "PENDING" },
            { label: "Verified", value: "VERIFIED" },
            { label: "Rejected", value: "REJECTED" },
          ]}
        />
        <ClearFiltersButton />
      </div>
    </div>
  );
};

export default EmployersFilter;
