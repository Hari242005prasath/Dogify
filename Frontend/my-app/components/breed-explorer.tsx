"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { PawPrintIcon as Paw, Heart, Weight, Ruler } from "lucide-react"

const breeds = [
  {
    name: "Labrador Retriever",
    image: "/placeholder.svg?height=300&width=300",
    temperament: ["Friendly", "Active", "Outgoing"],
    weight: "55-80 lbs",
    height: "21.5-24.5 inches",
    lifeExpectancy: "10-12 years",
  },
  {
    name: "German Shepherd",
    image: "/placeholder.svg?height=300&width=300",
    temperament: ["Loyal", "Intelligent", "Confident"],
    weight: "50-90 lbs",
    height: "22-26 inches",
    lifeExpectancy: "7-10 years",
  },
  {
    name: "Golden Retriever",
    image: "/placeholder.svg?height=300&width=300",
    temperament: ["Intelligent", "Friendly", "Devoted"],
    weight: "55-75 lbs",
    height: "21.5-24 inches",
    lifeExpectancy: "10-12 years",
  },
  {
    name: "French Bulldog",
    image: "/placeholder.svg?height=300&width=300",
    temperament: ["Playful", "Adaptable", "Smart"],
    weight: "16-28 lbs",
    height: "11-13 inches",
    lifeExpectancy: "10-12 years",
  },
  {
    name: "Bulldog",
    image: "/placeholder.svg?height=300&width=300",
    temperament: ["Friendly", "Calm", "Courageous"],
    weight: "40-50 lbs",
    height: "14-15 inches",
    lifeExpectancy: "8-10 years",
  },
]

export function BreedExplorer() {
  const [currentBreed, setCurrentBreed] = useState(0)
  const [direction, setDirection] = useState(0)

  const nextBreed = () => {
    setDirection(1)
    setCurrentBreed((prev) => (prev + 1) % breeds.length)
  }

  const prevBreed = () => {
    setDirection(-1)
    setCurrentBreed((prev) => (prev - 1 + breeds.length) % breeds.length)
  }

  const breed = breeds[currentBreed]

  const variants = {
    enter: (direction: number) => {
      return {
        x: direction > 0 ? 1000 : -1000,
        opacity: 0,
      }
    },
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => {
      return {
        zIndex: 0,
        x: direction < 0 ? 1000 : -1000,
        opacity: 0,
      }
    },
  }

  return (
    <section className="py-20 bg-gradient-to-b from-background to-muted/50">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <Badge variant="outline" className="px-3 py-1">
            <Paw className="mr-1 h-3 w-3 text-primary" />
            Breed Explorer
          </Badge>
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Discover Dog Breeds</h2>
          <p className="max-w-[700px] text-muted-foreground md:text-xl">
            Explore different dog breeds and learn about their characteristics.
          </p>
        </div>
        <div className="mt-12 flex flex-col items-center">
          <AnimatePresence initial={false} custom={direction}>
            <motion.div
              key={currentBreed}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                x: { type: "spring", stiffness: 300, damping: 30 },
                opacity: { duration: 0.2 },
              }}
            >
              <Card className="w-full max-w-3xl overflow-hidden">
                <div className="md:flex">
                  <div className="md:w-1/2">
                    <img
                      src={breed.image || "/placeholder.svg"}
                      alt={breed.name}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <CardContent className="p-6 md:w-1/2">
                    <h3 className="text-2xl font-bold mb-4">{breed.name}</h3>
                    <div className="space-y-4">
                      <div className="flex items-center">
                        <Heart className="h-5 w-5 text-primary mr-2" />
                        <span className="font-medium">Temperament:</span>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {breed.temperament.map((trait) => (
                          <Badge key={trait} variant="secondary">
                            {trait}
                          </Badge>
                        ))}
                      </div>
                      <div className="flex items-center">
                        <Weight className="h-5 w-5 text-primary mr-2" />
                        <span className="font-medium">Weight:</span> {breed.weight}
                      </div>
                      <div className="flex items-center">
                        <Ruler className="h-5 w-5 text-primary mr-2" />
                        <span className="font-medium">Height:</span> {breed.height}
                      </div>
                      <div className="flex items-center">
                        <Heart className="h-5 w-5 text-primary mr-2" />
                        <span className="font-medium">Life Expectancy:</span> {breed.lifeExpectancy}
                      </div>
                    </div>
                  </CardContent>
                </div>
              </Card>
            </motion.div>
          </AnimatePresence>
          <div className="mt-8 flex justify-center gap-4">
            <Button onClick={prevBreed} variant="outline">
              Previous Breed
            </Button>
            <Button onClick={nextBreed}>Next Breed</Button>
          </div>
        </div>
      </div>
    </section>
  )
}

