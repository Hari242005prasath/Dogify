"use client"

import type React from "react"

import { createContext, useContext, useState, useEffect } from "react"

type User = {
  name: string
  email: string
}

type Classification = {
  id: string
  imageUrl: string
  breed: string
  confidence: number
  date: string
}

type AuthContextType = {
  user: User | null
  login: (user: User) => void
  logout: () => void
  classifications: Classification[]
  addClassification: (classification: Classification) => void
  removeClassification: (id: string) => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [classifications, setClassifications] = useState<Classification[]>([])

  // Load user from localStorage on mount
  useEffect(() => {
    const storedUser = localStorage.getItem("user")
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }

    const storedClassifications = localStorage.getItem("classifications")
    if (storedClassifications) {
      setClassifications(JSON.parse(storedClassifications))
    }
  }, [])

  // Save user to localStorage when it changes
  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user))
    } else {
      localStorage.removeItem("user")
    }
  }, [user])

  // Save classifications to localStorage when they change
  useEffect(() => {
    localStorage.setItem("classifications", JSON.stringify(classifications))
  }, [classifications])

  const login = (userData: User) => {
    setUser(userData)
  }

  const logout = () => {
    setUser(null)
  }

  const addClassification = (classification: Classification) => {
    setClassifications((prev) => [classification, ...prev])
  }

  const removeClassification = (id: string) => {
    setClassifications((prev) => prev.filter((item) => item.id !== id))
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        classifications,
        addClassification,
        removeClassification,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}

