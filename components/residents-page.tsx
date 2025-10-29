"use client";

import { useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  useResidentsStore,
  useFilteredResidents,
  usePaginatedResidents,
} from "@/stores/residents-store";
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
import { Plus } from "lucide-react";

export function ResidentsPage() {
  const { toast } = useToast();
  const {
    isLoading,
    searchQuery,
    filterType,
    sortBy,
    sortOrder,
    currentPage,
    modalOpen,
    editingResident,
    deleteConfirmOpen,
    deleteResidentId,
    loadResidents,
    addResident,
    updateResident,
    deleteResident,
    setSearchQuery,
    setFilterType,
    setSorting,
    setCurrentPage,
    openModal,
    closeModal,
    openDeleteConfirm,
    closeDeleteConfirm,
  } = useResidentsStore();

  const filteredResidents = useFilteredResidents();
  const { residents: paginatedResidents, totalPages } = usePaginatedResidents();

  useEffect(() => {
    loadResidents();
  }, [loadResidents]);

  const handleAddResident = async (data: any) => {
    try {
      await addResident(data);
      toast({
        title: "Success",
        description: "Resident added successfully",
      });
      closeModal();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to add resident",
        variant: "destructive",
      });
    }
  };

  const handleEditResident = (resident: any) => {
    openModal("edit", resident);
  };

  const handleUpdateResident = async (data: any) => {
    if (editingResident) {
      try {
        await updateResident(editingResident.id, data);
        toast({
          title: "Success",
          description: "Resident updated successfully",
        });
        closeModal();
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to update resident",
          variant: "destructive",
        });
      }
    }
  };

  const handleDeleteResident = (id: string) => {
    openDeleteConfirm(id);
  };

  const handleConfirmDelete = async () => {
    if (deleteResidentId) {
      try {
        await deleteResident(deleteResidentId);
        toast({
          title: "Success",
          description: "Resident deleted successfully",
        });
        closeDeleteConfirm();
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to delete resident",
          variant: "destructive",
        });
      }
    }
  };

  const handleSort = (column: any) => {
    setSorting(
      column,
      sortBy === column && sortOrder === "asc" ? "desc" : "asc"
    );
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
        <Button onClick={() => openModal("add")} className="gap-2">
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
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
              filterType={filterType}
              onFilterChange={setFilterType}
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
                  sortBy={sortBy}
                  sortOrder={sortOrder}
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

      <Dialog open={modalOpen} onOpenChange={closeModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {editingResident ? "Edit Resident" : "Add New Resident"}
            </DialogTitle>
            <DialogDescription>
              {editingResident
                ? "Update the resident information"
                : "Enter the details for the new resident"}
            </DialogDescription>
          </DialogHeader>
          <ResidentForm
            resident={editingResident}
            onSubmit={
              editingResident ? handleUpdateResident : handleAddResident
            }
            onCancel={closeModal}
            isLoading={isLoading}
          />
        </DialogContent>
      </Dialog>

      <DeleteConfirmationDialog
        open={deleteConfirmOpen}
        onOpenChange={(open) => !open && closeDeleteConfirm()}
        onConfirm={handleConfirmDelete}
      />
    </div>
  );
}
