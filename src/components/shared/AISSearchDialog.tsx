"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";

import { getAIJobSuggestion } from "@/services/ai/ai.service";
import { AISuggestedJob } from "@/types/ai.interface";
import {
  Award,
  Briefcase,
  DollarSign,
  Loader2,
  MapPin,
  Search,
  Sparkles,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Badge } from "../ui/badge";

interface AISearchDialogProps {
  initialQuery?: string;
  externalOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  onSearchComplete?: () => void;
}

export default function AISearchDialog({
  initialQuery = "",
  externalOpen,
  onOpenChange,
  onSearchComplete,
}: AISearchDialogProps = {}) {
  const [internalOpen, setInternalOpen] = useState(false);
  const [query, setQuery] = useState(initialQuery);
  const [isLoading, setIsLoading] = useState(false);
  const [suggestedJobs, setSuggestedJobs] = useState<AISuggestedJob[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [hasAutoSearched, setHasAutoSearched] = useState(false);
  const [triggerSearch, setTriggerSearch] = useState(false);

  const open = externalOpen !== undefined ? externalOpen : internalOpen;
  const setOpen = onOpenChange || setInternalOpen;

  // Update query when initialQuery changes
  useEffect(() => {
    if (initialQuery && initialQuery !== query && !open) {
      setQuery(initialQuery);
      setHasAutoSearched(false);
      setTriggerSearch(true);
    }
  }, [initialQuery, query, open]);

  const handleSearch = async () => {
    if (!query.trim() || query.trim().length < 10) {
      toast.error(
        "Please describe the job you're looking for (at least 10 characters)",
      );
      return;
    }

    setIsLoading(true);
    setSuggestedJobs([]);
    setShowSuggestions(false);

    try {
      const response = await getAIJobSuggestion(query); // ← Changed service
      if (response.success && response.data) {
        const jobs = Array.isArray(response.data)
          ? response.data
          : [response.data];
        setSuggestedJobs(jobs);
        setShowSuggestions(true);
        toast.success("AI found matching jobs for you!");
      } else {
        toast.error(response.message || "Failed to get AI job suggestions");
      }
    } catch (error) {
      console.error("Error getting AI job suggestion:", error);
      toast.error("Failed to get AI suggestions. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  // Auto-trigger search when dialog opens with query
  useEffect(() => {
    if (
      open &&
      triggerSearch &&
      query &&
      query.trim().length >= 10 &&
      !hasAutoSearched
    ) {
      setHasAutoSearched(true);
      setTriggerSearch(false);
      setTimeout(() => {
        handleSearch();
      }, 50);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, triggerSearch, hasAutoSearched]);

  const handleDialogOpenChange = (newOpen: boolean) => {
    if (newOpen) {
      setOpen(newOpen);
    } else {
      setOpen(newOpen);
      setTimeout(() => {
        setHasAutoSearched(false);
        setTriggerSearch(false);
        setQuery("");
        setSuggestedJobs([]);
        setShowSuggestions(false);
        onSearchComplete?.();
      }, 100);
    }
  };

  const handleJobClick = () => {
    setOpen(false);
    setQuery("");
    setSuggestedJobs([]);
    setShowSuggestions(false);
    setHasAutoSearched(false);
    setTriggerSearch(false);
    onSearchComplete?.();
  };

  return (
    <Dialog open={open} onOpenChange={handleDialogOpenChange}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="gap-2">
          <Sparkles className="h-4 w-4" />
          <span className="hidden sm:inline">AI Job Search</span>
        </Button>
      </DialogTrigger>

      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center gap-2">
            <div className="p-2 bg-primary rounded-lg">
              <Sparkles className="h-5 w-5 text-primary-foreground" />
            </div>
            <div>
              <DialogTitle>AI Smart Job Search</DialogTitle>
              <DialogDescription>
                Describe the job you want in your own words and let AI find the
                best matches
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <div className="space-y-4 mt-4">
          <div>
            <Textarea
              placeholder="Example: I want a remote frontend developer job in Dhaka with at least 60,000 BDT salary, React.js experience preferred..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              rows={4}
              className="resize-none border-primary/30 focus:border-primary focus:ring-primary/50"
              disabled={isLoading}
            />
            <div className="flex justify-between items-center mt-1">
              <p className="text-xs text-muted-foreground">
                {query.length} characters
              </p>
              <p className="text-xs text-primary font-medium">
                Minimum 10 characters recommended
              </p>
            </div>
          </div>

          <Button
            onClick={handleSearch}
            disabled={isLoading || query.trim().length < 10}
            className="w-full"
            size="lg"
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Finding best job matches...
              </>
            ) : (
              <>
                <Search className="mr-2 h-4 w-4" />
                Search with AI
              </>
            )}
          </Button>

          {showSuggestions && suggestedJobs.length > 0 && (
            <div className="space-y-4 p-4 bg-linear-to-br from-primary/5 to-white rounded-lg border-2 border-primary/20">
              <div className="flex items-center justify-between">
                <Badge
                  variant="outline"
                  className="bg-primary/10 text-primary border-primary/30"
                >
                  <Sparkles className="h-3 w-3 mr-1" />
                  AI Recommended ({suggestedJobs.length})
                </Badge>
                <p className="text-xs text-muted-foreground">
                  Best matches for your description
                </p>
              </div>

              <div className="space-y-3 max-h-100 overflow-y-auto">
                {suggestedJobs.map((job, index) => (
                  <div
                    key={job.id || index}
                    className="p-4 bg-white rounded-lg border border-primary/20 hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-start gap-4">
                      <div className="shrink-0">
                        <div className="w-10 h-10 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold">
                          {index + 1}
                        </div>
                      </div>

                      {/* Company Logo */}
                      <div className="shrink-0">
                        {job.companyLogo ? (
                          <Image
                            src={job.companyLogo}
                            alt={job.companyName}
                            width={64}
                            height={64}
                            className="w-16 h-16 rounded-xl object-cover border border-border"
                          />
                        ) : (
                          <div className="w-16 h-16 rounded-xl bg-muted flex items-center justify-center">
                            <Briefcase className="h-8 w-8 text-muted-foreground" />
                          </div>
                        )}
                      </div>

                      <div className="flex-1 space-y-2">
                        <div>
                          <h4 className="font-semibold text-lg">{job.title}</h4>
                          <p className="text-sm text-muted-foreground">
                            {job.companyName}
                          </p>
                        </div>

                        <div className="flex flex-wrap gap-2">
                          {job.employmentType && (
                            <Badge variant="secondary">
                              {job.employmentType}
                            </Badge>
                          )}
                          {job.workplaceType && (
                            <Badge variant="outline">{job.workplaceType}</Badge>
                          )}
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm">
                          {job.salaryMin && (
                            <div className="flex items-center gap-2 text-green-700">
                              <DollarSign className="h-4 w-4" />
                              <span>
                                ৳{job.salaryMin} - ৳{job.salaryMax}
                              </span>
                            </div>
                          )}
                          {job.location && (
                            <div className="flex items-center gap-2">
                              <MapPin className="h-4 w-4" />
                              <span>{job.location}</span>
                            </div>
                          )}
                          {job.experience && (
                            <div className="flex items-center gap-2">
                              <Award className="h-4 w-4" />
                              <span>{job.experience} years exp.</span>
                            </div>
                          )}
                        </div>

                        <div className="pt-3 border-t flex justify-end">
                          <Link
                            href={`/jobs/${job.slug || job.id}`}
                            onClick={handleJobClick}
                          >
                            <Button size="sm">View Job Details</Button>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="pt-2 border-t border-blue-200">
                <p className="text-xs text-center text-muted-foreground">
                  ⚠️ AI suggestions are for guidance only. Always review job
                  details carefully.
                </p>
              </div>
            </div>
          )}

          {showSuggestions && suggestedJobs.length === 0 && (
            <div className="p-6 bg-amber-50 rounded-lg border-2 border-amber-200 text-center">
              <p className="text-amber-700 font-medium">
                No matching jobs found
              </p>
              <p className="text-sm text-muted-foreground mt-1">
                Try describing your requirements differently.
              </p>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
