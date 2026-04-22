import { AuditLogsPage } from "@/modules/dashboard/components/AuditLogsPage";

export const metadata = {
  title: "Audit Logs | Chumme",
  description: "Track all transactions and system updates performed by users.",
};

export default function Page() {
  return <AuditLogsPage />;
}
