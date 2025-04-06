import { NextResponse } from "next/server"

// This would be replaced with your actual database logic
const transactions = [
  {
    id: 1,
    userId: 1,
    userName: "John Doe",
    date: "2023-04-01",
    description: "Purchase at Store #123",
    points: 50,
    type: "earned",
  },
  {
    id: 2,
    userId: 2,
    userName: "Jane Smith",
    date: "2023-04-02",
    description: "Purchase at Store #456",
    points: 75,
    type: "earned",
  },
  {
    id: 3,
    userId: 1,
    userName: "John Doe",
    date: "2023-04-03",
    description: "Redeemed $5 Gift Card",
    points: -250,
    type: "redeemed",
  },
]

export async function GET() {
  // In a real app, you would check admin authentication here
  return NextResponse.json(transactions)
}

export async function POST(request: Request) {
  try {
    // In a real app, you would check admin authentication here
    const body = await request.json()
    const { userId, userName, description, points, type } = body

    if (!userId || !userName || !description || !points || !type) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    const newTransaction = {
      id: transactions.length + 1,
      userId,
      userName,
      date: new Date().toISOString().split("T")[0],
      description,
      points: type === "redeemed" ? -Math.abs(points) : Math.abs(points),
      type,
    }

    transactions.push(newTransaction)

    return NextResponse.json(newTransaction, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: "Failed to create transaction" }, { status: 500 })
  }
}

