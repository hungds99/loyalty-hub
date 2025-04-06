"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Award, Gift, Star, ShoppingBag, Users, Calendar, Heart, Trophy, Share2 } from "lucide-react"

interface Achievement {
  id: number
  name: string
  description: string
  icon: string
  progress: number
  maxProgress: number
  completed: boolean
  completedDate?: string
  pointsReward: number
  category: string
}

export default function AchievementsPage() {
  const [achievements, setAchievements] = useState<Achievement[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // In a real app, fetch achievements from API
    const mockAchievements: Achievement[] = [
      {
        id: 1,
        name: "First Purchase",
        description: "Make your first purchase",
        icon: "ShoppingBag",
        progress: 1,
        maxProgress: 1,
        completed: true,
        completedDate: "2023-03-15",
        pointsReward: 50,
        category: "shopping",
      },
      {
        id: 2,
        name: "Loyal Customer",
        description: "Make 5 purchases",
        icon: "ShoppingBag",
        progress: 3,
        maxProgress: 5,
        completed: false,
        pointsReward: 100,
        category: "shopping",
      },
      {
        id: 3,
        name: "Profile Completer",
        description: "Complete your profile information",
        icon: "User",
        progress: 1,
        maxProgress: 1,
        completed: true,
        completedDate: "2023-03-10",
        pointsReward: 25,
        category: "profile",
      },
      {
        id: 4,
        name: "Social Butterfly",
        description: "Refer 3 friends",
        icon: "Users",
        progress: 1,
        maxProgress: 3,
        completed: false,
        pointsReward: 150,
        category: "social",
      },
      {
        id: 5,
        name: "Review Expert",
        description: "Write 5 product reviews",
        icon: "Star",
        progress: 2,
        maxProgress: 5,
        completed: false,
        pointsReward: 125,
        category: "engagement",
      },
      {
        id: 6,
        name: "Silver Status",
        description: "Reach Silver tier",
        icon: "Trophy",
        progress: 0,
        maxProgress: 1,
        completed: false,
        pointsReward: 200,
        category: "tiers",
      },
      {
        id: 7,
        name: "Campaign Champion",
        description: "Complete 3 campaigns",
        icon: "Award",
        progress: 1,
        maxProgress: 3,
        completed: false,
        pointsReward: 150,
        category: "campaigns",
      },
      {
        id: 8,
        name: "Birthday Celebrant",
        description: "Redeem your birthday reward",
        icon: "Gift",
        progress: 0,
        maxProgress: 1,
        completed: false,
        pointsReward: 50,
        category: "rewards",
      },
      {
        id: 9,
        name: "Anniversary Milestone",
        description: "Be a member for 1 year",
        icon: "Calendar",
        progress: 0.7,
        maxProgress: 1,
        completed: false,
        pointsReward: 200,
        category: "loyalty",
      },
      {
        id: 10,
        name: "Wishlist Creator",
        description: "Add 5 items to your wishlist",
        icon: "Heart",
        progress: 3,
        maxProgress: 5,
        completed: false,
        pointsReward: 75,
        category: "engagement",
      },
    ]

    setAchievements(mockAchievements)
    setLoading(false)
  }, [])

  const getIconComponent = (iconName: string) => {
    switch (iconName) {
      case "ShoppingBag":
        return <ShoppingBag className="h-5 w-5" />
      case "User":
        return (
          <Avatar className="h-5 w-5">
            <AvatarFallback>U</AvatarFallback>
          </Avatar>
        )
      case "Users":
        return <Users className="h-5 w-5" />
      case "Star":
        return <Star className="h-5 w-5" />
      case "Trophy":
        return <Trophy className="h-5 w-5" />
      case "Award":
        return <Award className="h-5 w-5" />
      case "Gift":
        return <Gift className="h-5 w-5" />
      case "Calendar":
        return <Calendar className="h-5 w-5" />
      case "Heart":
        return <Heart className="h-5 w-5" />
      default:
        return <Award className="h-5 w-5" />
    }
  }

  const completedAchievements = achievements.filter((a) => a.completed)
  const inProgressAchievements = achievements.filter((a) => !a.completed)

  const categories = [
    { id: "all", name: "All" },
    { id: "shopping", name: "Shopping" },
    { id: "social", name: "Social" },
    { id: "engagement", name: "Engagement" },
    { id: "tiers", name: "Tiers" },
    { id: "campaigns", name: "Campaigns" },
    { id: "rewards", name: "Rewards" },
    { id: "loyalty", name: "Loyalty" },
    { id: "profile", name: "Profile" },
  ]

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
                  750 Points
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
            <h1 className="text-3xl font-bold">Achievements</h1>
            <p className="text-gray-500">Complete achievements to earn bonus points and showcase your loyalty.</p>
          </div>

          {loading ? (
            <div className="flex justify-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-700"></div>
            </div>
          ) : (
            <div className="space-y-6">
              {/* Achievement Stats */}
              <div className="grid gap-4 md:grid-cols-3">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">Achievements Completed</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center gap-2">
                      <div className="text-3xl font-bold text-emerald-600">{completedAchievements.length}</div>
                      <div className="text-muted-foreground">/ {achievements.length}</div>
                    </div>
                    <Progress value={(completedAchievements.length / achievements.length) * 100} className="h-2 mt-2" />
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">Points Earned</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold text-emerald-600">
                      {completedAchievements.reduce((sum, a) => sum + a.pointsReward, 0)}
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">From achievements</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">Points Available</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold">
                      {inProgressAchievements.reduce((sum, a) => sum + a.pointsReward, 0)}
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">From incomplete achievements</p>
                  </CardContent>
                </Card>
              </div>

              {/* Achievement Tabs */}
              <Tabs defaultValue="in-progress">
                <div className="flex justify-between items-center">
                  <TabsList>
                    <TabsTrigger value="in-progress">In Progress</TabsTrigger>
                    <TabsTrigger value="completed">Completed</TabsTrigger>
                    <TabsTrigger value="all">All</TabsTrigger>
                  </TabsList>

                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm" className="gap-1">
                      <Share2 className="h-4 w-4" />
                      Share
                    </Button>
                  </div>
                </div>

                {/* Category Filter */}
                <div className="flex gap-2 overflow-x-auto py-4 scrollbar-hide">
                  {categories.map((category) => (
                    <Badge key={category.id} variant="outline" className="cursor-pointer hover:bg-muted">
                      {category.name}
                    </Badge>
                  ))}
                </div>

                <TabsContent value="in-progress">
                  <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {inProgressAchievements.map((achievement) => (
                      <Card key={achievement.id}>
                        <CardHeader className="pb-2">
                          <div className="flex justify-between">
                            <div className="flex items-center gap-2">
                              <div className="bg-emerald-100 text-emerald-800 p-2 rounded-full">
                                {getIconComponent(achievement.icon)}
                              </div>
                              <CardTitle className="text-lg">{achievement.name}</CardTitle>
                            </div>
                            <Badge variant="outline">{achievement.pointsReward} pts</Badge>
                          </div>
                          <CardDescription>{achievement.description}</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-2">
                            <div className="flex justify-between text-sm">
                              <span>Progress</span>
                              <span>
                                {achievement.progress} / {achievement.maxProgress}
                              </span>
                            </div>
                            <Progress value={(achievement.progress / achievement.maxProgress) * 100} className="h-2" />
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="completed">
                  <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {completedAchievements.map((achievement) => (
                      <Card key={achievement.id}>
                        <CardHeader className="pb-2">
                          <div className="flex justify-between">
                            <div className="flex items-center gap-2">
                              <div className="bg-emerald-100 text-emerald-800 p-2 rounded-full">
                                {getIconComponent(achievement.icon)}
                              </div>
                              <CardTitle className="text-lg">{achievement.name}</CardTitle>
                            </div>
                            <Badge className="bg-emerald-100 text-emerald-800">Completed</Badge>
                          </div>
                          <CardDescription>{achievement.description}</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="flex justify-between items-center">
                            <div className="text-sm text-muted-foreground">
                              Completed on {achievement.completedDate}
                            </div>
                            <Badge variant="outline">{achievement.pointsReward} pts earned</Badge>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="all">
                  <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {achievements.map((achievement) => (
                      <Card key={achievement.id}>
                        <CardHeader className="pb-2">
                          <div className="flex justify-between">
                            <div className="flex items-center gap-2">
                              <div className="bg-emerald-100 text-emerald-800 p-2 rounded-full">
                                {getIconComponent(achievement.icon)}
                              </div>
                              <CardTitle className="text-lg">{achievement.name}</CardTitle>
                            </div>
                            {achievement.completed ? (
                              <Badge className="bg-emerald-100 text-emerald-800">Completed</Badge>
                            ) : (
                              <Badge variant="outline">{achievement.pointsReward} pts</Badge>
                            )}
                          </div>
                          <CardDescription>{achievement.description}</CardDescription>
                        </CardHeader>
                        <CardContent>
                          {achievement.completed ? (
                            <div className="flex justify-between items-center">
                              <div className="text-sm text-muted-foreground">
                                Completed on {achievement.completedDate}
                              </div>
                              <Badge variant="outline">{achievement.pointsReward} pts earned</Badge>
                            </div>
                          ) : (
                            <div className="space-y-2">
                              <div className="flex justify-between text-sm">
                                <span>Progress</span>
                                <span>
                                  {achievement.progress} / {achievement.maxProgress}
                                </span>
                              </div>
                              <Progress
                                value={(achievement.progress / achievement.maxProgress) * 100}
                                className="h-2"
                              />
                            </div>
                          )}
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}

