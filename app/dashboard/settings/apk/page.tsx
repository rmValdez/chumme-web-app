"use client";

import { useTheme } from "next-themes";
import React, { useState, useEffect } from "react";

import { APKDownloadPage } from "@/modules/dashboard/components/APKDownloadPage";

const APKPage = () => {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const isDark = mounted ? resolvedTheme === "dark" : true;

  return <APKDownloadPage isDark={isDark} />;
};

export default APKPage;
