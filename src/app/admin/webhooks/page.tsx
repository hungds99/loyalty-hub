"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
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
import { Checkbox } from "@/components/ui/checkbox"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  MoreHorizontal,
  Plus,
  Search,
  LinkIcon,
  Play,
  AlertCircle,
  CheckCircle,
  XCircle,
  RefreshCw,
  Eye,
  Code,
  Copy,
} from "lucide-react"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "@/components/ui/use-toast"
import { ToastAction } from "@/components/ui/toast"

interface Webhook {
  id: number
  name: string
  url: string
  secret: string
  events: string[]
  active: boolean
  createdAt: string
  lastTriggered?: string
  successRate: number
}

interface WebhookLog {
  id: number
  webhookId: number
  webhookName: string
  event: string
  url: string
  status: "success" | "failed" | "pending" | "retrying"
  statusCode?: number
  requestPayload: string
  responseBody?: string
  error?: string
  createdAt: string
  retries: number
  duration: number
}

const eventTypes = [
  { id: "user.created", name: "Customer Registration", description: "Triggered when a new customer registers" },
  { id: "user.updated", name: "Customer Updated", description: "Triggered when customer data is updated" },
  {
    id: "transaction.created",
    name: "Transaction Created",
    description: "Triggered when a new transaction is created",
  },
  { id: "points.earned", name: "Points Earned", description: "Triggered when a customer earns points" },
  { id: "points.redeemed", name: "Points Redeemed", description: "Triggered when a customer redeems points" },
  { id: "tier.changed", name: "Tier Changed", description: "Triggered when a customer's tier changes" },
  { id: "campaign.joined", name: "Campaign Joined", description: "Triggered when a customer joins a campaign" },
  {
    id: "campaign.completed",
    name: "Campaign Completed",
    description: "Triggered when a customer completes a campaign",
  },
  { id: "reward.redeemed", name: "Reward Redeemed", description: "Triggered when a customer redeems a reward" },
]

