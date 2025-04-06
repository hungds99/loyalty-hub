import type { Transaction } from "@/lib/types"
import { randomUUID } from "crypto"

// Square API client configuration
interface SquareConfig {
  accessToken: string
  locationId: string
  environment: "sandbox" | "production"
}

export class SquareIntegration {
  private config: SquareConfig
  private baseUrl: string
  private headers: HeadersInit

  constructor(config: SquareConfig) {
    this.config = config
    this.baseUrl =
      config.environment === "production" ? "https://connect.squareup.com/v2" : "https://connect.squareupsandbox.com/v2"
    this.headers = {
      "Square-Version": "2023-06-08",
      Authorization: `Bearer ${config.accessToken}`,
      "Content-Type": "application/json",
    }
  }

  // Fetch orders and convert to loyalty transactions
  async syncOrders(since: Date): Promise<Transaction[]> {
    try {
      const sinceIso = since.toISOString()
      const body = {
        location_ids: [this.config.locationId],
        query: {
          filter: {
            date_time_filter: {
              created_at: {
                start_at: sinceIso,
              },
            },
            state_filter: {
              states: ["COMPLETED"],
            },
          },
          sort: {
            sort_field: "CREATED_AT",
            sort_order: "DESC",
          },
        },
      }

      const response = await fetch(`${this.baseUrl}/orders/search`, {
        method: "POST",
        headers: this.headers,
        body: JSON.stringify(body),
      })

      if (!response.ok) {
        throw new Error(`Square API error: ${response.statusText}`)
      }

      const data = await response.json()
      return this.convertOrdersToTransactions(data.orders || [])
    } catch (error) {
      console.error("Error syncing Square orders:", error)
      throw error
    }
  }

  // Convert Square orders to loyalty transactions
  private convertOrdersToTransactions(orders: any[]): Transaction[] {
    return orders.map((order) => {
      // Calculate points based on order total
      const orderTotal = order.total_money
        ? Number.parseFloat(order.total_money.amount) / 100 // Square amounts are in cents
        : 0
      const points = Math.floor(orderTotal * 10) // Example: $1 = 10 points

      // Try to find customer info
      const customerName = order.customer ? order.customer.display_name : "Unknown Customer"
      const customerEmail = this.findCustomerEmail(order)

      return {
        id: 0, // Will be assigned by database
        userId: this.getUserIdFromEmail(customerEmail),
        date: new Date(order.created_at).toISOString().split("T")[0],
        description: `In-store purchase - Order #${order.id.substring(0, 8)}`,
        points: points,
        type: "earned",
        metadata: {
          source: "square",
          orderId: order.id,
          orderTotal: orderTotal,
          locationId: order.location_id,
        },
      }
    })
  }

  // Helper to extract customer email from order
  private findCustomerEmail(order: any): string {
    // In a real implementation, you would extract the email from the order
    // This is a simplified example
    return "customer@example.com"
  }

  // Helper to find user ID from email
  private getUserIdFromEmail(email: string): number {
    // In a real implementation, you would query your database
    // to find the user ID associated with this email
    return 0 // Placeholder
  }

  // Create a loyalty card in Square
  async createLoyaltyCard(userId: number, customerEmail: string): Promise<string> {
    try {
      // First, find or create customer in Square
      const customerId = await this.findOrCreateCustomer(customerEmail)

      // Then create a loyalty card
      const cardId = randomUUID()
      const response = await fetch(`${this.baseUrl}/loyalty/accounts`, {
        method: "POST",
        headers: this.headers,
        body: JSON.stringify({
          loyalty_account: {
            program_id: this.config.programId,
            customer_id: customerId,
            mapping: {
              phone_number: "+11234567890", // This would come from your user data
            },
          },
          idempotency_key: cardId,
        }),
      })

      if (!response.ok) {
        throw new Error(`Square API error: ${response.statusText}`)
      }

      const data = await response.json()
      return data.loyalty_account.id
    } catch (error) {
      console.error("Error creating Square loyalty card:", error)
      throw error
    }
  }

  // Find or create a customer in Square
  private async findOrCreateCustomer(email: string): Promise<string> {
    // In a real implementation, you would search for the customer first
    // and create them if they don't exist
    return "customer_id" // Placeholder
  }
}

