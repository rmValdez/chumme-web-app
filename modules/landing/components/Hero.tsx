"use client";

import React, { useEffect, useState } from "react";
import { Button } from "@/modules/shared/components/Button";
import { landingApi, LandingStats } from "@/modules/landing/api/landing-api";

export const Hero = () => {
  const [stats, setStats] = useState<LandingStats>({
    activeMembers: "100K+",
    circles: "500+",
    liveEvents: "24/7",
    satisfaction: "99%",
  });

  useEffect(() => {
    const fetchStats = async () => {
      const response = await landingApi.getStats();
      if (response.ok && response.data?.success) {
        setStats(response.data.data);
      }
    };

    fetchStats();
  }, []);

  return (
    <section className="relative flex flex-col items-center justify-center pt-48 pb-32 px-6 text-center overflow-hidden">
      {/* Background Glows */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-brand-vibrant/20 blur-[120px] rounded-full -z-10" />
      <div className="absolute bottom-0 left-1/4 w-[600px] h-[400px] bg-brand-core/10 blur-[100px] rounded-full -z-10" />

      <div className="max-w-4xl space-y-8">
        <h1 className="text-5xl md:text-8xl font-bold tracking-tighter leading-tight">
          Everything <br />
          <span className="text-gradient-pink">Happens Here.</span>
        </h1>

        <p className="text-xl md:text-2xl text-text-secondary max-w-2xl mx-auto font-light">
          Join the most vibrant community on the web. A premium space designed
          for meaningful connection and deep conversation.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
          <Button size="lg" className="w-full sm:w-auto">
            Start Journey
          </Button>
          <Button variant="outline" size="lg" className="w-full sm:w-auto">
            Explore Communities
          </Button>
        </div>

        <div className="pt-24 grid grid-cols-2 md:grid-cols-4 gap-8 opacity-40 grayscale transition-all duration-700 hover:grayscale-0 hover:opacity-100">
          <div className="flex flex-col items-center">
            <span className="text-3xl font-bold">{stats.activeMembers}</span>
            <span className="text-xs uppercase tracking-widest">
              Active Members
            </span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-3xl font-bold">{stats.circles}</span>
            <span className="text-xs uppercase tracking-widest">Circles</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-3xl font-bold">{stats.liveEvents}</span>
            <span className="text-xs uppercase tracking-widest">
              Live Events
            </span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-3xl font-bold">{stats.satisfaction}</span>
            <span className="text-xs uppercase tracking-widest">
              Satisfaction
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};
