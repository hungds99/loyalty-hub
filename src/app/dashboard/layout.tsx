import type React from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { LayoutDashboard, Gift, Award, User, Trophy, Medal } from "lucide-react"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex min-h-screen flex-col">
      <div className="flex-1 flex">
        <aside className="hidden md:flex w-16 flex-col border-r bg-muted/40">
          <div className="flex flex-col items-center gap-4 py-4">
            <Link href="/dashboard">
              <Button variant="ghost" size="icon" className="rounded-full" asChild>
                <div className="flex flex-col items-center gap-1">
                  <LayoutDashboard className="h-5 w-5" />
                  <span className="text-xs">Home</span>
                </div>
              </Button>
            </Link>
            <Link href="/dashboard/campaigns">
              <Button variant="ghost" size="icon" className="rounded-full" asChild>
                <div className="flex flex-col items-center gap-1">
                  <Award className="h-5 w-5" />
                  <span className="text-xs">Campaigns</span>
                </div>
              </Button>
            </Link>
            <Link href="/dashboard/tiers">
              <Button variant="ghost" size="icon" className="rounded-full" asChild>
                <div className="flex flex-col items-center gap-1">
                  <Trophy className="h-5 w-5" />
                  <span className="text-xs">Tiers</span>
                </div>
              </Button>
            </Link>
            <Link href="/dashboard/achievements">
              <Button variant="ghost" size="icon" className="rounded-full" asChild>
                <div className="flex flex-col items-center gap-1">
                  <Medal className="h-5 w-5" />
                  <span className="text-xs">Achievements</span>
                </div>
              </Button>
            </Link>
            <Link href="/dashboard">
              <Button variant="ghost" size="icon" className="rounded-full" asChild>
                <div className="flex flex-col items-center gap-1">
                  <Gift className="h-5 w-5" />
                  <span className="text-xs">Rewards</span>
                </div>
              </Button>
            </Link>
            <Link href="/dashboard">
              <Button variant="ghost" size="icon" className="rounded-full" asChild>
                <div className="flex flex-col items-center gap-1">
                  <User className="h-5 w-5" />
                  <span className="text-xs">Profile</span>
                </div>
              </Button>
            </Link>
          </div>
        </aside>
        <div className="flex-1">{children}</div>
      </div>
    </div>
  )
}

