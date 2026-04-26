"use client";

import { DateCell } from "@/components/shared/cell/DateCell";
import { StatusBadgeCell } from "@/components/shared/cell/StatusBadgeCell";
import { UserInfoCell } from "@/components/shared/cell/UserInfoCell";
import { Column } from "@/components/shared/ManagementTable";
import { Badge } from "@/components/ui/badge";
import { IEmployer } from "@/types/employer.interface";

const getCompanyVerificationBadgeClass = (
  status: IEmployer["companyVerificationStatus"],
) => {
  if (status === "VERIFIED") return "bg-emerald-100 text-emerald-700";
  if (status === "REJECTED") return "bg-rose-100 text-rose-700";
  return "bg-amber-100 text-amber-700";
};

export const employersColumns: Column<IEmployer>[] = [
  {
    header: "Employer",
    accessor: (employer) => (
      <UserInfoCell
        fullName={employer.name}
        email={employer.email}
        photo={employer.profilePhoto}
      />
    ),
    sortKey: "name",
  },
  {
    header: "Contact",
    accessor: (employer) => (
      <span className="text-sm font-medium">{employer.phone || "-"}</span>
    ),
  },
  {
    header: "Company",
    accessor: (employer) => (
      <div className="space-y-1">
        <p className="font-medium">{employer.company.name}</p>
        <p className="text-xs text-muted-foreground">
          {employer.company.website || employer.company.slug}
        </p>
      </div>
    ),
    sortKey: "companyName",
  },
  {
    header: "Designation",
    accessor: (employer) => (
      <span className="text-sm">{employer.designation || "-"}</span>
    ),
  },
  {
    header: "Company Verification",
    accessor: (employer) => (
      <Badge
        variant="secondary"
        className={getCompanyVerificationBadgeClass(
          employer.companyVerificationStatus,
        )}
      >
        {employer.companyVerificationStatus}
      </Badge>
    ),
    sortKey: "companyVerificationStatus",
  },
  {
    header: "Status",
    accessor: (employer) => <StatusBadgeCell isDeleted={employer.isDeleted} />,
  },
  {
    header: "Joined",
    accessor: (employer) => <DateCell date={employer.createdAt} />,
    sortKey: "createdAt",
  },
];
