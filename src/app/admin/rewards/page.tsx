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
import { MoreHorizontal, Plus, Search } from "lucide-react"

interface Reward {
  id: number
  name: string
  description: string
  points: number
  image: string
  active: boolean
}

export default function AdminRewardsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [isAddRewardOpen, setIsAddRewardOpen] = useState(false)
  const [isEditRewardOpen, setIsEditRewardOpen] = useState(false)
  const [selectedReward, setSelectedReward] = useState<Reward | null>(null)
  const [newReward, setNewReward] = useState({
    name: "",
    description: "",
    points: 0,
    image: "/placeholder.svg?height=100&width=200",
    active: true,
  })

  // Mock data for rewards
  const [rewards, setRewards] = useState<Reward[]>([
    {
      id: 1,
      name: "$5 Gift Card",
      description: "A $5 gift card that can be used at any of our locations.",
      points: 250,
      image: "/placeholder.svg?height=100&width=200",
      active: true,
    },
    {
      id: 2,
      name: "$10 Gift Card",
      description: "A $10 gift card that can be used at any of our locations.",
      points: 500,
      image: "/placeholder.svg?height=100&width=200",
      active: true,
    },
    {
      id: 3,
      name: "Free Product",
      description: "Get any product for free (up to $15 value).",
      points: 750,
      image: "/placeholder.svg?height=100&width=200",
      active: true,
    },
    {
      id: 4,
      name: "VIP Experience",
      description: "Exclusive VIP experience at one of our events.",
      points: 1500,
      image: "/placeholder.svg?height=100&width=200",
      active: true,
    },
    {
      id: 5,
      name: "Premium Membership",
      description: "One month of premium membership benefits.",
      points: 2000,
      image: "/placeholder.svg?height=100&width=200",
      active: false,
    },
  ])

  const filteredRewards = rewards.filter(
    (reward) =>
      reward.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      reward.description.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handleAddReward = () => {
    const newId = Math.max(...rewards.map((reward) => reward.id)) + 1
    const reward: Reward = {
      id: newId,
      name: newReward.name,
      description: newReward.description,
      points: newReward.points,
      image: newReward.image,
      active: newReward.active,
    }

    setRewards([...rewards, reward])
    setNewReward({
      name: "",
      description: "",
      points: 0,
      image: "/placeholder.svg?height=100&width=200",
      active: true,
    })
    setIsAddRewardOpen(false)
  }

  const handleEditReward = () => {
    if (!selectedReward) return

    setRewards(rewards.map((reward) => (reward.id === selectedReward.id ? selectedReward : reward)))

    setIsEditRewardOpen(false)
    setSelectedReward(null)
  }

  const handleDeleteReward = (id: number) => {
    setRewards(rewards.filter((reward) => reward.id !== id))
  }

  const handleToggleActive = (id: number) => {
    setRewards(rewards.map((reward) => (reward.id === id ? { ...reward, active: !reward.active } : reward)))
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Rewards</h1>
          <p className="text-muted-foreground">Manage your loyalty program rewards</p>
        </div>
        <Button onClick={() => setIsAddRewardOpen(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Add Reward
        </Button>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>All Rewards</CardTitle>
              <CardDescription>A list of all rewards in your loyalty program</CardDescription>
            </div>
            <div className="relative w-64">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search rewards..."
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
                <TableHead>Description</TableHead>
                <TableHead>Points</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredRewards.map((reward) => (
                <TableRow key={reward.id}>
                  <TableCell className="font-medium">
                    <div className="flex items-center gap-2">
                      <img
                        src={reward.image || "/placeholder.svg"}
                        alt={reward.name}
                        className="h-8 w-8 rounded object-cover"
                      />
                      {reward.name}
                    </div>
                  </TableCell>
                  <TableCell className="max-w-xs truncate">{reward.description}</TableCell>
                  <TableCell>{reward.points}</TableCell>
                  <TableCell>
                    <span
                      className={`px-2 py-1 rounded-full text-xs ${
                        reward.active ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {reward.active ? "Active" : "Inactive"}
                    </span>
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
                            setSelectedReward(reward)
                            setIsEditRewardOpen(true)
                          }}
                        >
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleToggleActive(reward.id)}>
                          {reward.active ? "Deactivate" : "Activate"}
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-red-600" onClick={() => handleDeleteReward(reward.id)}>
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

      {/* Add Reward Dialog */}
      <Dialog open={isAddRewardOpen} onOpenChange={setIsAddRewardOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Reward</DialogTitle>
            <DialogDescription>Add a new reward to your loyalty program</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                value={newReward.name}
                onChange={(e) => setNewReward({ ...newReward, name: e.target.value })}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={newReward.description}
                onChange={(e) => setNewReward({ ...newReward, description: e.target.value })}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="points">Points Required</Label>
              <Input
                id="points"
                type="number"
                value={newReward.points}
                onChange={(e) => setNewReward({ ...newReward, points: Number.parseInt(e.target.value) || 0 })}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="image">Image URL</Label>
              <Input
                id="image"
                value={newReward.image}
                onChange={(e) => setNewReward({ ...newReward, image: e.target.value })}
              />
            </div>
            <div className="flex items-center gap-2">
              <input
                id="active"
                type="checkbox"
                className="h-4 w-4 rounded border-gray-300"
                checked={newReward.active}
                onChange={(e) => setNewReward({ ...newReward, active: e.target.checked })}
              />
              <Label htmlFor="active">Active</Label>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddRewardOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleAddReward}>Add Reward</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Reward Dialog */}
      <Dialog open={isEditRewardOpen} onOpenChange={setIsEditRewardOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Reward</DialogTitle>
            <DialogDescription>Make changes to the reward</DialogDescription>
          </DialogHeader>
          {selectedReward && (
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="edit-name">Name</Label>
                <Input
                  id="edit-name"
                  value={selectedReward.name}
                  onChange={(e) => setSelectedReward({ ...selectedReward, name: e.target.value })}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="edit-description">Description</Label>
                <Textarea
                  id="edit-description"
                  value={selectedReward.description}
                  onChange={(e) => setSelectedReward({ ...selectedReward, description: e.target.value })}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="edit-points">Points Required</Label>
                <Input
                  id="edit-points"
                  type="number"
                  value={selectedReward.points}
                  onChange={(e) =>
                    setSelectedReward({ ...selectedReward, points: Number.parseInt(e.target.value) || 0 })
                  }
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="edit-image">Image URL</Label>
                <Input
                  id="edit-image"
                  value={selectedReward.image}
                  onChange={(e) => setSelectedReward({ ...selectedReward, image: e.target.value })}
                />
              </div>
              <div className="flex items-center gap-2">
                <input
                  id="edit-active"
                  type="checkbox"
                  className="h-4 w-4 rounded border-gray-300"
                  checked={selectedReward.active}
                  onChange={(e) => setSelectedReward({ ...selectedReward, active: e.target.checked })}
                />
                <Label htmlFor="edit-active">Active</Label>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditRewardOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleEditReward}>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

