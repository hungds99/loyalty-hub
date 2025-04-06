import { NextResponse } from "next/server"

// This would be replaced with your actual database logic
const webhookLogs = [
  {
    id: 1,
    webhookId: 1,
    webhookName: "CRM Integration",
    event: "user.created",
    url: "https://crm.example.com/webhooks/loyalty",
    status: "success",
    statusCode: 200,
    requestPayload: JSON.stringify({
      event: "user.created",
      data: {
        id: 123,
        name: "John Doe",
        email: "john@example.com",
        createdAt: "2023-04-28T10:15:30Z",
      },
    }),
    responseBody: JSON.stringify({ success: true, message: "Webhook received" }),
    createdAt: "2023-04-28T10:15:32Z",
    retries: 0,
    duration: 245,
  },
  {
    id: 2,
    webhookId: 2,
    webhookName: "Marketing Platform",
    event: "points.earned",
    url: "https://marketing.example.com/api/webhooks",
    status: "success",
    statusCode: 200,
    requestPayload: JSON.stringify({
      event: "points.earned",
      data: {
        userId: 123,
        points: 50,
        reason: "Purchase at Store #123",
        transactionId: 456,
        timestamp: "2023-04-27T15:45:22Z",
      },
    }),
    responseBody: JSON.stringify({ status: "ok" }),
    createdAt: "2023-04-27T15:45:23Z",
    retries: 0,
    duration: 189,
  },
]

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const webhookId = searchParams.get("webhookId")
  const event = searchParams.get("event")
  const status = searchParams.get("status")

  // In a real app, you would check admin authentication here

  let filteredLogs = [...webhookLogs]

  if (webhookId) {
    filteredLogs = filteredLogs.filter((log) => log.webhookId === Number.parseInt(webhookId))
  }

  if (event) {
    filteredLogs = filteredLogs.filter((log) => log.event === event)
  }

  if (status) {
    filteredLogs = filteredLogs.filter((log) => log.status === status)
  }

  return NextResponse.json(filteredLogs)
}

