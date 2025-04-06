import { NextResponse } from "next/server"
import { ShopifyIntegration } from "@/lib/integrations/shopify"
import { addTransaction } from "@/lib/transactions" // Assume this exists

// Verify Shopify webhook signature
function verifyShopifyWebhook(request: Request): boolean {
  const hmacHeader = request.headers.get("X-Shopify-Hmac-Sha256")
  if (!hmacHeader) return false

  const shopifySecret = process.env.SHOPIFY_WEBHOOK_SECRET || ""
  const body = request.body // This is a ReadableStream

  // In a real implementation, you would read the stream and verify the HMAC
  // This is simplified for demonstration purposes
  return true // Placeholder
}

export async function POST(request: Request) {
  try {
    // Verify the webhook is from Shopify
    if (!verifyShopifyWebhook(request)) {
      return NextResponse.json({ error: "Invalid webhook signature" }, { status: 401 })
    }

    // Parse the order data
    const orderData = await request.json()

    // Initialize Shopify integration
    const shopifyConfig = {
      shopName: process.env.SHOPIFY_SHOP_NAME || "",
      apiKey: process.env.SHOPIFY_API_KEY || "",
      apiSecret: process.env.SHOPIFY_API_SECRET || "",
      accessToken: process.env.SHOPIFY_ACCESS_TOKEN || "",
    }

    const shopify = new ShopifyIntegration(shopifyConfig)

    // Convert the order to a transaction
    const transactions = shopify.convertOrdersToTransactions([orderData])

    if (transactions.length > 0) {
      // Add the transaction to your database
      await addTransaction(transactions[0])

      return NextResponse.json({ success: true })
    }

    return NextResponse.json({ success: false, message: "No valid transaction created" })
  } catch (error) {
    console.error("Error processing Shopify webhook:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

