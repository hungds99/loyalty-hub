import { NextResponse } from "next/server"

// This would be replaced with your actual database logic
const rewards = [
  {
    id: 1,
    name: "$5 Gift Card",
    description: "A $5 gift card that can be used at any of our locations.",
    points: 250,
    image: "/placeholder.svg?height=100&width=200",
    active: true,
  },
  {
    id: 2,
    name: "$10 Gift Card",
    description: "A $10 gift card that can be used at any of our locations.",
    points: 500,
    image: "/placeholder.svg?height=100&width=200",
    active: true,
  },
]

export async function GET() {
  // In a real app, you would check admin authentication here
  return NextResponse.json(rewards)
}

export async function POST(request: Request) {
  try {
    // In a real app, you would check admin authentication here
    const body = await request.json()
    const { name, description, points, image, active } = body

    const newReward = {
      id: rewards.length + 1,
      name,
      description,
      points: points || 0,
      image: image || "/placeholder.svg?height=100&width=200",
      active: active !== undefined ? active : true,
    }

    rewards.push(newReward)

    return NextResponse.json(newReward, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: "Failed to create reward" }, { status: 500 })
  }
}

