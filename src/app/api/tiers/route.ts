import { NextResponse } from "next/server"

// This would be replaced with your actual database logic
const tiers = [
  {
    id: 1,
    name: "Bronze",
    description: "Entry level tier for all new members",
    pointThreshold: 0,
    color: "#CD7F32",
    benefits: ["Earn 1 point per $1 spent", "Birthday reward", "Access to member-only offers"],
    active: true,
  },
  {
    id: 2,
    name: "Silver",
    description: "Intermediate tier with enhanced benefits",
    pointThreshold: 1000,
    color: "#C0C0C0",
    benefits: [
      "Earn 1.25 points per $1 spent",
      "Birthday reward",
      "Access to member-only offers",
      "Free shipping on orders over $50",
    ],
    active: true,
  },
  {
    id: 3,
    name: "Gold",
    description: "Premium tier with exclusive benefits",
    pointThreshold: 5000,
    color: "#FFD700",
    benefits: [
      "Earn 1.5 points per $1 spent",
      "Birthday reward",
      "Access to member-only offers",
      "Free shipping on all orders",
      "Early access to new products",
      "Dedicated customer service line",
    ],
    active: true,
  },
  {
    id: 4,
    name: "Platinum",
    description: "Elite tier with VIP benefits",
    pointThreshold: 10000,
    color: "#E5E4E2",
    benefits: [
      "Earn 2 points per $1 spent",
      "Birthday reward",
      "Access to member-only offers",
      "Free shipping on all orders",
      "Early access to new products",
      "Dedicated customer service line",
      "Annual gift",
      "Exclusive events access",
      "Personal shopping assistant",
    ],
    active: true,
  },
]

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const userId = searchParams.get("userId")
  const userPoints = userId ? 750 : 0 // In a real app, you would fetch the user's points

  // Return all active tiers
  const activeTiers = tiers.filter((tier) => tier.active)

  // Calculate user's current tier
  let currentTier = activeTiers[0]
  let nextTier = null

  for (let i = activeTiers.length - 1; i >= 0; i--) {
    if (userPoints >= activeTiers[i].pointThreshold) {
      currentTier = activeTiers[i]
      nextTier = activeTiers[i + 1] || null
      break
    }
  }

  // Calculate progress to next tier
  let progress = 0
  if (nextTier) {
    progress = Math.min(
      100,
      Math.round(
        ((userPoints - currentTier.pointThreshold) / (nextTier.pointThreshold - currentTier.pointThreshold)) * 100,
      ),
    )
  } else {
    progress = 100 // Already at highest tier
  }

  return NextResponse.json({
    tiers: activeTiers,
    userTier: {
      current: currentTier,
      next: nextTier,
      points: userPoints,
      pointsToNextTier: nextTier ? nextTier.pointThreshold - userPoints : 0,
      progress,
    },
  })
}

