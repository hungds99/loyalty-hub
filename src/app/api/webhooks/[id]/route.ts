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

export async function GET(request: Request, { params }: { params: { id: string } }) {
  const webhookId = Number.parseInt(params.id)

  // In a real app, you would check admin authentication here

  const webhook = webhooks.find((w) => w.id === webhookId)

  if (!webhook) {
    return NextResponse.json({ error: "Webhook not found" }, { status: 404 })
  }

  return NextResponse.json(webhook)
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
    const webhookId = Number.parseInt(params.id)
    const body = await request.json()

    // In a real app, you would check admin authentication here

    const webhookIndex = webhooks.findIndex((w) => w.id === webhookId)

    if (webhookIndex === -1) {
      return NextResponse.json({ error: "Webhook not found" }, { status: 404 })
    }

    // Update webhook data
    const updatedWebhook = {
      ...webhooks[webhookIndex],
      ...body,
    }

    webhooks[webhookIndex] = updatedWebhook

    return NextResponse.json(updatedWebhook)
  } catch (error) {
    return NextResponse.json({ error: "Failed to update webhook" }, { status: 500 })
  }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  try {
    const webhookId = Number.parseInt(params.id)

    // In a real app, you would check admin authentication here

    const webhookIndex = webhooks.findIndex((w) => w.id === webhookId)

    if (webhookIndex === -1) {
      return NextResponse.json({ error: "Webhook not found" }, { status: 404 })
    }

    // Remove webhook
    webhooks.splice(webhookIndex, 1)

    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete webhook" }, { status: 500 })
  }
}

