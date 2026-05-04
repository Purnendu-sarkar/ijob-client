"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useRouter, useSearchParams } from "next/navigation";
import { useTransition } from "react";

const sortOptions = [
  { label: "Newest first", value: "publishedAt:desc" },
  { label: "Oldest first", value: "publishedAt:asc" },
  { label: "Salary high to low", value: "salaryMax:desc" },
  { label: "Salary low to high", value: "salaryMin:asc" },
  { label: "Title A-Z", value: "title:asc" },
];

const JobSortSelect = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();
  const currentValue = `${searchParams.get("sortBy") || "publishedAt"}:${
    searchParams.get("sortOrder") || "desc"
  }`;

  const handleChange = (value: string) => {
    const [sortBy, sortOrder] = value.split(":");
    const params = new URLSearchParams(searchParams.toString());

    params.set("sortBy", sortBy);
    params.set("sortOrder", sortOrder);
    params.set("page", "1");

    startTransition(() => {
      router.push(`?${params.toString()}`);
    });
  };

  return (
    <Select value={currentValue} onValueChange={handleChange} disabled={isPending}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Sort jobs" />
      </SelectTrigger>
      <SelectContent>
        {sortOptions.map((option) => (
          <SelectItem key={option.value} value={option.value}>
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default JobSortSelect;
