import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Star, Quote } from "lucide-react"

export function TestimonialSection() {
  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Veterinarian",
      image: "/placeholder.svg?height=40&width=40",
      content:
        "PawID has revolutionized how I identify breeds in my practice. The accuracy is incredible, and it saves me so much time.",
      rating: 5,
    },
    {
      name: "Michael Chen",
      role: "Dog Shelter Manager",
      image: "/placeholder.svg?height=40&width=40",
      content:
        "We use PawID daily at our shelter to help match dogs with the right families. It's been a game-changer for our adoption process.",
      rating: 5,
    },
    {
      name: "Emily Rodriguez",
      role: "Dog Owner",
      image: "/placeholder.svg?height=40&width=40",
      content:
        "I adopted a mixed breed dog and was curious about his heritage. PawID identified his breeds with amazing detail. Highly recommend!",
      rating: 4,
    },
  ]

  return (
    <section className="py-20">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <Badge variant="outline" className="px-3 py-1">
            <Quote className="mr-1 h-3 w-3 text-primary" />
            Testimonials
          </Badge>
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
            Trusted by Dog Lovers Everywhere
          </h2>
          <p className="max-w-[700px] text-muted-foreground md:text-xl">
            See what our users are saying about their experience with PawID.
          </p>
        </div>
        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 py-12 md:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="border-0 shadow-md">
              <CardContent className="p-6">
                <div className="flex items-center space-x-1 mb-4">
                  {Array(testimonial.rating)
                    .fill(0)
                    .map((_, i) => (
                      <Star key={i} className="h-5 w-5 fill-primary text-primary" />
                    ))}
                  {Array(5 - testimonial.rating)
                    .fill(0)
                    .map((_, i) => (
                      <Star key={i} className="h-5 w-5 text-muted" />
                    ))}
                </div>
                <p className="mb-6 text-muted-foreground">"{testimonial.content}"</p>
                <div className="flex items-center space-x-3">
                  <Avatar>
                    <AvatarImage src={testimonial.image} alt={testimonial.name} />
                    <AvatarFallback>{testimonial.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-sm font-medium">{testimonial.name}</p>
                    <p className="text-xs text-muted-foreground">{testimonial.role}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

