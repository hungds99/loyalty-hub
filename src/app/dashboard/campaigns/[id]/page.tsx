"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
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
import {
  ArrowLeft,
  Calendar,
  Award,
  CheckCircle,
  Clock,
  AlertTriangle,
  Upload,
  MapPin,
  Share2,
  Camera,
  FileCheck,
  RefreshCw,
} from "lucide-react"
import type { Campaign, CampaignParticipation } from "@/lib/types"

export default function CampaignDetailPage() {
  const params = useParams()
  const router = useRouter()
  const campaignId = Number(params.id)

  const [campaign, setCampaign] = useState<Campaign | null>(null)
  const [participation, setParticipation] = useState<CampaignParticipation | null>(null)
  const [loading, setLoading] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isVerificationOpen, setIsVerificationOpen] = useState(false)
  const [verificationData, setVerificationData] = useState({
    code: "",
    receiptUrl: "/placeholder.svg?height=200&width=300", // Mock image URL
    socialPostUrl: "",
    location: {
      latitude: 0,
      longitude: 0,
    },
  })

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

        // Mock participation data
        const mockParticipation: CampaignParticipation = {
          id: 1,
          userId: 1, // Current user
          campaignId: campaignId,
          participated: true,
          completed: false,
          completionDate: null,
          pointsEarned: 0,
          verificationStatus: "pending",
          verificationData: {
            receiptUrl: "/placeholder.svg?height=200&width=300",
          },
        }

        setCampaign(mockCampaign)
        setParticipation(mockParticipation)
        setLoading(false)
      } catch (error) {
        console.error("Error fetching campaign:", error)
        setLoading(false)
      }
    }

    fetchCampaign()
  }, [campaignId])

  const handleSubmitVerification = async () => {
    setIsSubmitting(true)

    try {
      // In a real app, send verification data to API
      console.log("Submitting verification:", verificationData)

      // Simulate API call
      setTimeout(() => {
        // Update participation with new verification data
        if (participation) {
          const updatedParticipation = {
            ...participation,
            verificationData: {
              ...participation.verificationData,
              ...verificationData,
            },
            verificationStatus: "pending",
          }

          setParticipation(updatedParticipation)
        }

        setIsSubmitting(false)
        setIsVerificationOpen(false)
      }, 1500)
    } catch (error) {
      console.error("Error submitting verification:", error)
      setIsSubmitting(false)
    }
  }

  const handleStartCampaign = () => {
    // In a real app, send API request to start campaign
    if (!participation) {
      const newParticipation: CampaignParticipation = {
        id: Math.floor(Math.random() * 1000),
        userId: 1, // Current user
        campaignId: campaignId,
        participated: true,
        completed: false,
        completionDate: null,
        pointsEarned: 0,
      }

      setParticipation(newParticipation)
    }

    // Open verification dialog if needed
    if (campaign?.verificationMethod && campaign.verificationMethod !== "automatic") {
      setIsVerificationOpen(true)
    }
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
          <Link href="/dashboard/campaigns">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Campaigns
          </Link>
        </Button>
      </div>
    )
  }

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center">
            <Link href="/dashboard" className="flex items-center space-x-2">
              <span className="font-bold">RewardHub</span>
            </Link>
          </div>
          <nav className="flex items-center space-x-4">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Badge
                  variant="outline"
                  className="bg-emerald-50 text-emerald-700 hover:bg-emerald-50 hover:text-emerald-700"
                >
                  750 Points
                </Badge>
              </div>
              <Avatar>
                <AvatarImage src="/placeholder.svg?height=32&width=32" alt="User" />
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
            </div>
          </nav>
        </div>
      </header>

      <main className="flex-1 container py-8">
        <div className="flex flex-col gap-8">
          <div className="flex items-center gap-2 mb-4">
            <Button variant="outline" size="sm" asChild>
              <Link href="/dashboard/campaigns">
                <ArrowLeft className="h-4 w-4 mr-1" />
                Back to Campaigns
              </Link>
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2">
              <Card className="overflow-hidden">
                <div className="aspect-video relative">
                  <img
                    src={campaign.image || "/placeholder.svg?height=300&width=600"}
                    alt={campaign.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-4 right-4 flex gap-1">
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
                </div>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-2xl">{campaign.name}</CardTitle>
                      <CardDescription>{campaign.description}</CardDescription>
                    </div>
                    <Badge variant="outline" className="capitalize">
                      {campaign.type.replace("-", " ")}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center text-sm">
                    <Calendar className="mr-2 h-4 w-4 text-muted-foreground" />
                    <span>
                      {campaign.startDate}
                      {campaign.endDate ? ` to ${campaign.endDate}` : " (ongoing)"}
                    </span>
                  </div>

                  <div className="pt-2 border-t">
                    <h3 className="font-medium mb-2">How to Complete</h3>
                    <div className="flex items-start gap-2">
                      <div className="bg-emerald-100 text-emerald-800 rounded-full p-1 mt-0.5">
                        <CheckCircle className="h-4 w-4" />
                      </div>
                      <p className="text-sm">{campaign.condition}</p>
                    </div>
                  </div>

                  {campaign.verificationMethod && campaign.verificationMethod !== "automatic" && (
                    <div className="pt-2 border-t">
                      <h3 className="font-medium mb-2">Verification Required</h3>
                      <div className="p-4 bg-amber-50 rounded-md border border-amber-200">
                        <h4 className="font-medium flex items-center text-amber-800 mb-2">
                          <AlertTriangle className="h-4 w-4 mr-2" />
                          Verification Requirements
                        </h4>
                        <ul className="list-disc list-inside text-sm text-amber-700 space-y-1">
                          {campaign.verificationDetails?.requiredActions?.map((action, index) => (
                            <li key={index}>{action}</li>
                          ))}
                          {campaign.verificationMethod === "receipt" &&
                            campaign.verificationDetails?.requiredPurchaseAmount && (
                              <li>Minimum purchase amount: ${campaign.verificationDetails.requiredPurchaseAmount}</li>
                            )}
                          {campaign.verificationMethod === "code" && <li>Enter the verification code you received</li>}
                          {campaign.verificationMethod === "social" && (
                            <li>Share on social media and provide the post URL</li>
                          )}
                          {campaign.verificationMethod === "location" && <li>Check in at the specified location</li>}
                        </ul>
                      </div>
                    </div>
                  )}
                </CardContent>
                <CardFooter className="flex justify-between border-t pt-6">
                  <div className="font-semibold text-emerald-700">
                    {campaign.type === "limited-time" && campaign.points === 0
                      ? "Variable points"
                      : `${campaign.points} points`}
                  </div>

                  {!participation && <Button onClick={handleStartCampaign}>Start Campaign</Button>}

                  {participation && !participation.completed && (
                    <>
                      {participation.verificationStatus === "pending" ? (
                        <Button disabled>
                          <Clock className="mr-2 h-4 w-4" />
                          Verification Pending
                        </Button>
                      ) : (
                        <Button onClick={() => setIsVerificationOpen(true)}>
                          {participation.verificationData ? (
                            <>
                              <RefreshCw className="mr-2 h-4 w-4" />
                              Update Verification
                            </>
                          ) : (
                            <>
                              <FileCheck className="mr-2 h-4 w-4" />
                              Submit Verification
                            </>
                          )}
                        </Button>
                      )}
                    </>
                  )}

                  {participation && participation.completed && (
                    <div className="flex items-center gap-2 text-emerald-700">
                      <CheckCircle className="h-5 w-5" />
                      <span className="font-medium">Completed on {participation.completionDate}</span>
                    </div>
                  )}
                </CardFooter>
              </Card>
            </div>

            <div>
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Campaign Status</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {participation ? (
                    <>
                      <div>
                        <h3 className="text-sm font-medium mb-2">Your Status</h3>
                        <Badge
                          className={
                            participation.completed
                              ? "bg-green-100 text-green-800"
                              : participation.verificationStatus === "pending"
                                ? "bg-yellow-100 text-yellow-800"
                                : "bg-blue-100 text-blue-800"
                          }
                        >
                          {participation.completed
                            ? "Completed"
                            : participation.verificationStatus === "pending"
                              ? "Verification Pending"
                              : "In Progress"}
                        </Badge>

                        {participation.completed && (
                          <div className="mt-2 text-sm">
                            <div className="flex items-center text-muted-foreground">
                              <Clock className="mr-2 h-4 w-4" />
                              <span>Completed on {participation.completionDate}</span>
                            </div>
                            <div className="flex items-center mt-1 text-emerald-700">
                              <Award className="mr-2 h-4 w-4" />
                              <span>Earned {participation.pointsEarned} points</span>
                            </div>
                          </div>
                        )}

                        {participation.verificationStatus === "pending" && (
                          <div className="mt-2 p-3 bg-yellow-50 rounded-md border border-yellow-200">
                            <p className="text-sm text-yellow-800 flex items-center">
                              <Clock className="h-4 w-4 mr-2" />
                              Your verification is being reviewed
                            </p>
                          </div>
                        )}

                        {participation.verificationStatus === "rejected" && (
                          <div className="mt-2 p-3 bg-red-50 rounded-md border border-red-200">
                            <p className="text-sm text-red-800 flex items-center">
                              <AlertTriangle className="h-4 w-4 mr-2" />
                              Your verification was rejected
                            </p>
                            <Button
                              variant="outline"
                              size="sm"
                              className="mt-2"
                              onClick={() => setIsVerificationOpen(true)}
                            >
                              Try Again
                            </Button>
                          </div>
                        )}
                      </div>

                      {!participation.completed && participation.verificationStatus !== "pending" && (
                        <div className="pt-4 border-t">
                          <h3 className="text-sm font-medium mb-2">Next Steps</h3>
                          <ul className="space-y-2">
                            {campaign.verificationMethod === "receipt" && (
                              <li className="flex items-start gap-2 text-sm">
                                <Upload className="h-4 w-4 mt-0.5 text-muted-foreground" />
                                <span>
                                  Upload your receipt showing a purchase of at least $
                                  {campaign.verificationDetails?.requiredPurchaseAmount}
                                </span>
                              </li>
                            )}
                            {campaign.verificationMethod === "code" && (
                              <li className="flex items-start gap-2 text-sm">
                                <FileCheck className="h-4 w-4 mt-0.5 text-muted-foreground" />
                                <span>Enter the verification code you received</span>
                              </li>
                            )}
                            {campaign.verificationMethod === "social" && (
                              <li className="flex items-start gap-2 text-sm">
                                <Share2 className="h-4 w-4 mt-0.5 text-muted-foreground" />
                                <span>Share on social media and provide the post URL</span>
                              </li>
                            )}
                            {campaign.verificationMethod === "location" && (
                              <li className="flex items-start gap-2 text-sm">
                                <MapPin className="h-4 w-4 mt-0.5 text-muted-foreground" />
                                <span>Check in at the specified location</span>
                              </li>
                            )}
                          </ul>
                          <Button className="w-full mt-4" onClick={() => setIsVerificationOpen(true)}>
                            Submit Verification
                          </Button>
                        </div>
                      )}
                    </>
                  ) : (
                    <div className="text-center py-6">
                      <Award className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                      <h3 className="font-medium mb-2">Start This Campaign</h3>
                      <p className="text-sm text-muted-foreground mb-4">
                        Complete this campaign to earn {campaign.points} points
                      </p>
                      <Button className="w-full" onClick={handleStartCampaign}>
                        Start Campaign
                      </Button>
                    </div>
                  )}

                  <div className="pt-4 border-t">
                    <h3 className="text-sm font-medium mb-3">Campaign Details</h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Type:</span>
                        <span className="capitalize">{campaign.type.replace("-", " ")}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Category:</span>
                        <span>{campaign.category}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Verification:</span>
                        <span className="capitalize">{campaign.verificationMethod || "Automatic"}</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>

      {/* Verification Dialog */}
      <Dialog open={isVerificationOpen} onOpenChange={setIsVerificationOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Submit Verification</DialogTitle>
            <DialogDescription>Provide evidence that you've completed the campaign requirements</DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 py-4">
            {campaign.verificationMethod === "receipt" && (
              <div className="grid gap-2">
                <Label htmlFor="receipt">Upload Receipt</Label>
                <div className="border-2 border-dashed rounded-md p-6 text-center">
                  <div className="mb-4">
                    <Camera className="h-8 w-8 mx-auto text-muted-foreground" />
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">
                    Upload a photo of your receipt showing a purchase of at least $
                    {campaign.verificationDetails?.requiredPurchaseAmount}
                  </p>
                  <div className="flex justify-center">
                    <Button variant="outline" size="sm">
                      <Upload className="h-4 w-4 mr-1" />
                      Choose File
                    </Button>
                  </div>

                  {/* Mock preview */}
                  <div className="mt-4 border rounded-md p-2">
                    <img
                      src="/placeholder.svg?height=200&width=300"
                      alt="Receipt preview"
                      className="max-h-32 mx-auto"
                    />
                    <p className="text-xs text-muted-foreground mt-1">receipt.jpg</p>
                  </div>
                </div>
              </div>
            )}

            {campaign.verificationMethod === "code" && (
              <div className="grid gap-2">
                <Label htmlFor="code">Verification Code</Label>
                <Input
                  id="code"
                  placeholder="Enter the code you received"
                  value={verificationData.code}
                  onChange={(e) => setVerificationData({ ...verificationData, code: e.target.value })}
                />
                <p className="text-xs text-muted-foreground">
                  Enter the code exactly as it appears, including any special characters
                </p>
              </div>
            )}

            {campaign.verificationMethod === "social" && (
              <div className="grid gap-2">
                <Label htmlFor="social-url">Social Media Post URL</Label>
                <Input
                  id="social-url"
                  placeholder="https://instagram.com/p/..."
                  value={verificationData.socialPostUrl}
                  onChange={(e) => setVerificationData({ ...verificationData, socialPostUrl: e.target.value })}
                />
                <p className="text-xs text-muted-foreground">Paste the URL to your public social media post</p>
              </div>
            )}

            {campaign.verificationMethod === "location" && (
              <div className="grid gap-2">
                <Label>Location Check-in</Label>
                <div className="border rounded-md p-4">
                  <div className="flex items-center mb-2">
                    <MapPin className="h-5 w-5 mr-2 text-muted-foreground" />
                    <span>{campaign.verificationDetails?.locationName || "Store Location"}</span>
                  </div>
                  <div className="h-40 bg-muted/20 rounded-md flex items-center justify-center text-muted-foreground mb-2">
                    Map Placeholder
                  </div>
                  <Button variant="outline" size="sm" className="w-full">
                    Check In at Current Location
                  </Button>
                </div>
              </div>
            )}

            <div className="grid gap-2">
              <Label htmlFor="notes">Additional Notes (Optional)</Label>
              <Textarea id="notes" placeholder="Add any additional information about your submission" />
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsVerificationOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSubmitVerification} disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                  Submitting...
                </>
              ) : (
                "Submit Verification"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

