"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Trophy, Award, ChevronRight } from "lucide-react"

export default function DashboardPage() {
  const [points, setPoints] = useState(750)
  const [transactions, setTransactions] = useState([
    { id: 1, date: "2023-04-01", description: "Purchase at Store #123", points: 50, type: "earned" },
    { id: 2, date: "2023-04-05", description: "Purchase at Store #456", points: 75, type: "earned" },
    { id: 3, date: "2023-04-10", description: "Redeemed $5 Gift Card", points: -250, type: "redeemed" },
    { id: 4, date: "2023-04-15", description: "Purchase at Store #789", points: 100, type: "earned" },
    { id: 5, date: "2023-04-20", description: "Bonus Points", points: 200, type: "earned" },
    { id: 6, date: "2023-04-25", description: "Completed Welcome Campaign", points: 200, type: "earned" },
    { id: 7, date: "2023-04-28", description: "Tier Upgrade Bonus", points: 100, type: "earned" },
  ])

  const [availableRewards, setAvailableRewards] = useState([
    { id: 1, name: "$5 Gift Card", points: 250, image: "/placeholder.svg?height=100&width=200" },
    { id: 2, name: "$10 Gift Card", points: 500, image: "/placeholder.svg?height=100&width=200" },
    { id: 3, name: "Free Product", points: 750, image: "/placeholder.svg?height=100&width=200" },
    { id: 4, name: "VIP Experience", points: 1500, image: "/placeholder.svg?height=100&width=200" },
  ])

  const handleRedeemReward = (rewardId: number, rewardPoints: number) => {
    if (points >= rewardPoints) {
      setPoints(points - rewardPoints)
      const reward = availableRewards.find((r) => r.id === rewardId)
      if (reward) {
        setTransactions([
          {
            id: transactions.length + 1,
            date: new Date().toISOString().split("T")[0],
            description: `Redeemed ${reward.name}`,
            points: -rewardPoints,
            type: "redeemed",
          },
          ...transactions,
        ])
      }
    }
  }

  // Current tier information
  const currentTier = {
    name: "Bronze",
    color: "#CD7F32",
    nextTier: "Silver",
    nextTierThreshold: 1000,
    progress: 75,
  }

  // Active campaigns
  const activeCampaigns = [
    {
      id: 1,
      name: "Refer a Friend",
      description: "Earn points when you refer a friend who signs up",
      points: 300,
      progress: 0,
    },
    {
      id: 2,
      name: "Monthly Purchase",
      description: "Earn bonus points for making a purchase every month",
      points: 150,
      progress: 50,
    },
  ]

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2">
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
                  {points} Points
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
            <h1 className="text-3xl font-bold">Welcome back, John!</h1>
            <p className="text-gray-500">Here's an overview of your loyalty program status.</p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle>Current Points</CardTitle>
                <CardDescription>Your available points balance</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-4xl font-bold text-emerald-600">{points}</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle>Current Tier</CardTitle>
                <CardDescription>Progress to {currentTier.nextTier} tier</CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded-full" style={{ backgroundColor: currentTier.color }}></div>
                  <span className="font-medium">{currentTier.name}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>
                    {points}/{currentTier.nextTierThreshold} points
                  </span>
                  <span>{currentTier.progress}%</span>
                </div>
                <Progress value={currentTier.progress} className="h-2" />
                <div className="pt-1">
                  <Button variant="link" className="p-0 h-auto text-sm" asChild>
                    <Link href="/dashboard/tiers">
                      View all tiers <ChevronRight className="h-3 w-3 ml-1" />
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle>Lifetime Points</CardTitle>
                <CardDescription>Total points earned</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-4xl font-bold">1,175</div>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            <div className="md:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Award className="mr-2 h-5 w-5 text-emerald-600" />
                    Active Campaigns
                  </CardTitle>
                  <CardDescription>Complete these campaigns to earn more points</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {activeCampaigns.map((campaign) => (
                      <div key={campaign.id} className="border rounded-lg p-4">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <h3 className="font-medium">{campaign.name}</h3>
                            <p className="text-sm text-muted-foreground">{campaign.description}</p>
                          </div>
                          <Badge className="bg-emerald-100 text-emerald-800">{campaign.points} points</Badge>
                        </div>
                        {campaign.progress > 0 && (
                          <div>
                            <div className="flex justify-between text-xs mb-1">
                              <span>Progress</span>
                              <span>{campaign.progress}%</span>
                            </div>
                            <Progress value={campaign.progress} className="h-1.5" />
                          </div>
                        )}
                        <div className="mt-3">
                          <Button size="sm" variant="outline" asChild>
                            <Link href="/dashboard/campaigns">{campaign.progress > 0 ? "Continue" : "Start"}</Link>
                          </Button>
                        </div>
                      </div>
                    ))}
                    <Button variant="link" className="p-0 h-auto" asChild>
                      <Link href="/dashboard/campaigns">
                        View all campaigns <ChevronRight className="h-4 w-4 ml-1" />
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
            <div>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Trophy className="mr-2 h-5 w-5 text-emerald-600" />
                    Tier Benefits
                  </CardTitle>
                  <CardDescription>Your current tier benefits</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2 text-sm">
                      <div className="rounded-full bg-emerald-100 p-1 mt-0.5">
                        <svg
                          className="h-3 w-3 text-emerald-600"
                          fill="none"
                          height="24"
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          viewBox="0 0 24 24"
                          width="24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                      </div>
                      <span>Earn 1 point per $1 spent</span>
                    </li>
                    <li className="flex items-start gap-2 text-sm">
                      <div className="rounded-full bg-emerald-100 p-1 mt-0.5">
                        <svg
                          className="h-3 w-3 text-emerald-600"
                          fill="none"
                          height="24"
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          viewBox="0 0 24 24"
                          width="24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                      </div>
                      <span>Birthday reward</span>
                    </li>
                    <li className="flex items-start gap-2 text-sm">
                      <div className="rounded-full bg-emerald-100 p-1 mt-0.5">
                        <svg
                          className="h-3 w-3 text-emerald-600"
                          fill="none"
                          height="24"
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          viewBox="0 0 24 24"
                          width="24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                      </div>
                      <span>Access to member-only offers</span>
                    </li>
                  </ul>
                  <div className="mt-4 pt-4 border-t">
                    <p className="text-sm text-muted-foreground">
                      Upgrade to <strong>Silver</strong> tier to unlock more benefits
                    </p>
                    <Button variant="link" className="p-0 h-auto mt-1 text-sm" asChild>
                      <Link href="/dashboard/tiers">
                        View tier details <ChevronRight className="h-3 w-3 ml-1" />
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          <Tabs defaultValue="rewards">
            <TabsList className="grid w-full grid-cols-2 mb-8">
              <TabsTrigger value="rewards">Available Rewards</TabsTrigger>
              <TabsTrigger value="history">Transaction History</TabsTrigger>
            </TabsList>

            <TabsContent value="rewards" className="space-y-4">
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                {availableRewards.map((reward) => (
                  <Card key={reward.id}>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg">{reward.name}</CardTitle>
                      <CardDescription>{reward.points} points</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <img
                        src={reward.image || "/placeholder.svg"}
                        alt={reward.name}
                        className="rounded-md w-full h-32 object-cover"
                      />
                      <Button
                        className="w-full"
                        disabled={points < reward.points}
                        onClick={() => handleRedeemReward(reward.id, reward.points)}
                      >
                        {points >= reward.points ? "Redeem" : "Not enough points"}
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="history">
              <Card>
                <CardHeader>
                  <CardTitle>Transaction History</CardTitle>
                  <CardDescription>Your recent point activity</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {transactions.map((transaction) => (
                      <div key={transaction.id} className="flex items-center justify-between border-b pb-4">
                        <div>
                          <p className="font-medium">{transaction.description}</p>
                          <p className="text-sm text-gray-500">{transaction.date}</p>
                        </div>
                        <div
                          className={`font-bold ${transaction.type === "earned" ? "text-green-600" : "text-red-600"}`}
                        >
                          {transaction.type === "earned" ? "+" : ""}
                          {transaction.points}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  )
}

