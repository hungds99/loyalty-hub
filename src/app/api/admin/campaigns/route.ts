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
    participantsCount: 856,
    completionsCount: 743,
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
    participantsCount: 1248,
    completionsCount: 687,
    condition: "Make at least one purchase in a calendar month",
  },
]

export async function GET() {
  // In a real app, you would check admin authentication here
  return NextResponse.json(campaigns)
}

export async function POST(request: Request) {
  try {
    // In a real app, you would check admin authentication here
    const body = await request.json()
    const { name, description, type, points, startDate, endDate, active, condition } = body

    if (!name || !description || !type || points === undefined || !startDate || !condition) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    const newCampaign = {
      id: campaigns.length + 1,
      name,
      description,
      type,
      points,
      startDate,
      endDate: endDate || null,
      active: active !== undefined ? active : true,
      participantsCount: 0,
      completionsCount: 0,
      condition,
    }

    campaigns.push(newCampaign)

    return NextResponse.json(newCampaign, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: "Failed to create campaign" }, { status: 500 })
  }
}

