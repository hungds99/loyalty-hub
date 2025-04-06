"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Copy, Key, Plus, RefreshCw, Trash2, Lock, Globe, Code } from "lucide-react"
import { toast } from "@/components/ui/use-toast"

interface ApiKey {
  id: string
  name: string
  key: string
  environment: "test" | "production"
  createdAt: Date
  lastUsed: Date | null
  active: boolean
}

interface Webhook {
  id: string
  url: string
  events: string[]
  active: boolean
  createdAt: Date
  secret: string
}

export default function DeveloperPage() {
  const [apiKeys, setApiKeys] = useState<ApiKey[]>([
    {
      id: "key_1",
      name: "Test API Key",
      key: "sk_test_abc123def456...",
      environment: "test",
      createdAt: new Date("2023-04-01"),
      lastUsed: new Date("2023-04-28"),
      active: true,
    },
    {
      id: "key_2",
      name: "Production API Key",
      key: "sk_live_xyz789uvw...",
      environment: "production",
      createdAt: new Date("2023-04-15"),
      lastUsed: null,
      active: false,
    },
  ])

  const [webhooks, setWebhooks] = useState<Webhook[]>([
    {
      id: "wh_1",
      url: "https://example.com/webhooks/loyalty",
      events: ["points.earned", "points.redeemed", "tier.changed"],
      active: true,
      createdAt: new Date("2023-04-10"),
      secret: "whsec_123456789...",
    },
  ])

  const [isAddKeyOpen, setIsAddKeyOpen] = useState(false)
  const [isAddWebhookOpen, setIsAddWebhookOpen] = useState(false)
  const [newKey, setNewKey] = useState({
    name: "",
    environment: "test" as "test" | "production",
  })
  const [newWebhook, setNewWebhook] = useState({
    url: "",
    events: [] as string[],
    active: true,
  })
  const [showSecrets, setShowSecrets] = useState<Record<string, boolean>>({})

  const toggleShowSecret = (id: string) => {
    setShowSecrets({
      ...showSecrets,
      [id]: !showSecrets[id],
    })
  }

  const copyToClipboard = (text: string, message: string) => {
    navigator.clipboard.writeText(text)
    toast({
      title: "Copied to clipboard",
      description: message,
    })
  }

  const handleAddKey = () => {
    const newApiKey: ApiKey = {
      id: `key_${apiKeys.length + 1}`,
      name: newKey.name,
      key:
        newKey.environment === "test"
          ? `sk_test_${Math.random().toString(36).substring(2, 15)}...`
          : `sk_live_${Math.random().toString(36).substring(2, 15)}...`,
      environment: newKey.environment,
      createdAt: new Date(),
      lastUsed: null,
      active: true,
    }

    setApiKeys([...apiKeys, newApiKey])
    setNewKey({
      name: "",
      environment: "test",
    })
    setIsAddKeyOpen(false)

    toast({
      title: "API key created",
      description: `Your new ${newKey.environment} API key has been created.`,
    })
  }

  const handleAddWebhook = () => {
    const newWebhookObj: Webhook = {
      id: `wh_${webhooks.length + 1}`,
      url: newWebhook.url,
      events: newWebhook.events,
      active: newWebhook.active,
      createdAt: new Date(),
      secret: `whsec_${Math.random().toString(36).substring(2, 15)}...`,
    }

    setWebhooks([...webhooks, newWebhookObj])
    setNewWebhook({
      url: "",
      events: [],
      active: true,
    })
    setIsAddWebhookOpen(false)

    toast({
      title: "Webhook endpoint created",
      description: "Your new webhook endpoint has been created.",
    })
  }

  const toggleKeyActive = (id: string) => {
    setApiKeys(apiKeys.map((key) => (key.id === id ? { ...key, active: !key.active } : key)))
  }

  const toggleWebhookActive = (id: string) => {
    setWebhooks(webhooks.map((webhook) => (webhook.id === id ? { ...webhook, active: !webhook.active } : webhook)))
  }

  const deleteKey = (id: string) => {
    setApiKeys(apiKeys.filter((key) => key.id !== id))

    toast({
      title: "API key deleted",
      description: "The API key has been permanently deleted.",
    })
  }

  const deleteWebhook = (id: string) => {
    setWebhooks(webhooks.filter((webhook) => webhook.id !== id))

    toast({
      title: "Webhook endpoint deleted",
      description: "The webhook endpoint has been permanently deleted.",
    })
  }

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Developer Settings</h1>
        <p className="text-muted-foreground">Manage API keys and webhook endpoints for your loyalty program</p>
      </div>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>API Keys</CardTitle>
            <CardDescription>Manage API keys for accessing your loyalty program</CardDescription>
          </div>
          <Button onClick={() => setIsAddKeyOpen(true)}>
            <Plus className="mr-2 h-4 w-4" />
            Create API Key
          </Button>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Key</TableHead>
                <TableHead>Environment</TableHead>
                <TableHead>Created</TableHead>
                <TableHead>Last Used</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {apiKeys.map((apiKey) => (
                <TableRow key={apiKey.id}>
                  <TableCell className="font-medium">{apiKey.name}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <code className="text-xs bg-muted px-1 py-0.5 rounded">
                        {showSecrets[apiKey.id] ? apiKey.key : apiKey.key.substring(0, 10) + "•••••••••••"}
                      </code>
                      <Button variant="ghost" size="icon" onClick={() => toggleShowSecret(apiKey.id)}>
                        <Lock className="h-3.5 w-3.5" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => copyToClipboard(apiKey.key, "API key copied to clipboard")}
                      >
                        <Copy className="h-3.5 w-3.5" />
                      </Button>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={apiKey.environment === "production" ? "default" : "secondary"}
                      className={apiKey.environment === "production" ? "bg-amber-100 text-amber-800" : ""}
                    >
                      {apiKey.environment}
                    </Badge>
                  </TableCell>
                  <TableCell>{apiKey.createdAt.toLocaleDateString()}</TableCell>
                  <TableCell>{apiKey.lastUsed ? apiKey.lastUsed.toLocaleDateString() : "Never"}</TableCell>
                  <TableCell>
                    <Switch checked={apiKey.active} onCheckedChange={() => toggleKeyActive(apiKey.id)} />
                  </TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="icon" onClick={() => deleteKey(apiKey.id)}>
                      <Trash2 className="h-4 w-4 text-red-500" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
              {apiKeys.length === 0 && (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-6 text-muted-foreground">
                    No API keys found. Create your first API key to get started.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Webhook Endpoints</CardTitle>
            <CardDescription>Receive real-time notifications about events in your loyalty program</CardDescription>
          </div>
          <Button onClick={() => setIsAddWebhookOpen(true)}>
            <Plus className="mr-2 h-4 w-4" />
            Add Webhook
          </Button>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>URL</TableHead>
                <TableHead>Events</TableHead>
                <TableHead>Secret</TableHead>
                <TableHead>Created</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {webhooks.map((webhook) => (
                <TableRow key={webhook.id}>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Globe className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm truncate max-w-[200px]">{webhook.url}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-wrap gap-1">
                      {webhook.events.map((event) => (
                        <Badge key={event} variant="outline">
                          {event}
                        </Badge>
                      ))}
                      {webhook.events.length === 0 && <span className="text-sm text-muted-foreground">All events</span>}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <code className="text-xs bg-muted px-1 py-0.5 rounded">
                        {showSecrets[webhook.id] ? webhook.secret : webhook.secret.substring(0, 10) + "•••••••••••"}
                      </code>
                      <Button variant="ghost" size="icon" onClick={() => toggleShowSecret(webhook.id)}>
                        <Lock className="h-3.5 w-3.5" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => copyToClipboard(webhook.secret, "Webhook secret copied to clipboard")}
                      >
                        <Copy className="h-3.5 w-3.5" />
                      </Button>
                    </div>
                  </TableCell>
                  <TableCell>{webhook.createdAt.toLocaleDateString()}</TableCell>
                  <TableCell>
                    <Switch checked={webhook.active} onCheckedChange={() => toggleWebhookActive(webhook.id)} />
                  </TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="icon" onClick={() => deleteWebhook(webhook.id)}>
                      <Trash2 className="h-4 w-4 text-red-500" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
              {webhooks.length === 0 && (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-6 text-muted-foreground">
                    No webhook endpoints found. Add your first webhook to receive real-time notifications.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
        <CardFooter>
          <div className="text-sm text-muted-foreground">
            <p>
              Learn more about webhooks in our{" "}
              <a href="/api-docs" className="text-primary underline">
                API documentation
              </a>
              .
            </p>
          </div>
        </CardFooter>
      </Card>

      {/* Create API Key Dialog */}
      <Dialog open={isAddKeyOpen} onOpenChange={setIsAddKeyOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create API Key</DialogTitle>
            <DialogDescription>Create a new API key for accessing your loyalty program</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="key-name">Key Name</Label>
              <Input
                id="key-name"
                placeholder="e.g., Website Integration"
                value={newKey.name}
                onChange={(e) => setNewKey({ ...newKey, name: e.target.value })}
              />
              <p className="text-xs text-muted-foreground">
                Give your key a descriptive name to remember what it's used for
              </p>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="key-environment">Environment</Label>
              <div className="flex gap-4">
                <div className="flex items-center gap-2">
                  <input
                    type="radio"
                    id="env-test"
                    name="environment"
                    value="test"
                    checked={newKey.environment === "test"}
                    onChange={() => setNewKey({ ...newKey, environment: "test" })}
                    className="h-4 w-4 text-primary"
                  />
                  <Label htmlFor="env-test" className="font-normal">
                    Test
                  </Label>
                </div>
                <div className="flex items-center gap-2">
                  <input
                    type="radio"
                    id="env-production"
                    name="environment"
                    value="production"
                    checked={newKey.environment === "production"}
                    onChange={() => setNewKey({ ...newKey, environment: "production" })}
                    className="h-4 w-4 text-primary"
                  />
                  <Label htmlFor="env-production" className="font-normal">
                    Production
                  </Label>
                </div>
              </div>
              <p className="text-xs text-muted-foreground">
                Test keys can only be used in development. Production keys can be used in live environments.
              </p>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddKeyOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleAddKey}>Create Key</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Add Webhook Dialog */}
      <Dialog open={isAddWebhookOpen} onOpenChange={setIsAddWebhookOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Webhook Endpoint</DialogTitle>
            <DialogDescription>Create a new webhook endpoint to receive real-time notifications</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="webhook-url">Endpoint URL</Label>
              <Input
                id="webhook-url"
                placeholder="https://example.com/webhooks/loyalty"
                value={newWebhook.url}
                onChange={(e) => setNewWebhook({ ...newWebhook, url: e.target.value })}
              />
              <p className="text-xs text-muted-foreground">
                The URL that will receive webhook events via HTTP POST requests
              </p>
            </div>
            <div className="grid gap-2">
              <Label>Events to Subscribe</Label>
              <div className="border rounded-md p-4 space-y-2">
                {[
                  { id: "user.created", name: "User Created" },
                  { id: "user.updated", name: "User Updated" },
                  { id: "transaction.created", name: "Transaction Created" },
                  { id: "points.earned", name: "Points Earned" },
                  { id: "points.redeemed", name: "Points Redeemed" },
                  { id: "tier.changed", name: "Tier Changed" },
                ].map((event) => (
                  <div key={event.id} className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      id={`event-${event.id}`}
                      checked={newWebhook.events.includes(event.id)}
                      onChange={(e) => {
                        if (e.target.checked) {
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
                      className="h-4 w-4"
                    />
                    <Label htmlFor={`event-${event.id}`} className="font-normal text-sm">
                      {event.name}
                    </Label>
                  </div>
                ))}
              </div>
              <p className="text-xs text-muted-foreground">Leave all unchecked to subscribe to all events</p>
            </div>
            <div className="flex items-center gap-2">
              <Switch
                id="webhook-active"
                checked={newWebhook.active}
                onCheckedChange={(checked) => setNewWebhook({ ...newWebhook, active: checked })}
              />
              <Label htmlFor="webhook-active">Active</Label>
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

      <Card>
        <CardHeader>
          <CardTitle>API Documentation</CardTitle>
          <CardDescription>Learn how to integrate with our loyalty program API</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-start gap-4">
            <div className="bg-primary/10 p-3 rounded-md">
              <Code className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h3 className="font-medium">API Reference</h3>
              <p className="text-sm text-muted-foreground mb-2">
                Comprehensive documentation for all API endpoints, including request and response formats.
              </p>
              <Button variant="outline" asChild>
                <a href="/api-docs">View API Reference</a>
              </Button>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="bg-primary/10 p-3 rounded-md">
              <RefreshCw className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h3 className="font-medium">Webhook Guide</h3>
              <p className="text-sm text-muted-foreground mb-2">
                Learn how to receive and process webhook events from our loyalty program.
              </p>
              <Button variant="outline" asChild>
                <a href="/api-docs#webhooks">View Webhook Guide</a>
              </Button>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="bg-primary/10 p-3 rounded-md">
              <Key className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h3 className="font-medium">Authentication</h3>
              <p className="text-sm text-muted-foreground mb-2">
                Learn how to authenticate your API requests using API keys.
              </p>
              <Button variant="outline" asChild>
                <a href="/api-docs#authentication">View Authentication Guide</a>
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

