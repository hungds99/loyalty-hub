/**
 * RewardHub SDK
 *
 * A JavaScript/TypeScript SDK for integrating with the RewardHub loyalty program API.
 */

export interface RewardHubConfig {
  apiKey: string
  baseUrl?: string
}

export interface User {
  id: number
  name: string
  email: string
  points: number
  tier: string
  joinDate: string
}

export interface Transaction {
  id: number
  userId: number
  date: string
  description: string
  points: number
  type: "earned" | "redeemed"
}

export interface Campaign {
  id: number
  name: string
  description: string
  type: string
  points: number
  startDate: string
  endDate: string | null
  active: boolean
  condition: string
}

export interface Reward {
  id: number
  name: string
  points: number
  image: string
  description?: string
}

export class RewardHubSDK {
  private apiKey: string
  private baseUrl: string

  constructor(config: RewardHubConfig) {
    this.apiKey = config.apiKey
    this.baseUrl = config.baseUrl || "https://api.rewardhub.com/v1"
  }

  private async request<T>(method: string, path: string, body?: any): Promise<T> {
    const url = `${this.baseUrl}${path}`
    const headers: HeadersInit = {
      Authorization: `Bearer ${this.apiKey}`,
      "Content-Type": "application/json",
    }

    const options: RequestInit = {
      method,
      headers,
      body: body ? JSON.stringify(body) : undefined,
    }

    const response = await fetch(url, options)

    if (!response.ok) {
      const error = await response.json()
      throw new Error(error.message || `API request failed with status ${response.status}`)
    }

    return response.json()
  }

  // User methods

  async getUsers(params?: { limit?: number; offset?: number; email?: string }): Promise<{ data: User[]; meta: any }> {
    const queryParams = new URLSearchParams()
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined) {
          queryParams.append(key, value.toString())
        }
      })
    }

    const query = queryParams.toString() ? `?${queryParams.toString()}` : ""
    return this.request<{ data: User[]; meta: any }>("GET", `/users${query}`)
  }

  async getUser(id: number): Promise<User> {
    return this.request<User>("GET", `/users/${id}`)
  }

  async createUser(user: { name: string; email: string; points?: number }): Promise<User> {
    return this.request<User>("POST", "/users", user)
  }

  async updateUser(id: number, data: Partial<User>): Promise<User> {
    return this.request<User>("PUT", `/users/${id}`, data)
  }

  // Transaction methods

  async getTransactions(userId?: number): Promise<Transaction[]> {
    const query = userId ? `?userId=${userId}` : ""
    return this.request<Transaction[]>("GET", `/transactions${query}`)
  }

  async createTransaction(transaction: {
    userId: number
    points: number
    description: string
    type: "earned" | "redeemed"
  }): Promise<Transaction> {
    return this.request<Transaction>("POST", "/transactions", transaction)
  }

  // Campaign methods

  async getCampaigns(): Promise<Campaign[]> {
    return this.request<Campaign[]>("GET", "/campaigns")
  }

  async completeCampaign(userId: number, campaignId: number): Promise<{ success: boolean; pointsEarned: number }> {
    return this.request<{ success: boolean; pointsEarned: number }>("POST", "/campaigns", {
      userId,
      campaignId,
    })
  }

  // Reward methods

  async getRewards(): Promise<Reward[]> {
    return this.request<Reward[]>("GET", "/rewards")
  }

  async redeemReward(userId: number, rewardId: number): Promise<{ success: boolean; message: string }> {
    return this.request<{ success: boolean; message: string }>("POST", "/rewards", {
      userId,
      rewardId,
    })
  }

  // Helper methods

  async addPoints(userId: number, points: number, description: string): Promise<Transaction> {
    return this.createTransaction({
      userId,
      points,
      description,
      type: "earned",
    })
  }

  async deductPoints(userId: number, points: number, description: string): Promise<Transaction> {
    return this.createTransaction({
      userId,
      points,
      description,
      type: "redeemed",
    })
  }

  async getUserPoints(userId: number): Promise<number> {
    const user = await this.getUser(userId)
    return user.points
  }
}

// Export a factory function to create the SDK instance
export function createRewardHubClient(config: RewardHubConfig): RewardHubSDK {
  return new RewardHubSDK(config)
}

