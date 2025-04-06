"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  ArrowLeft,
  Mail,
  Phone,
  Calendar,
  MapPin,
  Award,
  Gift,
  Trophy,
  BarChart,
  Edit,
  AlertCircle,
  CheckCircle,
  XCircle,
  Plus,
} from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"

interface UserDetail {
  id: number
  name: string
  email: string
  phone: string
  address: string
  joinDate: string
  status: "active" | "inactive"
  points: {
    current: number
    lifetime: number
    pending: number
    expired: number
  }
  tier: {
    id: number
    name: string
    color: string
    nextTier: string | null
    nextTierThreshold: number | null
    progress: number
  }
  transactions: {
    id: number
    date: string
    description: string
    points: number
    type: "earned" | "redeemed"
  }[]
  rewards: {
    id: number
    name: string
    date: string
    points: number
    status: "redeemed" | "expired" | "pending"
  }[]
  campaigns: {
    id: number
    name: string
    date: string
    points: number
    status: "completed" | "in-progress" | "available"
  }[]
  achievements: {
    id: number
    name: string
    date: string | null
    progress: number
    maxProgress: number
    points: number
    status: "completed" | "in-progress"
  }[]
}

export default function UserDetailPage() {
  const params = useParams()
  const router = useRouter()
  const userId = params.id

  const [user, setUser] = useState<UserDetail | null>(null)
  const [loading, setLoading] = useState(true)
  const [isAddPointsOpen, setIsAddPointsOpen] = useState(false)
  const [isEditUserOpen, setIsEditUserOpen] = useState(false)
  const [pointsToAdd, setPointsToAdd] = useState({
    amount: 100,
    reason: "Manual adjustment",
  })
  const [editUserData, setEditUserData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    status: "active" as "active" | "inactive",
  })

  useEffect(() => {
    // In a real app, fetch user data from API
    // const fetchUser = async () => {
    //   try {
    //     const response = await fetch(`/api/admin/users/${userId}`)
    //     const data = await response.json()
    //     setUser(data)
    //     setEditUserData({
    //       name: data.name,
    //       email: data.email,
    //       phone: data.phone,
    //       address: data.address,
    //       status: data.status,
    //     })
    //     setLoading(false)
    //   } catch (error) {
    //     console.error("Error fetching user:", error)
    //     setLoading(false)
    //   }
    // }

    // fetchUser()

    // Mock data for demonstration
    setTimeout(() => {
      const mockUser: UserDetail = {
        id: Number(userId),
        name: "John Doe",
        email: "john@example.com",
        phone: "+1 (555) 123-4567",
        address: "123 Main St, Anytown, CA 94321",
        joinDate: "2023-01-15",
        status: "active",
        points: {
          current: 750,
          lifetime: 1175,
          pending: 50,
          expired: 25,
        },
        tier: {
          id: 1,
          name: "Bronze",
          color: "#CD7F32",
          nextTier: "Silver",
          nextTierThreshold: 1000,
          progress: 75,
        },
        transactions: [
          { id: 1, date: "2023-04-01", description: "Purchase at Store #123", points: 50, type: "earned" },
          { id: 2, date: "2023-04-05", description: "Purchase at Store #456", points: 75, type: "earned" },
          { id: 3, date: "2023-04-10", description: "Redeemed $5 Gift Card", points: -250, type: "redeemed" },
          { id: 4, date: "2023-04-15", description: "Purchase at Store #789", points: 100, type: "earned" },
          { id: 5, date: "2023-04-20", description: "Bonus Points", points: 200, type: "earned" },
          { id: 6, date: "2023-04-25", description: "Completed Welcome Campaign", points: 200, type: "earned" },
          { id: 7, date: "2023-04-28", description: "Tier Upgrade Bonus", points: 100, type: "earned" },
        ],
        rewards: [
          { id: 1, name: "$5 Gift Card", date: "2023-04-10", points: 250, status: "redeemed" },
          { id: 2, name: "Free Product", date: "2023-03-15", points: 750, status: "redeemed" },
          { id: 3, name: "10% Off Coupon", date: "2023-02-20", points: 100, status: "expired" },
          { id: 4, name: "$10 Gift Card", date: "2023-05-05", points: 500, status: "pending" },
        ],
        campaigns: [
          { id: 1, name: "Welcome Bonus", date: "2023-01-20", points: 200, status: "completed" },
          { id: 2, name: "Refer a Friend", date: "2023-03-10", points: 300, status: "in-progress" },
          { id: 3, name: "Monthly Purchase", date: "2023-04-05", points: 150, status: "completed" },
          { id: 4, name: "Summer Sale", date: "", points: 0, status: "available" },
        ],
        achievements: [
          {
            id: 1,
            name: "First Purchase",
            date: "2023-01-18",
            progress: 1,
            maxProgress: 1,
            points: 50,
            status: "completed",
          },
          {
            id: 2,
            name: "Profile Completer",
            date: "2023-01-16",
            progress: 1,
            maxProgress: 1,
            points: 25,
            status: "completed",
          },
          {
            id: 3,
            name: "Loyal Customer",
            date: null,
            progress: 3,
            maxProgress: 5,
            points: 100,
            status: "in-progress",
          },
          {
            id: 4,
            name: "Social Butterfly",
            date: null,
            progress: 1,
            maxProgress: 3,
            points: 150,
            status: "in-progress",
          },
        ],
      }

      setUser(mockUser)
      setEditUserData({
        name: mockUser.name,
        email: mockUser.email,
        phone: mockUser.phone,
        address: mockUser.address,
        status: mockUser.status,
      })
      setLoading(false)
    }, 1000)
  }, [userId])

  const handleAddPoints = async () => {
    if (!user) return

    // In a real app, send to API
    // try {
    //   const response = await fetch(`/api/admin/users/${userId}/points`, {
    //     method: 'POST',
    //     headers: {
    //       'Content-Type': 'application/json',
    //     },
    //     body: JSON.stringify(pointsToAdd),
    //   })
    //   const data = await response.json()
    //
    //   // Update user data
    //   setUser({
    //     ...user,
    //     points: {
    //       ...user.points,
    //       current: user.points.current + pointsToAdd.amount,
    //       lifetime: user.points.lifetime + pointsToAdd.amount,
    //     },
    //     transactions: [
    //       {
    //         id: Math.max(...user.transactions.map(t => t.id)) + 1,
    //         date: new Date().toISOString().split('T')[0],
    //         description: pointsToAdd.reason,
    //         points: pointsToAdd.amount,
    //         type: 'earned',
    //       },
    //       ...user.transactions,
    //     ]
    //   })
    // } catch (error) {
    //   console.error("Error adding points:", error)
    // }

    // Mock implementation
    setUser({
      ...user,
      points: {
        ...user.points,
        current: user.points.current + pointsToAdd.amount,
        lifetime: user.points.lifetime + pointsToAdd.amount,
      },
      transactions: [
        {
          id: Math.max(...user.transactions.map((t) => t.id)) + 1,
          date: new Date().toISOString().split("T")[0],
          description: pointsToAdd.reason,
          points: pointsToAdd.amount,
          type: "earned",
        },
        ...user.transactions,
      ],
    })

    setIsAddPointsOpen(false)
    setPointsToAdd({
      amount: 100,
      reason: "Manual adjustment",
    })
  }

  const handleEditUser = async () => {
    if (!user) return

    // In a real app, send to API
    // try {
    //   const response = await fetch(`/api/admin/users/${userId}`, {
    //     method: 'PUT',
    //     headers: {
    //       'Content-Type': 'application/json',
    //     },
    //     body: JSON.stringify(editUserData),
    //   })
    //   const data = await response.json()
    //
    //   // Update user data
    //   setUser({
    //     ...user,
    //     name: editUserData.name,
    //     email: editUserData.email,
    //     phone: editUserData.phone,
    //     address: editUserData.address,
    //     status: editUserData.status,
    //   })
    // } catch (error) {
    //   console.error("Error updating user:", error)
    // }

    // Mock implementation
    setUser({
      ...user,
      name: editUserData.name,
      email: editUserData.email,
      phone: editUserData.phone,
      address: editUserData.address,
      status: editUserData.status,
    })

    setIsEditUserOpen(false)
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center h-full py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-700"></div>
      </div>
    )
  }

  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center h-full py-12">
        <AlertCircle className="h-12 w-12 text-red-500 mb-4" />
        <h2 className="text-2xl font-bold mb-2">User Not Found</h2>
        <p className="text-muted-foreground mb-4">The user you're looking for doesn't exist or has been removed.</p>
        <Button asChild>
          <Link href="/admin/users">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Users
          </Link>
        </Button>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Button variant="outline" size="icon" asChild>
            <Link href="/admin/users">
              <ArrowLeft className="h-4 w-4" />
            </Link>
          </Button>
          <h1 className="text-3xl font-bold">User Details</h1>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => setIsEditUserOpen(true)}>
            <Edit className="mr-2 h-4 w-4" />
            Edit User
          </Button>
          <Button onClick={() => setIsAddPointsOpen(true)}>
            <Plus className="mr-2 h-4 w-4" />
            Add Points
          </Button>
        </div>
      </div>

      {/* User Profile Card */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-6">
            <div className="flex flex-col items-center gap-2">
              <Avatar className="h-24 w-24">
                <AvatarImage src="/placeholder.svg?height=96&width=96" alt={user.name} />
                <AvatarFallback className="text-2xl">
                  {user.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <Badge variant={user.status === "active" ? "default" : "secondary"}>
                {user.status === "active" ? "Active" : "Inactive"}
              </Badge>
            </div>

            <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h2 className="text-2xl font-bold">{user.name}</h2>
                <div className="flex flex-col gap-2 mt-2">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Mail className="h-4 w-4" />
                    <span>{user.email}</span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Phone className="h-4 w-4" />
                    <span>{user.phone}</span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <MapPin className="h-4 w-4" />
                    <span>{user.address}</span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Calendar className="h-4 w-4" />
                    <span>Joined on {user.joinDate}</span>
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-4">
                <div>
                  <div className="flex items-center gap-2">
                    <Trophy className="h-5 w-5" style={{ color: user.tier.color }} />
                    <span className="font-medium">Current Tier: {user.tier.name}</span>
                  </div>
                  {user.tier.nextTier && (
                    <div className="mt-2">
                      <div className="flex justify-between text-sm mb-1">
                        <span>Progress to {user.tier.nextTier}</span>
                        <span>{user.tier.progress}%</span>
                      </div>
                      <Progress value={user.tier.progress} className="h-2" />
                      <p className="text-xs mt-1 text-muted-foreground">
                        {user.points.current.toLocaleString()} / {user.tier.nextTierThreshold?.toLocaleString()} points
                      </p>
                    </div>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-muted/40 p-3 rounded-lg">
                    <div className="text-sm text-muted-foreground">Current Points</div>
                    <div className="text-2xl font-bold text-emerald-600">{user.points.current.toLocaleString()}</div>
                  </div>
                  <div className="bg-muted/40 p-3 rounded-lg">
                    <div className="text-sm text-muted-foreground">Lifetime Points</div>
                    <div className="text-2xl font-bold">{user.points.lifetime.toLocaleString()}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Tabs for different sections */}
      <Tabs defaultValue="transactions" className="w-full">
        <TabsList className="grid grid-cols-5 mb-4">
          <TabsTrigger value="transactions">Transactions</TabsTrigger>
          <TabsTrigger value="rewards">Rewards</TabsTrigger>
          <TabsTrigger value="campaigns">Campaigns</TabsTrigger>
          <TabsTrigger value="achievements">Achievements</TabsTrigger>
          <TabsTrigger value="summary">Summary</TabsTrigger>
        </TabsList>

        {/* Transactions Tab */}
        <TabsContent value="transactions">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart className="h-5 w-5 text-muted-foreground" />
                Transaction History
              </CardTitle>
              <CardDescription>Complete history of points earned and redeemed</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead>Points</TableHead>
                    <TableHead>Type</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {user.transactions.map((transaction) => (
                    <TableRow key={transaction.id}>
                      <TableCell>{transaction.date}</TableCell>
                      <TableCell>{transaction.description}</TableCell>
                      <TableCell className={transaction.type === "earned" ? "text-green-600" : "text-red-600"}>
                        {transaction.type === "earned" ? "+" : "-"}
                        {Math.abs(transaction.points)}
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant="outline"
                          className={
                            transaction.type === "earned" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                          }
                        >
                          {transaction.type === "earned" ? "Earned" : "Redeemed"}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Rewards Tab */}
        <TabsContent value="rewards">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Gift className="h-5 w-5 text-muted-foreground" />
                Reward Redemptions
              </CardTitle>
              <CardDescription>History of rewards redeemed by this user</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Reward</TableHead>
                    <TableHead>Points</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {user.rewards.map((reward) => (
                    <TableRow key={reward.id}>
                      <TableCell>{reward.date}</TableCell>
                      <TableCell>{reward.name}</TableCell>
                      <TableCell>{reward.points}</TableCell>
                      <TableCell>
                        <Badge
                          variant="outline"
                          className={
                            reward.status === "redeemed"
                              ? "bg-green-100 text-green-800"
                              : reward.status === "expired"
                                ? "bg-red-100 text-red-800"
                                : "bg-yellow-100 text-yellow-800"
                          }
                        >
                          {reward.status.charAt(0).toUpperCase() + reward.status.slice(1)}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Campaigns Tab */}
        <TabsContent value="campaigns">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Award className="h-5 w-5 text-muted-foreground" />
                Campaign Participation
              </CardTitle>
              <CardDescription>Campaigns this user has participated in</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Campaign</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Points</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {user.campaigns.map((campaign) => (
                    <TableRow key={campaign.id}>
                      <TableCell>{campaign.name}</TableCell>
                      <TableCell>{campaign.date || "—"}</TableCell>
                      <TableCell>{campaign.points || "—"}</TableCell>
                      <TableCell>
                        <Badge
                          variant="outline"
                          className={
                            campaign.status === "completed"
                              ? "bg-green-100 text-green-800"
                              : campaign.status === "in-progress"
                                ? "bg-blue-100 text-blue-800"
                                : "bg-gray-100 text-gray-800"
                          }
                        >
                          {campaign.status === "completed"
                            ? "Completed"
                            : campaign.status === "in-progress"
                              ? "In Progress"
                              : "Available"}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Achievements Tab */}
        <TabsContent value="achievements">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Trophy className="h-5 w-5 text-muted-foreground" />
                Achievements
              </CardTitle>
              <CardDescription>User's progress on achievements</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Achievement</TableHead>
                    <TableHead>Progress</TableHead>
                    <TableHead>Points</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Completed On</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {user.achievements.map((achievement) => (
                    <TableRow key={achievement.id}>
                      <TableCell>{achievement.name}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Progress
                            value={(achievement.progress / achievement.maxProgress) * 100}
                            className="h-2 w-24"
                          />
                          <span className="text-xs">
                            {achievement.progress}/{achievement.maxProgress}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell>{achievement.points}</TableCell>
                      <TableCell>
                        <Badge
                          variant="outline"
                          className={
                            achievement.status === "completed"
                              ? "bg-green-100 text-green-800"
                              : "bg-blue-100 text-blue-800"
                          }
                        >
                          {achievement.status === "completed" ? "Completed" : "In Progress"}
                        </Badge>
                      </TableCell>
                      <TableCell>{achievement.date || "—"}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Summary Tab */}
        <TabsContent value="summary">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>Points Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center pb-2 border-b">
                    <span className="font-medium">Current Balance</span>
                    <span className="text-xl font-bold text-emerald-600">{user.points.current.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center pb-2 border-b">
                    <span className="font-medium">Lifetime Earned</span>
                    <span>{user.points.lifetime.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center pb-2 border-b">
                    <span className="font-medium">Pending Points</span>
                    <span>{user.points.pending.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center pb-2 border-b">
                    <span className="font-medium">Expired Points</span>
                    <span>{user.points.expired.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center pb-2 border-b">
                    <span className="font-medium">Total Redeemed</span>
                    <span>
                      {user.transactions
                        .filter((t) => t.type === "redeemed")
                        .reduce((sum, t) => sum + Math.abs(t.points), 0)
                        .toLocaleString()}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Activity Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center pb-2 border-b">
                    <span className="font-medium">Total Transactions</span>
                    <span>{user.transactions.length}</span>
                  </div>
                  <div className="flex justify-between items-center pb-2 border-b">
                    <span className="font-medium">Rewards Redeemed</span>
                    <span>{user.rewards.filter((r) => r.status === "redeemed").length}</span>
                  </div>
                  <div className="flex justify-between items-center pb-2 border-b">
                    <span className="font-medium">Campaigns Completed</span>
                    <span>{user.campaigns.filter((c) => c.status === "completed").length}</span>
                  </div>
                  <div className="flex justify-between items-center pb-2 border-b">
                    <span className="font-medium">Achievements Completed</span>
                    <span>{user.achievements.filter((a) => a.status === "completed").length}</span>
                  </div>
                  <div className="flex justify-between items-center pb-2 border-b">
                    <span className="font-medium">Days as Member</span>
                    <span>
                      {Math.floor((new Date().getTime() - new Date(user.joinDate).getTime()) / (1000 * 60 * 60 * 24))}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    ...user.transactions,
                    ...user.rewards.map((r) => ({
                      id: `reward-${r.id}`,
                      date: r.date,
                      description: `${r.status === "redeemed" ? "Redeemed" : r.status === "expired" ? "Expired" : "Reserved"} ${r.name}`,
                      type: r.status,
                    })),
                    ...user.campaigns
                      .filter((c) => c.status === "completed")
                      .map((c) => ({
                        id: `campaign-${c.id}`,
                        date: c.date,
                        description: `Completed campaign: ${c.name}`,
                        type: "completed",
                      })),
                  ]
                    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
                    .slice(0, 5)
                    .map((activity) => (
                      <div key={activity.id} className="flex items-start gap-3">
                        <div
                          className={`rounded-full p-2 ${
                            activity.type === "earned" || activity.type === "completed"
                              ? "bg-green-100 text-green-800"
                              : activity.type === "redeemed"
                                ? "bg-blue-100 text-blue-800"
                                : "bg-red-100 text-red-800"
                          }`}
                        >
                          {activity.type === "earned" || activity.type === "completed" ? (
                            <CheckCircle className="h-4 w-4" />
                          ) : activity.type === "redeemed" ? (
                            <Gift className="h-4 w-4" />
                          ) : (
                            <XCircle className="h-4 w-4" />
                          )}
                        </div>
                        <div className="flex-1">
                          <p className="font-medium">{activity.description}</p>
                          <p className="text-sm text-muted-foreground">{activity.date}</p>
                        </div>
                      </div>
                    ))}
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" size="sm" className="ml-auto">
                  View All Activity
                </Button>
              </CardFooter>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      {/* Add Points Dialog */}
      <Dialog open={isAddPointsOpen} onOpenChange={setIsAddPointsOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Points</DialogTitle>
            <DialogDescription>Add points to {user.name}'s account</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="points-amount">Points Amount</Label>
              <Input
                id="points-amount"
                type="number"
                value={pointsToAdd.amount}
                onChange={(e) => setPointsToAdd({ ...pointsToAdd, amount: Number.parseInt(e.target.value) || 0 })}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="points-reason">Reason</Label>
              <Textarea
                id="points-reason"
                value={pointsToAdd.reason}
                onChange={(e) => setPointsToAdd({ ...pointsToAdd, reason: e.target.value })}
                placeholder="Explain why points are being added"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddPointsOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleAddPoints}>Add Points</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit User Dialog */}
      <Dialog open={isEditUserOpen} onOpenChange={setIsEditUserOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit User</DialogTitle>
            <DialogDescription>Update {user.name}'s information</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="edit-name">Name</Label>
              <Input
                id="edit-name"
                value={editUserData.name}
                onChange={(e) => setEditUserData({ ...editUserData, name: e.target.value })}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="edit-email">Email</Label>
              <Input
                id="edit-email"
                type="email"
                value={editUserData.email}
                onChange={(e) => setEditUserData({ ...editUserData, email: e.target.value })}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="edit-phone">Phone</Label>
              <Input
                id="edit-phone"
                value={editUserData.phone}
                onChange={(e) => setEditUserData({ ...editUserData, phone: e.target.value })}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="edit-address">Address</Label>
              <Textarea
                id="edit-address"
                value={editUserData.address}
                onChange={(e) => setEditUserData({ ...editUserData, address: e.target.value })}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="edit-status">Status</Label>
              <Select
                value={editUserData.status}
                onValueChange={(value) => setEditUserData({ ...editUserData, status: value as "active" | "inactive" })}
              >
                <SelectTrigger id="edit-status">
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditUserOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleEditUser}>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

