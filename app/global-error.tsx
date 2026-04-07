"use client";

import { ThemeProvider } from "@/modules/shared/components/ThemeProvider";
import { QueryProvider } from "@/modules/shared/providers/QueryProvider";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="en">
      <body className="bg-black text-white">
        <ThemeProvider attribute="class" defaultTheme="dark">
          <QueryProvider>
            <div className="flex min-h-screen items-center justify-center font-sans">
              <div className="text-center p-8 max-w-md border border-white/10 bg-white/5 rounded-2xl">
                <h2 className="text-2xl font-bold mb-4">Critical Error</h2>
                <p className="text-white/60 mb-6 text-sm">
                  A catastrophic error occurred.
                </p>
                <button
                  onClick={() => reset()}
                  className="px-6 py-3 bg-[#d3427b] text-white font-semibold rounded-xl"
                >
                  Refresh Application
                </button>
              </div>
            </div>
          </QueryProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
