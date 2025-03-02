"use client"

import { Toaster as SonnerToaster, toast } from "sonner"

export function Toaster() {
  return <SonnerToaster position="top-right" richColors />
}

export function useToast() {
  return { 
    toast: ({ title, description, variant }) => {
      toast[variant === "destructive" ? "error" : "success"](
        title,
        { description }
      )
    }
  }
}