export default function WebhooksPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [isAddWebhookOpen, setIsAddWebhookOpen] = useState(false)
  const [isEditWebhookOpen, setIsEditWebhookOpen] = useState(false)
  const [isViewLogOpen, setIsViewLogOpen] = useState(false)
  const [isTestWebhookOpen, setIsTestWebhookOpen] = useState(false)
  const [selectedWebhook, setSelectedWebhook] = useState<Webhook | null>(null)
  const [selectedLog, setSelectedLog] = useState<WebhookLog | null>(null)
  const [newWebhook, setNewWebhook] = useState({
    name: "",
    url: "",
    secret: "",
    events: [] as string[],
    active: true,
  })
  const [testEvent, setTestEvent] = useState(eventTypes[0].id)
  const [testPayload, setTestPayload] = useState(
    JSON.stringify(
      {
        event: "user.created",
        data: {
          id: 123,
          name: "John Doe",
          email: "john@example.com",
          createdAt: new Date().toISOString(),
        },
      },
      null,
      2,
    ),
  )

  // Mock data for webhooks
  const [webhooks, setWebhooks] = useState<Webhook[]>([
    {
      id: 1,
      name: "CRM Integration",
      url: "https://crm.example.com/webhooks/loyalty",
      secret: "whsec_8f7b4a2c3d1e5f6a9b8c7d6e5f4a3b2c1d",
      events: ["user.created", "user.updated", "transaction.created"],
      active: true,
      createdAt: "2023-03-15",
      lastTriggered: "2023-04-28",
      successRate: 98.5,
    },
    {
      id: 2,
      name: "Marketing Platform",
      url: "https://marketing.example.com/api/webhooks",
      secret: "whsec_2a3b4c5d6e7f8a9b1c2d3e4f5a6b7c8d9",
      events: ["points.earned", "tier.changed", "campaign.completed"],
      active: true,
      createdAt: "2023-02-10",
      lastTriggered: "2023-04-27",
      successRate: 100,
    },
    {
      id: 3,
      name: "Analytics Service",
      url: "https://analytics.example.com/webhooks/ingest",
      secret: "whsec_9a8b7c6d5e4f3a2b1c9d8e7f6a5b4c3d2",
      events: ["transaction.created", "points.earned", "points.redeemed", "reward.redeemed"],
      active: false,
      createdAt: "2023-04-05",
      lastTriggered: "2023-04-20",
      successRate: 75.2,
    },
  ])

  // Mock data for webhook logs
  const [webhookLogs, setWebhookLogs] = useState<WebhookLog[]>([
    {
      id: 1,
      webhookId: 1,
      webhookName: "CRM Integration",
      event: "user.created",
      url: "https://crm.example.com/webhooks/loyalty",
      status: "success",
      statusCode: 200,
      requestPayload: JSON.stringify(
        {
          event: "user.created",
          data: {
            id: 123,
            name: "John Doe",
            email: "john@example.com",
            createdAt: "2023-04-28T10:15:30Z",
          },
        },
        null,
        2,
      ),
      responseBody: JSON.stringify({ success: true, message: "Webhook received" }, null, 2),
      createdAt: "2023-04-28T10:15:32Z",
      retries: 0,
      duration: 245,
    },
    {
      id: 2,
      webhookId: 2,
      webhookName: "Marketing Platform",
      event: "points.earned",
      url: "https://marketing.example.com/api/webhooks",
      status: "success",
      statusCode: 200,
      requestPayload: JSON.stringify(
        {
          event: "points.earned",
          data: {
            userId: 123,
            points: 50,
            reason: "Purchase at Store #123",
            transactionId: 456,
            timestamp: "2023-04-27T15:45:22Z",
          },
        },
        null,
        2,
      ),
      responseBody: JSON.stringify({ status: "ok" }, null, 2),
      createdAt: "2023-04-27T15:45:23Z",
      retries: 0,
      duration: 189,
    },
    {
      id: 3,
      webhookId: 3,
      webhookName: "Analytics Service",
      event: "transaction.created",
      url: "https://analytics.example.com/webhooks/ingest",
      status: "failed",
      statusCode: 500,
      requestPayload: JSON.stringify(
        {
          event: "transaction.created",
          data: {
            id: 789,
            userId: 456,
            amount: 75,
            points: 75,
            type: "earned",
            timestamp: "2023-04-20T09:30:15Z",
          },
        },
        null,
        2,
      ),
      error:
        "Internal Server Error: The server encountered an unexpected condition that prevented it from fulfilling the request",
      createdAt: "2023-04-20T09:30:16Z",
      retries: 3,
      duration: 1250,
    },
    {
      id: 4,
      webhookId: 1,
      webhookName: "CRM Integration",
      event: "user.updated",
      url: "https://crm.example.com/webhooks/loyalty",
      status: "success",
      statusCode: 200,
      requestPayload: JSON.stringify(
        {
          event: "user.updated",
          data: {
            id: 123,
            name: "John Doe",
            email: "john.doe@example.com",
            phone: "+1 (555) 123-4567",
            updatedAt: "2023-04-26T14:20:10Z",
          },
        },
        null,
        2,
      ),
      responseBody: JSON.stringify({ success: true, message: "User updated" }, null, 2),
      createdAt: "2023-04-26T14:20:11Z",
      retries: 0,
      duration: 210,
    },
    {
      id: 5,
      webhookId: 2,
      webhookName: "Marketing Platform",
      event: "tier.changed",
      url: "https://marketing.example.com/api/webhooks",
      status: "success",
      statusCode: 200,
      requestPayload: JSON.stringify(
        {
          event: "tier.changed",
          data: {
            userId: 456,
            previousTier: "Bronze",
            newTier: "Silver",
            timestamp: "2023-04-25T11:10:05Z",
          },
        },
        null,
        2,
      ),
      responseBody: JSON.stringify({ status: "ok" }, null, 2),
      createdAt: "2023-04-25T11:10:06Z",
      retries: 0,
      duration: 175,
    },
  ])

  const filteredWebhooks = webhooks.filter(
    (webhook) =>
      webhook.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      webhook.url.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handleAddWebhook = () => {
    const newId = Math.max(...webhooks.map((webhook) => webhook.id)) + 1
    const webhook: Webhook = {
      id: newId,
      name: newWebhook.name,
      url: newWebhook.url,
      secret: newWebhook.secret || generateWebhookSecret(),
      events: newWebhook.events,
      active: newWebhook.active,
      createdAt: new Date().toISOString().split("T")[0],
      successRate: 0,
    }

    setWebhooks([...webhooks, webhook])
    setNewWebhook({
      name: "",
      url: "",
      secret: "",
      events: [],
      active: true,
    })
    setIsAddWebhookOpen(false)

    toast({
      title: "Webhook created",
      description: `Webhook "${webhook.name}" has been created successfully.`,
    })
  }

  const handleEditWebhook = () => {
    if (!selectedWebhook) return

    setWebhooks(webhooks.map((webhook) => (webhook.id === selectedWebhook.id ? selectedWebhook : webhook)))

    setIsEditWebhookOpen(false)
    setSelectedWebhook(null)

    toast({
      title: "Webhook updated",
      description: `Webhook "${selectedWebhook.name}" has been updated successfully.`,
    })
  }

  const handleDeleteWebhook = (id: number) => {
    const webhookToDelete = webhooks.find((webhook) => webhook.id === id)
    if (!webhookToDelete) return

    setWebhooks(webhooks.filter((webhook) => webhook.id !== id))

    toast({
      title: "Webhook deleted",
      description: `Webhook "${webhookToDelete.name}" has been deleted.`,
    })
  }

  const handleToggleActive = (id: number) => {
    const updatedWebhooks = webhooks.map((webhook) =>
      webhook.id === id ? { ...webhook, active: !webhook.active } : webhook,
    )
    setWebhooks(updatedWebhooks)

    const webhook = updatedWebhooks.find((w) => w.id === id)
    if (webhook) {
      toast({
        title: webhook.active ? "Webhook activated" : "Webhook deactivated",
        description: `Webhook "${webhook.name}" has been ${webhook.active ? "activated" : "deactivated"}.`,
      })
    }
  }

  const handleTestWebhook = () => {
    if (!selectedWebhook) return

    // In a real app, this would send a test webhook to the endpoint
    const newLogId = Math.max(...webhookLogs.map((log) => log.id)) + 1

    // Simulate random success/failure
    const isSuccess = Math.random() > 0.2

    const newLog: WebhookLog = {
      id: newLogId,
      webhookId: selectedWebhook.id,
      webhookName: selectedWebhook.name,
      event: testEvent,
      url: selectedWebhook.url,
      status: isSuccess ? "success" : "failed",
      statusCode: isSuccess ? 200 : 500,
      requestPayload: testPayload,
      responseBody: isSuccess
        ? JSON.stringify({ success: true, message: "Test webhook received" }, null, 2)
        : undefined,
      error: isSuccess
        ? undefined
        : "Internal Server Error: The server encountered an unexpected condition that prevented it from fulfilling the request",
      createdAt: new Date().toISOString(),
      retries: 0,
      duration: Math.floor(Math.random() * 500) + 100,
    }

    setWebhookLogs([newLog, ...webhookLogs])
    setIsTestWebhookOpen(false)

    toast({
      title: isSuccess ? "Test webhook sent successfully" : "Test webhook failed",
      description: isSuccess
        ? `Test webhook for "${selectedWebhook.name}" was delivered successfully.`
        : `Test webhook for "${selectedWebhook.name}" failed. Check logs for details.`,
      variant: isSuccess ? "default" : "destructive",
      action: isSuccess ? undefined : <ToastAction altText="View Logs">View Logs</ToastAction>,
    })
  }

  const handleRetryWebhook = (logId: number) => {
    const logToRetry = webhookLogs.find((log) => log.id === logId)
    if (!logToRetry) return

    // In a real app, this would retry sending the webhook
    const newLogId = Math.max(...webhookLogs.map((log) => log.id)) + 1

    // Simulate random success/failure for the retry
    const isSuccess = Math.random() > 0.3

    const newLog: WebhookLog = {
      ...logToRetry,
      id: newLogId,
      status: isSuccess ? "success" : "failed",
      statusCode: isSuccess ? 200 : 500,
      responseBody: isSuccess
        ? JSON.stringify({ success: true, message: "Webhook received on retry" }, null, 2)
        : undefined,
      error: isSuccess
        ? undefined
        : "Internal Server Error: The server encountered an unexpected condition that prevented it from fulfilling the request",
      createdAt: new Date().toISOString(),
      retries: logToRetry.retries + 1,
      duration: Math.floor(Math.random() * 500) + 100,
    }

    setWebhookLogs([newLog, ...webhookLogs])

    toast({
      title: isSuccess ? "Webhook retry successful" : "Webhook retry failed",
      description: isSuccess
        ? `Retry for webhook "${logToRetry.webhookName}" was successful.`
        : `Retry for webhook "${logToRetry.webhookName}" failed. Check logs for details.`,
      variant: isSuccess ? "default" : "destructive",
    })
  }

  const generateWebhookSecret = () => {
    const chars = "abcdefghijklmnopqrstuvwxyz0123456789"
    let result = "whsec_"
    for (let i = 0; i < 32; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length))
    }
    return result
  }

  const handleGenerateSecret = () => {
    if (isEditWebhookOpen && selectedWebhook) {
      setSelectedWebhook({
        ...selectedWebhook,
        secret: generateWebhookSecret(),
      })
    } else {
      setNewWebhook({
        ...newWebhook,
        secret: generateWebhookSecret(),
      })
    }
  }

  const copyToClipboard = (text: string, message: string) => {
    navigator.clipboard.writeText(text).then(() => {
      toast({
        title: "Copied to clipboard",
        description: message,
      })
    })
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Webhooks</h1>
          <p className="text-muted-foreground">Manage webhook integrations for your loyalty program</p>
        </div>
        <Button onClick={() => setIsAddWebhookOpen(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Add Webhook
        </Button>
      </div>

      <Tabs defaultValue="webhooks" className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-4">
          <TabsTrigger value="webhooks">Webhooks</TabsTrigger>
          <TabsTrigger value="logs">Delivery Logs</TabsTrigger>
        </TabsList>

        <TabsContent value="webhooks">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>All Webhooks</CardTitle>
                  <CardDescription>A list of all webhook endpoints for your loyalty program</CardDescription>
                </div>
                <div className="relative w-64">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search webhooks..."
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
                    <TableHead>URL</TableHead>
                    <TableHead>Events</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Success Rate</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredWebhooks.map((webhook) => (
                    <TableRow key={webhook.id}>
                      <TableCell className="font-medium">{webhook.name}</TableCell>
                      <TableCell className="max-w-xs truncate">
                        <div className="flex items-center gap-1">
                          <LinkIcon className="h-3 w-3 text-muted-foreground" />
                          <span className="truncate">{webhook.url}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-wrap gap-1">
                          {webhook.events.length > 2 ? (
                            <>
                              <Badge variant="outline">{webhook.events[0]}</Badge>
                              <Badge variant="outline">{webhook.events[1]}</Badge>
                              <Badge variant="outline">+{webhook.events.length - 2} more</Badge>
                            </>
                          ) : (
                            webhook.events.map((event) => (
                              <Badge key={event} variant="outline">
                                {event}
                              </Badge>
                            ))
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant={webhook.active ? "default" : "secondary"}
                          className={
                            webhook.active ? "bg-green-100 text-green-800 hover:bg-green-100 hover:text-green-800" : ""
                          }
                        >
                          {webhook.active ? "Active" : "Inactive"}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <div
                            className={`w-2 h-2 rounded-full ${
                              webhook.successRate >= 90
                                ? "bg-green-500"
                                : webhook.successRate >= 75
                                  ? "bg-yellow-500"
                                  : "bg-red-500"
                            }`}
                          ></div>
                          <span>{webhook.successRate}%</span>
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
                                setSelectedWebhook(webhook)
                                setIsEditWebhookOpen(true)
                              }}
                            >
                              Edit
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleToggleActive(webhook.id)}>
                              {webhook.active ? "Deactivate" : "Activate"}
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() => {
                                setSelectedWebhook(webhook)
                                setTestEvent(webhook.events[0] || eventTypes[0].id)
                                setTestPayload(
                                  JSON.stringify(
                                    {
                                      event: webhook.events[0] || eventTypes[0].id,
                                      data: {
                                        id: 123,
                                        timestamp: new Date().toISOString(),
                                      },
                                    },
                                    null,
                                    2,
                                  ),
                                )
                                setIsTestWebhookOpen(true)
                              }}
                            >
                              Test Webhook
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="text-red-600" onClick={() => handleDeleteWebhook(webhook.id)}>
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                  {filteredWebhooks.length === 0 && (
                    <TableRow>
                      <TableCell colSpan={6} className="h-24 text-center">
                        No webhooks found.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="logs">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Webhook Delivery Logs</CardTitle>
                  <CardDescription>A history of webhook delivery attempts and their status</CardDescription>
                </div>
                <div className="relative w-64">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input placeholder="Search logs..." className="pl-8" />
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Webhook</TableHead>
                    <TableHead>Event</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Time</TableHead>
                    <TableHead>Duration</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {webhookLogs.map((log) => (
                    <TableRow key={log.id}>
                      <TableCell className="font-medium">{log.webhookName}</TableCell>
                      <TableCell>{log.event}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          {log.status === "success" ? (
                            <CheckCircle className="h-4 w-4 text-green-500" />
                          ) : log.status === "failed" ? (
                            <XCircle className="h-4 w-4 text-red-500" />
                          ) : log.status === "retrying" ? (
                            <RefreshCw className="h-4 w-4 text-yellow-500 animate-spin" />
                          ) : (
                            <AlertCircle className="h-4 w-4 text-yellow-500" />
                          )}
                          <span
                            className={
                              log.status === "success"
                                ? "text-green-600"
                                : log.status === "failed"
                                  ? "text-red-600"
                                  : "text-yellow-600"
                            }
                          >
                            {log.status.charAt(0).toUpperCase() + log.status.slice(1)}
                            {log.statusCode ? ` (${log.statusCode})` : ""}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell>{new Date(log.createdAt).toLocaleString()}</TableCell>
                      <TableCell>{log.duration}ms</TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => {
                              setSelectedLog(log)
                              setIsViewLogOpen(true)
                            }}
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                          {log.status === "failed" && (
                            <Button variant="ghost" size="icon" onClick={() => handleRetryWebhook(log.id)}>
                              <RefreshCw className="h-4 w-4" />
                            </Button>
                          )}
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

      {/* Add Webhook Dialog */}
      <Dialog open={isAddWebhookOpen} onOpenChange={setIsAddWebhookOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Add New Webhook</DialogTitle>
            <DialogDescription>Create a new webhook endpoint to receive event notifications</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Webhook Name</Label>
              <Input
                id="name"
                value={newWebhook.name}
                onChange={(e) => setNewWebhook({ ...newWebhook, name: e.target.value })}
                placeholder="e.g., CRM Integration"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="url">Endpoint URL</Label>
              <Input
                id="url"
                value={newWebhook.url}
                onChange={(e) => setNewWebhook({ ...newWebhook, url: e.target.value })}
                placeholder="https://example.com/webhooks"
              />
              <p className="text-xs text-muted-foreground">
                The URL that will receive webhook events via HTTP POST requests
              </p>
            </div>
            <div className="grid gap-2">
              <div className="flex justify-between items-center">
                <Label htmlFor="secret">Webhook Secret</Label>
                <Button variant="outline" size="sm" onClick={handleGenerateSecret} type="button">
                  Generate
                </Button>
              </div>
              <Input
                id="secret"
                value={newWebhook.secret}
                onChange={(e) => setNewWebhook({ ...newWebhook, secret: e.target.value })}
                placeholder="whsec_..."
              />
              <p className="text-xs text-muted-foreground">
                Used to sign webhook payloads so you can verify their authenticity
              </p>
            </div>
            <div className="grid gap-2">
              <Label>Events to Subscribe</Label>
              <div className="border rounded-md p-4 space-y-4">
                {eventTypes.map((event) => (
                  <div key={event.id} className="flex items-start space-x-2">
                    <Checkbox
                      id={`event-${event.id}`}
                      checked={newWebhook.events.includes(event.id)}
                      onCheckedChange={(checked) => {
                        if (checked) {
                          setNewWebhook({
                            ...newWebhook,
                            events: [...newWebhook.events, event.id],
                          })
                        } else {
                          setNewWebhook({
                            ...newWebhook,
                            events: newWebhook.events.filter((e) => e !== event.id),
                          })
                        }
                      }}
                    />
                    <div className="grid gap-1.5 leading-none">
                      <label
                        htmlFor={`event-${event.id}`}
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        {event.name}
                      </label>
                      <p className="text-xs text-muted-foreground">{event.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Switch
                id="active"
                checked={newWebhook.active}
                onCheckedChange={(checked) => setNewWebhook({ ...newWebhook, active: checked })}
              />
              <Label htmlFor="active">Active</Label>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddWebhookOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleAddWebhook}>Add Webhook</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Webhook Dialog */}
      <Dialog open={isEditWebhookOpen} onOpenChange={setIsEditWebhookOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Edit Webhook</DialogTitle>
            <DialogDescription>Update webhook configuration</DialogDescription>
          </DialogHeader>
          {selectedWebhook && (
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="edit-name">Webhook Name</Label>
                <Input
                  id="edit-name"
                  value={selectedWebhook.name}
                  onChange={(e) => setSelectedWebhook({ ...selectedWebhook, name: e.target.value })}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="edit-url">Endpoint URL</Label>
                <Input
                  id="edit-url"
                  value={selectedWebhook.url}
                  onChange={(e) => setSelectedWebhook({ ...selectedWebhook, url: e.target.value })}
                />
              </div>
              <div className="grid gap-2">
                <div className="flex justify-between items-center">
                  <Label htmlFor="edit-secret">Webhook Secret</Label>
                  <Button variant="outline" size="sm" onClick={handleGenerateSecret} type="button">
                    Regenerate
                  </Button>
                </div>
                <div className="flex gap-2">
                  <Input
                    id="edit-secret"
                    value={selectedWebhook.secret}
                    onChange={(e) => setSelectedWebhook({ ...selectedWebhook, secret: e.target.value })}
                    type="password"
                  />
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => copyToClipboard(selectedWebhook.secret, "Secret copied to clipboard")}
                    type="button"
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
                <p className="text-xs text-muted-foreground">
                  Regenerating the secret will invalidate the previous one
                </p>
              </div>
              <div className="grid gap-2">
                <Label>Events to Subscribe</Label>
                <div className="border rounded-md p-4 space-y-4">
                  {eventTypes.map((event) => (
                    <div key={event.id} className="flex items-start space-x-2">
                      <Checkbox
                        id={`edit-event-${event.id}`}
                        checked={selectedWebhook.events.includes(event.id)}
                        onCheckedChange={(checked) => {
                          if (checked) {
                            setSelectedWebhook({
                              ...selectedWebhook,
                              events: [...selectedWebhook.events, event.id],
                            })
                          } else {
                            setSelectedWebhook({
                              ...selectedWebhook,
                              events: selectedWebhook.events.filter((e) => e !== event.id),
                            })
                          }
                        }}
                      />
                      <div className="grid gap-1.5 leading-none">
                        <label
                          htmlFor={`edit-event-${event.id}`}
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          {event.name}
                        </label>
                        <p className="text-xs text-muted-foreground">{event.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Switch
                  id="edit-active"
                  checked={selectedWebhook.active}
                  onCheckedChange={(checked) => setSelectedWebhook({ ...selectedWebhook, active: checked })}
                />
                <Label htmlFor="edit-active">Active</Label>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditWebhookOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleEditWebhook}>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* View Log Dialog */}
      <Dialog open={isViewLogOpen} onOpenChange={setIsViewLogOpen}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle>Webhook Log Details</DialogTitle>
            <DialogDescription>
              {selectedLog && (
                <div className="flex items-center gap-2 mt-1">
                  <span className="font-medium">{selectedLog.webhookName}</span>
                  <span>•</span>
                  <span>{selectedLog.event}</span>
                  <span>•</span>
                  <span>{new Date(selectedLog.createdAt).toLocaleString()}</span>
                </div>
              )}
            </DialogDescription>
          </DialogHeader>
          {selectedLog && (
            <div className="grid gap-4 py-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  {selectedLog.status === "success" ? (
                    <CheckCircle className="h-5 w-5 text-green-500" />
                  ) : selectedLog.status === "failed" ? (
                    <XCircle className="h-5 w-5 text-red-500" />
                  ) : selectedLog.status === "retrying" ? (
                    <RefreshCw className="h-5 w-5 text-yellow-500 animate-spin" />
                  ) : (
                    <AlertCircle className="h-5 w-5 text-yellow-500" />
                  )}
                  <span
                    className={`text-lg font-medium ${
                      selectedLog.status === "success"
                        ? "text-green-600"
                        : selectedLog.status === "failed"
                          ? "text-red-600"
                          : "text-yellow-600"
                    }`}
                  >
                    {selectedLog.status.charAt(0).toUpperCase() + selectedLog.status.slice(1)}
                    {selectedLog.statusCode ? ` (${selectedLog.statusCode})` : ""}
                  </span>
                </div>
                <div className="text-sm text-muted-foreground">
                  Duration: {selectedLog.duration}ms
                  {selectedLog.retries > 0 && ` • Retries: ${selectedLog.retries}`}
                </div>
              </div>

              <div className="grid gap-2">
                <Label>Request URL</Label>
                <div className="flex items-center gap-2 bg-muted p-2 rounded-md">
                  <LinkIcon className="h-4 w-4 text-muted-foreground" />
                  <code className="text-sm flex-1">{selectedLog.url}</code>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => copyToClipboard(selectedLog.url, "URL copied to clipboard")}
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label>Request Payload</Label>
                  <div className="relative">
                    <pre className="bg-muted p-4 rounded-md text-xs overflow-auto max-h-80">
                      <code>{selectedLog.requestPayload}</code>
                    </pre>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="absolute top-2 right-2"
                      onClick={() => copyToClipboard(selectedLog.requestPayload, "Request payload copied to clipboard")}
                    >
                      <Copy className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <div className="grid gap-2">
                  <Label>{selectedLog.status === "success" ? "Response Body" : "Error Details"}</Label>
                  <div className="relative">
                    <pre className="bg-muted p-4 rounded-md text-xs overflow-auto max-h-80">
                      <code>
                        {selectedLog.status === "success"
                          ? selectedLog.responseBody
                          : selectedLog.error || "No error details available"}
                      </code>
                    </pre>
                    {selectedLog.status === "success" && selectedLog.responseBody && (
                      <Button
                        variant="ghost"
                        size="icon"
                        className="absolute top-2 right-2"
                        onClick={() =>
                          copyToClipboard(selectedLog.responseBody || "", "Response body copied to clipboard")
                        }
                      >
                        <Copy className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                </div>
              </div>

              {selectedLog.status === "failed" && (
                <div className="flex justify-end">
                  <Button onClick={() => handleRetryWebhook(selectedLog.id)}>
                    <RefreshCw className="mr-2 h-4 w-4" />
                    Retry Webhook
                  </Button>
                </div>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Test Webhook Dialog */}
      <Dialog open={isTestWebhookOpen} onOpenChange={setIsTestWebhookOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Test Webhook</DialogTitle>
            <DialogDescription>
              {selectedWebhook && (
                <span>
                  Send a test event to {selectedWebhook.name} ({selectedWebhook.url})
                </span>
              )}
            </DialogDescription>
          </DialogHeader>
          {selectedWebhook && (
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="test-event">Event Type</Label>
                <select
                  id="test-event"
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  value={testEvent}
                  onChange={(e) => {
                    setTestEvent(e.target.value)
                    // Update payload template based on selected event
                    const eventData = {
                      "user.created": {
                        id: 123,
                        name: "John Doe",
                        email: "john@example.com",
                        createdAt: new Date().toISOString(),
                      },
                      "user.updated": {
                        id: 123,
                        name: "John Doe",
                        email: "john@example.com",
                        updatedAt: new Date().toISOString(),
                      },
                      "transaction.created": {
                        id: 456,
                        userId: 123,
                        amount: 50,
                        points: 50,
                        type: "earned",
                        timestamp: new Date().toISOString(),
                      },
                      "points.earned": {
                        userId: 123,
                        points: 50,
                        reason: "Purchase",
                        transactionId: 456,
                        timestamp: new Date().toISOString(),
                      },
                      "points.redeemed": {
                        userId: 123,
                        points: 250,
                        reason: "Reward redemption",
                        rewardId: 789,
                        timestamp: new Date().toISOString(),
                      },
                      "tier.changed": {
                        userId: 123,
                        previousTier: "Bronze",
                        newTier: "Silver",
                        timestamp: new Date().toISOString(),
                      },
                      "campaign.joined": {
                        userId: 123,
                        campaignId: 789,
                        campaignName: "Summer Promotion",
                        timestamp: new Date().toISOString(),
                      },
                      "campaign.completed": {
                        userId: 123,
                        campaignId: 789,
                        campaignName: "Summer Promotion",
                        pointsEarned: 300,
                        timestamp: new Date().toISOString(),
                      },
                      "reward.redeemed": {
                        userId: 123,
                        rewardId: 789,
                        rewardName: "$10 Gift Card",
                        pointsSpent: 500,
                        timestamp: new Date().toISOString(),
                      },
                    }

                    setTestPayload(
                      JSON.stringify(
                        {
                          event: e.target.value,
                          data: eventData[e.target.value as keyof typeof eventData] || {
                            id: 123,
                            timestamp: new Date().toISOString(),
                          },
                        },
                        null,
                        2,
                      ),
                    )
                  }}
                >
                  {eventTypes.map((event) => (
                    <option key={event.id} value={event.id}>
                      {event.name} ({event.id})
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid gap-2">
                <div className="flex justify-between items-center">
                  <Label htmlFor="test-payload">Payload</Label>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      // Reset to default payload for the selected event
                      const eventData = {
                        id: 123,
                        timestamp: new Date().toISOString(),
                      }

                      setTestPayload(
                        JSON.stringify(
                          {
                            event: testEvent,
                            data: eventData,
                          },
                          null,
                          2,
                        ),
                      )
                    }}
                  >
                    Reset
                  </Button>
                </div>
                <div className="relative">
                  <Textarea
                    id="test-payload"
                    value={testPayload}
                    onChange={(e) => setTestPayload(e.target.value)}
                    className="font-mono text-sm h-80"
                  />
                  <div className="absolute top-2 right-2 flex gap-1">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => {
                        try {
                          const formatted = JSON.stringify(JSON.parse(testPayload), null, 2)
                          setTestPayload(formatted)
                          toast({
                            title: "JSON formatted",
                            description: "The payload has been formatted.",
                          })
                        } catch (e) {
                          toast({
                            title: "Invalid JSON",
                            description: "The payload contains invalid JSON.",
                            variant: "destructive",
                          })
                        }
                      }}
                    >
                      <Code className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <p className="text-xs text-muted-foreground">
                  Edit the payload to test different scenarios. The payload must be valid JSON.
                </p>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsTestWebhookOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleTestWebhook}>
              <Play className="mr-2 h-4 w-4" />
              Send Test Webhook
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

