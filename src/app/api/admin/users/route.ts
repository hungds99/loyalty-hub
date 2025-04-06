import { NextResponse } from "next/server"

// This would be replaced with your actual database logic
const users = [
  { id: 1, name: "John Doe", email: "john@example.com", points: 750, status: "active", joinDate: "2023-01-15" },
  { id: 2, name: "Jane Smith", email: "jane@example.com", points: 1200, status: "active", joinDate: "2023-02-20" },
  {
    id: 3,
    name: "Robert Johnson",
    email: "robert@example.com",
    points: 450,
    status: "inactive",
    joinDate: "2023-03-10",
  },
]

export async function GET() {
  // In a real app, you would check admin authentication here
  return NextResponse.json(users)
}

export async function POST(request: Request) {
  try {
    // In a real app, you would check admin authentication here
    const body = await request.json()
    const { name, email, points, status } = body

    const newUser = {
      id: users.length + 1,
      name,
      email,
      points: points || 0,
      status: status || "active",
      joinDate: new Date().toISOString().split("T")[0],
    }

    users.push(newUser)

    return NextResponse.json(newUser, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: "Failed to create user" }, { status: 500 })
  }
}

