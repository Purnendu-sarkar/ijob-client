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
import { IModerator } from "@/types/moderator.interface";
import { Calendar, Mail, Phone, Shield, User, MapPin } from "lucide-react";

interface Props {
  open: boolean;
  onClose: () => void;
  moderator: IModerator | null;
}

const ModeratorViewDetailDialog = ({ open, onClose, moderator }: Props) => {
  if (!moderator) return null;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="min-w-5xl max-h-[90vh] flex flex-col p-0">
        <DialogHeader className="px-6 pt-6 pb-4">
          <DialogTitle>Moderator Profile</DialogTitle>
        </DialogHeader>

        <div className="flex-1 overflow-y-auto px-6 pb-6">
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 p-6 bg-linear-to-br from-blue-50 to-indigo-50 dark:from-blue-950 dark:to-indigo-950 rounded-lg mb-6">
            <Avatar className="h-24 w-24 border-4 border-white shadow-lg">
              <AvatarImage
                src={moderator.profilePhoto || ""}
                alt={moderator.name}
              />
              <AvatarFallback className="text-2xl">
                {getInitials(moderator.name)}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 text-center sm:text-left">
              <h2 className="text-3xl font-bold mb-1">{moderator.name}</h2>
              <p className="text-muted-foreground mb-2 flex items-center justify-center sm:justify-start gap-2">
                <Mail className="h-4 w-4" />
                {moderator.email}
              </p>
              <div className="flex flex-wrap gap-2 justify-center sm:justify-start">
                <Badge
                  variant={moderator.isDeleted ? "destructive" : "default"}
                >
                  {moderator.isDeleted ? "Inactive" : "Active"}
                </Badge>
                <Badge variant="secondary">
                  <Shield className="h-3 w-3 mr-1" />
                  Moderator
                </Badge>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <MapPin className="h-5 w-5 text-purple-600" />
                <h3 className="font-semibold text-lg">Assigned Regions</h3>
              </div>
              <div className="flex flex-wrap gap-2 bg-muted/50 p-4 rounded-lg">
                {moderator.assignedRegions.length > 0 ? (
                  moderator.assignedRegions.map((region) => (
                    <Badge key={region} variant="outline">
                      {region}
                    </Badge>
                  ))
                ) : (
                  <p className="text-muted-foreground">No regions assigned</p>
                )}
              </div>
            </div>

            <Separator />

            <div>
              <div className="flex items-center gap-2 mb-4">
                <User className="h-5 w-5 text-orange-600" />
                <h3 className="font-semibold text-lg">Account Information</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-muted/50 p-4 rounded-lg">
                <InfoRow
                  label="Contact Number"
                  value={moderator.phone || "Not provided"}
                  icon={Phone}
                />
                <InfoRow label="Email" value={moderator.email} icon={Mail} />
                <InfoRow
                  label="Created On"
                  value={formatDateTime(moderator.createdAt)}
                  icon={Calendar}
                />
                <InfoRow
                  label="Last Updated"
                  value={formatDateTime(moderator.updatedAt)}
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

export default ModeratorViewDetailDialog;
