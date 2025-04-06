export interface User {
  id: number
  name: string
  email: string
  points: number
  status?: "active" | "inactive"
  joinDate?: string
  tierId?: number
}

export interface Transaction {
  id: number
  userId: number
  date: string
  description: string
  points: number
  type: "earned" | "redeemed"
}

export interface Reward {
  id: number
  name: string
  points: number
  image: string
  active?: boolean
  description?: string
}

export interface CampaignCategory {
  id: number
  name: string
  description: string
  color: string
  icon?: string
}

export interface VerificationMethod {
  type: "automatic" | "manual" | "code" | "receipt" | "social" | "quiz" | "location" | "api"
  description: string
  config?: {
    code?: string
    requiredPurchaseAmount?: number
    socialPlatform?: string
    quizQuestions?: {
      question: string
      options: string[]
      correctAnswer: number
    }[]
    locationRadius?: number
    requiredActions?: string[]
    [key: string]: any
  }
}

export interface Campaign {
  id: number
  name: string
  description: string
  type: "one-time" | "recurring" | "limited-time" | "milestone" | "social" | "purchase" | "referral" | "multi-step"
  points: number
  startDate: string
  endDate: string | null
  active: boolean
  condition: string
  participantsCount?: number
  completionsCount?: number
  category?: string
  categoryId?: number
  verificationMethod?: string
  verificationDetails?: {
    requiredPurchaseAmount?: number
    requiredActions?: string[]
    code?: string
    socialPlatform?: string
    locationName?: string
    [key: string]: any
  }
  image?: string
  featured?: boolean
  milestoneThreshold?: number
  steps?: {
    id: number
    name: string
    description: string
    points: number
    required: boolean
    order: number
    completed?: boolean
  }[]
}

export interface CampaignParticipation {
  id: number
  userId: number
  campaignId: number
  participated: boolean
  completed: boolean
  completionDate: string | null
  pointsEarned: number
  verificationStatus?: "pending" | "approved" | "rejected"
  verificationData?: {
    code?: string
    receiptUrl?: string
    socialPostUrl?: string
    quizAnswers?: number[]
    location?: {
      latitude: number
      longitude: number
    }
    [key: string]: any
  }
  stepsCompleted?: {
    stepId: number
    completed: boolean
    completionDate: string | null
  }[]
}

export interface Tier {
  id: number
  name: string
  description: string
  pointThreshold: number
  color: string
  benefits: string[]
  active: boolean
  usersCount?: number
}

export interface UserTier {
  current: Tier
  next: Tier | null
  points: number
  pointsToNextTier: number
  progress: number
}

