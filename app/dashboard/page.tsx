import { Navbar } from "@/modules/shared/components/Navbar";
import { Card } from "@/modules/shared/components/Card";
import { Button } from "@/modules/shared/components/Button";
import { RouteGuard } from "@/modules/shared/components/RouteGuard";

export default function OnboardingPage() {
  return (
    <RouteGuard>
      <div className="min-h-screen bg-background-primary text-text-primary">
        <Navbar />

        <main className="max-w-4xl mx-auto px-6 pt-48 pb-24 text-center">
          <Card variant="glass" className="space-y-8 py-16">
            <div className="space-y-4">
              <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
                Welcome to <span className="text-gradient-pink">Chumme.</span>
              </h1>
              <p className="text-text-secondary text-lg">
                Let&apos;s get your profile set up so you can start connecting.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
              <div className="space-y-2">
                <label className="text-sm font-medium text-text-tertiary uppercase tracking-widest">
                  Username
                </label>
                <input
                  type="text"
                  placeholder="chumme_user"
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-brand-vibrant transition-colors"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-text-tertiary uppercase tracking-widest">
                  Display Name
                </label>
                <input
                  type="text"
                  placeholder="John Doe"
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-brand-vibrant transition-colors"
                />
              </div>
            </div>

            <Button size="lg" className="w-full md:w-auto">
              Complete Profile
            </Button>
          </Card>
        </main>
      </div>
    </RouteGuard>
  );
}
