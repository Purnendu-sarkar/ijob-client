import { LucideIcon } from "lucide-react";

function InfoRow({
  label,
  value,
  icon: Icon,
}: {
  label: string;
  value?: string | number;
  icon?: LucideIcon;
}) {
  return (
    <div className="space-y-1">
      <p className="text-sm text-muted-foreground flex items-center gap-2">
        {Icon && <Icon className="h-4 w-4" />}
        {label}
      </p>
      <p className="text-sm font-medium">{value || "N/A"}</p>
    </div>
  );
}

export default InfoRow;