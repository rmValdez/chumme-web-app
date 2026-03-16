"use client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function OnboardingDetailsPage() {
  const router = useRouter();
  useEffect(() => {
    router.replace("/onboarding/welcome");
  }, [router]);
  return null;
}
