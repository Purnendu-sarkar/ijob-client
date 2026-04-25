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
import { IJobSeeker } from "@/types/jobSeeker.interface";
import {
  Calendar,
  Mail,
  Phone,
  User,
  MapPin,
  Award,
  Briefcase,
} from "lucide-react";

interface Props {
  open: boolean;
  onClose: () => void;
  jobSeeker: IJobSeeker | null;
}

const JobSeekerViewDetailDialog = ({ open, onClose, jobSeeker }: Props) => {
  if (!jobSeeker) return null;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="min-w-225 max-h-[90vh] flex flex-col p-0">
        <DialogHeader className="px-6 pt-6 pb-4">
          <DialogTitle>Job Seeker Profile Details</DialogTitle>
        </DialogHeader>

        <div className="flex-1 overflow-y-auto px-6 pb-6">
          {/* Header Section */}
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 p-6 bg-linear-to-br from-blue-50 to-indigo-50 dark:from-blue-950 dark:to-indigo-950 rounded-xl mb-6">
            <Avatar className="h-28 w-28 border-4 border-white shadow-lg">
              <AvatarImage
                src={jobSeeker.profilePhoto || ""}
                alt={jobSeeker.name}
              />
              <AvatarFallback className="text-3xl">
                {getInitials(jobSeeker.name)}
              </AvatarFallback>
            </Avatar>

            <div className="flex-1 text-center sm:text-left">
              <h2 className="text-3xl font-bold mb-1">{jobSeeker.name}</h2>
              <p className="text-muted-foreground mb-3 flex items-center justify-center sm:justify-start gap-2">
                <Mail className="h-4 w-4" />
                {jobSeeker.email}
              </p>

              <div className="flex flex-wrap gap-2 justify-center sm:justify-start">
                <Badge
                  variant={
                    jobSeeker.isProfileVerified ? "default" : "secondary"
                  }
                >
                  {jobSeeker.isProfileVerified
                    ? "✓ Verified Profile"
                    : "Pending Verification"}
                </Badge>
                <Badge variant="outline">
                  {jobSeeker.experienceYears || 0} Years Experience
                </Badge>
                {jobSeeker.isDeleted && (
                  <Badge variant="destructive">Deleted</Badge>
                )}
              </div>
            </div>
          </div>

          <div className="space-y-8">
            {/* Salary & Preferences */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-muted/50 p-5 rounded-xl">
                <div className="flex items-center gap-2 mb-3">
                  <Briefcase className="h-5 w-5 text-emerald-600" />
                  <h3 className="font-semibold">Expected Salary</h3>
                </div>
                <p className="text-2xl font-semibold text-emerald-600">
                  {jobSeeker.expectedSalaryRange || "Not Set"}
                </p>
              </div>

              <div className="bg-muted/50 p-5 rounded-xl">
                <div className="flex items-center gap-2 mb-3">
                  <Award className="h-5 w-5 text-amber-600" />
                  <h3 className="font-semibold">Profile Completion</h3>
                </div>
                <p className="text-3xl font-bold">
                  {jobSeeker.profileCompletion}%
                </p>
              </div>

              <div className="bg-muted/50 p-5 rounded-xl">
                <div className="flex items-center gap-2 mb-3">
                  <User className="h-5 w-5 text-blue-600" />
                  <h3 className="font-semibold">Gender</h3>
                </div>
                <p className="text-xl font-medium">
                  {jobSeeker.gender || "Not Specified"}
                </p>
              </div>
            </div>

            {/* About */}
            {jobSeeker.about && (
              <div>
                <h3 className="font-semibold text-lg mb-3 flex items-center gap-2">
                  <User className="h-5 w-5" /> About
                </h3>
                <div className="bg-muted/50 p-5 rounded-xl text-sm leading-relaxed">
                  {jobSeeker.about}
                </div>
              </div>
            )}

            <Separator />

            {/* Preferences */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold mb-3 flex items-center gap-2">
                  Preferred Job Types
                </h3>
                <div className="flex flex-wrap gap-2">
                  {jobSeeker.preferredJobTypes.length > 0 ? (
                    jobSeeker.preferredJobTypes.map((type, index) => (
                      <Badge key={index} variant="secondary">
                        {type}
                      </Badge>
                    ))
                  ) : (
                    <p className="text-muted-foreground">No preferences set</p>
                  )}
                </div>
              </div>

              <div>
                <h3 className="font-semibold mb-3 flex items-center gap-2">
                  <MapPin className="h-5 w-5" /> Preferred Locations
                </h3>
                <div className="flex flex-wrap gap-2">
                  {jobSeeker.preferredLocations.length > 0 ? (
                    jobSeeker.preferredLocations.map((loc, index) => (
                      <Badge key={index} variant="outline">
                        {loc}
                      </Badge>
                    ))
                  ) : (
                    <p className="text-muted-foreground">No locations set</p>
                  )}
                </div>
              </div>
            </div>

            <Separator />

            {/* Account Info */}
            <div>
              <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
                Account Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-muted/50 p-5 rounded-xl">
                <InfoRow label="Email" value={jobSeeker.email} icon={Mail} />
                <InfoRow
                  label="Phone"
                  value={jobSeeker.phone || "Not provided"}
                  icon={Phone}
                />
                <InfoRow
                  label="Joined On"
                  value={formatDateTime(jobSeeker.createdAt)}
                  icon={Calendar}
                />
                <InfoRow
                  label="Last Updated"
                  value={formatDateTime(jobSeeker.updatedAt)}
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

export default JobSeekerViewDetailDialog;
