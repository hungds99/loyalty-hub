import { NextResponse } from "next/server"

// This would be replaced with your actual database logic
const campaigns = [
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
  },
]

// Track user campaign participation
const userCampaignParticipation = [
  { userId: 1, campaignId: 1, completed: true, completionDate: "2023-01-15" },
  { userId: 1, campaignId: 2, completed: true, completionDate: "2023-04-10" },
  { userId: 1, campaignId: 4, completed: false, completionDate: null },
]

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const userId = searchParams.get("userId")

  // Return all active campaigns
  if (!userId) {
    return NextResponse.json(campaigns.filter((campaign) => campaign.active))
  }

  // Return campaigns with user participation status
  const userParticipation = userCampaignParticipation.filter((p) => p.userId === Number.parseInt(userId))

  const campaignsWithStatus = campaigns
    .filter((campaign) => campaign.active)
    .map((campaign) => {
      const participation = userParticipation.find((p) => p.campaignId === campaign.id)
      return {
        ...campaign,
        participated: !!participation,
        completed: participation?.completed || false,
        completionDate: participation?.completionDate || null,
      }
    })

  return NextResponse.json(campaignsWithStatus)
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { userId, campaignId } = body

    if (!userId || !campaignId) {
      return NextResponse.json({ error: "User ID and Campaign ID are required" }, { status: 400 })
    }

    const campaign = campaigns.find((c) => c.id === campaignId)
    if (!campaign) {
      return NextResponse.json({ error: "Campaign not found" }, { status: 404 })
    }

    if (!campaign.active) {
      return NextResponse.json({ error: "Campaign is not active" }, { status: 400 })
    }

    // Check if user already participated in one-time campaign
    const existingParticipation = userCampaignParticipation.find(
      (p) => p.userId === userId && p.campaignId === campaignId,
    )

    if (existingParticipation && campaign.type === "one-time" && existingParticipation.completed) {
      return NextResponse.json({ error: "User already completed this one-time campaign" }, { status: 400 })
    }

    // Add or update participation
    if (existingParticipation) {
      existingParticipation.completed = true
      existingParticipation.completionDate = new Date().toISOString().split("T")[0]
    } else {
      userCampaignParticipation.push({
        userId,
        campaignId,
        completed: true,
        completionDate: new Date().toISOString().split("T")[0],
      })
    }

    // In a real app, you would also add points to the user's account here

    return NextResponse.json({
      success: true,
      message: "Campaign completed successfully",
      pointsEarned: campaign.points,
    })
  } catch (error) {
    return NextResponse.json({ error: "Failed to complete campaign" }, { status: 500 })
  }
}

