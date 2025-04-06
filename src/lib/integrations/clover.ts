import type { Transaction } from "@/lib/types"

// Clover API client configuration
interface CloverConfig {
  apiKey: string
  merchantId: string
  environment: "sandbox" | "production"
}

export class CloverIntegration {
  private config: CloverConfig
  private baseUrl: string

  constructor(config: CloverConfig) {
    this.config = config
    this.baseUrl =
      config.environment === "production"
        ? `https://api.clover.com/v3/merchants/${config.merchantId}`
        : `https://sandbox.dev.clover.com/v3/merchants/${config.merchantId}`
  }

  // Generate authentication headers for Clover API
  private getAuthHeaders(): HeadersInit {
    return {
      Authorization: `Bearer ${this.config.apiKey}`,
      "Content-Type": "application/json",
    }
  }

  // Fetch orders and convert to loyalty transactions
  async syncOrders(since: Date): Promise<Transaction[]> {
    try {
      const sinceTimestamp = since.getTime()
      const response = await fetch(`${this.baseUrl}/orders?filter=createdTime>=${sinceTimestamp}&expand=lineItems`, {
        headers: this.getAuthHeaders(),
      })

      if (!response.ok) {
        throw new Error(`Clover API error: ${response.statusText}`)
      }

      const data = await response.json()
      return this.convertOrdersToTransactions(data.elements || [])
    } catch (error) {
      console.error("Error syncing Clover orders:", error)
      throw error
    }
  }

  // Convert Clover orders to loyalty transactions
  private convertOrdersToTransactions(orders: any[]): Transaction[] {
    return orders.map((order) => {
      // Calculate points based on order total
      const orderTotal = order.total / 100 // Clover amounts are in cents
      const points = Math.floor(orderTotal * 10) // Example: $1 = 10 points

      return {
        id: 0, // Will be assigned by database
        userId: this.getUserIdFromOrder(order),
        date: new Date(order.createdTime).toISOString().split("T")[0],
        description: `In-store purchase - Order #${order.id.substring(0, 8)}`,
        points: points,
        type: "earned",
        metadata: {
          source: "clover",
          orderId: order.id,
          orderTotal: orderTotal,
        },
      }
    })
  }

  // Helper to find user ID from order
  private getUserIdFromOrder(order: any): number {
    // In a real implementation, you would extract customer info from the order
    // and find the matching user in your database
    return 0 // Placeholder
  }

  // Register a webhook for real-time order processing
  async registerWebhook(): Promise<void> {
    try {
      const response = await fetch(`${this.baseUrl}/webhooks`, {
        method: "POST",
        headers: this.getAuthHeaders(),
        body: JSON.stringify({
          url: `${process.env.API_BASE_URL}/api/webhooks/clover`,
          eventTypes: ["ORDER_CREATED"],
        }),
      })

      if (!response.ok) {
        throw new Error(`Failed to register webhook: ${response.statusText}`)
      }
    } catch (error) {
      console.error("Error registering Clover webhook:", error)
      throw error
    }
  }
}

