"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { motion } from "framer-motion"

const quizQuestions = [
  {
    image: "/images/lab.jpg",
    options: ["Labrador Retriever", "Golden Retriever", "German Shepherd", "Bulldog"],
    correctAnswer: "Labrador Retriever",
  },
  {
    image: "/images/nep.jpg",
    options: ["Poodle", "Bichon Frise", "Maltese", "Shih Tzu"],
    correctAnswer: "Poodle",
  },
  {
    image: "/images/po.jpg",
    options: ["Beagle", "Basset Hound", "Dachshund", "Jack Russell Terrier"],
    correctAnswer: "Beagle",
  },
  // Add more questions as needed
]

export function BreedQuiz() {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [score, setScore] = useState(0)
  const [showResult, setShowResult] = useState(false)
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null)

  const handleAnswer = (answer: string) => {
    setSelectedAnswer(answer)
    if (answer === quizQuestions[currentQuestion].correctAnswer) {
      setScore(score + 1)
    }
    setTimeout(() => {
      if (currentQuestion < quizQuestions.length - 1) {
        setCurrentQuestion(currentQuestion + 1)
        setSelectedAnswer(null)
      } else {
        setShowResult(true)
      }
    }, 1000)
  }

  const restartQuiz = () => {
    setCurrentQuestion(0)
    setScore(0)
    setShowResult(false)
    setSelectedAnswer(null)
  }

  const question = quizQuestions[currentQuestion]

  return (
    <section className="py-20 bg-gradient-to-b from-muted/50 to-background">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <Badge variant="outline" className="px-3 py-1">
            Breed Quiz
          </Badge>
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Test Your Breed Knowledge</h2>
          <p className="max-w-[700px] text-muted-foreground md:text-xl">
            Can you identify these dog breeds? Take the quiz and find out!
          </p>
        </div>
        <div className="mt-12 flex justify-center">
          <Card className="w-full max-w-3xl">
            <CardContent className="p-6">
              {showResult ? (
                <div className="text-center">
                  <h3 className="text-2xl font-bold mb-4">Quiz Complete!</h3>
                  <p className="text-xl mb-4">
                    Your score: {score} out of {quizQuestions.length}
                  </p>
                  <Button onClick={restartQuiz}>Restart Quiz</Button>
                </div>
              ) : (
                <>
                  <img
                    src={question.image || "/placeholder.svg"}
                    alt="Dog breed"
                    className="w-full h-64 object-cover rounded-lg mb-6"
                  />
                  <div className="grid grid-cols-2 gap-4">
                    {question.options.map((option) => (
                      <motion.div key={option} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                        <Button
                          onClick={() => handleAnswer(option)}
                          className="w-full"
                          variant={
                            selectedAnswer === option
                              ? option === question.correctAnswer
                                ? "default"
                                : "destructive"
                              : "outline"
                          }
                          disabled={selectedAnswer !== null}
                        >
                          {option}
                        </Button>
                      </motion.div>
                    ))}
                  </div>
                  <p className="mt-4 text-center text-sm text-muted-foreground">
                    Question {currentQuestion + 1} of {quizQuestions.length}
                  </p>
                </>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}

