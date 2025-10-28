"use client";

import { useState, useMemo } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useResidents } from "@/hooks/use-residents";
import { useToast } from "@/hooks/use-toast";
import { SearchFilterBar } from "@/components/search-filter-bar";
import { ResidentsTable } from "@/components/residents-table";
import { ResidentForm } from "@/components/resident-form";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { DeleteConfirmationDialog } from "@/components/delete-confirmation-dialog";
import { Pagination } from "@/components/pagination";
import type { Resident } from "@/lib/mock-data";
import { Plus } from "lucide-react";

const ITEMS_PER_PAGE = 5;

export function ResidentsPage() {
  const { residents, addResident, updateResident, deleteResident, isLoading } =
    useResidents();
  const { toast } = useToast();

  // Consolidated state management
  const [filters, setFilters] = useState({
    searchQuery: "",
    filterType: "all" as "all" | "Resident" | "Visitor" | "Staff",
    sortBy: "name" as keyof Resident,
    sortOrder: "asc" as "asc" | "desc",
  });

  const [modal, setModal] = useState({
    isOpen: false,
    editingResident: undefined as Resident | undefined,
    isSubmitting: false,
  });

  const [deleteState, setDeleteState] = useState({
    isConfirmOpen: false,
    residentId: null as string | null,
  });

  const [currentPage, setCurrentPage] = useState(1);

  const filteredResidents = useMemo(() => {
    let result = [...residents];

    // Apply search filter
    if (filters.searchQuery) {
      result = result.filter(
        (resident) =>
          resident.name
            .toLowerCase()
            .includes(filters.searchQuery.toLowerCase()) ||
          resident.houseNumber
            .toLowerCase()
            .includes(filters.searchQuery.toLowerCase())
      );
    }

    // Apply access type filter
    if (filters.filterType !== "all") {
      result = result.filter(
        (resident) => resident.accessType === filters.filterType
      );
    }

    // Apply sorting
    result.sort((a, b) => {
      const aValue = a[filters.sortBy];
      const bValue = b[filters.sortBy];

      if (typeof aValue === "string" && typeof bValue === "string") {
        return filters.sortOrder === "asc"
          ? aValue.localeCompare(bValue)
          : bValue.localeCompare(aValue);
      }

      return 0;
    });

    return result;
  }, [residents, filters]);

  const totalPages = Math.ceil(filteredResidents.length / ITEMS_PER_PAGE);
  const paginatedResidents = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredResidents.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [filteredResidents, currentPage]);

  const handleAddResident = async (data: Omit<Resident, "id">) => {
    try {
      setModal((prev) => ({ ...prev, isSubmitting: true }));
      await addResident(data);
      toast({
        title: "Success",
        description: "Resident added successfully",
      });
      setModal({
        isOpen: false,
        editingResident: undefined,
        isSubmitting: false,
      });
      setCurrentPage(1);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to add resident",
        variant: "destructive",
      });
    } finally {
      setModal((prev) => ({ ...prev, isSubmitting: false }));
    }
  };

  const handleEditResident = (resident: Resident) => {
    setModal({ isOpen: true, editingResident: resident, isSubmitting: false });
  };

  const handleUpdateResident = async (data: Omit<Resident, "id">) => {
    if (modal.editingResident) {
      try {
        setModal((prev) => ({ ...prev, isSubmitting: true }));
        await updateResident(modal.editingResident.id, data);
        toast({
          title: "Success",
          description: "Resident updated successfully",
        });
        setModal({
          isOpen: false,
          editingResident: undefined,
          isSubmitting: false,
        });
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to update resident",
          variant: "destructive",
        });
      } finally {
        setModal((prev) => ({ ...prev, isSubmitting: false }));
      }
    }
  };

  const handleDeleteResident = (id: string) => {
    setDeleteState({ isConfirmOpen: true, residentId: id });
  };

  const handleConfirmDelete = async () => {
    if (deleteState.residentId) {
      try {
        setModal((prev) => ({ ...prev, isSubmitting: true }));
        await deleteResident(deleteState.residentId);
        toast({
          title: "Success",
          description: "Resident deleted successfully",
        });
        setDeleteState({ isConfirmOpen: false, residentId: null });
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to delete resident",
          variant: "destructive",
        });
      } finally {
        setModal((prev) => ({ ...prev, isSubmitting: false }));
      }
    }
  };

  const handleSort = (column: keyof Resident) => {
    setFilters((prev) => ({
      ...prev,
      sortBy: column,
      sortOrder:
        prev.sortBy === column && prev.sortOrder === "asc" ? "desc" : "asc",
    }));
  };

  const handleCloseModal = () => {
    setModal({
      isOpen: false,
      editingResident: undefined,
      isSubmitting: false,
    });
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Residents</h1>
          <p className="text-muted-foreground mt-2">
            Manage resident and visitor access
          </p>
        </div>
        <Button
          onClick={() =>
            setModal({
              isOpen: true,
              editingResident: undefined,
              isSubmitting: false,
            })
          }
          className="gap-2"
        >
          <Plus className="h-4 w-4" />
          Add Resident
        </Button>
      </div>

      <div>
        <Card>
          <CardHeader>
            <CardTitle>Search & Filter</CardTitle>
            <CardDescription>
              Find residents by name, house number, or access type
            </CardDescription>
          </CardHeader>
          <CardContent>
            <SearchFilterBar
              searchQuery={filters.searchQuery}
              onSearchChange={(query) =>
                setFilters((prev) => ({ ...prev, searchQuery: query }))
              }
              filterType={filters.filterType}
              onFilterChange={(type) =>
                setFilters((prev) => ({ ...prev, filterType: type as any }))
              }
            />
          </CardContent>
        </Card>
      </div>

      <div>
        <Card>
          <CardHeader>
            <CardTitle>Residents List</CardTitle>
            <CardDescription>
              Total: {filteredResidents.length} residents
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {isLoading ? (
              <div className="flex items-center justify-center py-8">
                <div className="text-muted-foreground">
                  Loading residents...
                </div>
              </div>
            ) : (
              <>
                <ResidentsTable
                  residents={paginatedResidents}
                  onEdit={handleEditResident}
                  onDelete={handleDeleteResident}
                  sortBy={filters.sortBy}
                  sortOrder={filters.sortOrder}
                  onSort={handleSort}
                />
                {totalPages > 1 && (
                  <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={setCurrentPage}
                  />
                )}
              </>
            )}
          </CardContent>
        </Card>
      </div>

      <Dialog open={modal.isOpen} onOpenChange={handleCloseModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {modal.editingResident ? "Edit Resident" : "Add New Resident"}
            </DialogTitle>
            <DialogDescription>
              {modal.editingResident
                ? "Update the resident information"
                : "Enter the details for the new resident"}
            </DialogDescription>
          </DialogHeader>
          <ResidentForm
            resident={modal.editingResident}
            onSubmit={
              modal.editingResident ? handleUpdateResident : handleAddResident
            }
            onCancel={handleCloseModal}
            isLoading={modal.isSubmitting}
          />
        </DialogContent>
      </Dialog>

      <DeleteConfirmationDialog
        open={deleteState.isConfirmOpen}
        onOpenChange={(open) =>
          setDeleteState((prev) => ({ ...prev, isConfirmOpen: open }))
        }
        onConfirm={handleConfirmDelete}
      />
    </div>
  );
}
