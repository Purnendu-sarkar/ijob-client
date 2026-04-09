"use client";

import { DateCell } from "@/components/shared/cell/DateCell";
import { StatusBadgeCell } from "@/components/shared/cell/StatusBadgeCell";
import { UserInfoCell } from "@/components/shared/cell/UserInfoCell";
import { Column } from "@/components/shared/ManagementTable";
import { IModerator } from "@/types/moderator.interface";

export const moderatorsColumns: Column<IModerator>[] = [
  {
    header: "Moderator",
    accessor: (mod) => (
      <UserInfoCell
        fullName={mod.name}
        email={mod.email}
        photo={mod.profilePhoto}
      />
    ),
    sortKey: "name",
  },
  {
    header: "Contact",
    accessor: (mod) => (
      <span className="text-sm font-medium">{mod.phone || "—"}</span>
    ),
  },
  {
    header: "Regions",
    accessor: (mod) => (
      <div className="flex flex-wrap gap-1">
        {mod.assignedRegions.length > 0
          ? mod.assignedRegions.map((region) => (
              <span
                key={region}
                className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded"
              >
                {region}
              </span>
            ))
          : "—"}
      </div>
    ),
  },
  {
    header: "Status",
    accessor: (mod) => <StatusBadgeCell isDeleted={mod.isDeleted} />,
  },
  {
    header: "Joined",
    accessor: (mod) => <DateCell date={mod.createdAt} />,
    sortKey: "createdAt",
  },
];
