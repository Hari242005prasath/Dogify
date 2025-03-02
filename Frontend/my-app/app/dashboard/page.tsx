"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Upload, Dog, Loader2 } from "lucide-react"
import { toast } from "sonner"  // Updated to Sonner
import { useAuth } from "@/components/auth-provider"
import { useRouter } from "next/navigation"

export default function DashboardPage() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [preview, setPreview] = useState<string | null>(null)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [result, setResult] = useState<{ breed: string; confidence: number } | null>(null)
  const { user, addClassification } = useAuth()
  const router = useRouter()

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0]
      setSelectedFile(file)

      // Create preview
      const reader = new FileReader()
      reader.onload = (event) => {
        setPreview(event.target?.result as string)
      }
      reader.readAsDataURL(file)

      // Reset result
      setResult(null)
    }
  }

  const analyzeImage = async () => {
    if (!selectedFile) {
      toast.error("No image selected", { description: "Please select an image to analyze." })
      return
    }

    setIsAnalyzing(true)

    try {
      await new Promise((resolve) => setTimeout(resolve, 2000))

      const mockBreeds = [
        "Labrador Retriever",
        "German Shepherd",
        "Golden Retriever",
        "Bulldog",
        "Beagle",
        "Poodle",
        "Rottweiler",
        "Yorkshire Terrier",
        "Boxer",
        "Dachshund",
        "Siberian Husky",
        "Great Dane",
      ]

      const mockResult = {
        breed: mockBreeds[Math.floor(Math.random() * mockBreeds.length)],
        confidence: Math.round((0.7 + Math.random() * 0.29) * 100) / 100,
      }

      setResult(mockResult)

      if (user) {
        addClassification({
          id: Date.now().toString(),
          imageUrl: preview as string,
          breed: mockResult.breed,
          confidence: mockResult.confidence,
          date: new Date().toISOString(),
        })
      }

      toast.success("Analysis complete", {
        description: `This appears to be a ${mockResult.breed} with ${(mockResult.confidence * 100).toFixed(1)}% confidence.`,
      })
    } catch (error) {
      toast.error("Analysis failed", { description: "There was a problem analyzing your image." })
    } finally {
      setIsAnalyzing(false)
    }
  }

  const viewHistory = () => {
    router.push("/dashboard/history")
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Welcome back, {user?.name}!</h2>
          <p className="text-muted-foreground">Upload a dog image to identify its breed.</p>
        </div>
        <Button onClick={viewHistory} variant="outline">
          View History
        </Button>
      </div>
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Upload Image</CardTitle>
            <CardDescription>Select a clear image of a dog for the best results</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex flex-col items-center justify-center gap-4">
              <div
                className="relative flex h-64 w-full cursor-pointer flex-col items-center justify-center rounded-md border border-dashed border-muted-foreground/25 p-4 text-center transition-colors hover:bg-muted/25"
                onClick={() => document.getElementById("image-upload")?.click()}
              >
                {preview ? (
                  <img
                    src={preview || "/placeholder.svg"}
                    alt="Dog preview"
                    className="h-full w-full object-contain"
                    
                  />
                ) : (
                  <>
                    <Upload className="mb-2 h-10 w-10 text-muted-foreground" />
                    <p className="text-sm text-muted-foreground">Drag and drop or click to upload</p>
                    <p className="text-xs text-muted-foreground">Supports JPG, PNG, WEBP</p>
                  </>
                )}
                <input id="image-upload" type="file" accept="image/*" className="hidden" onChange={handleFileChange} />
              </div>
              <Button onClick={analyzeImage} className="w-full" disabled={!selectedFile || isAnalyzing}>
                {isAnalyzing ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Analyzing...
                  </>
                ) : (
                  <>
                    <Dog className="mr-2 h-4 w-4" />
                    Identify Breed
                  </>
                )}
              </Button>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Results</CardTitle>
            <CardDescription>{result ? "Analysis complete" : "Upload an image to see results"}</CardDescription>
          </CardHeader>
          <CardContent>
            {result ? (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <p className="text-sm font-medium leading-none">Breed</p>
                    <p className="text-xl font-bold">{result.breed}</p>
                  </div>
                  <div className="space-y-1 text-right">
                    <p className="text-sm font-medium leading-none">Confidence</p>
                    <p className="text-xl font-bold">{(result.confidence * 100).toFixed(1)}%</p>
                  </div>
                </div>
                <div className="h-2 w-full rounded-full bg-muted">
                  <div className="h-full rounded-full bg-primary" style={{ width: `${result.confidence * 100}%` }} />
                </div>
                <div className="pt-4">
                  <h4 className="mb-2 text-sm font-medium">About this breed:</h4>
                  <p className="text-sm text-muted-foreground">
                    {result.breed}s are known for their {result.confidence > 0.9 ? "distinctive" : "unique"} appearance
                    and {result.confidence > 0.85 ? "friendly" : "loyal"} temperament. They make excellent companions
                    and are popular pets worldwide.
                  </p>
                </div>
              </div>
            ) : (
              <div className="flex h-[200px] flex-col items-center justify-center text-center">
                <Dog className="mb-2 h-10 w-10 text-muted-foreground" />
                <p className="text-sm text-muted-foreground">
                  {isAnalyzing ? "Analyzing your image..." : "No results to display yet"}
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

