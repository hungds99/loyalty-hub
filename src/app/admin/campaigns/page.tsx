"use client"

import { CardFooter } from "@/components/ui/card"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { MoreHorizontal, Plus, Search, Calendar, BarChart, Eye, Filter, CheckCircle } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import type { Campaign } from "@/lib/types"
import Link from "next/link"

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

export default function AdminCampaignsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [isAddCampaignOpen, setIsAddCampaignOpen] = useState(false)
  const [isEditCampaignOpen, setIsEditCampaignOpen] = useState(false)
  const [isViewStatsOpen, setIsViewStatsOpen] = useState(false)
  const [selectedCampaign, setSelectedCampaign] = useState<Campaign | null>(null)
  const [activeFilter, setActiveFilter] = useState<string | null>(null)
  const [categoryFilter, setCategoryFilter] = useState<string | null>(null)
  const [newCampaign, setNewCampaign] = useState({
    name: "",
    description: "",
    type: "one-time" as
      | "one-time"
      | "recurring"
      | "limited-time"
      | "milestone"
      | "social"
      | "purchase"
      | "referral"
      | "multi-step",
    points: 100,
    startDate: new Date().toISOString().split("T")[0],
    endDate: "",
    active: true,
    condition: "Make a purchase",
    category: "",
    verificationMethod: "automatic" as
      | "automatic"
      | "manual"
      | "code"
      | "receipt"
      | "social"
      | "quiz"
      | "location"
      | "api",
    image: "",
    featured: false,
  })

  // Enhanced mock data for campaigns
  const [campaigns, setCampaigns] = useState<Campaign[]>([
    {
      id: 1,
      name: "Welcome Bonus",
      description: "Earn points for completing your profile",
      type: "one-time",
      points: 200,
      startDate: "2023-01-01",
      endDate: null,
      active: true,
      participantsCount: 856,
      completionsCount: 743,
      condition: "Complete your profile with all required information",
      category: "Onboarding",
      verificationMethod: "automatic",
      image: "/placeholder.svg?height=300&width=600",
      featured: true,
    },
    {
      id: 2,
      name: "Monthly Purchase",
      description: "Earn bonus points for making a purchase every month",
      type: "recurring",
      points: 150,
      startDate: "2023-01-01",
      endDate: null,
      active: true,
      participantsCount: 1248,
      completionsCount: 687,
      condition: "Make at least one purchase in a calendar month",
      category: "Purchase",
      verificationMethod: "receipt",
      verificationDetails: {
        requiredPurchaseAmount: 10,
      },
      image: "/placeholder.svg?height=300&width=600",
    },
    {
      id: 3,
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
        requiredActions: ["Upload receipt with minimum $25 purchase"],
        requiredPurchaseAmount: 25,
      },
      image: "/placeholder.svg?height=300&width=600",
    },
    {
      id: 4,
      name: "Refer a Friend",
      description: "Earn points when you refer a friend who signs up",
      type: "recurring",
      points: 300,
      startDate: "2023-01-01",
      endDate: null,
      active: true,
      participantsCount: 423,
      completionsCount: 189,
      condition: "Refer a friend who creates an account and makes their first purchase",
      category: "Referral",
      verificationMethod: "automatic",
      image: "/placeholder.svg?height=300&width=600",
    },
    {
      id: 5,
      name: "Anniversary Bonus",
      description: "Earn bonus points on your account anniversary",
      type: "recurring",
      points: 500,
      startDate: "2023-01-01",
      endDate: null,
      active: true,
      participantsCount: 356,
      completionsCount: 356,
      condition: "Log in on your account anniversary date",
      category: "Engagement",
      verificationMethod: "automatic",
      image: "/placeholder.svg?height=300&width=600",
    },
    {
      id: 6,
      name: "Black Friday Special",
      description: "Triple points for purchases on Black Friday",
      type: "limited-time",
      points: 0,
      startDate: "2023-11-24",
      endDate: "2023-11-24",
      active: false,
      participantsCount: 0,
      completionsCount: 0,
      condition: "Make a purchase on Black Friday (points are tripled)",
      category: "Seasonal",
      verificationMethod: "receipt",
      image: "/placeholder.svg?height=300&width=600",
    },
    {
      id: 7,
      name: "Social Media Share",
      description: "Share our product on social media",
      type: "recurring",
      points: 100,
      startDate: "2023-01-01",
      endDate: null,
      active: true,
      participantsCount: 215,
      completionsCount: 187,
      condition: "Share a photo of our product on your social media account",
      category: "Engagement",
      verificationMethod: "social",
      image: "/placeholder.svg?height=300&width=600",
    },
    {
      id: 8,
      name: "Spend $1000 Milestone",
      description: "Reach $1000 in total purchases",
      type: "milestone",
      points: 1000,
      startDate: "2023-01-01",
      endDate: null,
      active: true,
      participantsCount: 89,
      completionsCount: 42,
      condition: "Reach a total of $1000 in purchases",
      category: "Purchase",
      verificationMethod: "automatic",
      milestoneThreshold: 1000,
      image: "/placeholder.svg?height=300&width=600",
    },
  ])

  // Mock data for campaign stats
  const campaignStats = {
    participationByDay: [
      { date: "2023-04-01", count: 24 },
      { date: "2023-04-02", count: 18 },
      { date: "2023-04-03", count: 32 },
      { date: "2023-04-04", count: 27 },
      { date: "2023-04-05", count: 35 },
    ],
    topParticipants: [
      { name: "John Doe", completions: 12 },
      { name: "Jane Smith", completions: 10 },
      { name: "Robert Johnson", completions: 8 },
      { name: "Emily Davis", completions: 7 },
      { name: "Michael Wilson", completions: 6 },
    ],
  }

  // Apply filters and search
  const filteredCampaigns = campaigns.filter((campaign) => {
    const matchesSearch =
      campaign.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      campaign.description.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesActiveFilter =
      activeFilter === null ||
      (activeFilter === "active" && campaign.active) ||
      (activeFilter === "inactive" && !campaign.active)

    const matchesCategoryFilter = categoryFilter === null || campaign.category === categoryFilter

    return matchesSearch && matchesActiveFilter && matchesCategoryFilter
  })

  const handleAddCampaign = () => {
    const newId = Math.max(...campaigns.map((campaign) => campaign.id)) + 1
    const campaign: Campaign = {
      id: newId,
      name: newCampaign.name,
      description: newCampaign.description,
      type: newCampaign.type,
      points: newCampaign.points,
      startDate: newCampaign.startDate,
      endDate: newCampaign.endDate || null,
      active: newCampaign.active,
      participantsCount: 0,
      completionsCount: 0,
      condition: newCampaign.condition,
      category: newCampaign.category,
      verificationMethod: newCampaign.verificationMethod,
      image: newCampaign.image || "/placeholder.svg?height=300&width=600",
      featured: newCampaign.featured,
    }

    setCampaigns([...campaigns, campaign])
    setNewCampaign({
      name: "",
      description: "",
      type: "one-time",
      points: 100,
      startDate: new Date().toISOString().split("T")[0],
      endDate: "",
      active: true,
      condition: "Make a purchase",
      category: "",
      verificationMethod: "automatic",
      image: "",
      featured: false,
    })
    setIsAddCampaignOpen(false)
  }

  const handleEditCampaign = () => {
    if (!selectedCampaign) return

    setCampaigns(campaigns.map((campaign) => (campaign.id === selectedCampaign.id ? selectedCampaign : campaign)))

    setIsEditCampaignOpen(false)
    setSelectedCampaign(null)
  }

  const handleDeleteCampaign = (id: number) => {
    setCampaigns(campaigns.filter((campaign) => campaign.id !== id))
  }

  const handleToggleActive = (id: number) => {
    setCampaigns(
      campaigns.map((campaign) => (campaign.id === id ? { ...campaign, active: !campaign.active } : campaign)),
    )
  }

  const handleViewStats = (campaign: Campaign) => {
    setSelectedCampaign(campaign)
    setIsViewStatsOpen(true)
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Campaigns</h1>
          <p className="text-muted-foreground">Create and manage point-earning campaigns for your users</p>
        </div>
        <Button onClick={() => setIsAddCampaignOpen(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Add Campaign
        </Button>
      </div>

      {/* Dashboard Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Campaigns</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{campaigns.length}</div>
            <p className="text-xs text-muted-foreground mt-1">
              {campaigns.filter((c) => c.active).length} active, {campaigns.filter((c) => !c.active).length} inactive
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Participants</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {campaigns.reduce((sum, campaign) => sum + (campaign.participantsCount || 0), 0).toLocaleString()}
            </div>
            <p className="text-xs text-muted-foreground mt-1">Across all campaigns</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Completion Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {Math.round(
                (campaigns.reduce((sum, campaign) => sum + (campaign.completionsCount || 0), 0) /
                  Math.max(
                    1,
                    campaigns.reduce((sum, campaign) => sum + (campaign.participantsCount || 0), 0),
                  )) *
                  100,
              )}
              %
            </div>
            <p className="text-xs text-muted-foreground mt-1">Average across all campaigns</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Points Awarded</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {campaigns
                .reduce((sum, campaign) => sum + (campaign.completionsCount || 0) * (campaign.points || 0), 0)
                .toLocaleString()}
            </div>
            <p className="text-xs text-muted-foreground mt-1">Total points from all campaigns</p>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-2 items-center">
        <div className="flex items-center gap-2 bg-muted/40 rounded-md px-3 py-1.5">
          <Filter className="h-4 w-4 text-muted-foreground" />
          <span className="text-sm font-medium">Filters:</span>
        </div>

        <Select
          value={activeFilter || "all"}
          onValueChange={(value) => setActiveFilter(value === "all" ? null : value)}
        >
          <SelectTrigger className="h-9 w-[130px]">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Statuses</SelectItem>
            <SelectItem value="active">Active</SelectItem>
            <SelectItem value="inactive">Inactive</SelectItem>
          </SelectContent>
        </Select>

        <Select
          value={categoryFilter || "all"}
          onValueChange={(value) => setCategoryFilter(value === "all" ? null : value)}
        >
          <SelectTrigger className="h-9 w-[150px]">
            <SelectValue placeholder="Category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            {campaignCategories.map((category) => (
              <SelectItem key={category.id} value={category.name}>
                {category.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <div className="flex-1"></div>

        <div className="relative">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search campaigns..."
            className="pl-8 h-9 w-[200px] md:w-[300px]"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Campaign Grid/List View */}
      <Tabs defaultValue="grid" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="grid">Grid View</TabsTrigger>
          <TabsTrigger value="list">List View</TabsTrigger>
        </TabsList>

        <TabsContent value="grid">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {filteredCampaigns.map((campaign) => (
              <Card key={campaign.id} className="overflow-hidden">
                <div className="aspect-video relative">
                  <img
                    src={campaign.image || "/placeholder.svg?height=200&width=400"}
                    alt={campaign.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-2 right-2 flex gap-1">
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
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-3">
                    <Badge
                      className="mb-1"
                      style={{
                        backgroundColor: campaignCategories.find((c) => c.name === campaign.category)?.color + "20",
                        color: campaignCategories.find((c) => c.name === campaign.category)?.color,
                      }}
                    >
                      {campaign.category}
                    </Badge>
                    <h3 className="font-medium text-white">{campaign.name}</h3>
                  </div>
                </div>
                <CardContent className="p-4">
                  <div className="flex justify-between items-center mb-2">
                    <Badge variant="outline" className="capitalize">
                      {campaign.type.replace("-", " ")}
                    </Badge>
                    <div className="text-sm font-medium">
                      {campaign.type === "limited-time" && campaign.points === 0 ? "Variable" : campaign.points} points
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground line-clamp-2 mb-2">{campaign.description}</p>
                  <div className="flex items-center text-xs text-muted-foreground mb-3">
                    <Calendar className="mr-1 h-3 w-3" />
                    <span>
                      {campaign.startDate}
                      {campaign.endDate ? ` to ${campaign.endDate}` : " (ongoing)"}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <div className="flex items-center gap-1">
                      <CheckCircle className="h-3 w-3 text-green-600" />
                      <span>{campaign.completionsCount} completions</span>
                    </div>
                    <div>{campaign.participantsCount} participants</div>
                  </div>
                </CardContent>
                <CardFooter className="p-4 pt-0 flex justify-between">
                  <Button variant="outline" size="sm" asChild>
                    <Link href={`/admin/campaigns/${campaign.id}`}>
                      <Eye className="mr-1 h-4 w-4" />
                      View Details
                    </Link>
                  </Button>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Actions</DropdownMenuLabel>
                      <DropdownMenuItem
                        onClick={() => {
                          setSelectedCampaign(campaign)
                          setIsEditCampaignOpen(true)
                        }}
                      >
                        Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleToggleActive(campaign.id)}>
                        {campaign.active ? "Deactivate" : "Activate"}
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleViewStats(campaign)}>View Statistics</DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="text-red-600" onClick={() => handleDeleteCampaign(campaign.id)}>
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="list">
          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Points</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Date Range</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Participants</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredCampaigns.map((campaign) => (
                    <TableRow key={campaign.id}>
                      <TableCell className="font-medium">
                        <div className="flex items-center gap-2">
                          {campaign.image && (
                            <img
                              src={campaign.image || "/placeholder.svg"}
                              alt={campaign.name}
                              className="w-8 h-8 rounded object-cover"
                            />
                          )}
                          <div>
                            <div>{campaign.name}</div>
                            <div className="text-xs text-muted-foreground">{campaign.description}</div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className="capitalize">
                          {campaign.type.replace("-", " ")}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        {campaign.type === "limited-time" && campaign.points === 0 ? "Variable" : campaign.points}
                      </TableCell>
                      <TableCell>
                        <Badge
                          style={{
                            backgroundColor: campaignCategories.find((c) => c.name === campaign.category)?.color + "20",
                            color: campaignCategories.find((c) => c.name === campaign.category)?.color,
                          }}
                        >
                          {campaign.category}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center">
                          <Calendar className="mr-2 h-4 w-4 text-muted-foreground" />
                          <span>
                            {campaign.startDate}
                            {campaign.endDate ? ` to ${campaign.endDate}` : " (ongoing)"}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant={campaign.active ? "default" : "secondary"}
                          className={
                            campaign.active ? "bg-green-100 text-green-800 hover:bg-green-100 hover:text-green-800" : ""
                          }
                        >
                          {campaign.active ? "Active" : "Inactive"}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="text-sm">
                          {campaign.participantsCount} participants
                          <div className="text-xs text-muted-foreground">{campaign.completionsCount} completions</div>
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-1">
                          <Button variant="ghost" size="sm" asChild>
                            <Link href={`/admin/campaigns/${campaign.id}`}>
                              <Eye className="h-4 w-4" />
                            </Link>
                          </Button>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="sm">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuLabel>Actions</DropdownMenuLabel>
                              <DropdownMenuItem
                                onClick={() => {
                                  setSelectedCampaign(campaign)
                                  setIsEditCampaignOpen(true)
                                }}
                              >
                                Edit
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => handleToggleActive(campaign.id)}>
                                {campaign.active ? "Deactivate" : "Activate"}
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => handleViewStats(campaign)}>
                                View Statistics
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem
                                className="text-red-600"
                                onClick={() => handleDeleteCampaign(campaign.id)}
                              >
                                Delete
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Add Campaign Dialog */}
      <Dialog open={isAddCampaignOpen} onOpenChange={setIsAddCampaignOpen}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>Add New Campaign</DialogTitle>
            <DialogDescription>Create a new point-earning campaign for your users</DialogDescription>
          </DialogHeader>
          <div className="grid gap-6 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="name">Campaign Name</Label>
                <Input
                  id="name"
                  value={newCampaign.name}
                  onChange={(e) => setNewCampaign({ ...newCampaign, name: e.target.value })}
                  placeholder="e.g., Summer Promotion"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="category">Category</Label>
                <Select
                  value={newCampaign.category}
                  onValueChange={(value) => setNewCampaign({ ...newCampaign, category: value })}
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
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={newCampaign.description}
                onChange={(e) => setNewCampaign({ ...newCampaign, description: e.target.value })}
                placeholder="Describe what the campaign is about"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="type">Campaign Type</Label>
                <Select
                  value={newCampaign.type}
                  onValueChange={(value) => setNewCampaign({ ...newCampaign, type: value as any })}
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
                <p className="text-xs text-muted-foreground">
                  One-time: Users can complete once. Recurring: Users can complete multiple times. Limited-time:
                  Available for a specific period.
                </p>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="points">Points</Label>
                <Input
                  id="points"
                  type="number"
                  value={newCampaign.points}
                  onChange={(e) => setNewCampaign({ ...newCampaign, points: Number.parseInt(e.target.value) || 0 })}
                  min="0"
                />
                <p className="text-xs text-muted-foreground">
                  Points awarded when a user completes this campaign. Use 0 for variable points.
                </p>
              </div>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="condition">Completion Condition</Label>
              <Textarea
                id="condition"
                value={newCampaign.condition}
                onChange={(e) => setNewCampaign({ ...newCampaign, condition: e.target.value })}
                placeholder="Describe what users need to do to complete this campaign"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="startDate">Start Date</Label>
                <Input
                  id="startDate"
                  type="date"
                  value={newCampaign.startDate}
                  onChange={(e) => setNewCampaign({ ...newCampaign, startDate: e.target.value })}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="endDate">End Date (Optional)</Label>
                <Input
                  id="endDate"
                  type="date"
                  value={newCampaign.endDate}
                  onChange={(e) => setNewCampaign({ ...newCampaign, endDate: e.target.value })}
                />
              </div>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="verificationMethod">Verification Method</Label>
              <Select
                value={newCampaign.verificationMethod}
                onValueChange={(value) => setNewCampaign({ ...newCampaign, verificationMethod: value as any })}
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
              <p className="text-xs text-muted-foreground">
                How will you verify that users have completed the campaign requirements?
              </p>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="image">Campaign Image URL</Label>
              <Input
                id="image"
                value={newCampaign.image}
                onChange={(e) => setNewCampaign({ ...newCampaign, image: e.target.value })}
                placeholder="/placeholder.svg?height=300&width=600"
              />
              <p className="text-xs text-muted-foreground">URL to an image that represents this campaign</p>
            </div>

            <div className="flex items-center gap-2">
              <Switch
                id="active"
                checked={newCampaign.active}
                onCheckedChange={(checked) => setNewCampaign({ ...newCampaign, active: checked })}
              />
              <Label htmlFor="active">Active</Label>
            </div>

            <div className="flex items-center gap-2">
              <Switch
                id="featured"
                checked={newCampaign.featured}
                onCheckedChange={(checked) => setNewCampaign({ ...newCampaign, featured: checked })}
              />
              <Label htmlFor="featured">Featured Campaign</Label>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddCampaignOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleAddCampaign}>Add Campaign</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Campaign Dialog */}
      <Dialog open={isEditCampaignOpen} onOpenChange={setIsEditCampaignOpen}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>Edit Campaign</DialogTitle>
            <DialogDescription>Make changes to the campaign</DialogDescription>
          </DialogHeader>
          {selectedCampaign && (
            <div className="grid gap-6 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="edit-name">Campaign Name</Label>
                  <Input
                    id="edit-name"
                    value={selectedCampaign.name}
                    onChange={(e) => setSelectedCampaign({ ...selectedCampaign, name: e.target.value })}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="edit-category">Category</Label>
                  <Select
                    value={selectedCampaign.category}
                    onValueChange={(value) => setSelectedCampaign({ ...selectedCampaign, category: value })}
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
                  value={selectedCampaign.description}
                  onChange={(e) => setSelectedCampaign({ ...selectedCampaign, description: e.target.value })}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="edit-type">Campaign Type</Label>
                  <Select
                    value={selectedCampaign.type}
                    onValueChange={(value) =>
                      setSelectedCampaign({
                        ...selectedCampaign,
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
                    value={selectedCampaign.points}
                    onChange={(e) =>
                      setSelectedCampaign({ ...selectedCampaign, points: Number.parseInt(e.target.value) || 0 })
                    }
                    min="0"
                  />
                </div>
              </div>

              <div className="grid gap-2">
                <Label htmlFor="edit-condition">Completion Condition</Label>
                <Textarea
                  id="edit-condition"
                  value={selectedCampaign.condition}
                  onChange={(e) => setSelectedCampaign({ ...selectedCampaign, condition: e.target.value })}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="edit-startDate">Start Date</Label>
                  <Input
                    id="edit-startDate"
                    type="date"
                    value={selectedCampaign.startDate}
                    onChange={(e) => setSelectedCampaign({ ...selectedCampaign, startDate: e.target.value })}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="edit-endDate">End Date (Optional)</Label>
                  <Input
                    id="edit-endDate"
                    type="date"
                    value={selectedCampaign.endDate || ""}
                    onChange={(e) => setSelectedCampaign({ ...selectedCampaign, endDate: e.target.value || null })}
                  />
                </div>
              </div>

              <div className="grid gap-2">
                <Label htmlFor="edit-verificationMethod">Verification Method</Label>
                <Select
                  value={selectedCampaign.verificationMethod}
                  onValueChange={(value) =>
                    setSelectedCampaign({ ...selectedCampaign, verificationMethod: value as any })
                  }
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
                  value={selectedCampaign.image || ""}
                  onChange={(e) => setSelectedCampaign({ ...selectedCampaign, image: e.target.value })}
                />
              </div>

              <div className="flex items-center gap-2">
                <Switch
                  id="edit-active"
                  checked={selectedCampaign.active}
                  onCheckedChange={(checked) => setSelectedCampaign({ ...selectedCampaign, active: checked })}
                />
                <Label htmlFor="edit-active">Active</Label>
              </div>

              <div className="flex items-center gap-2">
                <Switch
                  id="edit-featured"
                  checked={selectedCampaign.featured || false}
                  onCheckedChange={(checked) => setSelectedCampaign({ ...selectedCampaign, featured: checked })}
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

      {/* View Campaign Stats Dialog */}
      <Dialog open={isViewStatsOpen} onOpenChange={setIsViewStatsOpen}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>Campaign Statistics</DialogTitle>
            <DialogDescription>{selectedCampaign?.name} - Performance metrics</DialogDescription>
          </DialogHeader>
          {selectedCampaign && (
            <div className="py-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium">Total Participants</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{selectedCampaign.participantsCount}</div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium">Completions</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{selectedCampaign.completionsCount}</div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium">Completion Rate</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">
                      {selectedCampaign.participantsCount > 0
                        ? Math.round((selectedCampaign.completionsCount / selectedCampaign.participantsCount) * 100)
                        : 0}
                      %
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Tabs defaultValue="participation">
                <TabsList className="mb-4">
                  <TabsTrigger value="participation">Participation</TabsTrigger>
                  <TabsTrigger value="users">Top Users</TabsTrigger>
                </TabsList>
                <TabsContent value="participation">
                  <Card>
                    <CardHeader>
                      <CardTitle>Participation Over Time</CardTitle>
                      <CardDescription>Number of users participating in the campaign per day</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="h-[300px] w-full bg-muted/20 rounded-md flex items-center justify-center text-muted-foreground">
                        <BarChart className="mr-2 h-5 w-5" />
                        Participation Chart Placeholder
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
                <TabsContent value="users">
                  <Card>
                    <CardHeader>
                      <CardTitle>Top Participants</CardTitle>
                      <CardDescription>Users with the most campaign completions</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>User</TableHead>
                            <TableHead>Completions</TableHead>
                            <TableHead>Points Earned</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {campaignStats.topParticipants.map((user, index) => (
                            <TableRow key={index}>
                              <TableCell className="font-medium">{user.name}</TableCell>
                              <TableCell>{user.completions}</TableCell>
                              <TableCell>{user.completions * selectedCampaign.points}</TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
          )}
          <DialogFooter>
            <Button onClick={() => setIsViewStatsOpen(false)}>Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

