"use client";
import { RoleSelection } from "@/modules/auth/components/RoleSelection";
import { AuthLayout } from "@/modules/auth/components/AuthLayout";
import { useRouter } from "next/navigation";

export default function WelcomePage() {
  const router = useRouter();

  const handleSelectRole = (role: "admin" | "user") => {
    if (role === "admin") {
      router.push("/auth?role=admin");
    } else {
      router.push("/auth?role=user");
    }
  };

  return (
    <AuthLayout>
      <RoleSelection
        onSelectRole={handleSelectRole}
        onSignIn={() => router.push("/auth")}
      />
    </AuthLayout>
  );
}
