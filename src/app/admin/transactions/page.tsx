"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
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
import { Textarea } from "@/components/ui/textarea"
import { Plus, Search } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface Transaction {
  id: number
  userId: number
  userName: string
  date: string
  description: string
  points: number
  type: "earned" | "redeemed"
}

export default function AdminTransactionsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [isAddTransactionOpen, setIsAddTransactionOpen] = useState(false)
  const [newTransaction, setNewTransaction] = useState({
    userId: 1,
    description: "",
    points: 0,
    type: "earned" as "earned" | "redeemed",
  })

  // Mock data for users (for the dropdown)
  const users = [
    { id: 1, name: "John Doe" },
    { id: 2, name: "Jane Smith" },
    { id: 3, name: "Robert Johnson" },
    { id: 4, name: "Emily Davis" },
    { id: 5, name: "Michael Wilson" },
    { id: 6, name: "Sarah Brown" },
    { id: 7, name: "David Miller" },
    { id: 8, name: "Lisa Garcia" },
  ]

  // Mock data for transactions
  const [transactions, setTransactions] = useState<Transaction[]>([
    {
      id: 1,
      userId: 1,
      userName: "John Doe",
      date: "2023-04-01",
      description: "Purchase at Store #123",
      points: 50,
      type: "earned",
    },
    {
      id: 2,
      userId: 2,
      userName: "Jane Smith",
      date: "2023-04-02",
      description: "Purchase at Store #456",
      points: 75,
      type: "earned",
    },
    {
      id: 3,
      userId: 1,
      userName: "John Doe",
      date: "2023-04-03",
      description: "Redeemed $5 Gift Card",
      points: 250,
      type: "redeemed",
    },
    {
      id: 4,
      userId: 3,
      userName: "Robert Johnson",
      date: "2023-04-04",
      description: "Purchase at Store #789",
      points: 100,
      type: "earned",
    },
    {
      id: 5,
      userId: 4,
      userName: "Emily Davis",
      date: "2023-04-05",
      description: "Bonus Points",
      points: 200,
      type: "earned",
    },
    {
      id: 6,
      userId: 2,
      userName: "Jane Smith",
      date: "2023-04-06",
      description: "Redeemed Free Product",
      points: 750,
      type: "redeemed",
    },
    {
      id: 7,
      userId: 5,
      userName: "Michael Wilson",
      date: "2023-04-07",
      description: "Purchase at Store #123",
      points: 50,
      type: "earned",
    },
    {
      id: 8,
      userId: 6,
      userName: "Sarah Brown",
      date: "2023-04-08",
      description: "Purchase at Store #456",
      points: 75,
      type: "earned",
    },
    {
      id: 9,
      userId: 7,
      userName: "David Miller",
      date: "2023-04-09",
      description: "Redeemed $10 Gift Card",
      points: 500,
      type: "redeemed",
    },
    {
      id: 10,
      userId: 8,
      userName: "Lisa Garcia",
      date: "2023-04-10",
      description: "Purchase at Store #789",
      points: 100,
      type: "earned",
    },
  ])

  const filteredTransactions = transactions.filter(
    (transaction) =>
      transaction.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      transaction.description.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handleAddTransaction = () => {
    const newId = Math.max(...transactions.map((transaction) => transaction.id)) + 1
    const user = users.find((u) => u.id === newTransaction.userId)

    if (!user) return

    const transaction: Transaction = {
      id: newId,
      userId: newTransaction.userId,
      userName: user.name,
      date: new Date().toISOString().split("T")[0],
      description: newTransaction.description,
      points: newTransaction.type === "redeemed" ? -Math.abs(newTransaction.points) : Math.abs(newTransaction.points),
      type: newTransaction.type,
    }

    setTransactions([transaction, ...transactions])
    setNewTransaction({
      userId: 1,
      description: "",
      points: 0,
      type: "earned",
    })
    setIsAddTransactionOpen(false)
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Transactions</h1>
          <p className="text-muted-foreground">View and manage loyalty point transactions</p>
        </div>
        <Button onClick={() => setIsAddTransactionOpen(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Add Transaction
        </Button>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>All Transactions</CardTitle>
              <CardDescription>A list of all point transactions in your loyalty program</CardDescription>
            </div>
            <div className="relative w-64">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search transactions..."
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
                <TableHead>Date</TableHead>
                <TableHead>User</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Points</TableHead>
                <TableHead>Type</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredTransactions.map((transaction) => (
                <TableRow key={transaction.id}>
                  <TableCell>{transaction.date}</TableCell>
                  <TableCell className="font-medium">{transaction.userName}</TableCell>
                  <TableCell>{transaction.description}</TableCell>
                  <TableCell className={transaction.type === "earned" ? "text-green-600" : "text-red-600"}>
                    {transaction.type === "earned" ? "+" : "-"}
                    {Math.abs(transaction.points)}
                  </TableCell>
                  <TableCell>
                    <span
                      className={`px-2 py-1 rounded-full text-xs ${
                        transaction.type === "earned" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                      }`}
                    >
                      {transaction.type === "earned" ? "Earned" : "Redeemed"}
                    </span>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Add Transaction Dialog */}
      <Dialog open={isAddTransactionOpen} onOpenChange={setIsAddTransactionOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Transaction</DialogTitle>
            <DialogDescription>Add a new point transaction to a user's account</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="user">User</Label>
              <Select
                onValueChange={(value) => setNewTransaction({ ...newTransaction, userId: Number.parseInt(value) })}
                defaultValue={newTransaction.userId.toString()}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select a user" />
                </SelectTrigger>
                <SelectContent>
                  {users.map((user) => (
                    <SelectItem key={user.id} value={user.id.toString()}>
                      {user.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="type">Transaction Type</Label>
              <Select
                onValueChange={(value) =>
                  setNewTransaction({ ...newTransaction, type: value as "earned" | "redeemed" })
                }
                defaultValue={newTransaction.type}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select transaction type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="earned">Earned</SelectItem>
                  <SelectItem value="redeemed">Redeemed</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={newTransaction.description}
                onChange={(e) => setNewTransaction({ ...newTransaction, description: e.target.value })}
                placeholder="e.g., Purchase at Store #123, Redeemed Gift Card, etc."
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="points">Points</Label>
              <Input
                id="points"
                type="number"
                value={newTransaction.points}
                onChange={(e) => setNewTransaction({ ...newTransaction, points: Number.parseInt(e.target.value) || 0 })}
                min="0"
              />
              <p className="text-xs text-muted-foreground">
                Enter a positive number. The sign will be applied based on the transaction type.
              </p>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddTransactionOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleAddTransaction}>Add Transaction</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

