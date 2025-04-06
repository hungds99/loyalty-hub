import { NextResponse } from "next/server"
import { SquareIntegration } from "@/lib/integrations/square"
import { addTransaction } from "@/lib/transactions" // Assume this exists

// Verify Square webhook signature
function verifySquareWebhook(request: Request): boolean {
  const signatureHeader = request.headers.get("x-square-hmacsha256-signature")
  if (!signatureHeader) return false

  const squareSigningKey = process.env.SQUARE_WEBHOOK_SIGNATURE_KEY || ""
  const body = request.body // This is a ReadableStream

  // In a real implementation, you would read the stream and verify the signature
  // This is simplified for demonstration purposes
  return true // Placeholder
}

export async function POST(request: Request) {
  try {
    // Verify the webhook is from Square
    if (!verifySquareWebhook(request)) {
      return NextResponse.json({ error: "Invalid webhook signature" }, { status: 401 })
    }

    // Parse the webhook data
    const webhookData = await request.json()

    // Check if this is an order created event
    if (webhookData.type !== "order.created") {
      return NextResponse.json({ success: true, message: "Event type not processed" })
    }

    // Initialize Square integration
    const squareConfig = {
      accessToken: process.env.SQUARE_ACCESS_TOKEN || "",
      locationId: process.env.SQUARE_LOCATION_ID || "",
      environment: (process.env.SQUARE_ENVIRONMENT || "sandbox") as "sandbox" | "production",
    }

    const square = new SquareIntegration(squareConfig)

    // Convert the order to a transaction
    const order = webhookData.data.object.order
    const transactions = square.convertOrdersToTransactions([order])

    if (transactions.length > 0) {
      // Add the transaction to your database
      await addTransaction(transactions[0])

      return NextResponse.json({ success: true })
    }

    return NextResponse.json({ success: false, message: "No valid transaction created" })
  } catch (error) {
    console.error("Error processing Square webhook:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

