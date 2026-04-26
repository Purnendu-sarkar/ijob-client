"use client";

import InfoRow from "@/components/shared/InoRow";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { formatDateTime, getInitials } from "@/lib/formatters";
import { IEmployer } from "@/types/employer.interface";
import {
  Building2,
  Calendar,
  Globe,
  Mail,
  MapPin,
  Phone,
  User,
} from "lucide-react";

interface Props {
  open: boolean;
  onClose: () => void;
  employer: IEmployer | null;
}

const EmployerViewDetailDialog = ({ open, onClose, employer }: Props) => {
  if (!employer) return null;

  const companyBadgeVariant =
    employer.companyVerificationStatus === "VERIFIED"
      ? "default"
      : employer.companyVerificationStatus === "REJECTED"
        ? "destructive"
        : "secondary";

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-h-[90vh] flex flex-col p-0 sm:max-w-3xl">
        <DialogHeader className="px-6 pt-6 pb-4">
          <DialogTitle>Employer Profile Details</DialogTitle>
        </DialogHeader>

        <div className="flex-1 overflow-y-auto px-6 pb-6">
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 p-6 bg-linear-to-br from-blue-50 to-indigo-50 dark:from-blue-950 dark:to-indigo-950 rounded-xl mb-6">
            <Avatar className="h-28 w-28 border-4 border-white shadow-lg">
              <AvatarImage
                src={employer.profilePhoto || ""}
                alt={employer.name}
              />
              <AvatarFallback className="text-3xl">
                {getInitials(employer.name)}
              </AvatarFallback>
            </Avatar>

            <div className="flex-1 text-center sm:text-left">
              <h2 className="text-3xl font-bold mb-1">{employer.name}</h2>
              <p className="text-muted-foreground mb-3 flex items-center justify-center sm:justify-start gap-2">
                <Mail className="h-4 w-4" />
                {employer.email}
              </p>

              <div className="flex flex-wrap gap-2 justify-center sm:justify-start">
                <Badge
                  variant={companyBadgeVariant as "default" | "secondary" | "destructive"}
                >
                  {employer.companyVerificationStatus}
                </Badge>
                <Badge variant="outline">
                  {employer.designation || "No designation"}
                </Badge>
                {employer.isDeleted && (
                  <Badge variant="destructive">Deleted</Badge>
                )}
              </div>
            </div>
          </div>

          <div className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-muted/50 p-5 rounded-xl">
                <div className="flex items-center gap-2 mb-3">
                  <Building2 className="h-5 w-5 text-blue-600" />
                  <h3 className="font-semibold">Company</h3>
                </div>
                <p className="text-xl font-semibold">{employer.company.name}</p>
              </div>

              <div className="bg-muted/50 p-5 rounded-xl">
                <div className="flex items-center gap-2 mb-3">
                  <Globe className="h-5 w-5 text-emerald-600" />
                  <h3 className="font-semibold">Website</h3>
                </div>
                <p className="text-sm font-medium break-all">
                  {employer.company.website || "Not Set"}
                </p>
              </div>

              <div className="bg-muted/50 p-5 rounded-xl">
                <div className="flex items-center gap-2 mb-3">
                  <User className="h-5 w-5 text-amber-600" />
                  <h3 className="font-semibold">Designation</h3>
                </div>
                <p className="text-xl font-medium">
                  {employer.designation || "Not Specified"}
                </p>
              </div>
            </div>

            {employer.company.description && (
              <div>
                <h3 className="font-semibold text-lg mb-3 flex items-center gap-2">
                  <Building2 className="h-5 w-5" /> Company Description
                </h3>
                <div className="bg-muted/50 p-5 rounded-xl text-sm leading-relaxed">
                  {employer.company.description}
                </div>
              </div>
            )}

            <Separator />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold mb-3 flex items-center gap-2">
                  Company Profile
                </h3>
                <div className="flex flex-wrap gap-2">
                  <Badge variant={companyBadgeVariant as "default" | "secondary" | "destructive"}>
                    {employer.companyVerificationStatus}
                  </Badge>
                  <Badge variant="outline">{employer.company.slug}</Badge>
                </div>
              </div>

              <div>
                <h3 className="font-semibold mb-3 flex items-center gap-2">
                  <MapPin className="h-5 w-5" /> Company Address
                </h3>
                <div className="bg-muted/50 p-5 rounded-xl text-sm leading-relaxed">
                  {employer.company.address || "Not provided"}
                </div>
              </div>
            </div>

            <Separator />

            <div>
              <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
                Account Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-muted/50 p-5 rounded-xl">
                <InfoRow label="Email" value={employer.email} icon={Mail} />
                <InfoRow
                  label="Phone"
                  value={employer.phone || "Not provided"}
                  icon={Phone}
                />
                <InfoRow
                  label="Joined On"
                  value={formatDateTime(employer.createdAt)}
                  icon={Calendar}
                />
                <InfoRow
                  label="Last Updated"
                  value={formatDateTime(employer.updatedAt)}
                  icon={Calendar}
                />
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default EmployerViewDetailDialog;

