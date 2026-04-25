"use client";

import { DateCell } from "@/components/shared/cell/DateCell";
import { StatusBadgeCell } from "@/components/shared/cell/StatusBadgeCell";
import { UserInfoCell } from "@/components/shared/cell/UserInfoCell";
import { Column } from "@/components/shared/ManagementTable";
import { Badge } from "@/components/ui/badge";
import { IJobSeeker } from "@/types/jobSeeker.interface";

export const jobSeekersColumns: Column<IJobSeeker>[] = [
  {
    header: "Job Seeker",
    accessor: (seeker) => (
      <UserInfoCell
        fullName={seeker.name}
        email={seeker.email}
        photo={seeker.profilePhoto}
      />
    ),
    sortKey: "name",
  },
  {
    header: "Contact",
    accessor: (seeker) => (
      <span className="text-sm font-medium">{seeker.phone || "-"}</span>
    ),
  },
  {
    header: "Experience",
    accessor: (seeker) => (
      <span className="text-sm">
        {seeker.experienceYears ? `${seeker.experienceYears} years` : "-"}
      </span>
    ),
    sortKey: "experienceYears",
  },
  {
    header: "Expected Salary",
    accessor: (seeker) => (
      <span className="text-sm font-medium text-emerald-600">
        {seeker.expectedSalaryRange || "-"}
      </span>
    ),
  },
  {
    header: "Verification",
    accessor: (seeker) => (
      <Badge
        variant={seeker.isProfileVerified ? "default" : "secondary"}
        className={
          seeker.isProfileVerified ? "bg-emerald-100 text-emerald-700" : ""
        }
      >
        {seeker.isProfileVerified ? "Verified" : "Pending"}
      </Badge>
    ),
  },
  {
    header: "Profile",
    accessor: (seeker) => (
      <div className="text-sm">{seeker.profileCompletion}%</div>
    ),
  },
  {
    header: "Status",
    accessor: (seeker) => <StatusBadgeCell isDeleted={seeker.isDeleted} />,
  },
  {
    header: "Joined",
    accessor: (seeker) => <DateCell date={seeker.createdAt} />,
    sortKey: "createdAt",
  },
];
