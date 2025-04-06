"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Calendar, Award, CheckCircle, Clock } from "lucide-react"
import { Progress } from "@/components/ui/progress"

interface Campaign {
  id: number
  name: string
  description: string
  type: "one-time" | "recurring" | "limited-time"
  points: number
  startDate: string
  endDate: string | null
  active: boolean
  condition: string
  participated?: boolean
  completed?: boolean
  completionDate?: string | null
}

export default function CampaignsPage() {
  const [campaigns, setCampaigns] = useState<Campaign[]>([])
  const [loading, setLoading] = useState(true)
  const [completingCampaign, setCompletingCampaign] = useState<number | null>(null)

  // In a real app, this would come from your authentication system
  const userId = 1

  useEffect(() => {
    // Fetch campaigns with user participation status
    const fetchCampaigns = async () => {
      try {
        // In a real app, this would be a fetch to your API
        // const response = await fetch(`/api/campaigns?userId=${userId}`)
        // const data = await response.json()

        // Mock data for demonstration
        const data: Campaign[] = [
          {
            id: 1,
            name: "Welcome Bonus",
            description: "Earn points for completing your profile",
            type: "one-time",
            points: 200,
            startDate: "2023-01-01",
            endDate: null,
            active: true,
            condition: "Complete your profile with all required information",
            participated: true,
            completed: true,
            completionDate: "2023-01-15",
          },
          {
            id: 2,
            name: "Monthly Purchase",
            description: "Earn bonus points for making a purchase every month",
            type: "recurring",
            points: 150,
            startDate: "2023-01-01",
            endDate: null,
            active: true,
            condition: "Make at least one purchase in a calendar month",
            participated: true,
            completed: true,
            completionDate: "2023-04-10",
          },
          {
            id: 3,
            name: "Summer Sale",
            description: "Double points for all purchases during summer",
            type: "limited-time",
            points: 0,
            startDate: "2023-06-01",
            endDate: "2023-08-31",
            active: true,
            condition: "Make a purchase during the summer sale period (points are doubled)",
            participated: false,
            completed: false,
            completionDate: null,
          },
          {
            id: 4,
            name: "Refer a Friend",
            description: "Earn points when you refer a friend who signs up",
            type: "recurring",
            points: 300,
            startDate: "2023-01-01",
            endDate: null,
            active: true,
            condition: "Refer a friend who creates an account and makes their first purchase",
            participated: true,
            completed: false,
            completionDate: null,
          },
          {
            id: 5,
            name: "Anniversary Bonus",
            description: "Earn bonus points on your account anniversary",
            type: "recurring",
            points: 500,
            startDate: "2023-01-01",
            endDate: null,
            active: true,
            condition: "Log in on your account anniversary date",
            participated: false,
            completed: false,
            completionDate: null,
          },
        ]

        setCampaigns(data)
        setLoading(false)
      } catch (error) {
        console.error("Error fetching campaigns:", error)
        setLoading(false)
      }
    }

    fetchCampaigns()
  }, [userId])

  const handleCompleteCampaign = async (campaignId: number) => {
    setCompletingCampaign(campaignId)

    try {
      // In a real app, this would be a fetch to your API
      // const response = await fetch('/api/campaigns', {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify({ userId, campaignId }),
      // })
      // const data = await response.json()

      // Mock successful completion
      setTimeout(() => {
        setCampaigns(
          campaigns.map((campaign) =>
            campaign.id === campaignId
              ? {
                  ...campaign,
                  participated: true,
                  completed: true,
                  completionDate: new Date().toISOString().split("T")[0],
                }
              : campaign,
          ),
        )
        setCompletingCampaign(null)
      }, 1500)
    } catch (error) {
      console.error("Error completing campaign:", error)
      setCompletingCampaign(null)
    }
  }

  // Group campaigns by status
  const activeCampaigns = campaigns.filter((c) => !c.completed)
  const completedCampaigns = campaigns.filter((c) => c.completed)

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
            <h1 className="text-3xl font-bold">Campaigns</h1>
            <p className="text-gray-500">Complete campaigns to earn points and rewards.</p>
          </div>

          {loading ? (
            <div className="flex justify-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-700"></div>
            </div>
          ) : (
            <div className="space-y-8">
              <div>
                <h2 className="text-xl font-semibold mb-4 flex items-center">
                  <Award className="mr-2 h-5 w-5 text-emerald-600" />
                  Available Campaigns
                </h2>

                {activeCampaigns.length === 0 ? (
                  <Card>
                    <CardContent className="py-8">
                      <div className="text-center">
                        <p className="text-muted-foreground">You've completed all available campaigns!</p>
                        <p className="text-sm text-muted-foreground mt-1">
                          Check back later for new opportunities to earn points.
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                ) : (
                  <div className="grid gap-4 md:grid-cols-2">
                    {activeCampaigns.map((campaign) => (
                      <Card key={campaign.id} className="overflow-hidden">
                        <CardHeader className="pb-2">
                          <div className="flex justify-between items-start">
                            <div>
                              <CardTitle>{campaign.name}</CardTitle>
                              <CardDescription>{campaign.description}</CardDescription>
                            </div>
                            <Badge variant="outline" className="capitalize">
                              {campaign.type.replace("-", " ")}
                            </Badge>
                          </div>
                        </CardHeader>
                        <CardContent className="pb-2">
                          <div className="space-y-2">
                            <div className="flex items-center text-sm">
                              <Calendar className="mr-2 h-4 w-4 text-muted-foreground" />
                              <span>
                                {campaign.startDate}
                                {campaign.endDate ? ` to ${campaign.endDate}` : " (ongoing)"}
                              </span>
                            </div>
                            <div className="flex items-start gap-2 mt-2">
                              <div className="bg-emerald-100 text-emerald-800 rounded-full p-1 mt-0.5">
                                <CheckCircle className="h-4 w-4" />
                              </div>
                              <p className="text-sm">{campaign.condition}</p>
                            </div>

                            {campaign.participated && !campaign.completed && (
                              <div className="mt-2">
                                <div className="flex justify-between text-sm mb-1">
                                  <span>Progress</span>
                                  <span>In progress</span>
                                </div>
                                <Progress value={50} className="h-2" />
                              </div>
                            )}
                          </div>
                        </CardContent>
                        <CardFooter className="flex justify-between pt-2">
                          <div className="font-semibold text-emerald-700">
                            {campaign.type === "limited-time" && campaign.points === 0
                              ? "Variable points"
                              : `${campaign.points} points`}
                          </div>
                          <Button
                            onClick={() => handleCompleteCampaign(campaign.id)}
                            disabled={completingCampaign === campaign.id}
                          >
                            {completingCampaign === campaign.id ? (
                              <>
                                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                                Processing...
                              </>
                            ) : campaign.participated && !campaign.completed ? (
                              "Continue"
                            ) : (
                              "Start Campaign"
                            )}
                          </Button>
                        </CardFooter>
                      </Card>
                    ))}
                  </div>
                )}
              </div>

              {completedCampaigns.length > 0 && (
                <div>
                  <h2 className="text-xl font-semibold mb-4 flex items-center">
                    <CheckCircle className="mr-2 h-5 w-5 text-emerald-600" />
                    Completed Campaigns
                  </h2>

                  <div className="grid gap-4 md:grid-cols-2">
                    {completedCampaigns.map((campaign) => (
                      <Card key={campaign.id} className="overflow-hidden border-emerald-100">
                        <CardHeader className="pb-2">
                          <div className="flex justify-between items-start">
                            <div>
                              <CardTitle>{campaign.name}</CardTitle>
                              <CardDescription>{campaign.description}</CardDescription>
                            </div>
                            <Badge className="bg-emerald-100 text-emerald-800 hover:bg-emerald-100 hover:text-emerald-800">
                              Completed
                            </Badge>
                          </div>
                        </CardHeader>
                        <CardContent className="pb-2">
                          <div className="space-y-2">
                            <div className="flex items-center text-sm">
                              <Clock className="mr-2 h-4 w-4 text-muted-foreground" />
                              <span>Completed on {campaign.completionDate}</span>
                            </div>
                            <div className="flex items-center text-sm text-emerald-700 font-medium">
                              <Award className="mr-2 h-4 w-4" />
                              <span>Earned {campaign.points} points</span>
                            </div>
                          </div>
                        </CardContent>
                        <CardFooter className="flex justify-between pt-2">
                          {campaign.type === "recurring" && (
                            <Button
                              variant="outline"
                              className="ml-auto"
                              onClick={() => handleCompleteCampaign(campaign.id)}
                            >
                              Complete Again
                            </Button>
                          )}
                        </CardFooter>
                      </Card>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </main>
    </div>
  )
}

