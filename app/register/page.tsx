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

export default function RegisterPage() {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  const { register, isLoading } = useAuthStore();
  const router = useRouter();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    try {
      await register({ email, username, displayName, password });
      // Redirect to login after successful registration (as per common flow)
      // or automatically login if the API supports it.
      // Based on useAuthStore.ts, register just calls the service but doesn't set user.
      router.push("/auth?registered=true");
    } catch (err: unknown) {
      const message =
        err instanceof Error ? err.message : "Registration failed";
      setError(message);
    }
  };

  return (
    <RouteGuard requireAuth={false}>
      {isLoading && <ChummeLoader fullScreen />}
      <div className="min-h-screen bg-background-primary text-text-primary">
        <Navbar />

        <main className="max-w-md mx-auto px-6 pt-32 pb-24">
          <div className="flex flex-col items-center mb-10 space-y-4">
            <div className="w-16 h-16 relative">
              <Image
                src="/logo.png"
                alt="Chumme Logo"
                fill
                className="object-contain"
              />
            </div>
            <div className="text-center space-y-1">
              <h1 className="text-3xl font-bold tracking-tight">Join Chumme</h1>
              <p className="text-text-secondary">
                Start your premium social journey
              </p>
            </div>
          </div>

          <Card variant="glass" className="p-8">
            <form onSubmit={handleRegister} className="space-y-5">
              {error && (
                <div className="p-4 bg-brand-burgundy/50 border border-brand-vibrant/30 rounded-xl text-brand-light text-sm text-center">
                  {error}
                </div>
              )}

              <div className="space-y-2">
                <label className="text-xs font-semibold uppercase tracking-widest text-text-tertiary">
                  Display Name
                </label>
                <input
                  type="text"
                  value={displayName}
                  onChange={(e) => setDisplayName(e.target.value)}
                  placeholder="John Doe"
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-brand-vibrant transition-colors"
                  required
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-semibold uppercase tracking-widest text-text-tertiary">
                  Username
                </label>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="chumme_user"
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-brand-vibrant transition-colors"
                  required
                />
              </div>

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
                <label className="text-xs font-semibold uppercase tracking-widest text-text-tertiary">
                  Password
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
                className="w-full pt-4"
                disabled={isLoading}
              >
                {isLoading ? "Creating Account..." : "Create Account"}
              </Button>

              <div className="text-center pt-4">
                <p className="text-sm text-text-secondary">
                  Already have an account?{" "}
                  <span
                    onClick={() => router.push("/auth")}
                    className="text-brand-vibrant font-medium cursor-pointer hover:underline"
                  >
                    Sign In
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
