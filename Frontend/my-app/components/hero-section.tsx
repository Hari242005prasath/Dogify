import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowRight, Dog } from "lucide-react"

export function HeroSection() {
  return (
    <section className="relative overflow-hidden py-20 md:py-32 hero-gradient">
      <div className="container px-4 md:px-6">
        <div className="grid gap-12 md:grid-cols-2 md:gap-16 items-center">
          <div className="flex flex-col gap-6">
            <div className="inline-flex items-center gap-2 rounded-full bg-muted px-4 py-1.5">
              <span className="text-xs font-medium">New AI Technology</span>
              <span className="flex h-1.5 w-1.5 rounded-full bg-primary"></span>
              <span className="text-xs font-medium">99% Accuracy</span>
            </div>
            <div className="space-y-4">
              <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl">
                Identify Any <span className="gradient-text">Dog Breed</span> in Seconds
              </h1>
              <p className="text-muted-foreground md:text-xl max-w-[600px]">
                Our advanced AI technology can identify over 350 dog breeds with incredible accuracy. Perfect for dog
                lovers, vets, and shelters.
              </p>
            </div>
            <div className="flex flex-col gap-3 min-[400px]:flex-row">
              <Link href="/signup">
                <Button size="lg" className="h-12 px-6">
                  Get Started
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link href="/services">
                <Button size="lg" variant="outline" className="h-12 px-6">
                  Explore Services
                </Button>
              </Link>
            </div>
            <div className="flex items-center gap-4 text-sm">
              <div className="flex -space-x-2">
                <img
                  alt="User"
                  className="h-8 w-8 rounded-full border-2 border-background"
                  src="/placeholder.svg?height=32&width=32"
                />
                <img
                  alt="User"
                  className="h-8 w-8 rounded-full border-2 border-background"
                  src="/placeholder.svg?height=32&width=32"
                />
                <img
                  alt="User"
                  className="h-8 w-8 rounded-full border-2 border-background"
                  src="/placeholder.svg?height=32&width=32"
                />
                <img
                  alt="User"
                  className="h-8 w-8 rounded-full border-2 border-background"
                  src="/placeholder.svg?height=32&width=32"
                />
              </div>
              <div className="text-muted-foreground">
                Trusted by <span className="font-medium text-foreground">10,000+</span> dog lovers
              </div>
            </div>
          </div>
          <div className="relative flex items-center justify-center">
            <div className="relative h-[400px] w-[400px] overflow-hidden rounded-2xl border shadow-xl">
              <img
                alt="Dog breed identification"
                className="object-cover w-full h-full"
                src="/images/gr.jpg"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6 text-white">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-xl font-bold">Golden Retriever</h3>
                    <p className="text-sm opacity-90">Friendly, intelligent, devoted</p>
                  </div>
                  <div className="flex items-center gap-1 rounded-full bg-primary/90 px-3 py-1 text-sm font-medium">
                    <Dog className="h-4 w-4" />
                    99.8% Match
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

