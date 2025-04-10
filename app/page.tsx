import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Mail, Shield, Zap, ArrowRight, Star, Clock, CheckCircle2, Lock } from "lucide-react"
import { AnimatedBackground, AnimatedCTABackground } from "@/components/animated-background"

export default function Home() {
  return (
    <div className="flex flex-col">
      {/* Animated Background Elements */}
      <AnimatedBackground />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-b from-white to-gray-50 py-16 md:py-28">
        <div className="container flex flex-col items-center text-center">
          <div className="inline-flex items-center rounded-full bg-gradient-to-r from-[#cc0000]/20 to-[#0033cc]/20 px-4 py-1.5 text-sm font-medium text-[#cc0000]">
            <Star className="mr-1 h-3.5 w-3.5 text-yellow-500 animate-pulse" />
            <span>New Premium Features: Lock & Custom Inboxes</span>
          </div>

          <h1 className="mt-8 text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
            Temporary Email,{" "}
            <span className="relative">
              <span className="relative z-10 bg-gradient-to-r from-[#cc0000] to-[#ff3333] bg-clip-text text-transparent">
                Permanent
              </span>
              <span className="absolute -bottom-2 left-0 z-0 h-3 w-full bg-gradient-to-r from-[#cc0000]/40 to-[#cc0000]/20"></span>
            </span>{" "}
            Peace of Mind.
          </h1>

          <p className="mt-6 max-w-[600px] text-lg text-muted-foreground">
            Create disposable inboxes in seconds. Protect your privacy without compromising convenience.
          </p>

          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <Button
              asChild
              size="lg"
              className="group relative overflow-hidden bg-gradient-to-r from-[#cc0000] to-[#aa0000] text-white hover:from-[#aa0000] hover:to-[#880000] transition-all duration-300"
            >
              <Link href="/login" className="flex items-center">
                <span className="relative z-10">Get Started</span>
                <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1 relative z-10" />
                <span className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity duration-300"></span>
              </Link>
            </Button>

            <Button
              asChild
              variant="outline"
              size="lg"
              className="border-[#0033cc] text-[#0033cc] hover:bg-[#0033cc]/10 transition-all duration-300"
            >
              <Link href="#features">See How It Works</Link>
            </Button>
          </div>

          <div className="mt-16 flex items-center justify-center">
            <div className="relative mx-auto max-w-3xl overflow-hidden rounded-xl border shadow-2xl transition-all duration-300 hover:shadow-xl group">
              <div className="absolute inset-0 bg-gradient-to-r from-[#cc0000]/10 to-[#0033cc]/10 opacity-30 group-hover:opacity-50 transition-opacity duration-500"></div>
              <Image
                src="/placeholder.svg?height=600&width=1200"
                alt="FemiliKite Dashboard Preview"
                width={1200}
                height={600}
                className="h-auto w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <div className="bg-black/50 text-white px-6 py-3 rounded-full backdrop-blur-sm">Preview Dashboard</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="relative py-20">
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-gray-50 to-white"></div>
        <div className="absolute inset-0 -z-10 bg-[url('/placeholder.svg?height=100&width=100')] bg-center opacity-5"></div>

        <div className="container">
          <div className="mx-auto mb-12 max-w-xl text-center">
            <span className="inline-block rounded-full bg-gradient-to-r from-[#cc0000]/20 to-[#0033cc]/20 px-3 py-1 text-sm font-medium text-[#cc0000] mb-4">
              Premium Features
            </span>
            <h2 className="text-3xl font-bold bg-gradient-to-r from-[#cc0000] to-[#0033cc] bg-clip-text text-transparent">
              Why Choose FemiliKite?
            </h2>
            <p className="mt-4 text-muted-foreground">
              Our temporary email service combines simplicity with powerful features to keep your inbox clean and your
              privacy intact.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            <div className="group flex flex-col items-center rounded-xl bg-white p-6 text-center shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-xl">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-[#cc0000]/20 to-[#cc0000]/5 transition-colors duration-300 group-hover:from-[#cc0000]/30 group-hover:to-[#cc0000]/10">
                <Mail className="h-8 w-8 text-[#cc0000]" />
              </div>
              <h3 className="mt-6 text-xl font-medium">Free 20 inboxes/day</h3>
              <p className="mt-4 text-sm text-muted-foreground">
                Create up to 20 disposable email addresses daily with our free plan. No credit card required.
              </p>
              <div className="mt-6 h-1 w-0 bg-gradient-to-r from-[#cc0000] to-[#ff3333] transition-all duration-300 group-hover:w-16"></div>
            </div>

            <div className="group flex flex-col items-center rounded-xl bg-white p-6 text-center shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-xl">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-[#0033cc]/20 to-[#0033cc]/5 transition-colors duration-300 group-hover:from-[#0033cc]/30 group-hover:to-[#0033cc]/10">
                <Shield className="h-8 w-8 text-[#0033cc]" />
              </div>
              <h3 className="mt-6 text-xl font-medium">Privacy-first, no tracking</h3>
              <p className="mt-4 text-sm text-muted-foreground">
                We prioritize your privacy with zero tracking and data collection. Your data stays yours.
              </p>
              <div className="mt-6 h-1 w-0 bg-gradient-to-r from-[#0033cc] to-[#0055ff] transition-all duration-300 group-hover:w-16"></div>
            </div>

            <div className="group flex flex-col items-center rounded-xl bg-white p-6 text-center shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-xl">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-[#cc0000]/20 to-[#0033cc]/20 transition-colors duration-300 group-hover:from-[#cc0000]/30 group-hover:to-[#0033cc]/30">
                <Zap className="h-8 w-8 text-[#cc0000]" />
              </div>
              <h3 className="mt-6 text-xl font-medium">Premium tools & custom inbox</h3>
              <p className="mt-4 text-sm text-muted-foreground">
                Upgrade for unlimited inboxes, custom email addresses, and advanced management tools.
              </p>
              <div className="mt-6 h-1 w-0 bg-gradient-to-r from-[#cc0000] to-[#0033cc] transition-all duration-300 group-hover:w-16"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Premium Features Showcase */}
      <section className="py-16 bg-gradient-to-b from-white to-gray-50">
        <div className="container">
          <div className="mx-auto mb-12 max-w-xl text-center">
            <h2 className="text-3xl font-bold">Upgrade to Premium</h2>
            <p className="mt-4 text-muted-foreground">
              Unlock powerful features to take control of your temporary email experience
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            <div className="relative overflow-hidden rounded-xl border border-[#0033cc]/20 bg-white p-6 shadow-sm transition-all duration-300 hover:shadow-md">
              <div className="absolute -right-6 -top-6 h-24 w-24 rounded-full bg-[#0033cc]/10"></div>
              <div className="relative">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-[#0033cc]/20">
                  <CheckCircle2 className="h-6 w-6 text-[#0033cc]" />
                </div>
                <h3 className="mb-2 text-xl font-medium">Custom Inbox Names</h3>
                <p className="text-sm text-muted-foreground">
                  Choose your own inbox names instead of random generated ones. Perfect for organizing different
                  signups.
                </p>
              </div>
            </div>

            <div className="relative overflow-hidden rounded-xl border border-[#cc0000]/20 bg-white p-6 shadow-sm transition-all duration-300 hover:shadow-md">
              <div className="absolute -right-6 -top-6 h-24 w-24 rounded-full bg-[#cc0000]/10"></div>
              <div className="relative">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-[#cc0000]/20">
                  <Lock className="h-6 w-6 text-[#cc0000]" />
                </div>
                <h3 className="mb-2 text-xl font-medium">Lock Inboxes</h3>
                <p className="text-sm text-muted-foreground">
                  Prevent important inboxes from expiring. Keep them active for as long as you need them.
                </p>
              </div>
            </div>

            <div className="relative overflow-hidden rounded-xl border border-[#0033cc]/20 bg-white p-6 shadow-sm transition-all duration-300 hover:shadow-md">
              <div className="absolute -right-6 -top-6 h-24 w-24 rounded-full bg-[#0033cc]/10"></div>
              <div className="relative">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-[#0033cc]/20">
                  <Clock className="h-6 w-6 text-[#0033cc]" />
                </div>
                <h3 className="mb-2 text-xl font-medium">Claimed Inboxes</h3>
                <p className="text-sm text-muted-foreground">
                  Reserve permanent inboxes that never expire. Perfect for long-term use with important services.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="bg-white py-16">
        <div className="container">
          <div className="mx-auto mb-12 max-w-xl text-center">
            <span className="inline-block rounded-full bg-gradient-to-r from-[#cc0000]/20 to-[#0033cc]/20 px-3 py-1 text-sm font-medium text-[#cc0000] mb-4">
              Trusted by Thousands
            </span>
            <h2 className="text-3xl font-bold">What Our Users Say</h2>
            <p className="mt-4 text-muted-foreground">
              Join thousands of satisfied users who trust FemiliKite for their temporary email needs.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[
              {
                name: "Alex M.",
                role: "Premium User",
                quote:
                  "FemiliKite has been a game-changer for my online privacy. The interface is intuitive and the service is reliable. Highly recommended!",
              },
              {
                name: "Sarah K.",
                role: "Business Owner",
                quote:
                  "The premium features are worth every penny. I use the locked inboxes for important accounts and the claimed inbox for my business communications.",
              },
              {
                name: "Michael T.",
                role: "Developer",
                quote:
                  "As someone who signs up for many services, FemiliKite helps me keep my main inbox clean while ensuring I don't miss important messages.",
              },
            ].map((testimonial, i) => (
              <div
                key={i}
                className="group rounded-lg bg-gradient-to-br from-white to-gray-50 p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md"
              >
                <div className="mb-4 flex items-center gap-4">
                  <div className="h-12 w-12 overflow-hidden rounded-full bg-gradient-to-br from-[#cc0000]/20 to-[#0033cc]/20">
                    <Image
                      src={`/placeholder.svg?height=48&width=48&text=${testimonial.name.charAt(0)}`}
                      alt={testimonial.name}
                      width={48}
                      height={48}
                    />
                  </div>
                  <div>
                    <h4 className="font-medium">{testimonial.name}</h4>
                    <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                  </div>
                </div>
                <div className="relative">
                  <span className="absolute -left-1 -top-1 text-4xl text-[#cc0000]/20">"</span>
                  <p className="mt-2 text-sm relative z-10 pl-4">{testimonial.quote}</p>
                  <span className="absolute -bottom-4 -right-1 text-4xl text-[#cc0000]/20">"</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-16 text-white overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-[#cc0000] to-[#0033cc] opacity-90"></div>
        <div className="absolute inset-0 bg-[url('/placeholder.svg?height=200&width=200')] bg-center opacity-5"></div>

        {/* Animated shapes */}
        <AnimatedCTABackground />

        <div className="container relative z-10 text-center">
          <h2 className="text-3xl font-bold">Ready to Take Control of Your Inbox?</h2>
          <p className="mx-auto mt-4 max-w-xl">
            Join thousands of users who trust FemiliKite for their temporary email needs. Get started for free today.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-white text-[#cc0000] hover:bg-gray-100 transition-all duration-300">
              <Link href="/login">Create Your First Inbox</Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="border-white bg-white text-[#0033cc] hover:bg-white/90 hover:text-[#002299] transition-all duration-300"
            >
              <Link href="/billing">View Premium Plans</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
