"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Navbar } from "@/modules/shared/components/Navbar";
import { Card } from "@/modules/shared/components/Card";
import { Button } from "@/modules/shared/components/Button";
import { RouteGuard } from "@/modules/shared/components/RouteGuard";
import { useAuthStore } from "@/modules/shared/store/useAuthStore";
import Image from "next/image";
import { ChummeLoader } from "@/modules/shared/components/ChummeLoader";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  const { login, isLoading } = useAuthStore();
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    try {
      await login(email, password);
      router.push("/dashboard");
    } catch (err: unknown) {
      const message =
        err instanceof Error ? err.message : "Invalid credentials";
      setError(message);
    }
  };

  return (
    <RouteGuard requireAuth={false}>
      {isLoading && <ChummeLoader fullScreen />}
      <div className="min-h-screen bg-background-primary text-text-primary">
        <Navbar />

        <main className="max-w-md mx-auto px-6 pt-40 pb-24">
          <div className="flex flex-col items-center mb-12 space-y-6">
            <div className="w-20 h-20 relative">
              <Image
                src="/logo.png"
                alt="Chumme Logo"
                fill
                className="object-contain"
              />
            </div>
            <div className="text-center space-y-2">
              <h1 className="text-3xl font-bold tracking-tight">
                Welcome Back
              </h1>
              <p className="text-text-secondary">
                Sign in to continue your journey
              </p>
            </div>
          </div>

          <Card variant="glass" className="p-8">
            <form onSubmit={handleLogin} className="space-y-6">
              {error && (
                <div className="p-4 bg-brand-burgundy/50 border border-brand-vibrant/30 rounded-xl text-brand-light text-sm text-center">
                  {error}
                </div>
              )}

              <div className="space-y-2">
                <label className="text-xs font-semibold uppercase tracking-widest text-text-tertiary">
                  Email Address
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com"
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-brand-vibrant transition-colors"
                  required
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-semibold uppercase tracking-widest text-text-tertiary flex justify-between">
                  Password
                  <span className="text-brand-vibrant lowercase normal-case cursor-pointer hover:underline">
                    Forgot?
                  </span>
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-brand-vibrant transition-colors"
                  required
                />
              </div>

              <Button
                type="submit"
                size="lg"
                className="w-full"
                disabled={isLoading}
              >
                {isLoading ? "Signing in..." : "Sign In"}
              </Button>

              <div className="text-center pt-4">
                <p className="text-sm text-text-secondary">
                  Don&apos;t have an account?{" "}
                  <span className="text-brand-vibrant font-medium cursor-pointer hover:underline">
                    Create one
                  </span>
                </p>
              </div>
            </form>
          </Card>
        </main>
      </div>
    </RouteGuard>
  );
}
