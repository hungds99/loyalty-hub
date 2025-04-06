"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  ArrowLeft,
  BarChart,
  Edit,
  Users,
  AlertTriangle,
  CheckSquare,
  XSquare,
  RefreshCw,
  Eye,
  FileCheck,
  LinkIcon,
  MapPin,
} from "lucide-react"
import type { Campaign, CampaignParticipation } from "@/lib/types"

// Mock campaign categories
const campaignCategories = [
  { id: 1, name: "Onboarding", description: "Campaigns for new users", color: "#4CAF50", icon: "UserPlus" },
  { id: 2, name: "Engagement", description: "Campaigns to increase engagement", color: "#2196F3", icon: "Heart" },
  { id: 3, name: "Seasonal", description: "Holiday and seasonal campaigns", color: "#FF9800", icon: "Calendar" },
  { id: 4, name: "Referral", description: "Campaigns to encourage referrals", color: "#9C27B0", icon: "Users" },
  { id: 5, name: "Purchase", description: "Campaigns related to purchases", color: "#F44336", icon: "ShoppingBag" },
]

// Mock verification methods
const verificationMethods = [
  { id: "automatic", name: "Automatic", description: "System automatically verifies completion" },
  { id: "manual", name: "Manual Review", description: "Admin manually verifies completion" },
  { id: "code", name: "Verification Code", description: "User enters a code to verify completion" },
  { id: "receipt", name: "Receipt Upload", description: "User uploads a receipt as proof" },
  { id: "social", name: "Social Media Proof", description: "User provides social media post link" },
  { id: "quiz", name: "Quiz", description: "User must answer questions correctly" },
  { id: "location", name: "Location Check-in", description: "User must be at a specific location" },
  { id: "api", name: "API Integration", description: "Third-party API verifies completion" },
]

