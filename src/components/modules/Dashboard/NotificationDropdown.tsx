"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ScrollArea } from "@/components/ui/scroll-area";
import { formatDistanceToNow } from "date-fns";
import {
  Bell,
  Briefcase,
  CheckCircle2,
  FileText,
  UserCheck,
  AlertCircle,
} from "lucide-react";

interface Notification {
  id: string;
  type:
    | "application_update" // employer → application received/shortlisted/rejected
    | "job_status" // your job published/expired/paused
    | "saved_job_match" // new job matching saved search
    | "profile_alert" // complete profile, resume update reminder
    | "system"; // maintenance, policy update, security alert
  title: string;
  message: string;
  timestamp: Date;
  read: boolean;
  // Optional: link?: string; // for future navigation on click
}

// Mock data — replace with React Query + API later
const MOCK_NOTIFICATIONS: Notification[] = [
  {
    id: "1",
    type: "application_update",
    title: "Application Shortlisted",
    message:
      "Your application for Senior React Developer at TechBD was shortlisted!",
    timestamp: new Date(Date.now() - 1000 * 60 * 45), // 45 min ago
    read: false,
  },
  {
    id: "2",
    type: "job_status",
    title: "Job Published",
    message:
      "Your job posting 'UI/UX Designer' is now live and receiving applications.",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 3), // 3 hours ago
    read: false,
  },
  {
    id: "3",
    type: "saved_job_match",
    title: "New Matching Job",
    message:
      "New Full-Stack Developer role in Dhaka matches your saved filters.",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 7), // 7 hours ago
    read: true,
  },
  {
    id: "4",
    type: "profile_alert",
    title: "Profile Completion Reminder",
    message:
      "Add your skills & experience to increase profile visibility by 40%.",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 26), // ~1 day ago
    read: true,
  },
  {
    id: "5",
    type: "system",
    title: "Platform Update",
    message: "New resume builder tool is now available in your profile.",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3), // 3 days ago
    read: true,
  },
];

const getNotificationIcon = (type: Notification["type"]) => {
  switch (type) {
    case "application_update":
      return <UserCheck className="h-4 w-4 text-[hsl(213,94%,30%)]" />; // primary deep blue
    case "job_status":
      return <Briefcase className="h-4 w-4 text-[hsl(152,72%,33%)]" />; // accent emerald
    case "saved_job_match":
      return <FileText className="h-4 w-4 text-[hsl(187,72%,27%)]" />; // secondary teal
    case "profile_alert":
      return <AlertCircle className="h-4 w-4 text-amber-600" />; // amber for attention
    case "system":
      return <CheckCircle2 className="h-4 w-4 text-purple-600" />;
    default:
      return <Bell className="h-4 w-4" />;
  }
};

export default function NotificationDropdown() {
  const unreadCount = MOCK_NOTIFICATIONS.filter((n) => !n.read).length;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="relative text-foreground hover:bg-muted/50"
        >
          <Bell className="h-5 w-5" />
          {unreadCount > 0 && (
            <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-destructive text-[10px] font-bold text-destructive-foreground shadow-sm">
              {unreadCount > 9 ? "9+" : unreadCount}
            </span>
          )}
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="end"
        className="w-80 max-h-[min(80vh,500px)] overflow-hidden rounded-lg border bg-popover shadow-xl"
      >
        <DropdownMenuLabel className="flex items-center justify-between px-4 py-3">
          <span className="text-base font-semibold">Notifications</span>
          {unreadCount > 0 && (
            <Badge variant="destructive" className="text-xs">
              {unreadCount} new
            </Badge>
          )}
        </DropdownMenuLabel>

        <DropdownMenuSeparator />

        <ScrollArea className="h-[min(60vh,420px)]">
          {MOCK_NOTIFICATIONS.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-10 text-center text-sm text-muted-foreground">
              <Bell className="mb-3 h-10 w-10 opacity-40" />
              <p>No notifications yet</p>
              <p className="mt-1 text-xs">
                We&#39;ll notify you when something new happens
              </p>
            </div>
          ) : (
            MOCK_NOTIFICATIONS.map((notification) => (
              <DropdownMenuItem
                key={notification.id}
                className={`flex cursor-pointer items-start gap-3 px-4 py-3 transition-colors hover:bg-accent/50 focus:bg-accent/50 ${
                  !notification.read ? "bg-primary/5" : ""
                }`}
              >
                <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-muted/60">
                  {getNotificationIcon(notification.type)}
                </div>

                <div className="flex min-w-0 flex-1 flex-col gap-1">
                  <div className="flex items-start justify-between gap-2">
                    <p className="line-clamp-1 text-sm font-medium leading-tight">
                      {notification.title}
                    </p>
                    {!notification.read && (
                      <div className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-primary" />
                    )}
                  </div>

                  <p className="line-clamp-2 text-xs text-muted-foreground">
                    {notification.message}
                  </p>

                  <p className="mt-1 text-xs text-muted-foreground/80">
                    {formatDistanceToNow(notification.timestamp, {
                      addSuffix: true,
                    })}
                  </p>
                </div>
              </DropdownMenuItem>
            ))
          )}
        </ScrollArea>

        <DropdownMenuSeparator />

        <DropdownMenuItem className="cursor-pointer justify-center py-3 text-sm font-medium text-primary hover:bg-primary/10 focus:bg-primary/10">
          View all notifications
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
