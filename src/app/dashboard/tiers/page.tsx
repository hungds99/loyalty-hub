"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Trophy, ChevronRight, CheckCircle, ArrowRight, Star } from "lucide-react"
import { Progress } from "@/components/ui/progress"

interface Tier {
  id: number
  name: string
  description: string
  pointThreshold: number
  color: string
  benefits: string[]
  active: boolean
}

interface UserTier {
  current: Tier
  next: Tier | null
  points: number
  pointsToNextTier: number
  progress: number
}

export default function TiersPage() {
  const [tiers, setTiers] = useState<Tier[]>([])
  const [userTier, setUserTier] = useState<UserTier | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Fetch tiers and user's tier status
    const fetchTiers = async () => {
      try {
        // In a real app, this would be a fetch to your API
        // const response = await fetch('/api/tiers?userId=1')
        // const data = await response.json()

        // Mock data for demonstration
        const mockTiers = [
          {
            id: 1,
            name: "Bronze",
            description: "Entry level tier for all new members",
            pointThreshold: 0,
            color: "#CD7F32",
            benefits: ["Earn 1 point per $1 spent", "Birthday reward", "Access to member-only offers"],
            active: true,
          },
          {
            id: 2,
            name: "Silver",
            description: "Intermediate tier with enhanced benefits",
            pointThreshold: 1000,
            color: "#C0C0C0",
            benefits: [
              "Earn 1.25 points per $1 spent",
              "Birthday reward",
              "Access to member-only offers",
              "Free shipping on orders over $50",
            ],
            active: true,
          },
          {
            id: 3,
            name: "Gold",
            description: "Premium tier with exclusive benefits",
            pointThreshold: 5000,
            color: "#FFD700",
            benefits: [
              "Earn 1.5 points per $1 spent",
              "Birthday reward",
              "Access to member-only offers",
              "Free shipping on all orders",
              "Early access to new products",
              "Dedicated customer service line",
            ],
            active: true,
          },
          {
            id: 4,
            name: "Platinum",
            description: "Elite tier with VIP benefits",
            pointThreshold: 10000,
            color: "#E5E4E2",
            benefits: [
              "Earn 2 points per $1 spent",
              "Birthday reward",
              "Access to member-only offers",
              "Free shipping on all orders",
              "Early access to new products",
              "Dedicated customer service line",
              "Annual gift",
              "Exclusive events access",
              "Personal shopping assistant",
            ],
            active: true,
          },
        ]

        // Mock user tier data
        const mockUserTier = {
          current: mockTiers[0], // Bronze
          next: mockTiers[1], // Silver
          points: 750,
          pointsToNextTier: 250,
          progress: 75,
        }

        setTiers(mockTiers)
        setUserTier(mockUserTier)
        setLoading(false)
      } catch (error) {
        console.error("Error fetching tiers:", error)
        setLoading(false)
      }
    }

    fetchTiers()
  }, [])

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center">
            <Link href="/dashboard" className="flex items-center space-x-2">
              <span className="font-bold">RewardHub</span>
            </Link>
          </div>
          <nav className="flex items-center space-x-4">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Badge
                  variant="outline"
                  className="bg-emerald-50 text-emerald-700 hover:bg-emerald-50 hover:text-emerald-700"
                >
                  {userTier?.points || 0} Points
                </Badge>
              </div>
              <Avatar>
                <AvatarImage src="/placeholder.svg?height=32&width=32" alt="User" />
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
            </div>
          </nav>
        </div>
      </header>

      <main className="flex-1 container py-8">
        <div className="flex flex-col gap-8">
          <div className="flex flex-col gap-2">
            <h1 className="text-3xl font-bold">Loyalty Tiers</h1>
            <p className="text-gray-500">Earn points to unlock higher tiers and exclusive benefits.</p>
          </div>

          {loading ? (
            <div className="flex justify-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-700"></div>
            </div>
          ) : (
            <div className="space-y-8">
              {/* Current Tier Status */}
              {userTier && (
                <Card className="border-2" style={{ borderColor: userTier.current.color }}>
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="flex items-center gap-2">
                          <Trophy className="h-5 w-5" style={{ color: userTier.current.color }} />
                          <span>Your Current Tier: {userTier.current.name}</span>
                        </CardTitle>
                        <CardDescription>{userTier.current.description}</CardDescription>
                      </div>
                      <div
                        className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold"
                        style={{ backgroundColor: userTier.current.color }}
                      >
                        {userTier.current.name.charAt(0)}
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    {userTier.next ? (
                      <div className="space-y-4">
                        <div>
                          <div className="flex justify-between text-sm mb-1">
                            <span>Progress to {userTier.next.name}</span>
                            <span>{userTier.progress}%</span>
                          </div>
                          <Progress value={userTier.progress} className="h-2" />
                          <p className="text-sm mt-2">
                            You need <strong>{userTier.pointsToNextTier.toLocaleString()} more points</strong> to reach{" "}
                            {userTier.next.name} tier.
                          </p>
                        </div>

                        <div className="flex justify-between items-center pt-2">
                          <div className="flex items-center gap-2">
                            <div
                              className="w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-xs"
                              style={{ backgroundColor: userTier.current.color }}
                            >
                              {userTier.current.name.charAt(0)}
                            </div>
                            <ArrowRight className="h-4 w-4 text-muted-foreground" />
                            <div
                              className="w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-xs"
                              style={{ backgroundColor: userTier.next.color }}
                            >
                              {userTier.next.name.charAt(0)}
                            </div>
                          </div>
                          <div className="text-sm">
                            <span className="font-medium">{userTier.points.toLocaleString()}</span>
                            <span className="text-muted-foreground"> / </span>
                            <span className="font-medium">{userTier.next.pointThreshold.toLocaleString()}</span>
                            <span className="text-muted-foreground"> points</span>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="bg-emerald-50 text-emerald-800 p-4 rounded-md">
                        <p className="font-medium">Congratulations! You've reached our highest tier.</p>
                        <p className="text-sm mt-1">
                          Enjoy all the exclusive benefits of {userTier.current.name} status.
                        </p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              )}

              {/* All Tiers */}
              <div>
                <h2 className="text-xl font-semibold mb-4">All Loyalty Tiers</h2>
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                  {tiers.map((tier) => {
                    const isCurrentTier = userTier?.current.id === tier.id
                    const isUnlocked = userTier?.points >= tier.pointThreshold

                    return (
                      <Card
                        key={tier.id}
                        className={`overflow-hidden ${isCurrentTier ? "border-2" : ""}`}
                        style={{ borderColor: isCurrentTier ? tier.color : undefined }}
                      >
                        <CardHeader className="pb-2" style={{ backgroundColor: `${tier.color}20` }}>
                          <div className="flex justify-between items-start">
                            <CardTitle className="flex items-center gap-2">
                              <div
                                className="w-6 h-6 rounded-full flex items-center justify-center text-white font-bold text-xs"
                                style={{ backgroundColor: tier.color }}
                              >
                                {tier.name.charAt(0)}
                              </div>
                              {tier.name}
                            </CardTitle>
                            {isUnlocked && (
                              <Badge className="bg-emerald-100 text-emerald-800 hover:bg-emerald-100 hover:text-emerald-800">
                                {isCurrentTier ? "Current" : "Unlocked"}
                              </Badge>
                            )}
                          </div>
                          <CardDescription>{tier.description}</CardDescription>
                        </CardHeader>
                        <CardContent className="pt-4">
                          <div className="text-sm font-medium mb-2">
                            <span>{tier.pointThreshold.toLocaleString()} points required</span>
                          </div>
                          <div className="space-y-2">
                            <p className="text-sm font-medium">Benefits:</p>
                            <ul className="space-y-1">
                              {tier.benefits.map((benefit, index) => (
                                <li key={index} className="flex items-start gap-2 text-sm">
                                  <CheckCircle className="h-4 w-4 text-emerald-600 mt-0.5 shrink-0" />
                                  <span>{benefit}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </CardContent>
                        {!isUnlocked && (
                          <CardFooter className="pt-0">
                            <div className="w-full bg-gray-100 rounded-full h-2">
                              <div
                                className="bg-emerald-600 h-2 rounded-full"
                                style={{
                                  width: `${Math.min(
                                    100,
                                    Math.round(((userTier?.points || 0) / tier.pointThreshold) * 100),
                                  )}%`,
                                }}
                              ></div>
                            </div>
                            <p className="text-xs text-muted-foreground mt-2">
                              {Math.min(100, Math.round(((userTier?.points || 0) / tier.pointThreshold) * 100))}%
                              progress to this tier
                            </p>
                          </CardFooter>
                        )}
                      </Card>
                    )
                  })}
                </div>
              </div>

              {/* How to Earn Points */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Star className="h-5 w-5 text-emerald-600" />
                    How to Earn Points
                  </CardTitle>
                  <CardDescription>Complete these activities to earn points and reach higher tiers</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="flex items-start gap-3">
                      <div className="bg-emerald-100 text-emerald-800 rounded-full p-2">
                        <CheckCircle className="h-5 w-5" />
                      </div>
                      <div>
                        <h3 className="font-medium">Make Purchases</h3>
                        <p className="text-sm text-muted-foreground">
                          Earn points for every dollar spent. Higher tiers earn more points per dollar.
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="bg-emerald-100 text-emerald-800 rounded-full p-2">
                        <CheckCircle className="h-5 w-5" />
                      </div>
                      <div>
                        <h3 className="font-medium">Complete Campaigns</h3>
                        <p className="text-sm text-muted-foreground">
                          Participate in special campaigns to earn bonus points.
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="bg-emerald-100 text-emerald-800 rounded-full p-2">
                        <CheckCircle className="h-5 w-5" />
                      </div>
                      <div>
                        <h3 className="font-medium">Refer Friends</h3>
                        <p className="text-sm text-muted-foreground">
                          Earn 300 points for each friend who joins and makes their first purchase.
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="bg-emerald-100 text-emerald-800 rounded-full p-2">
                        <CheckCircle className="h-5 w-5" />
                      </div>
                      <div>
                        <h3 className="font-medium">Write Reviews</h3>
                        <p className="text-sm text-muted-foreground">
                          Earn 50 points for each verified product review you submit.
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" asChild>
                    <Link href="/dashboard/campaigns">
                      View Available Campaigns
                      <ChevronRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}

