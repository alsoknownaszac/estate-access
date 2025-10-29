import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Resident } from "@/lib/mock-data";
import { apiService } from "@/lib/api-service";

interface ResidentsState {
  residents: Resident[];
  isLoading: boolean;
  error: string | null;
  searchQuery: string;
  filterType: "all" | "Resident" | "Visitor" | "Staff";
  sortBy: keyof Resident;
  sortOrder: "asc" | "desc";
  currentPage: number;
  itemsPerPage: number;
  modalOpen: boolean;
  editingResident: Resident | undefined;
  deleteConfirmOpen: boolean;
  deleteResidentId: string | null;
}

interface ResidentsActions {
  // Data actions
  loadResidents: () => Promise<void>;
  addResident: (resident: Omit<Resident, "id">) => Promise<void>;
  updateResident: (id: string, updates: Partial<Resident>) => Promise<void>;
  deleteResident: (id: string) => Promise<void>;

  // Filter actions
  setSearchQuery: (query: string) => void;
  setFilterType: (type: "all" | "Resident" | "Visitor" | "Staff") => void;
  setSorting: (sortBy: keyof Resident, sortOrder: "asc" | "desc") => void;
  resetFilters: () => void;

  // Pagination actions
  setCurrentPage: (page: number) => void;

  // Modal actions
  openModal: (type: "add" | "edit", resident?: Resident) => void;
  closeModal: () => void;

  // Delete actions
  openDeleteConfirm: (residentId: string) => void;
  closeDeleteConfirm: () => void;

  // Utility actions
  clearError: () => void;
}

type ResidentsStore = ResidentsState & ResidentsActions;

export const useResidentsStore = create<ResidentsStore>()(
  persist(
    (set, get) => ({
      // State
      residents: [],
      isLoading: true,
      error: null,
      searchQuery: "",
      filterType: "all",
      sortBy: "name",
      sortOrder: "asc",
      currentPage: 1,
      itemsPerPage: 5,
      modalOpen: false,
      editingResident: undefined,
      deleteConfirmOpen: false,
      deleteResidentId: null,

      // Data actions
      loadResidents: async () => {
        set({ isLoading: true, error: null });
        try {
          const data = await apiService.fetchResidents();
          set({ residents: data, isLoading: false });
        } catch (error) {
          const errorMessage =
            error instanceof Error ? error.message : "Failed to load residents";
          set({
            error: errorMessage,
            isLoading: false,
          });
        }
      },

      addResident: async (resident: Omit<Resident, "id">) => {
        set({ isLoading: true, error: null });
        try {
          const newResident = await apiService.addResident(resident);
          set((state) => ({
            residents: [newResident, ...state.residents],
            isLoading: false,
          }));
        } catch (error) {
          const errorMessage =
            error instanceof Error ? error.message : "Failed to add resident";
          set({
            error: errorMessage,
            isLoading: false,
          });
          throw error;
        }
      },

      updateResident: async (id: string, updates: Partial<Resident>) => {
        set({ isLoading: true, error: null });
        try {
          const updated = await apiService.updateResident(id, updates);
          set((state) => ({
            residents: state.residents.map((resident) =>
              resident.id === id ? updated : resident
            ),
            isLoading: false,
          }));
        } catch (error) {
          const errorMessage =
            error instanceof Error
              ? error.message
              : "Failed to update resident";
          set({
            error: errorMessage,
            isLoading: false,
          });
          throw error;
        }
      },

      deleteResident: async (id: string) => {
        set({ isLoading: true, error: null });
        try {
          await apiService.deleteResident(id);
          set((state) => ({
            residents: state.residents.filter((resident) => resident.id !== id),
            isLoading: false,
          }));
        } catch (error) {
          const errorMessage =
            error instanceof Error
              ? error.message
              : "Failed to delete resident";
          set({
            error: errorMessage,
            isLoading: false,
          });
          throw error;
        }
      },

      // Filter actions
      setSearchQuery: (query) => {
        set({ searchQuery: query, currentPage: 1 });
      },

      setFilterType: (type) => {
        set({ filterType: type, currentPage: 1 });
      },

      setSorting: (sortBy, sortOrder) => {
        set({ sortBy, sortOrder, currentPage: 1 });
      },

      resetFilters: () => {
        set({
          searchQuery: "",
          filterType: "all",
          sortBy: "name",
          sortOrder: "asc",
          currentPage: 1,
        });
      },

      // Pagination actions
      setCurrentPage: (page) => {
        set({ currentPage: page });
      },

      // Modal actions
      openModal: (type, resident) => {
        set({
          modalOpen: true,
          editingResident: type === "edit" ? resident : undefined,
        });
      },

      closeModal: () => {
        set({
          modalOpen: false,
          editingResident: undefined,
        });
      },

      // Delete actions
      openDeleteConfirm: (residentId) => {
        set({
          deleteConfirmOpen: true,
          deleteResidentId: residentId,
        });
      },

      closeDeleteConfirm: () => {
        set({
          deleteConfirmOpen: false,
          deleteResidentId: null,
        });
      },

      // Utility actions
      clearError: () => {
        set({ error: null });
      },
    }),
    {
      name: "residents-storage",
      partialize: (state) => ({
        residents: state.residents,
        searchQuery: state.searchQuery,
        filterType: state.filterType,
        sortBy: state.sortBy,
        sortOrder: state.sortOrder,
        currentPage: state.currentPage,
        itemsPerPage: state.itemsPerPage,
      }),
    }
  )
);

// Computed selectors - simplified approach
export const useFilteredResidents = () => {
  const residents = useResidentsStore((state) => state.residents);
  const searchQuery = useResidentsStore((state) => state.searchQuery);
  const filterType = useResidentsStore((state) => state.filterType);
  const sortBy = useResidentsStore((state) => state.sortBy);
  const sortOrder = useResidentsStore((state) => state.sortOrder);

  return residents
    .filter((resident) => {
      // Apply search filter
      if (searchQuery) {
        const matchesSearch =
          resident.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          resident.houseNumber
            .toLowerCase()
            .includes(searchQuery.toLowerCase());
        if (!matchesSearch) return false;
      }

      // Apply access type filter
      if (filterType !== "all" && resident.accessType !== filterType) {
        return false;
      }

      return true;
    })
    .sort((a, b) => {
      const aValue = a[sortBy];
      const bValue = b[sortBy];

      if (typeof aValue === "string" && typeof bValue === "string") {
        return sortOrder === "asc"
          ? aValue.localeCompare(bValue)
          : bValue.localeCompare(aValue);
      }

      return 0;
    });
};

export const usePaginatedResidents = () => {
  const filteredResidents = useFilteredResidents();
  const currentPage = useResidentsStore((state) => state.currentPage);
  const itemsPerPage = useResidentsStore((state) => state.itemsPerPage);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  return {
    residents: filteredResidents.slice(startIndex, endIndex),
    totalPages: Math.ceil(filteredResidents.length / itemsPerPage),
    totalItems: filteredResidents.length,
  };
};
