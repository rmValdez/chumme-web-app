import { Navbar } from "@/modules/shared/components/Navbar";
import { Hero } from "@/modules/landing/components/Hero";
import { Card } from "@/modules/shared/components/Card";
import { Button } from "@/modules/shared/components/Button";

export default function Home() {
  return (
    <div className="min-h-screen bg-background-primary text-text-primary selection:bg-brand-vibrant/30">
      <Navbar />

      <main>
        <Hero />

        {/* Features Section */}
        <section id="features" className="max-w-7xl mx-auto px-6 py-24">
          <div className="flex flex-col items-center text-center space-y-4 mb-16">
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight">
              Crafted for <span className="text-gradient-pink">Connection</span>
            </h2>
            <p className="text-text-secondary max-w-xl">
              Every feature is designed to foster deeper relationships and more
              engaging discussions.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="space-y-4 group">
              <div className="w-12 h-12 rounded-xl bg-brand-vibrant/10 flex items-center justify-center text-brand-vibrant border border-brand-vibrant/20 transition-all duration-300 group-hover:scale-110 group-hover:bg-brand-vibrant group-hover:text-white">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M17 6.1H3" />
                  <path d="M21 12.1H3" />
                  <path d="M15.1 18.1H3" />
                </svg>
              </div>
              <h3 className="text-xl font-bold">Dynamic Circles</h3>
              <p className="text-text-tertiary">
                Create or join circles based on your interests. High-fidelity
                audio and instant messaging keep the vibe alive.
              </p>
            </Card>

            <Card className="space-y-4 group">
              <div className="w-12 h-12 rounded-xl bg-brand-vibrant/10 flex items-center justify-center text-brand-vibrant border border-brand-vibrant/20 transition-all duration-300 group-hover:scale-110 group-hover:bg-brand-vibrant group-hover:text-white">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="12" cy="12" r="10" />
                  <path d="m9 12 2 2 4-4" />
                </svg>
              </div>
              <h3 className="text-xl font-bold">Safe & Private</h3>
              <p className="text-text-tertiary">
                Privacy is at our core. Advanced moderation tools and encryption
                ensure a safe space for everyone.
              </p>
            </Card>

            <Card className="space-y-4 group">
              <div className="w-12 h-12 rounded-xl bg-brand-vibrant/10 flex items-center justify-center text-brand-vibrant border border-brand-vibrant/20 transition-all duration-300 group-hover:scale-110 group-hover:bg-brand-vibrant group-hover:text-white">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold">Rich Interactions</h3>
              <p className="text-text-tertiary">
                Beyond text. React, share media, and participate in live events
                with fluid, premium interactions.
              </p>
            </Card>
          </div>
        </section>

        {/* CTA Section */}
        <section className="max-w-5xl mx-auto px-6 py-24 text-center">
          <Card
            variant="glass"
            className="py-20 flex flex-col items-center space-y-8 bg-gradient-to-br from-brand-vibrant/5 to-transparent border-brand-vibrant/10"
          >
            <h2 className="text-3xl md:text-6xl font-bold tracking-tight">
              Ready to join the <br />{" "}
              <span className="text-gradient-pink">Future?</span>
            </h2>
            <p className="text-text-secondary max-w-lg">
              Claim your username today and start building your own corner of
              the internet.
            </p>
            <div className="flex items-center space-x-4">
              <Button size="lg">Get Started Now</Button>
            </div>
          </Card>
        </section>
      </main>

      <footer className="border-t border-border-default/50 py-12 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between text-text-quaternary text-sm">
          <p>© 2026 Chumme. All rights reserved.</p>
          <div className="flex space-x-8 mt-4 md:mt-0">
            <a href="#" className="hover:text-text-primary transition-colors">
              Privacy
            </a>
            <a href="#" className="hover:text-text-primary transition-colors">
              Terms
            </a>
            <a href="#" className="hover:text-text-primary transition-colors">
              Contact
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
