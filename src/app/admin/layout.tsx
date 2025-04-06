"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { BarChart3, Gift, LayoutDashboard, LogOut, Menu, Package, Users, Award, Trophy, Link2 } from "lucide-react"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

interface AdminLayoutProps {
  children: React.ReactNode
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  const pathname = usePathname()
  const router = useRouter()
  const [isMounted, setIsMounted] = useState(false)

  // Prevent hydration errors
  useEffect(() => {
    setIsMounted(true)
  }, [])

  // Simple auth check - in a real app, this would be more robust
  useEffect(() => {
    // Skip auth check for login page
    if (pathname === "/admin/login") return

    // Check if user is authenticated as admin
    const isAdmin = localStorage.getItem("adminAuthenticated")

    if (!isAdmin && isMounted) {
      router.push("/admin/login")
    }
  }, [pathname, router, isMounted])

  const handleLogout = () => {
    localStorage.removeItem("adminAuthenticated")
    router.push("/admin/login")
  }

  // Don't apply layout to login page
  if (pathname === "/admin/login") {
    return <>{children}</>
  }

  if (!isMounted) {
    return null
  }

  const navigation = [
    { name: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard },
    { name: "Users", href: "/admin/users", icon: Users },
    { name: "Rewards", href: "/admin/rewards", icon: Gift },
    { name: "Campaigns", href: "/admin/campaigns", icon: Award },
    { name: "Tiers", href: "/admin/tiers", icon: Trophy },
    { name: "Transactions", href: "/admin/transactions", icon: BarChart3 },
    { name: "Webhooks", href: "/admin/webhooks", icon: Link2 },
  ]

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon" className="md:hidden">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle navigation menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-72">
            <nav className="grid gap-2 text-lg font-medium">
              <Link href="/" className="flex items-center gap-2 text-lg font-semibold">
                <Package className="h-6 w-6" />
                <span>RewardHub Admin</span>
              </Link>
              <div className="my-4 h-px bg-muted" />
              {navigation.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-2 rounded-lg px-3 py-2 ${
                    pathname === item.href ? "bg-muted text-foreground" : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  <item.icon className="h-5 w-5" />
                  {item.name}
                </Link>
              ))}
              <Button
                variant="ghost"
                className="flex items-center gap-2 rounded-lg px-3 py-2 text-muted-foreground hover:text-foreground justify-start"
                onClick={handleLogout}
              >
                <LogOut className="h-5 w-5" />
                Logout
              </Button>
            </nav>
          </SheetContent>
        </Sheet>
        <div className="flex items-center gap-2">
          <Link href="/" className="flex items-center gap-2 text-lg font-semibold">
            <Package className="h-6 w-6" />
            <span>RewardHub Admin</span>
          </Link>
        </div>
        <div className="flex-1" />
        <Button variant="outline" size="sm" onClick={handleLogout}>
          <LogOut className="mr-2 h-4 w-4" />
          Logout
        </Button>
      </header>
      <div className="grid md:grid-cols-[220px_1fr]">
        <aside className="hidden border-r bg-muted/40 md:block">
          <nav className="grid gap-2 p-4 text-sm">
            {navigation.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-2 rounded-lg px-3 py-2 ${
                  pathname === item.href
                    ? "bg-muted font-medium text-foreground"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <item.icon className="h-4 w-4" />
                {item.name}
              </Link>
            ))}
          </nav>
        </aside>
        <main className="flex-1 p-4 md:p-6">{children}</main>
      </div>
    </div>
  )
}