export default function CampaignDetailPage() {
  const params = useParams()
  const router = useRouter()
  const campaignId = Number(params.id)

  const [campaign, setCampaign] = useState<Campaign | null>(null)
  const [participations, setParticipations] = useState<CampaignParticipation[]>([])
  const [loading, setLoading] = useState(true)
  const [isEditCampaignOpen, setIsEditCampaignOpen] = useState(false)
  const [isVerificationOpen, setIsVerificationOpen] = useState(false)
  const [selectedParticipation, setSelectedParticipation] = useState<CampaignParticipation | null>(null)

  useEffect(() => {
    // In a real app, fetch campaign data from API
    const fetchCampaign = async () => {
      try {
        // Mock data for demonstration
        const mockCampaign: Campaign = {
          id: campaignId,
          name: "Summer Sale",
          description: "Double points for all purchases during summer",
          type: "limited-time",
          points: 0,
          startDate: "2023-06-01",
          endDate: "2023-08-31",
          active: true,
          participantsCount: 945,
          completionsCount: 512,
          condition: "Make a purchase during the summer sale period (points are doubled)",
          category: "Seasonal",
          verificationMethod: "receipt",
          verificationDetails: {
            requiredPurchaseAmount: 25,
            requiredActions: ["Upload receipt with minimum $25 purchase"],
          },
          image: "/placeholder.svg?height=300&width=600",
          featured: true,
        }

        // Mock participations
        const mockParticipations: CampaignParticipation[] = [
          {
            id: 1,
            userId: 101,
            campaignId: campaignId,
            participated: true,
            completed: true,
            completionDate: "2023-06-15",
            pointsEarned: 150,
            verificationStatus: "approved",
            verificationData: {
              receiptUrl: "/placeholder.svg?height=200&width=300",
            },
          },
          {
            id: 2,
            userId: 102,
            campaignId: campaignId,
            participated: true,
            completed: false,
            completionDate: null,
            pointsEarned: 0,
            verificationStatus: "pending",
            verificationData: {
              receiptUrl: "/placeholder.svg?height=200&width=300",
            },
          },
          {
            id: 3,
            userId: 103,
            campaignId: campaignId,
            participated: true,
            completed: false,
            completionDate: null,
            pointsEarned: 0,
            verificationStatus: "rejected",
            verificationData: {
              receiptUrl: "/placeholder.svg?height=200&width=300",
            },
          },
        ]

        setCampaign(mockCampaign)
        setParticipations(mockParticipations)
        setLoading(false)
      } catch (error) {
        console.error("Error fetching campaign:", error)
        setLoading(false)
      }
    }

    fetchCampaign()
  }, [campaignId])

  const handleEditCampaign = () => {
    if (!campaign) return

    // In a real app, send updated campaign to API
    console.log("Updating campaign:", campaign)

    setIsEditCampaignOpen(false)
  }

  const handleVerificationAction = (action: "approve" | "reject") => {
    if (!selectedParticipation) return

    // In a real app, send verification action to API
    const updatedParticipations = participations.map((p) =>
      p.id === selectedParticipation.id
        ? {
            ...p,
            verificationStatus: action === "approve" ? "approved" : "rejected",
            completed: action === "approve",
            completionDate: action === "approve" ? new Date().toISOString().split("T")[0] : null,
            pointsEarned: action === "approve" ? campaign?.points || 0 : 0,
          }
        : p,
    )

    setParticipations(updatedParticipations)
    setIsVerificationOpen(false)
    setSelectedParticipation(null)
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center h-full py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-700"></div>
      </div>
    )
  }

  if (!campaign) {
    return (
      <div className="flex flex-col items-center justify-center h-full py-12">
        <AlertTriangle className="h-12 w-12 text-red-500 mb-4" />
        <h2 className="text-2xl font-bold mb-2">Campaign Not Found</h2>
        <p className="text-muted-foreground mb-4">The campaign you're looking for doesn't exist or has been removed.</p>
        <Button asChild>
          <Link href="/admin/campaigns">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Campaigns
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
            <Link href="/admin/campaigns">
              <ArrowLeft className="h-4 w-4" />
            </Link>
          </Button>
          <h1 className="text-3xl font-bold">{campaign.name}</h1>
          <Badge
            variant={campaign.active ? "default" : "secondary"}
            className={campaign.active ? "bg-green-100 text-green-800" : ""}
          >
            {campaign.active ? "Active" : "Inactive"}
          </Badge>
          {campaign.featured && (
            <Badge variant="outline" className="bg-amber-100 text-amber-800">
              Featured
            </Badge>
          )}
        </div>
        <Button onClick={() => setIsEditCampaignOpen(true)}>
          <Edit className="mr-2 h-4 w-4" />
          Edit Campaign
        </Button>
      </div>

      {/* Campaign Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <Card>
            <CardContent className="p-6">
              <div className="aspect-video mb-6 rounded-md overflow-hidden">
                <img
                  src={campaign.image || "/placeholder.svg?height=300&width=600"}
                  alt={campaign.name}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h2 className="text-xl font-semibold mb-2">Description</h2>
                  <p className="text-muted-foreground mb-4">{campaign.description}</p>

                  <h3 className="font-medium mb-1">Completion Condition</h3>
                  <p className="text-sm text-muted-foreground mb-4">{campaign.condition}</p>

                  <div className="flex items-center gap-2 mb-4">
                    <Badge
                      style={{
                        backgroundColor: campaignCategories.find((c) => c.name === campaign.category)?.color + "20",
                        color: campaignCategories.find((c) => c.name === campaign.category)?.color,
                      }}
                    >
                      {campaign.category}
                    </Badge>
                    <Badge variant="outline" className="capitalize">
                      {campaign.type.replace("-", " ")}
                    </Badge>
                  </div>
                </div>

                <div>
                  <h2 className="text-xl font-semibold mb-2">Campaign Details</h2>

                  <div className="space-y-3">
                    <div className="flex justify-between items-center pb-2 border-b">
                      <span className="text-muted-foreground">Points</span>
                      <span className="font-medium">
                        {campaign.type === "limited-time" && campaign.points === 0 ? "Variable" : campaign.points}
                      </span>
                    </div>

                    <div className="flex justify-between items-center pb-2 border-b">
                      <span className="text-muted-foreground">Date Range</span>
                      <span className="font-medium">
                        {campaign.startDate}
                        {campaign.endDate ? ` to ${campaign.endDate}` : " (ongoing)"}
                      </span>
                    </div>

                    <div className="flex justify-between items-center pb-2 border-b">
                      <span className="text-muted-foreground">Verification Method</span>
                      <span className="font-medium capitalize">{campaign.verificationMethod || "Automatic"}</span>
                    </div>

                    {campaign.verificationDetails?.requiredPurchaseAmount && (
                      <div className="flex justify-between items-center pb-2 border-b">
                        <span className="text-muted-foreground">Required Purchase</span>
                        <span className="font-medium">${campaign.verificationDetails.requiredPurchaseAmount}</span>
                      </div>
                    )}

                    <div className="flex justify-between items-center pb-2 border-b">
                      <span className="text-muted-foreground">Participants</span>
                      <span className="font-medium">{campaign.participantsCount}</span>
                    </div>

                    <div className="flex justify-between items-center pb-2 border-b">
                      <span className="text-muted-foreground">Completions</span>
                      <span className="font-medium">{campaign.completionsCount}</span>
                    </div>

                    <div className="flex justify-between items-center pb-2 border-b">
                      <span className="text-muted-foreground">Completion Rate</span>
                      <span className="font-medium">
                        {campaign.participantsCount > 0
                          ? Math.round((campaign.completionsCount / campaign.participantsCount) * 100)
                          : 0}
                        %
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {campaign.verificationMethod === "receipt" && campaign.verificationDetails?.requiredActions && (
                <div className="mt-6 p-4 bg-amber-50 rounded-md border border-amber-200">
                  <h3 className="font-medium flex items-center text-amber-800 mb-2">
                    <AlertTriangle className="h-4 w-4 mr-2" />
                    Verification Requirements
                  </h3>
                  <ul className="list-disc list-inside text-sm text-amber-700 space-y-1">
                    {campaign.verificationDetails.requiredActions.map((action, index) => (
                      <li key={index}>{action}</li>
                    ))}
                  </ul>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        <div>
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Campaign Statistics</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="text-sm font-medium mb-2">Completion Rate</h3>
                <div className="flex justify-between text-sm mb-1">
                  <span>Progress</span>
                  <span>
                    {campaign.participantsCount > 0
                      ? Math.round((campaign.completionsCount / campaign.participantsCount) * 100)
                      : 0}
                    %
                  </span>
                </div>
                <Progress
                  value={
                    campaign.participantsCount > 0
                      ? Math.round((campaign.completionsCount / campaign.participantsCount) * 100)
                      : 0
                  }
                  className="h-2"
                />
              </div>

              <div className="pt-4 border-t">
                <h3 className="text-sm font-medium mb-3">Verification Status</h3>
                <div className="grid grid-cols-3 gap-2 text-center">
                  <div className="bg-green-50 p-3 rounded-md">
                    <div className="text-xl font-bold text-green-600">
                      {participations.filter((p) => p.verificationStatus === "approved").length}
                    </div>
                    <div className="text-xs text-green-700">Approved</div>
                  </div>
                  <div className="bg-yellow-50 p-3 rounded-md">
                    <div className="text-xl font-bold text-yellow-600">
                      {participations.filter((p) => p.verificationStatus === "pending").length}
                    </div>
                    <div className="text-xs text-yellow-700">Pending</div>
                  </div>
                  <div className="bg-red-50 p-3 rounded-md">
                    <div className="text-xl font-bold text-red-600">
                      {participations.filter((p) => p.verificationStatus === "rejected").length}
                    </div>
                    <div className="text-xs text-red-700">Rejected</div>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t">
                <h3 className="text-sm font-medium mb-3">Daily Participation</h3>
                <div className="h-32 bg-muted/20 rounded-md flex items-center justify-center text-muted-foreground">
                  <BarChart className="mr-2 h-5 w-5" />
                  Chart Placeholder
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Tabs for different sections */}
      <Tabs defaultValue="participants" className="w-full">
        <TabsList className="grid w-full grid-cols-3 mb-4">
          <TabsTrigger value="participants">Participants</TabsTrigger>
          <TabsTrigger value="verifications">Verifications</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="participants">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5 text-muted-foreground" />
                Campaign Participants
              </CardTitle>
              <CardDescription>Users who have participated in this campaign</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>User</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Verification</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Points</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {participations.map((participation) => (
                    <TableRow key={participation.id}>
                      <TableCell className="font-medium">User #{participation.userId}</TableCell>
                      <TableCell>
                        <Badge
                          variant={participation.completed ? "default" : "secondary"}
                          className={participation.completed ? "bg-green-100 text-green-800" : ""}
                        >
                          {participation.completed ? "Completed" : "In Progress"}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant="outline"
                          className={
                            participation.verificationStatus === "approved"
                              ? "bg-green-100 text-green-800"
                              : participation.verificationStatus === "rejected"
                                ? "bg-red-100 text-red-800"
                                : "bg-yellow-100 text-yellow-800"
                          }
                        >
                          {participation.verificationStatus === "approved"
                            ? "Approved"
                            : participation.verificationStatus === "rejected"
                              ? "Rejected"
                              : "Pending"}
                        </Badge>
                      </TableCell>
                      <TableCell>{participation.completionDate || "—"}</TableCell>
                      <TableCell>{participation.pointsEarned}</TableCell>
                      <TableCell className="text-right">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => {
                            setSelectedParticipation(participation)
                            setIsVerificationOpen(true)
                          }}
                        >
                          <Eye className="h-4 w-4 mr-1" />
                          Review
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="verifications">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileCheck className="h-5 w-5 text-muted-foreground" />
                Verification Queue
              </CardTitle>
              <CardDescription>Pending verifications that need review</CardDescription>
            </CardHeader>
            <CardContent>
              {participations.filter((p) => p.verificationStatus === "pending").length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-muted-foreground">No pending verifications</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {participations
                    .filter((p) => p.verificationStatus === "pending")
                    .map((participation) => (
                      <Card key={participation.id} className="overflow-hidden">
                        <div className="flex flex-col md:flex-row">
                          <div className="md:w-1/3 p-4 bg-muted/10">
                            <h3 className="font-medium mb-2">User #{participation.userId}</h3>
                            <p className="text-sm text-muted-foreground mb-2">
                              Submitted: {new Date().toLocaleDateString()}
                            </p>
                            <Badge variant="outline" className="bg-yellow-100 text-yellow-800">
                              Pending Review
                            </Badge>
                          </div>
                          <div className="md:w-2/3 p-4">
                            <h3 className="font-medium mb-2">Verification Evidence</h3>
                            {participation.verificationData?.receiptUrl && (
                              <div className="mb-4">
                                <p className="text-sm text-muted-foreground mb-2">Receipt Upload:</p>
                                <img
                                  src={participation.verificationData.receiptUrl || "/placeholder.svg"}
                                  alt="Receipt"
                                  className="max-h-32 rounded-md border"
                                />
                              </div>
                            )}
                            <div className="flex justify-end gap-2 mt-4">
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => {
                                  setSelectedParticipation(participation)
                                  setIsVerificationOpen(true)
                                }}
                              >
                                <Eye className="h-4 w-4 mr-1" />
                                View Details
                              </Button>
                              <Button
                                variant="destructive"
                                size="sm"
                                onClick={() => {
                                  setSelectedParticipation(participation)
                                  handleVerificationAction("reject")
                                }}
                              >
                                <XSquare className="h-4 w-4 mr-1" />
                                Reject
                              </Button>
                              <Button
                                variant="default"
                                size="sm"
                                onClick={() => {
                                  setSelectedParticipation(participation)
                                  handleVerificationAction("approve")
                                }}
                              >
                                <CheckSquare className="h-4 w-4 mr-1" />
                                Approve
                              </Button>
                            </div>
                          </div>
                        </div>
                      </Card>
                    ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="settings">
          <Card>
            <CardHeader>
              <CardTitle>Campaign Settings</CardTitle>
              <CardDescription>Configure campaign behavior and verification settings</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h3 className="text-sm font-medium mb-2">Verification Method</h3>
                  <Select defaultValue={campaign.verificationMethod || "automatic"}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select verification method" />
                    </SelectTrigger>
                    <SelectContent>
                      {verificationMethods.map((method) => (
                        <SelectItem key={method.id} value={method.id}>
                          {method.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <p className="text-xs text-muted-foreground mt-1">
                    How users will verify they've completed the campaign requirements
                  </p>
                </div>

                <div>
                  <h3 className="text-sm font-medium mb-2">Campaign Category</h3>
                  <Select defaultValue={campaign.category}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {campaignCategories.map((category) => (
                        <SelectItem key={category.id} value={category.name}>
                          {category.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <p className="text-xs text-muted-foreground mt-1">Group this campaign with similar campaigns</p>
                </div>
              </div>

              <div className="pt-4 border-t">
                <h3 className="text-sm font-medium mb-2">Campaign Visibility</h3>
                <div className="flex flex-col gap-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="active-toggle" className="font-medium">
                        Active
                      </Label>
                      <p className="text-xs text-muted-foreground">When enabled, this campaign is visible to users</p>
                    </div>
                    <Switch id="active-toggle" checked={campaign.active} />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="featured-toggle" className="font-medium">
                        Featured
                      </Label>
                      <p className="text-xs text-muted-foreground">
                        When enabled, this campaign is highlighted to users
                      </p>
                    </div>
                    <Switch id="featured-toggle" checked={campaign.featured || false} />
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t">
                <h3 className="text-sm font-medium mb-2">Verification Requirements</h3>
                {campaign.verificationMethod === "receipt" && (
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="min-purchase">Minimum Purchase Amount ($)</Label>
                      <Input
                        id="min-purchase"
                        type="number"
                        defaultValue={campaign.verificationDetails?.requiredPurchaseAmount || 0}
                      />
                      <p className="text-xs text-muted-foreground mt-1">Minimum amount users must spend to qualify</p>
                    </div>

                    <div>
                      <Label htmlFor="required-actions">Required Actions</Label>
                      <Textarea
                        id="required-actions"
                        defaultValue={campaign.verificationDetails?.requiredActions?.join("\n") || ""}
                        placeholder="Enter each required action on a new line"
                      />
                      <p className="text-xs text-muted-foreground mt-1">
                        List of actions users must complete (one per line)
                      </p>
                    </div>
                  </div>
                )}

                {campaign.verificationMethod === "code" && (
                  <div>
                    <Label htmlFor="verification-code">Verification Code</Label>
                    <Input
                      id="verification-code"
                      defaultValue={campaign.verificationDetails?.code || ""}
                      placeholder="e.g., SUMMER2023"
                    />
                    <p className="text-xs text-muted-foreground mt-1">
                      Code that users must enter to verify completion
                    </p>
                  </div>
                )}

                {campaign.verificationMethod === "social" && (
                  <div>
                    <Label htmlFor="social-platform">Social Platform</Label>
                    <Select defaultValue={campaign.verificationDetails?.socialPlatform || "instagram"}>
                      <SelectTrigger id="social-platform">
                        <SelectValue placeholder="Select platform" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="instagram">Instagram</SelectItem>
                        <SelectItem value="facebook">Facebook</SelectItem>
                        <SelectItem value="twitter">Twitter</SelectItem>
                        <SelectItem value="tiktok">TikTok</SelectItem>
                      </SelectContent>
                    </Select>
                    <p className="text-xs text-muted-foreground mt-1">Platform where users must share content</p>
                  </div>
                )}

                {campaign.verificationMethod === "location" && (
                  <div>
                    <Label htmlFor="location-name">Location Name</Label>
                    <Input
                      id="location-name"
                      defaultValue={campaign.verificationDetails?.locationName || ""}
                      placeholder="e.g., Main Street Store"
                    />
                    <p className="text-xs text-muted-foreground mt-1">Name of the location users must check in at</p>
                  </div>
                )}
              </div>

              <div className="flex justify-end pt-4">
                <Button>Save Settings</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Edit Campaign Dialog */}
      <Dialog open={isEditCampaignOpen} onOpenChange={setIsEditCampaignOpen}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>Edit Campaign</DialogTitle>
            <DialogDescription>Make changes to the campaign</DialogDescription>
          </DialogHeader>
          {campaign && (
            <div className="grid gap-6 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="edit-name">Campaign Name</Label>
                  <Input
                    id="edit-name"
                    value={campaign.name}
                    onChange={(e) => setCampaign({ ...campaign, name: e.target.value })}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="edit-category">Category</Label>
                  <Select
                    value={campaign.category}
                    onValueChange={(value) => setCampaign({ ...campaign, category: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {campaignCategories.map((category) => (
                        <SelectItem key={category.id} value={category.name}>
                          {category.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid gap-2">
                <Label htmlFor="edit-description">Description</Label>
                <Textarea
                  id="edit-description"
                  value={campaign.description}
                  onChange={(e) => setCampaign({ ...campaign, description: e.target.value })}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="edit-type">Campaign Type</Label>
                  <Select
                    value={campaign.type}
                    onValueChange={(value) =>
                      setCampaign({
                        ...campaign,
                        type: value as any,
                      })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select campaign type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="one-time">One-time</SelectItem>
                      <SelectItem value="recurring">Recurring</SelectItem>
                      <SelectItem value="limited-time">Limited-time</SelectItem>
                      <SelectItem value="milestone">Milestone</SelectItem>
                      <SelectItem value="social">Social</SelectItem>
                      <SelectItem value="purchase">Purchase</SelectItem>
                      <SelectItem value="referral">Referral</SelectItem>
                      <SelectItem value="multi-step">Multi-step</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="edit-points">Points</Label>
                  <Input
                    id="edit-points"
                    type="number"
                    value={campaign.points}
                    onChange={(e) => setCampaign({ ...campaign, points: Number.parseInt(e.target.value) || 0 })}
                    min="0"
                  />
                </div>
              </div>

              <div className="grid gap-2">
                <Label htmlFor="edit-condition">Completion Condition</Label>
                <Textarea
                  id="edit-condition"
                  value={campaign.condition}
                  onChange={(e) => setCampaign({ ...campaign, condition: e.target.value })}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="edit-startDate">Start Date</Label>
                  <Input
                    id="edit-startDate"
                    type="date"
                    value={campaign.startDate}
                    onChange={(e) => setCampaign({ ...campaign, startDate: e.target.value })}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="edit-endDate">End Date (Optional)</Label>
                  <Input
                    id="edit-endDate"
                    type="date"
                    value={campaign.endDate || ""}
                    onChange={(e) => setCampaign({ ...campaign, endDate: e.target.value || null })}
                  />
                </div>
              </div>

              <div className="grid gap-2">
                <Label htmlFor="edit-verificationMethod">Verification Method</Label>
                <Select
                  value={campaign.verificationMethod}
                  onValueChange={(value) => setCampaign({ ...campaign, verificationMethod: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select verification method" />
                  </SelectTrigger>
                  <SelectContent>
                    {verificationMethods.map((method) => (
                      <SelectItem key={method.id} value={method.id}>
                        {method.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="grid gap-2">
                <Label htmlFor="edit-image">Campaign Image URL</Label>
                <Input
                  id="edit-image"
                  value={campaign.image || ""}
                  onChange={(e) => setCampaign({ ...campaign, image: e.target.value })}
                />
              </div>

              <div className="flex items-center gap-2">
                <Switch
                  id="edit-active"
                  checked={campaign.active}
                  onCheckedChange={(checked) => setCampaign({ ...campaign, active: checked })}
                />
                <Label htmlFor="edit-active">Active</Label>
              </div>

              <div className="flex items-center gap-2">
                <Switch
                  id="edit-featured"
                  checked={campaign.featured || false}
                  onCheckedChange={(checked) => setCampaign({ ...campaign, featured: checked })}
                />
                <Label htmlFor="edit-featured">Featured Campaign</Label>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditCampaignOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleEditCampaign}>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Verification Review Dialog */}
      <Dialog open={isVerificationOpen} onOpenChange={setIsVerificationOpen}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>Verification Review</DialogTitle>
            <DialogDescription>Review submission for User #{selectedParticipation?.userId}</DialogDescription>
          </DialogHeader>
          {selectedParticipation && (
            <div className="grid gap-6 py-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium">Submission Status</h3>
                  <p className="text-sm text-muted-foreground">Current verification status</p>
                </div>
                <Badge
                  variant="outline"
                  className={
                    selectedParticipation.verificationStatus === "approved"
                      ? "bg-green-100 text-green-800"
                      : selectedParticipation.verificationStatus === "rejected"
                        ? "bg-red-100 text-red-800"
                        : "bg-yellow-100 text-yellow-800"
                  }
                >
                  {selectedParticipation.verificationStatus === "approved"
                    ? "Approved"
                    : selectedParticipation.verificationStatus === "rejected"
                      ? "Rejected"
                      : "Pending Review"}
                </Badge>
              </div>

              <div className="border-t pt-4">
                <h3 className="font-medium mb-2">Verification Evidence</h3>

                {campaign.verificationMethod === "receipt" && selectedParticipation.verificationData?.receiptUrl && (
                  <div>
                    <Label className="mb-2 block">Receipt Upload</Label>
                    <div className="border rounded-md p-4 bg-muted/10">
                      <img
                        src={selectedParticipation.verificationData.receiptUrl || "/placeholder.svg"}
                        alt="Receipt"
                        className="max-h-64 mx-auto"
                      />
                    </div>

                    <div className="mt-4 p-4 bg-amber-50 rounded-md border border-amber-200">
                      <h4 className="font-medium flex items-center text-amber-800 mb-2">
                        <AlertTriangle className="h-4 w-4 mr-2" />
                        Verification Requirements
                      </h4>
                      <ul className="list-disc list-inside text-sm text-amber-700 space-y-1">
                        {campaign.verificationDetails?.requiredActions?.map((action, index) => (
                          <li key={index}>{action}</li>
                        ))}
                        {campaign.verificationDetails?.requiredPurchaseAmount && (
                          <li>Minimum purchase amount: ${campaign.verificationDetails.requiredPurchaseAmount}</li>
                        )}
                      </ul>
                    </div>
                  </div>
                )}

                {campaign.verificationMethod === "social" && selectedParticipation.verificationData?.socialPostUrl && (
                  <div>
                    <Label className="mb-2 block">Social Media Post</Label>
                    <div className="border rounded-md p-4 bg-muted/10 flex items-center">
                      <LinkIcon className="h-5 w-5 mr-2 text-muted-foreground" />
                      <a
                        href={selectedParticipation.verificationData.socialPostUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:underline"
                      >
                        {selectedParticipation.verificationData.socialPostUrl}
                      </a>
                    </div>
                  </div>
                )}

                {campaign.verificationMethod === "location" && selectedParticipation.verificationData?.location && (
                  <div>
                    <Label className="mb-2 block">Location Check-in</Label>
                    <div className="border rounded-md p-4 bg-muted/10">
                      <div className="flex items-center mb-2">
                        <MapPin className="h-5 w-5 mr-2 text-muted-foreground" />
                        <span>{campaign.verificationDetails?.locationName || "Store Location"}</span>
                      </div>
                      <div className="h-40 bg-muted/20 rounded-md flex items-center justify-center text-muted-foreground">
                        Map Placeholder
                      </div>
                    </div>
                  </div>
                )}

                {campaign.verificationMethod === "code" && selectedParticipation.verificationData?.code && (
                  <div>
                    <Label className="mb-2 block">Verification Code</Label>
                    <div className="border rounded-md p-4 bg-muted/10">
                      <div className="flex items-center">
                        <span className="font-mono text-lg">{selectedParticipation.verificationData.code}</span>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground mt-2">
                      Expected code: <span className="font-mono">{campaign.verificationDetails?.code}</span>
                    </p>
                  </div>
                )}
              </div>

              <div className="border-t pt-4">
                <Label htmlFor="admin-notes" className="mb-2 block">
                  Admin Notes
                </Label>
                <Textarea id="admin-notes" placeholder="Add notes about this verification (only visible to admins)" />
              </div>
            </div>
          )}
          <DialogFooter className="flex justify-between">
            <div>
              {selectedParticipation?.verificationStatus === "approved" && (
                <Button variant="outline" className="text-red-600" onClick={() => handleVerificationAction("reject")}>
                  <RefreshCw className="mr-2 h-4 w-4" />
                  Change to Rejected
                </Button>
              )}
              {selectedParticipation?.verificationStatus === "rejected" && (
                <Button
                  variant="outline"
                  className="text-green-600"
                  onClick={() => handleVerificationAction("approve")}
                >
                  <RefreshCw className="mr-2 h-4 w-4" />
                  Change to Approved
                </Button>
              )}
            </div>
            <div className="flex gap-2">
              <Button variant="outline" onClick={() => setIsVerificationOpen(false)}>
                Close
              </Button>
              {selectedParticipation?.verificationStatus === "pending" && (
                <>
                  <Button variant="destructive" onClick={() => handleVerificationAction("reject")}>
                    <XSquare className="mr-2 h-4 w-4" />
                    Reject
                  </Button>
                  <Button onClick={() => handleVerificationAction("approve")}>
                    <CheckSquare className="mr-2 h-4 w-4" />
                    Approve
                  </Button>
                </>
              )}
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

