"use client";

import ClearFiltersButton from "@/components/shared/ClearFiltersButton";
import RefreshButton from "@/components/shared/RefreshButton";
import SearchFilter from "@/components/shared/SearchFilter";

const ModeratorsFilter = () => {
  return (
    <div className="space-y-3">
      {/* Row 1: Search and Refresh */}
      <div className="flex items-center gap-3">
        <SearchFilter
          paramName="searchTerm"
          placeholder="Search moderators..."
        />
        <RefreshButton />
      </div>

      {/* Row 2: Filter Controls */}
      <div className="flex items-center gap-3">
        <SearchFilter paramName="email" placeholder="Email" />
        <SearchFilter paramName="phone" placeholder="Contact" />
        <ClearFiltersButton />
      </div>
    </div>
  );
};

export default ModeratorsFilter;
