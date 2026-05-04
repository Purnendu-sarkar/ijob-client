import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import type { PublicJob } from "@/types/job.interface";
import { BriefcaseBusiness, CalendarDays, Clock, MapPin, Wallet } from "lucide-react";
import Link from "next/link";

const formatSalary = (job: PublicJob) => {
  if (!job.salaryMin && !job.salaryMax) return "Salary negotiable";

  const formatter = new Intl.NumberFormat("en-BD", {
    style: "currency",
    currency: job.currency || "BDT",
    maximumFractionDigits: 0,
  });

  if (job.salaryMin && job.salaryMax) {
    return `${formatter.format(job.salaryMin)} - ${formatter.format(job.salaryMax)}`;
  }

  if (job.salaryMin) return `From ${formatter.format(job.salaryMin)}`;
  return `Up to ${formatter.format(job.salaryMax || 0)}`;
};

const formatExperience = (job: PublicJob) => {
  if (job.experienceMin === null && job.experienceMax === null) return "Experience flexible";
  if (job.experienceMin !== null && job.experienceMax !== null) {
    return `${job.experienceMin}-${job.experienceMax} years`;
  }
  if (job.experienceMin !== null) return `${job.experienceMin}+ years`;
  return `Up to ${job.experienceMax} years`;
};

const formatDate = (date: string | null) => {
  if (!date) return "Not specified";

  return new Date(date).toLocaleDateString("en-BD", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
};

const PublicJobCard = ({ job }: { job: PublicJob }) => {
  return (
    <Card className="overflow-hidden transition hover:-translate-y-0.5 hover:shadow-md">
      <CardHeader className="space-y-4">
        <div className="flex items-start justify-between gap-4">
          <div className="space-y-2">
            <CardTitle className="text-xl">{job.title}</CardTitle>
            <div className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
              <BriefcaseBusiness className="h-4 w-4" />
              <span>{job.company.name}</span>
              <Badge variant="secondary">Verified</Badge>
            </div>
          </div>
          <Badge>{job.employmentType}</Badge>
        </div>

        <p className="line-clamp-2 text-sm leading-6 text-muted-foreground">
          {job.description}
        </p>
      </CardHeader>

      <CardContent className="grid gap-3 text-sm text-muted-foreground sm:grid-cols-2">
        <div className="flex items-center gap-2">
          <MapPin className="h-4 w-4 text-primary" />
          <span>{job.workplaceType}</span>
        </div>
        <div className="flex items-center gap-2">
          <Clock className="h-4 w-4 text-primary" />
          <span>{formatExperience(job)}</span>
        </div>
        <div className="flex items-center gap-2">
          <Wallet className="h-4 w-4 text-primary" />
          <span>{formatSalary(job)}</span>
        </div>
        <div className="flex items-center gap-2">
          <CalendarDays className="h-4 w-4 text-primary" />
          <span>Deadline: {formatDate(job.applicationDeadline)}</span>
        </div>
      </CardContent>

      <CardFooter className="flex flex-col gap-3 border-t bg-muted/30 p-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-xs text-muted-foreground">
          Posted {formatDate(job.publishedAt || job.createdAt)}
        </p>
        <div className="flex w-full gap-2 sm:w-auto">
          <Button variant="outline" className="flex-1 sm:flex-none" asChild>
            <Link href="/login">Login to apply</Link>
          </Button>
          <Button className="flex-1 sm:flex-none" disabled>
            Details soon
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default PublicJobCard;
