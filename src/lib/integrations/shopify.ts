import type { Transaction } from "@/lib/types"

// Shopify API client configuration
interface ShopifyConfig {
  shopName: string
  apiKey: string
  apiSecret: string
  accessToken: string
}

export class ShopifyIntegration {
  private config: ShopifyConfig
  private baseUrl: string
  private headers: HeadersInit

  constructor(config: ShopifyConfig) {
    this.config = config
    this.baseUrl = `https://${config.shopName}.myshopify.com/admin/api/2023-04`
    this.headers = {
      "Content-Type": "application/json",
      "X-Shopify-Access-Token": config.accessToken,
    }
  }

  // Fetch orders and convert to loyalty transactions
  async syncOrders(since: Date): Promise<Transaction[]> {
    try {
      const sinceIso = since.toISOString()
      const response = await fetch(`${this.baseUrl}/orders.json?created_at_min=${sinceIso}&status=any`, {
        headers: this.headers,
      })

      if (!response.ok) {
        throw new Error(`Shopify API error: ${response.statusText}`)
      }

      const data = await response.json()
      return this.convertOrdersToTransactions(data.orders)
    } catch (error) {
      console.error("Error syncing Shopify orders:", error)
      throw error
    }
  }

  // Convert Shopify orders to loyalty transactions
  private convertOrdersToTransactions(orders: any[]): Transaction[] {
    return orders.map((order) => {
      // Calculate points based on order total
      const orderTotal = Number.parseFloat(order.total_price)
      const points = Math.floor(orderTotal * 10) // Example: $1 = 10 points

      return {
        id: 0, // Will be assigned by database
        userId: this.getUserIdFromEmail(order.email),
        date: new Date(order.created_at).toISOString().split("T")[0],
        description: `Purchase on Shopify - Order #${order.order_number}`,
        points: points,
        type: "earned",
        metadata: {
          source: "shopify",
          orderId: order.id,
          orderNumber: order.order_number,
          orderTotal: orderTotal,
        },
      }
    })
  }

  // Helper to find user ID from email
  private getUserIdFromEmail(email: string): number {
    // In a real implementation, you would query your database
    // to find the user ID associated with this email
    return 0 // Placeholder
  }

  // Install Shopify webhook for real-time order processing
  async installWebhooks(): Promise<void> {
    const webhooks = [
      {
        topic: "orders/create",
        address: `${process.env.API_BASE_URL}/api/webhooks/shopify/orders`,
        format: "json",
      },
    ]

    for (const webhook of webhooks) {
      try {
        const response = await fetch(`${this.baseUrl}/webhooks.json`, {
          method: "POST",
          headers: this.headers,
          body: JSON.stringify({ webhook }),
        })

        if (!response.ok) {
          throw new Error(`Failed to create webhook: ${response.statusText}`)
        }
      } catch (error) {
        console.error("Error installing Shopify webhook:", error)
        throw error
      }
    }
  }
}

