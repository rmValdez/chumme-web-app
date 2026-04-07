"use client";

import React, { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { RolesPermissionsPage } from "@/modules/dashboard/components/RolesPermissionsPage";

const RolesPage = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return <RolesPermissionsPage />;
};

export default RolesPage;
