"use client";

import { useState, useCallback, useEffect } from "react";
import type { Resident } from "@/lib/mock-data";
import { apiService } from "@/lib/api-service";

export function useResidents() {
  const [residents, setResidents] = useState<Resident[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Load residents on mount
  useEffect(() => {
    const loadResidents = async () => {
      try {
        setIsLoading(true);
        const data = await apiService.fetchResidents();
        setResidents(data);
        setError(null);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Failed to load residents"
        );
      } finally {
        setIsLoading(false);
      }
    };
    loadResidents();
  }, []);

  const addResident = useCallback(async (resident: Omit<Resident, "id">) => {
    try {
      const newResident = await apiService.addResident(resident);
      setResidents((prev) => [newResident, ...prev]);
      return newResident;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to add resident");
      throw err;
    }
  }, []);

  const updateResident = useCallback(
    async (id: string, updates: Partial<Resident>) => {
      try {
        const updated = await apiService.updateResident(id, updates);
        setResidents((prev) =>
          prev.map((resident) => (resident.id === id ? updated : resident))
        );
        return updated;
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Failed to update resident"
        );
        throw err;
      }
    },
    []
  );

  const deleteResident = useCallback(async (id: string) => {
    try {
      await apiService.deleteResident(id);
      setResidents((prev) => prev.filter((resident) => resident.id !== id));
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to delete resident"
      );
      throw err;
    }
  }, []);

  return {
    residents,
    isLoading,
    error,
    addResident,
    updateResident,
    deleteResident,
  };
}
