// Validation schemas using zod
import { z } from "zod";

export const residentSchema = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(100, "Name must be less than 100 characters"),
  houseNumber: z.string().min(1, "House number is required"),
  accessType: z.enum(["Resident", "Visitor", "Staff"], {
    required_error: "Access type is required",
  }),
  lastVisit: z
    .string()
    .min(1, "Last visit is required")
    .datetime("Must be a valid ISO datetime string")
    .refine(
      (date) => new Date(date).getTime() <= Date.now(),
      "Last visit cannot be in the future"
    ),
});

export type ResidentFormData = z.infer<typeof residentSchema>;
