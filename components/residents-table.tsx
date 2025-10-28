"use client";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import type { Resident } from "@/lib/mock-data";
import { Edit2, Trash2, ArrowUpDown } from "lucide-react";

interface ResidentsTableProps {
  residents: Resident[];
  onEdit: (resident: Resident) => void;
  onDelete: (id: string) => void;
  sortBy?: keyof Resident;
  sortOrder?: "asc" | "desc";
  onSort?: (column: keyof Resident) => void;
}

export function ResidentsTable({
  residents,
  onEdit,
  onDelete,
  sortBy,
  sortOrder,
  onSort,
}: ResidentsTableProps) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString();
  };

  const getSortIcon = (column: keyof Resident) => {
    if (sortBy !== column)
      return <ArrowUpDown className="h-4 w-4 opacity-50" />;
    return (
      <ArrowUpDown
        className={`h-4 w-4 ${
          sortOrder === "asc" ? "opacity-100" : "opacity-50"
        }`}
      />
    );
  };

  const handleHeaderClick = (column: keyof Resident) => {
    onSort?.(column);
  };

  return (
    <div className="border rounded-lg overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow className="bg-muted">
            <TableHead
              className="cursor-pointer hover:bg-muted/80 transition-colors"
              onClick={() => handleHeaderClick("name")}
            >
              <div className="flex items-center gap-2">
                Name {getSortIcon("name")}
              </div>
            </TableHead>
            <TableHead
              className="cursor-pointer hover:bg-muted/80 transition-colors"
              onClick={() => handleHeaderClick("houseNumber")}
            >
              <div className="flex items-center gap-2">
                House Number {getSortIcon("houseNumber")}
              </div>
            </TableHead>
            <TableHead
              className="cursor-pointer hover:bg-muted/80 transition-colors"
              onClick={() => handleHeaderClick("accessType")}
            >
              <div className="flex items-center gap-2">
                Access Type {getSortIcon("accessType")}
              </div>
            </TableHead>
            <TableHead
              className="cursor-pointer hover:bg-muted/80 transition-colors"
              onClick={() => handleHeaderClick("lastVisit")}
            >
              <div className="flex items-center gap-2">
                Last Visit {getSortIcon("lastVisit")}
              </div>
            </TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {residents.length === 0 ? (
            <TableRow>
              <TableCell
                colSpan={5}
                className="text-center py-8 text-muted-foreground"
              >
                No residents found
              </TableCell>
            </TableRow>
          ) : (
            residents.map((resident) => (
              <TableRow
                key={resident.id}
                className="hover:bg-muted/50 transition-colors"
              >
                <TableCell className="font-medium">{resident.name}</TableCell>
                <TableCell>{resident.houseNumber}</TableCell>
                <TableCell>
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium transition-colors ${
                      resident.accessType === "Resident"
                        ? "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
                        : resident.accessType === "Visitor"
                        ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                        : "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200"
                    }`}
                  >
                    {resident.accessType}
                  </span>
                </TableCell>
                <TableCell className="text-sm text-muted-foreground">
                  {formatDate(resident.lastVisit)}
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex gap-2 justify-end">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onEdit(resident)}
                      className="text-foreground hover:bg-muted transition-colors"
                    >
                      <Edit2 className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onDelete(resident.id)}
                      className="text-destructive hover:text-destructive hover:bg-destructive/10 transition-colors"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}
