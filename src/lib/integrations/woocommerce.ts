import type { Transaction } from "@/lib/types"

// WooCommerce API client configuration
interface WooCommerceConfig {
  siteUrl: string
  consumerKey: string
  consumerSecret: string
}

export class WooCommerceIntegration {
  private config: WooCommerceConfig
  private baseUrl: string

  constructor(config: WooCommerceConfig) {
    this.config = config
    this.baseUrl = `${config.siteUrl}/wp-json/wc/v3`
  }

  // Generate authentication headers for WooCommerce API
  private getAuthHeaders(): HeadersInit {
    const auth = Buffer.from(`${this.config.consumerKey}:${this.config.consumerSecret}`).toString("base64")
    return {
      Authorization: `Basic ${auth}`,
      "Content-Type": "application/json",
    }
  }

  // Fetch orders and convert to loyalty transactions
  async syncOrders(since: Date): Promise<Transaction[]> {
    try {
      const sinceIso = since.toISOString()
      const response = await fetch(`${this.baseUrl}/orders?after=${sinceIso}&status=completed`, {
        headers: this.getAuthHeaders(),
      })

      if (!response.ok) {
        throw new Error(`WooCommerce API error: ${response.statusText}`)
      }

      const orders = await response.json()
      return this.convertOrdersToTransactions(orders)
    } catch (error) {
      console.error("Error syncing WooCommerce orders:", error)
      throw error
    }
  }

  // Convert WooCommerce orders to loyalty transactions
  private convertOrdersToTransactions(orders: any[]): Transaction[] {
    return orders.map((order) => {
      // Calculate points based on order total
      const orderTotal = Number.parseFloat(order.total)
      const points = Math.floor(orderTotal * 10) // Example: $1 = 10 points

      return {
        id: 0, // Will be assigned by database
        userId: this.getUserIdFromEmail(order.billing.email),
        date: new Date(order.date_created).toISOString().split("T")[0],
        description: `Purchase on Website - Order #${order.number}`,
        points: points,
        type: "earned",
        metadata: {
          source: "woocommerce",
          orderId: order.id,
          orderNumber: order.number,
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

  // Register WooCommerce webhook for real-time order processing
  async registerWebhooks(): Promise<void> {
    const webhooks = [
      {
        name: "Order completed",
        topic: "order.completed",
        delivery_url: `${process.env.API_BASE_URL}/api/webhooks/woocommerce/orders`,
      },
    ]

    for (const webhook of webhooks) {
      try {
        const response = await fetch(`${this.baseUrl}/webhooks`, {
          method: "POST",
          headers: this.getAuthHeaders(),
          body: JSON.stringify(webhook),
        })

        if (!response.ok) {
          throw new Error(`Failed to create webhook: ${response.statusText}`)
        }
      } catch (error) {
        console.error("Error registering WooCommerce webhook:", error)
        throw error
      }
    }
  }
}

