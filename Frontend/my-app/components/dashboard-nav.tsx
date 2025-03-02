"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Dog, History, Settings, Upload } from "lucide-react"

const items = [
  {
    title: "Upload",
    href: "/dashboard",
    icon: Upload,
  },
  {
    title: "History",
    href: "/dashboard/history",
    icon: History,
  },
  {
    title: "Settings",
    href: "/dashboard/settings",
    icon: Settings,
  },
]

export function DashboardNav() {
  const pathname = usePathname()

  return (
    <nav className="grid items-start gap-2 p-4 text-sm font-medium">
      <h2 className="mb-2 px-2 text-lg font-semibold tracking-tight">Dashboard</h2>
      {items.map((item) => (
        <Link key={item.href} href={item.href}>
          <Button
            variant={pathname === item.href ? "secondary" : "ghost"}
            className={cn(
              "w-full justify-start",
              pathname === item.href ? "bg-secondary" : "hover:bg-transparent hover:underline",
            )}
          >
            <item.icon className="mr-2 h-4 w-4" />
            {item.title}
          </Button>
        </Link>
      ))}
      <div className="mt-6 rounded-md border p-4">
        <div className="flex items-center gap-2">
          <Dog className="h-5 w-5 text-primary" />
          <h3 className="font-semibold">Pro Features</h3>
        </div>
        <p className="mt-2 text-xs text-muted-foreground">
          Upgrade to access breed details, health information, and training tips.
        </p>
        <Button className="mt-3 w-full" size="sm">
          Upgrade
        </Button>
      </div>
    </nav>
  )
}

