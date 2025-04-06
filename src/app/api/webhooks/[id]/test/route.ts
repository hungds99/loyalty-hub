import { NextResponse } from "next/server"
import crypto from "crypto"

// This would be replaced with your actual database logic
const webhooks = [
  {
    id: 1,
    name: "CRM Integration",
    url: "https://crm.example.com/webhooks/loyalty",
    secret: "whsec_8f7b4a2c3d1e5f6a9b8c7d6e5f4a3b2c1d",
    events: ["user.created", "user.updated", "transaction.created"],
    active: true,
  },
]

export async function POST(request: Request, { params }: { params: { id: string } }) {
  try {
    const webhookId = Number.parseInt(params.id)
    const body = await request.json()
    const { event, payload } = body

    // In a real app, you would check admin authentication here

    const webhook = webhooks.find((w) => w.id === webhookId)

    if (!webhook) {
      return NextResponse.json({ error: "Webhook not found" }, { status: 404 })
    }

    if (!webhook.active) {
      return NextResponse.json({ error: "Webhook is not active" }, { status: 400 })
    }

    // In a real app, you would actually send the webhook here
    // For demo purposes, we'll just simulate a response

    // Create a webhook signature (this is how you'd do it in a real app)
    const timestamp = Math.floor(Date.now() / 1000)
    const payloadString = typeof payload === "string" ? payload : JSON.stringify(payload)
    const signedPayload = `${timestamp}.${payloadString}`
    const signature = crypto.createHmac("sha256", webhook.secret).update(signedPayload).digest("hex")

    // Log the webhook delivery attempt
    const webhookLog = {
      id: Math.floor(Math.random() * 1000),
      webhookId,
      event,
      url: webhook.url,
      status: Math.random() > 0.2 ? "success" : "failed", // Simulate random failures
      statusCode: Math.random() > 0.2 ? 200 : 500,
      requestPayload: payloadString,
      responseBody: Math.random() > 0.2 ? JSON.stringify({ success: true }) : undefined,
      error: Math.random() > 0.2 ? undefined : "Internal Server Error",
      createdAt: new Date().toISOString(),
      retries: 0,
      duration: Math.floor(Math.random() * 500) + 100,
    }

    return NextResponse.json({
      success: webhookLog.status === "success",
      log: webhookLog,
    })
  } catch (error) {
    return NextResponse.json({ error: "Failed to test webhook" }, { status: 500 })
  }
}

