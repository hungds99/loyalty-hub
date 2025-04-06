import { NextResponse } from "next/server"

// This would be replaced with your actual database logic
const tiers = [
  {
    id: 1,
    name: "Bronze",
    description: "Entry level tier for all new members",
    pointThreshold: 0,
    color: "#CD7F32",
    benefits: ["Earn 1 point per $1 spent", "Birthday reward", "Access to member-only offers"],
    active: true,
    usersCount: 845,
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
    usersCount: 356,
  },
]

export async function GET() {
  // In a real app, you would check admin authentication here
  return NextResponse.json(tiers)
}

export async function POST(request: Request) {
  try {
    // In a real app, you would check admin authentication here
    const body = await request.json()
    const { name, description, pointThreshold, color, benefits, active } = body

    if (!name || !description || pointThreshold === undefined || !color || !benefits) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    const newTier = {
      id: tiers.length + 1,
      name,
      description,
      pointThreshold,
      color,
      benefits,
      active: active !== undefined ? active : true,
      usersCount: 0,
    }

    tiers.push(newTier)

    return NextResponse.json(newTier, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: "Failed to create tier" }, { status: 500 })
  }
}

