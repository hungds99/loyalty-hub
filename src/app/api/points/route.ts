import { NextResponse } from "next/server"

// This would be replaced with your actual database logic
const transactions = [
  { id: 1, userId: 1, date: "2023-04-01", description: "Purchase at Store #123", points: 50, type: "earned" },
  { id: 2, userId: 1, date: "2023-04-05", description: "Purchase at Store #456", points: 75, type: "earned" },
  { id: 3, userId: 1, date: "2023-04-10", description: "Redeemed $5 Gift Card", points: -250, type: "redeemed" },
  { id: 4, userId: 1, date: "2023-04-15", description: "Purchase at Store #789", points: 100, type: "earned" },
  { id: 5, userId: 1, date: "2023-04-20", description: "Bonus Points", points: 200, type: "earned" },
]

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const userId = searchParams.get("userId")

  if (!userId) {
    return NextResponse.json({ error: "User ID is required" }, { status: 400 })
  }

  const userTransactions = transactions.filter((transaction) => transaction.userId === Number.parseInt(userId))

  return NextResponse.json(userTransactions)
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { userId, description, points, type } = body

    if (!userId || !description || !points || !type) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    const newTransaction = {
      id: transactions.length + 1,
      userId: Number.parseInt(userId),
      date: new Date().toISOString().split("T")[0],
      description,
      points,
      type,
    }

    transactions.push(newTransaction)

    return NextResponse.json(newTransaction, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: "Failed to create transaction" }, { status: 500 })
  }
}

