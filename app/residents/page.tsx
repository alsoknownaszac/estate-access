import { AuthenticatedLayout } from "@/components/authenticated-layout";
import { ResidentsPage } from "@/components/residents-page";

export default function ResidentsPageRoute() {
  return (
    <AuthenticatedLayout>
      <ResidentsPage />
    </AuthenticatedLayout>
  );
}
