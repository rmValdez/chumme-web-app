import React, { Suspense } from "react";
import { ThemeProvider } from "@/modules/shared/components/ThemeProvider";
import { QueryProvider } from "@/modules/shared/providers/QueryProvider";
import { AuthInitializer } from "@/modules/shared/components/AuthInitializer";

export const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <Suspense fallback={null}>
      <ThemeProvider
        attribute="class"
        defaultTheme="dark"
        enableSystem
        disableTransitionOnChange
      >
        <QueryProvider>
          <AuthInitializer>{children}</AuthInitializer>
        </QueryProvider>
      </ThemeProvider>
    </Suspense>
  );
};
