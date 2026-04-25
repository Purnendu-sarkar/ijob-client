"use client";
import {
  ArrowDown,
  ArrowUp,
  ArrowUpDown,
  Edit,
  Eye,
  Loader2,
  MoreHorizontal,
  Trash,
  Trash2,
} from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useTransition } from "react";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";

export interface Column<T> {
  header: string;
  accessor: keyof T | ((row: T) => React.ReactNode);
  className?: string;
  sortKey?: string;
}

interface ManagementTableProps<T> {
  data: T[];
  columns: Column<T>[];
  onView?: (row: T) => void;
  onEdit?: (row: T) => void;
  onDelete?: (row: T) => void;
  onHardDelete?: (row: T) => void;
  getRowKey: (row: T) => string;
  emptyMessage?: string;
  isRefreshing?: boolean;
}

// const ManagementTable<T> = (props: ManagementTableProps<T>) => {
//   return <div>ManagementTable</div>;
// };

function ManagementTable<T>({
  data = [],
  columns = [],
  onView,
  onEdit,
  onDelete,
  onHardDelete,
  getRowKey,
  emptyMessage = "No records found.",
  isRefreshing = false,
}: ManagementTableProps<T>) {
  const hasActions = onView || onEdit || onDelete || onHardDelete;
  const router = useRouter();
  const searchParams = useSearchParams();
  const [, startTransition] = useTransition();

  const currentSortBy = searchParams.get("sortBy") || "";
  const currentSortOrder = searchParams.get("sortOrder") || "desc";

  const handleSort = (sortKey: string) => {
    const params = new URLSearchParams(searchParams.toString());

    // Toggle sort order if clicking the same column
    if (currentSortBy === sortKey) {
      const newOrder = currentSortOrder === "asc" ? "desc" : "asc";
      params.set("sortOrder", newOrder);
    } else {
      // New column, default to descending
      params.set("sortBy", sortKey);
      params.set("sortOrder", "desc");
    }

    params.set("page", "1"); // Reset to first page

    startTransition(() => {
      router.push(`?${params.toString()}`);
    });
  };

  const getSortIcon = (sortKey?: string) => {
    if (!sortKey) return null;

    if (currentSortBy !== sortKey) {
      return <ArrowUpDown className="ml-2 h-4 w-4 text-muted-foreground" />;
    }

    return currentSortOrder === "asc" ? (
      <ArrowUp className="ml-2 h-4 w-4" />
    ) : (
      <ArrowDown className="ml-2 h-4 w-4" />
    );
  };
  return (
    <>
      <div className="rounded-lg border relative">
        {/* Refreshing Overlay */}
        {isRefreshing && (
          <div className="absolute inset-0 bg-background/50 backdrop-blur-[2px] flex items-center justify-center z-10 rounded-lg">
            <div className="flex flex-col items-center gap-2">
              <Loader2 className="h-6 w-6 animate-spin text-primary" />
              <p className="text-sm text-muted-foreground">Refreshing...</p>
            </div>
          </div>
        )}

        <Table>
          <TableHeader>
            <TableRow>
              {columns?.map((column, colIndex) => (
                <TableHead key={colIndex} className={column.className}>
                  {column.sortKey ? (
                    <button
                      type="button"
                      onClick={() => handleSort(column.sortKey!)}
                      className="flex items-center gap-1 p-2 -m-2 text-left font-medium transition-colors hover:text-foreground"
                    >
                      {column.header}
                      {getSortIcon(column.sortKey)}
                    </button>
                  ) : (
                    column.header
                  )}
                </TableHead>
              ))}
              {hasActions && <TableHead className="w-17.5">Actions</TableHead>}
            </TableRow>
          </TableHeader>

          <TableBody>
            {data.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={columns.length + (hasActions ? 1 : 0)}
                  className="text-center py-8 text-muted-foreground"
                >
                  {emptyMessage}
                </TableCell>
              </TableRow>
            ) : (
              data?.map((item) => (
                <TableRow key={getRowKey(item)}>
                  {columns.map((col, idx) => (
                    <TableCell key={idx} className={col.className}>
                      {typeof col.accessor === "function"
                        ? col.accessor(item)
                        : String(item[col.accessor])}
                    </TableCell>
                  ))}
                  {hasActions && (
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" aria-label="Open row actions">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          {onView && (
                            <DropdownMenuItem onClick={() => onView(item)}>
                              <Eye className="mr-2 h-4 w-4" />
                              View
                            </DropdownMenuItem>
                          )}
                          {onEdit && (
                            <DropdownMenuItem onClick={() => onEdit(item)}>
                              <Edit className="mr-2 h-4 w-4" />
                              Edit
                            </DropdownMenuItem>
                          )}
                          {onDelete && (
                            <DropdownMenuItem
                              onClick={() => onDelete(item)}
                              variant="destructive"
                            >
                              <Trash className="mr-2 h-4 w-4" />
                              Delete
                            </DropdownMenuItem>
                          )}
                          {onHardDelete && (
                            <>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem
                                onClick={() => onHardDelete(item)}
                                variant="destructive"
                              >
                                <Trash2 className="mr-2 h-4 w-4" />
                                Delete Permanently
                              </DropdownMenuItem>
                            </>
                          )}
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  )}
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </>
  );
}

export default ManagementTable;
