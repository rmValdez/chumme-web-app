"use client";

import React from "react";
import Link from "next/link";
import { Button } from "./Button";
import { useAuthStore } from "@/modules/shared/store/useAuthStore";
import { useRouter } from "next/navigation";
import { ThemeToggle } from "@/modules/shared/components/ThemeToggle";

export const Navbar = () => {
  const { isAuthenticated, logout, user } = useAuthStore();
  const router = useRouter();

  const handleLogout = async () => {
    await logout();
    router.push("/");
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-center p-6 bg-gradient-to-b from-background-primary/80 to-transparent">
      <div className="glass flex w-full max-w-7xl items-center justify-between px-8 py-4 rounded-2xl">
        <Link
          href="/"
          className="text-2xl font-bold tracking-tighter text-gradient-pink hover:scale-105 transition-transform"
        >
          CHUMME
        </Link>

        <div className="hidden md:flex items-center space-x-8">
          <Link
            href={isAuthenticated ? "/dashboard" : "/#features"}
            className="text-sm text-text-secondary hover:text-text-primary transition-colors"
          >
            {isAuthenticated ? "Dashboard" : "Features"}
          </Link>
          {!isAuthenticated && (
            <>
              <Link
                href="#community"
                className="text-sm text-text-secondary hover:text-text-primary transition-colors"
              >
                Community
              </Link>
              <Link
                href="#about"
                className="text-sm text-text-secondary hover:text-text-primary transition-colors"
              >
                About
              </Link>
            </>
          )}
        </div>

        <div className="flex items-center space-x-4">
          {isAuthenticated ? (
            <div className="flex items-center space-x-4">
              <span className="text-sm text-text-tertiary hidden sm:inline-block">
                Hi,{" "}
                <span className="text-text-primary font-medium">
                  {user?.displayName || user?.username}
                </span>
              </span>
              <Button variant="ghost" size="sm" onClick={handleLogout}>
                Log out
              </Button>
            </div>
          ) : (
            <>
              <Link href="/auth">
                {/* <Button
                  variant="ghost"
                  size="sm"
                  className="hidden sm:inline-flex"
                >
                  Log in
                </Button> */}
              </Link>
              <Link href="/auth">
                <Button size="sm">Get Started</Button>
              </Link>
            </>
          )}
          <ThemeToggle />
        </div>
      </div>
    </nav>
  );
};
