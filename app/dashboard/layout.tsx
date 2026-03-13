import { DashboardLayout } from "@/modules/dashboard/components/DashboardLayout";
import { RouteGuard } from "@/modules/shared/components/RouteGuard";
export default function Layout({ children }: { children: React.ReactNode }) {
return (
<RouteGuard>
<DashboardLayout>{children}</DashboardLayout>
</RouteGuard>
);
}
