// API Service Layer - Abstracts data operations
import type { Resident } from "@/lib/mock-data";
import { mockResidents } from "@/lib/mock-data";

// Simulate network delay
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

// Mock API endpoints
const API_BASE_URL = "/api"; // Would be actual API URL in production

export const apiService = {
  async fetchResidents(): Promise<Resident[]> {
    await delay(300); // Simulate network delay
    const stored = localStorage.getItem("estate_residents");

    if (stored) {
      try {
        return JSON.parse(stored);
      } catch {
        return [...mockResidents];
      }
    }

    // Initialize with mock data if no stored data
    const initialData = [...mockResidents];
    localStorage.setItem("estate_residents", JSON.stringify(initialData));
    return initialData;
  },

  async addResident(resident: Omit<Resident, "id">): Promise<Resident> {
    await delay(400); // Simulate network delay
    const newResident: Resident = {
      ...resident,
      id: Date.now().toString(),
    };

    const residents = await this.fetchResidents();
    const updatedResidents = [newResident, ...residents];
    localStorage.setItem("estate_residents", JSON.stringify(updatedResidents));

    return newResident;
  },

  async updateResident(
    id: string,
    updates: Partial<Resident>
  ): Promise<Resident> {
    await delay(400); // Simulate network delay
    const residents = await this.fetchResidents();
    const updatedResidents = residents.map((resident) =>
      resident.id === id ? { ...resident, ...updates } : resident
    );

    const updated = updatedResidents.find((r) => r.id === id);
    if (!updated) {
      throw new Error("Resident not found");
    }

    localStorage.setItem("estate_residents", JSON.stringify(updatedResidents));
    return updated;
  },

  async deleteResident(id: string): Promise<void> {
    await delay(400); // Simulate network delay
    const residents = await this.fetchResidents();
    const updatedResidents = residents.filter((resident) => resident.id !== id);
    localStorage.setItem("estate_residents", JSON.stringify(updatedResidents));
  },
};
