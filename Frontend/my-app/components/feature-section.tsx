import { Badge } from "@/components/ui/badge"
import { Brain, Database, Heart, Search, Shield, Sparkles, Users } from "lucide-react"

export function FeatureSection() {
  const features = [
    {
      icon: <Brain className="h-10 w-10 text-primary" />,
      title: "Advanced AI Technology",
      description: "Our state-of-the-art AI can identify over 350 dog breeds with up to 99% accuracy.",
    },
    {
      icon: <Database className="h-10 w-10 text-primary" />,
      title: "Comprehensive Database",
      description: "Access detailed information about each breed, including temperament, health, and care tips.",
    },
    {
      icon: <Users className="h-10 w-10 text-primary" />,
      title: "Community Features",
      description: "Connect with other dog lovers, share photos, and participate in discussions.",
    },
    {
      icon: <Shield className="h-10 w-10 text-primary" />,
      title: "Secure & Private",
      description: "Your data is always protected with enterprise-grade security and privacy controls.",
    },
    {
      icon: <Heart className="h-10 w-10 text-primary" />,
      title: "Health Insights",
      description: "Get breed-specific health information and common conditions to watch for.",
    },
    {
      icon: <Search className="h-10 w-10 text-primary" />,
      title: "Breed Comparison",
      description: "Compare different dog breeds side by side to find your perfect match.",
    },
  ]

  return (
    <section className="py-20 bg-muted/50">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <Badge variant="outline" className="px-3 py-1">
            <Sparkles className="mr-1 h-3 w-3 text-primary" />
            Features
          </Badge>
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
            Everything You Need to Know About Dogs
          </h2>
          <p className="max-w-[700px] text-muted-foreground md:text-xl">
            Our platform offers comprehensive tools and resources for dog identification, care, and community.
          </p>
        </div>
        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 py-12 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <div key={index} className="feature-card relative overflow-hidden rounded-lg border bg-background p-6">
              <div className="mb-4">{feature.icon}</div>
              <h3 className="mb-2 text-xl font-bold">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

