"use client";

import React from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { Resident } from "@/lib/mock-data";
import { residentSchema, type ResidentFormData } from "@/lib/validation";

interface ResidentFormProps {
  resident?: Resident;
  onSubmit: (data: ResidentFormData) => void;
  onCancel: () => void;
  isLoading?: boolean;
}

export function ResidentForm({
  resident,
  onSubmit,
  onCancel,
  isLoading = false,
}: ResidentFormProps) {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm<ResidentFormData>({
    resolver: zodResolver(residentSchema),
    defaultValues: {
      name: resident?.name || "",
      houseNumber: resident?.houseNumber || "",
      accessType: resident?.accessType || "Resident",
      lastVisit: resident?.lastVisit || new Date().toISOString(),
    },
  });

  // Update form when resident changes
  React.useEffect(() => {
    if (resident) {
      reset({
        name: resident.name,
        houseNumber: resident.houseNumber,
        accessType: resident.accessType,
        lastVisit: resident.lastVisit,
      });
    }
  }, [resident, reset]);

  const onSubmitForm = (data: ResidentFormData) => {
    onSubmit(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmitForm)} className="space-y-4">
      <div className="space-y-2">
        <label htmlFor="name" className="text-sm font-medium">
          Name
        </label>
        <Input
          id="name"
          {...register("name")}
          placeholder="Enter resident name"
          className={errors.name ? "border-red-500" : ""}
        />
        {errors.name && (
          <p className="text-sm text-red-500">{errors.name.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <label htmlFor="houseNumber" className="text-sm font-medium">
          House Number
        </label>
        <Input
          id="houseNumber"
          {...register("houseNumber")}
          placeholder="e.g., 101"
          className={errors.houseNumber ? "border-red-500" : ""}
        />
        {errors.houseNumber && (
          <p className="text-sm text-red-500">{errors.houseNumber.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <label htmlFor="accessType" className="text-sm font-medium">
          Access Type
        </label>
        <Controller
          name="accessType"
          control={control}
          render={({ field }) => (
            <Select
              value={field.value}
              onValueChange={field.onChange}
              suppressHydrationWarning
            >
              <SelectTrigger
                id="accessType"
                className={errors.accessType ? "border-red-500" : ""}
                suppressHydrationWarning
              >
                <SelectValue />
              </SelectTrigger>
              <SelectContent suppressHydrationWarning>
                <SelectItem value="Resident">Resident</SelectItem>
                <SelectItem value="Visitor">Visitor</SelectItem>
                <SelectItem value="Staff">Staff</SelectItem>
              </SelectContent>
            </Select>
          )}
        />
        {errors.accessType && (
          <p className="text-sm text-red-500">{errors.accessType.message}</p>
        )}
      </div>

      <div className="flex gap-2 justify-end pt-4">
        <Button
          type="button"
          variant="outline"
          onClick={onCancel}
          disabled={isLoading}
        >
          Cancel
        </Button>
        <Button type="submit" disabled={isLoading}>
          {isLoading ? "Saving..." : resident ? "Update" : "Add"} Resident
        </Button>
      </div>
    </form>
  );
}
