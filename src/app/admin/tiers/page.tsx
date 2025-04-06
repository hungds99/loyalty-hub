"use client"

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
import { MoreHorizontal, Plus, Search, ArrowUpDown, Users } from "lucide-react"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface Tier {
  id: number
  name: string
  description: string
  pointThreshold: number
  color: string
  benefits: string[]
  active: boolean
  usersCount: number
}

export default function AdminTiersPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [isAddTierOpen, setIsAddTierOpen] = useState(false)
  const [isEditTierOpen, setIsEditTierOpen] = useState(false)
  const [isViewUsersOpen, setIsViewUsersOpen] = useState(false)
  const [selectedTier, setSelectedTier] = useState<Tier | null>(null)
  const [newTier, setNewTier] = useState({
    name: "",
    description: "",
    pointThreshold: 0,
    color: "#6366F1",
    benefits: [""],
    active: true,
  })

  // Mock data for tiers
  const [tiers, setTiers] = useState<Tier[]>([
    {
      id: 1,
      name: "Bronze",
      description: "Entry level tier for all new members",
      pointThreshold: 0,
      color: "#CD7F32",
      benefits: ["Earn 1 point per $1 spent", "Birthday reward", "Access to member-only offers"],
      active: true,
      usersCount: 845,
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
      usersCount: 356,
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
      usersCount: 124,
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
      usersCount: 42,
    },
  ])

  // Mock data for tier users
  const tierUsers = [
    { id: 1, name: "John Doe", email: "john@example.com", points: 12500, joinDate: "2023-01-15" },
    { id: 2, name: "Jane Smith", email: "jane@example.com", points: 8750, joinDate: "2023-02-20" },
    { id: 3, name: "Robert Johnson", email: "robert@example.com", points: 6200, joinDate: "2023-03-10" },
    { id: 4, name: "Emily Davis", email: "emily@example.com", points: 11200, joinDate: "2023-03-25" },
    { id: 5, name: "Michael Wilson", email: "michael@example.com", points: 9300, joinDate: "2023-04-05" },
  ]

  const filteredTiers = tiers.filter(
    (tier) =>
      tier.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tier.description.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handleAddTier = () => {
    const newId = Math.max(...tiers.map((tier) => tier.id)) + 1
    const tier: Tier = {
      id: newId,
      name: newTier.name,
      description: newTier.description,
      pointThreshold: newTier.pointThreshold,
      color: newTier.color,
      benefits: newTier.benefits.filter((benefit) => benefit.trim() !== ""),
      active: newTier.active,
      usersCount: 0,
    }

    setTiers([...tiers, tier])
    setNewTier({
      name: "",
      description: "",
      pointThreshold: 0,
      color: "#6366F1",
      benefits: [""],
      active: true,
    })
    setIsAddTierOpen(false)
  }

  const handleEditTier = () => {
    if (!selectedTier) return

    setTiers(tiers.map((tier) => (tier.id === selectedTier.id ? selectedTier : tier)))

    setIsEditTierOpen(false)
    setSelectedTier(null)
  }

  const handleDeleteTier = (id: number) => {
    setTiers(tiers.filter((tier) => tier.id !== id))
  }

  const handleToggleActive = (id: number) => {
    setTiers(tiers.map((tier) => (tier.id === id ? { ...tier, active: !tier.active } : tier)))
  }

  const handleViewUsers = (tier: Tier) => {
    setSelectedTier(tier)
    setIsViewUsersOpen(true)
  }

  const handleAddBenefit = () => {
    setNewTier({
      ...newTier,
      benefits: [...newTier.benefits, ""],
    })
  }

  const handleRemoveBenefit = (index: number) => {
    const benefits = [...newTier.benefits]
    benefits.splice(index, 1)
    setNewTier({
      ...newTier,
      benefits,
    })
  }

  const handleBenefitChange = (index: number, value: string) => {
    const benefits = [...newTier.benefits]
    benefits[index] = value
    setNewTier({
      ...newTier,
      benefits,
    })
  }

  const handleAddSelectedBenefit = () => {
    if (!selectedTier) return

    setSelectedTier({
      ...selectedTier,
      benefits: [...selectedTier.benefits, ""],
    })
  }

  const handleRemoveSelectedBenefit = (index: number) => {
    if (!selectedTier) return

    const benefits = [...selectedTier.benefits]
    benefits.splice(index, 1)
    setSelectedTier({
      ...selectedTier,
      benefits,
    })
  }

  const handleSelectedBenefitChange = (index: number, value: string) => {
    if (!selectedTier) return

    const benefits = [...selectedTier.benefits]
    benefits[index] = value
    setSelectedTier({
      ...selectedTier,
      benefits,
    })
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Loyalty Tiers</h1>
          <p className="text-muted-foreground">Manage your loyalty program tiers and benefits</p>
        </div>
        <Button onClick={() => setIsAddTierOpen(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Add Tier
        </Button>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>All Tiers</CardTitle>
              <CardDescription>A list of all tiers in your loyalty program</CardDescription>
            </div>
            <div className="relative w-64">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search tiers..."
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Point Threshold</TableHead>
                <TableHead>Benefits</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Users</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredTiers.map((tier) => (
                <TableRow key={tier.id}>
                  <TableCell className="font-medium">
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 rounded-full" style={{ backgroundColor: tier.color }}></div>
                      <div>
                        <div>{tier.name}</div>
                        <div className="text-xs text-muted-foreground">{tier.description}</div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      <ArrowUpDown className="mr-2 h-4 w-4 text-muted-foreground" />
                      <span>{tier.pointThreshold.toLocaleString()} points</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-wrap gap-1">
                      <Badge variant="outline">{tier.benefits.length} benefits</Badge>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={tier.active ? "default" : "secondary"}
                      className={
                        tier.active ? "bg-green-100 text-green-800 hover:bg-green-100 hover:text-green-800" : ""
                      }
                    >
                      {tier.active ? "Active" : "Inactive"}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <Users className="h-4 w-4 text-muted-foreground" />
                      <span>{tier.usersCount}</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <span className="sr-only">Open menu</span>
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem
                          onClick={() => {
                            setSelectedTier(tier)
                            setIsEditTierOpen(true)
                          }}
                        >
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleToggleActive(tier.id)}>
                          {tier.active ? "Deactivate" : "Activate"}
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleViewUsers(tier)}>View Users</DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-red-600" onClick={() => handleDeleteTier(tier.id)}>
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Add Tier Dialog */}
      <Dialog open={isAddTierOpen} onOpenChange={setIsAddTierOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Add New Tier</DialogTitle>
            <DialogDescription>Create a new loyalty tier with benefits</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Tier Name</Label>
              <Input
                id="name"
                value={newTier.name}
                onChange={(e) => setNewTier({ ...newTier, name: e.target.value })}
                placeholder="e.g., Silver, Gold, Platinum"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={newTier.description}
                onChange={(e) => setNewTier({ ...newTier, description: e.target.value })}
                placeholder="Describe this tier and its value"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="pointThreshold">Point Threshold</Label>
              <Input
                id="pointThreshold"
                type="number"
                value={newTier.pointThreshold}
                onChange={(e) => setNewTier({ ...newTier, pointThreshold: Number.parseInt(e.target.value) || 0 })}
                min="0"
              />
              <p className="text-xs text-muted-foreground">Minimum points required to reach this tier</p>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="color">Tier Color</Label>
              <div className="flex gap-2">
                <Input
                  id="color"
                  type="color"
                  value={newTier.color}
                  onChange={(e) => setNewTier({ ...newTier, color: e.target.value })}
                  className="w-12 h-10 p-1"
                />
                <Input
                  value={newTier.color}
                  onChange={(e) => setNewTier({ ...newTier, color: e.target.value })}
                  placeholder="#HEX"
                />
              </div>
            </div>
            <div className="grid gap-2">
              <div className="flex justify-between items-center">
                <Label>Benefits</Label>
                <Button type="button" variant="outline" size="sm" onClick={handleAddBenefit}>
                  Add Benefit
                </Button>
              </div>
              {newTier.benefits.map((benefit, index) => (
                <div key={index} className="flex gap-2">
                  <Input
                    value={benefit}
                    onChange={(e) => handleBenefitChange(index, e.target.value)}
                    placeholder="e.g., Free shipping, Exclusive access"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={() => handleRemoveBenefit(index)}
                    disabled={newTier.benefits.length === 1}
                  >
                    ✕
                  </Button>
                </div>
              ))}
            </div>
            <div className="flex items-center gap-2">
              <Switch
                id="active"
                checked={newTier.active}
                onCheckedChange={(checked) => setNewTier({ ...newTier, active: checked })}
              />
              <Label htmlFor="active">Active</Label>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddTierOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleAddTier}>Add Tier</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Tier Dialog */}
      <Dialog open={isEditTierOpen} onOpenChange={setIsEditTierOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Edit Tier</DialogTitle>
            <DialogDescription>Make changes to the loyalty tier</DialogDescription>
          </DialogHeader>
          {selectedTier && (
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="edit-name">Tier Name</Label>
                <Input
                  id="edit-name"
                  value={selectedTier.name}
                  onChange={(e) => setSelectedTier({ ...selectedTier, name: e.target.value })}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="edit-description">Description</Label>
                <Textarea
                  id="edit-description"
                  value={selectedTier.description}
                  onChange={(e) => setSelectedTier({ ...selectedTier, description: e.target.value })}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="edit-pointThreshold">Point Threshold</Label>
                <Input
                  id="edit-pointThreshold"
                  type="number"
                  value={selectedTier.pointThreshold}
                  onChange={(e) =>
                    setSelectedTier({ ...selectedTier, pointThreshold: Number.parseInt(e.target.value) || 0 })
                  }
                  min="0"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="edit-color">Tier Color</Label>
                <div className="flex gap-2">
                  <Input
                    id="edit-color"
                    type="color"
                    value={selectedTier.color}
                    onChange={(e) => setSelectedTier({ ...selectedTier, color: e.target.value })}
                    className="w-12 h-10 p-1"
                  />
                  <Input
                    value={selectedTier.color}
                    onChange={(e) => setSelectedTier({ ...selectedTier, color: e.target.value })}
                    placeholder="#HEX"
                  />
                </div>
              </div>
              <div className="grid gap-2">
                <div className="flex justify-between items-center">
                  <Label>Benefits</Label>
                  <Button type="button" variant="outline" size="sm" onClick={handleAddSelectedBenefit}>
                    Add Benefit
                  </Button>
                </div>
                {selectedTier.benefits.map((benefit, index) => (
                  <div key={index} className="flex gap-2">
                    <Input
                      value={benefit}
                      onChange={(e) => handleSelectedBenefitChange(index, e.target.value)}
                      placeholder="e.g., Free shipping, Exclusive access"
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      onClick={() => handleRemoveSelectedBenefit(index)}
                      disabled={selectedTier.benefits.length === 1}
                    >
                      ✕
                    </Button>
                  </div>
                ))}
              </div>
              <div className="flex items-center gap-2">
                <Switch
                  id="edit-active"
                  checked={selectedTier.active}
                  onCheckedChange={(checked) => setSelectedTier({ ...selectedTier, active: checked })}
                />
                <Label htmlFor="edit-active">Active</Label>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditTierOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleEditTier}>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* View Tier Users Dialog */}
      <Dialog open={isViewUsersOpen} onOpenChange={setIsViewUsersOpen}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>Tier Users</DialogTitle>
            <DialogDescription>{selectedTier?.name} - Users in this tier</DialogDescription>
          </DialogHeader>
          {selectedTier && (
            <div className="py-4">
              <Tabs defaultValue="current">
                <TabsList className="mb-4">
                  <TabsTrigger value="current">Current Users</TabsTrigger>
                  <TabsTrigger value="approaching">Approaching Users</TabsTrigger>
                </TabsList>
                <TabsContent value="current">
                  <Card>
                    <CardContent className="p-0">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Name</TableHead>
                            <TableHead>Email</TableHead>
                            <TableHead>Points</TableHead>
                            <TableHead>Join Date</TableHead>
                            <TableHead>Next Tier Progress</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {tierUsers.map((user) => (
                            <TableRow key={user.id}>
                              <TableCell className="font-medium">{user.name}</TableCell>
                              <TableCell>{user.email}</TableCell>
                              <TableCell>{user.points.toLocaleString()}</TableCell>
                              <TableCell>{user.joinDate}</TableCell>
                              <TableCell>
                                {tiers.find((t) => t.id === selectedTier.id + 1) ? (
                                  <div className="w-full">
                                    <div className="flex justify-between text-xs mb-1">
                                      <span>
                                        {user.points.toLocaleString()} /
                                        {tiers
                                          .find((t) => t.id === selectedTier.id + 1)
                                          ?.pointThreshold.toLocaleString()}
                                      </span>
                                      <span>
                                        {Math.min(
                                          100,
                                          Math.round(
                                            ((user.points - selectedTier.pointThreshold) /
                                              ((tiers.find((t) => t.id === selectedTier.id + 1)?.pointThreshold || 0) -
                                                selectedTier.pointThreshold)) *
                                              100,
                                          ),
                                        )}
                                        %
                                      </span>
                                    </div>
                                    <div className="w-full bg-gray-200 rounded-full h-2">
                                      <div
                                        className="bg-emerald-600 h-2 rounded-full"
                                        style={{
                                          width: `${Math.min(
                                            100,
                                            Math.round(
                                              ((user.points - selectedTier.pointThreshold) /
                                                ((tiers.find((t) => t.id === selectedTier.id + 1)?.pointThreshold ||
                                                  0) -
                                                  selectedTier.pointThreshold)) *
                                                100,
                                            ),
                                          )}%`,
                                        }}
                                      ></div>
                                    </div>
                                  </div>
                                ) : (
                                  <span className="text-sm text-muted-foreground">Highest tier</span>
                                )}
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </CardContent>
                  </Card>
                </TabsContent>
                <TabsContent value="approaching">
                  <Card>
                    <CardContent className="p-0">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Name</TableHead>
                            <TableHead>Email</TableHead>
                            <TableHead>Current Points</TableHead>
                            <TableHead>Points Needed</TableHead>
                            <TableHead>Progress</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {[
                            {
                              id: 6,
                              name: "Sarah Johnson",
                              email: "sarah@example.com",
                              points: 950,
                              joinDate: "2023-02-15",
                            },
                            {
                              id: 7,
                              name: "David Lee",
                              email: "david@example.com",
                              points: 920,
                              joinDate: "2023-03-05",
                            },
                            {
                              id: 8,
                              name: "Lisa Brown",
                              email: "lisa@example.com",
                              points: 880,
                              joinDate: "2023-01-25",
                            },
                          ].map((user) => (
                            <TableRow key={user.id}>
                              <TableCell className="font-medium">{user.name}</TableCell>
                              <TableCell>{user.email}</TableCell>
                              <TableCell>{user.points.toLocaleString()}</TableCell>
                              <TableCell>{(selectedTier.pointThreshold - user.points).toLocaleString()}</TableCell>
                              <TableCell>
                                <div className="w-full">
                                  <div className="flex justify-between text-xs mb-1">
                                    <span>
                                      {user.points.toLocaleString()} / {selectedTier.pointThreshold.toLocaleString()}
                                    </span>
                                    <span>{Math.round((user.points / selectedTier.pointThreshold) * 100)}%</span>
                                  </div>
                                  <div className="w-full bg-gray-200 rounded-full h-2">
                                    <div
                                      className="bg-emerald-600 h-2 rounded-full"
                                      style={{
                                        width: `${Math.round((user.points / selectedTier.pointThreshold) * 100)}%`,
                                      }}
                                    ></div>
                                  </div>
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
            </div>
          )}
          <DialogFooter>
            <Button onClick={() => setIsViewUsersOpen(false)}>Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

