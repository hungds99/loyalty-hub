import { NextResponse } from "next/server"

// This would be replaced with your actual database logic
const users = [{ id: 1, name: "John Doe", email: "john@example.com", points: 750 }]

export async function GET() {
  return NextResponse.json(users)
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { name, email, password } = body

    // In a real app, you would:
    // 1. Validate the input
    // 2. Hash the password
    // 3. Check if user already exists
    // 4. Create the user in your database

    const newUser = {
      id: users.length + 1,
      name,
      email,
      points: 0,
    }

    users.push(newUser)

    return NextResponse.json(newUser, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: "Failed to create user" }, { status: 500 })
  }
}

