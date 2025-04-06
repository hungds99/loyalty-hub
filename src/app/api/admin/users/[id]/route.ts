import { NextResponse } from "next/server"

// This would be replaced with your actual database logic
const users = [
  {
    id: 1,
    name: "John Doe",
    email: "john@example.com",
    phone: "+1 (555) 123-4567",
    address: "123 Main St, Anytown, CA 94321",
    joinDate: "2023-01-15",
    status: "active",
    points: {
      current: 750,
      lifetime: 1175,
      pending: 50,
      expired: 25,
    },
    tier: {
      id: 1,
      name: "Bronze",
      color: "#CD7F32",
      nextTier: "Silver",
      nextTierThreshold: 1000,
      progress: 75,
    },
    transactions: [
      { id: 1, date: "2023-04-01", description: "Purchase at Store #123", points: 50, type: "earned" },
      { id: 2, date: "2023-04-05", description: "Purchase at Store #456", points: 75, type: "earned" },
      { id: 3, date: "2023-04-10", description: "Redeemed $5 Gift Card", points: -250, type: "redeemed" },
      { id: 4, date: "2023-04-15", description: "Purchase at Store #789", points: 100, type: "earned" },
      { id: 5, date: "2023-04-20", description: "Bonus Points", points: 200, type: "earned" },
    ],
  },
]

export async function GET(request: Request, { params }: { params: { id: string } }) {
  const userId = Number.parseInt(params.id)

  // In a real app, you would check admin authentication here

  const user = users.find((u) => u.id === userId)

  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 })
  }

  return NextResponse.json(user)
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
    const userId = Number.parseInt(params.id)
    const body = await request.json()

    // In a real app, you would check admin authentication here

    const userIndex = users.findIndex((u) => u.id === userId)

    if (userIndex === -1) {
      return NextResponse.json({ error: "User not found" }, { status: 404 })
    }

    // Update user data
    const updatedUser = {
      ...users[userIndex],
      ...body,
    }

    users[userIndex] = updatedUser

    return NextResponse.json(updatedUser)
  } catch (error) {
    return NextResponse.json({ error: "Failed to update user" }, { status: 500 })
  }
}

