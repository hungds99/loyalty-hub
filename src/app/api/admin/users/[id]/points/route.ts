import { NextResponse } from "next/server"

// This would be replaced with your actual database logic
const users = [
  {
    id: 1,
    name: "John Doe",
    email: "john@example.com",
    points: {
      current: 750,
      lifetime: 1175,
      pending: 50,
      expired: 25,
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

export async function POST(request: Request, { params }: { params: { id: string } }) {
  try {
    const userId = Number.parseInt(params.id)
    const body = await request.json()
    const { amount, reason } = body

    // In a real app, you would check admin authentication here

    const userIndex = users.findIndex((u) => u.id === userId)

    if (userIndex === -1) {
      return NextResponse.json({ error: "User not found" }, { status: 404 })
    }

    // Update user points
    users[userIndex].points.current += amount
    users[userIndex].points.lifetime += amount

    // Add transaction
    const newTransaction = {
      id: Math.max(...users[userIndex].transactions.map((t) => t.id)) + 1,
      date: new Date().toISOString().split("T")[0],
      description: reason || "Manual adjustment",
      points: amount,
      type: "earned",
    }

    users[userIndex].transactions.unshift(newTransaction)

    return NextResponse.json({
      success: true,
      points: users[userIndex].points,
      transaction: newTransaction,
    })
  } catch (error) {
    return NextResponse.json({ error: "Failed to add points" }, { status: 500 })
  }
}

