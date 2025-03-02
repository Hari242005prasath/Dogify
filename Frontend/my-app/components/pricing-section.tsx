import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Check } from "lucide-react"

export function PricingSection() {
  const plans = [
    {
      name: "Free",
      description: "Basic breed identification for casual users.",
      price: "$0",
      period: "forever",
      features: ["10 breed identifications per month", "Basic breed information", "Community access", "Email support"],
      buttonText: "Get Started",
      buttonVariant: "outline" as const,
    },
    {
      name: "Pro",
      description: "Advanced features for dog enthusiasts.",
      price: "$9.99",
      period: "per month",
      features: [
        "Unlimited breed identifications",
        "Detailed breed information",
        "Health insights and recommendations",
        "Breed comparison tool",
        "Priority support",
      ],
      buttonText: "Subscribe",
      buttonVariant: "default" as const,
      popular: true,
    },
    {
      name: "Business",
      description: "For veterinarians, shelters, and professionals.",
      price: "$29.99",
      period: "per month",
      features: [
        "Everything in Pro",
        "Multiple user accounts",
        "API access",
        "Advanced analytics",
        "Dedicated support",
        "Custom branding",
      ],
      buttonText: "Contact Sales",
      buttonVariant: "outline" as const,
    },
  ]

  return (
    <section className="py-20 bg-muted/30">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <Badge variant="outline" className="px-3 py-1">
            Pricing
          </Badge>
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Simple, Transparent Pricing</h2>
          <p className="max-w-[700px] text-muted-foreground md:text-xl">
            Choose the plan that's right for you. All plans include a 14-day free trial.
          </p>
        </div>
        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 py-12 md:grid-cols-3">
          {plans.map((plan, index) => (
            <Card key={index} className={`relative ${plan.popular ? "border-primary shadow-lg" : ""}`}>
              {plan.popular && (
                <Badge className="absolute -top-2 right-4 bg-primary text-primary-foreground">Most Popular</Badge>
              )}
              <CardHeader>
                <CardTitle>{plan.name}</CardTitle>
                <CardDescription>{plan.description}</CardDescription>
                <div className="mt-4">
                  <span className="text-4xl font-bold">{plan.price}</span>
                  <span className="text-muted-foreground"> / {plan.period}</span>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-center">
                      <Check className="mr-2 h-4 w-4 text-primary" />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter>
                <Button variant={plan.buttonVariant} className="w-full">
                  {plan.buttonText}
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

