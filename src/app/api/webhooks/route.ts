import { NextResponse } from "next/server"

// This would be replaced with your actual database logic
const webhooks = [
  {
    id: 1,
    name: "CRM Integration",
    url: "https://crm.example.com/webhooks/loyalty",
    secret: "whsec_8f7b4a2c3d1e5f6a9b8c7d6e5f4a3b2c1d",
    events: ["user.created", "user.updated", "transaction.created"],
    active: true,
    createdAt: "2023-03-15",
    lastTriggered: "2023-04-28",
    successRate: 98.5,
  },
  {
    id: 2,
    name: "Marketing Platform",
    url: "https://marketing.example.com/api/webhooks",
    secret: "whsec_2a3b4c5d6e7f8a9b1c2d3e4f5a6b7c8d9",
    events: ["points.earned", "tier.changed", "campaign.completed"],
    active: true,
    createdAt: "2023-02-10",
    lastTriggered: "2023-04-27",
    successRate: 100,
  },
]

export async function GET() {
  // In a real app, you would check admin authentication here
  return NextResponse.json(webhooks)
}

export async function POST(request: Request) {
  try {
    // In a real app, you would check admin authentication here
    const body = await request.json()
    const { name, url, secret, events, active } = body

    if (!name || !url || !events || events.length === 0) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    const newWebhook = {
      id: webhooks.length + 1,
      name,
      url,
      secret,
      events,
      active: active !== undefined ? active : true,
      createdAt: new Date().toISOString().split("T")[0],
      successRate: 0,
    }

    webhooks.push(newWebhook)

    return NextResponse.json(newWebhook, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: "Failed to create webhook" }, { status: 500 })
  }
}

