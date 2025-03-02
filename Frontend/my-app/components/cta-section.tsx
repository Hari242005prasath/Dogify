import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

export function CtaSection() {
  return (
    <section className="py-20">
      <div className="container px-4 md:px-6">
        <div className="relative overflow-hidden rounded-3xl bg-primary">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/90 to-primary"></div>
          <div className="relative grid gap-6 py-12 px-6 md:grid-cols-2 md:gap-12 md:py-16 md:px-12 lg:py-20 lg:px-16">
            <div className="flex flex-col justify-center space-y-6">
              <div className="space-y-4">
                <h2 className="text-3xl font-bold tracking-tighter text-white sm:text-4xl md:text-5xl">
                  Ready to Discover Your Dog's Breed?
                </h2>
                <p className="text-white/90 md:text-xl">
                  Join thousands of dog lovers who use PawID to learn more about their furry friends.
                </p>
              </div>
              <div className="flex flex-col gap-3 min-[400px]:flex-row">
                <Link href="/signup">
                  <Button size="lg" className="h-12 px-6 bg-white text-primary hover:bg-white/90">
                    Get Started
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <Link href="/services">
                  <Button size="lg" variant="outline" className="h-12 px-6 text-white border-white hover:bg-white/10">
                    Learn More
                  </Button>
                </Link>
              </div>
            </div>
            <div className="flex items-center justify-center">
              <div className="relative h-[300px] w-[300px] overflow-hidden rounded-2xl border-4 border-white/20 shadow-2xl">
                <img
                  alt="Happy dog"
                  className="object-cover w-full h-full"
                  src="/images/happy.jpg"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

