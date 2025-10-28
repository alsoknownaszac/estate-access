// Reusable hook for calculating resident statistics
import { useMemo } from "react";
import type { Resident } from "@/lib/mock-data";

export function useStats(residents: Resident[]) {
  return useMemo(
    () => ({
      total: residents.length,
      residents: residents.filter((r) => r.accessType === "Resident").length,
      visitors: residents.filter((r) => r.accessType === "Visitor").length,
      staff: residents.filter((r) => r.accessType === "Staff").length,
    }),
    [residents]
  );
}
