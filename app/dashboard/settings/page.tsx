"use client";

import { useTheme } from "next-themes";
import React, { useState, useEffect } from "react";

import { SettingsPage } from "@/modules/dashboard/components/SettingsPage";

const SettingsPageRoute = () => {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const isDark = mounted ? resolvedTheme === "dark" : true;

  return <SettingsPage isDark={isDark} />;
};

export default SettingsPageRoute;
