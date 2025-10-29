"use client";

import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search } from "lucide-react";

interface SearchFilterBarProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  filterType: string;
  onFilterChange: (type: string) => void;
}

export function SearchFilterBar({
  searchQuery,
  onSearchChange,
  filterType,
  onFilterChange,
}: SearchFilterBarProps) {
  return (
    <div className="flex gap-4 flex-col sm:flex-row">
      <div className="flex-1 relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search by name or house number..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-10"
        />
      </div>
      <Select
        value={filterType}
        onValueChange={onFilterChange}
        suppressHydrationWarning
      >
        <SelectTrigger className="w-full sm:w-48" suppressHydrationWarning>
          <SelectValue />
        </SelectTrigger>
        <SelectContent suppressHydrationWarning>
          <SelectItem value="all">All Access Types</SelectItem>
          <SelectItem value="Resident">Resident</SelectItem>
          <SelectItem value="Visitor">Visitor</SelectItem>
          <SelectItem value="Staff">Staff</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}
