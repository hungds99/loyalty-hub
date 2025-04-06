"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Copy, Code, FileJson, Key, Lock } from "lucide-react"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { toast } from "@/components/ui/use-toast"

export default function ApiDocsPage() {
  const [apiKey, setApiKey] = useState("sk_test_abc123def456...")
  const [showApiKey, setShowApiKey] = useState(false)

  const copyToClipboard = (text: string, message: string) => {
    navigator.clipboard.writeText(text)
    toast({
      title: "Copied to clipboard",
      description: message,
    })
  }

  return (
    <div className="container py-8 max-w-5xl">
      <div className="flex flex-col gap-2 mb-8">
        <h1 className="text-3xl font-bold">API Documentation</h1>
        <p className="text-muted-foreground">Integrate your applications with our loyalty program API</p>
      </div>

      <div className="grid gap-6 md:grid-cols-[250px_1fr]">
        <div className="space-y-4">
          <div className="font-medium">Getting Started</div>
          <nav className="flex flex-col space-y-1">
            <Button variant="ghost" className="justify-start">
              Introduction
            </Button>
            <Button variant="ghost" className="justify-start">
              Authentication
            </Button>
            <Button variant="ghost" className="justify-start">
              Rate Limits
            </Button>
            <Button variant="ghost" className="justify-start">
              Errors
            </Button>
            <Button variant="ghost" className="justify-start">
              Webhooks
            </Button>
          </nav>

          <div className="font-medium">Resources</div>
          <nav className="flex flex-col space-y-1">
            <Button variant="ghost" className="justify-start">
              Users
            </Button>
            <Button variant="ghost" className="justify-start">
              Transactions
            </Button>
            <Button variant="ghost" className="justify-start">
              Campaigns
            </Button>
            <Button variant="ghost" className="justify-start">
              Rewards
            </Button>
            <Button variant="ghost" className="justify-start">
              Tiers
            </Button>
          </nav>

          <div className="font-medium">Guides</div>
          <nav className="flex flex-col space-y-1">
            <Button variant="ghost" className="justify-start">
              E-commerce Integration
            </Button>
            <Button variant="ghost" className="justify-start">
              POS Integration
            </Button>
            <Button variant="ghost" className="justify-start">
              Mobile App Integration
            </Button>
          </nav>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Introduction</CardTitle>
              <CardDescription>
                Welcome to the RewardHub API. This API allows you to integrate loyalty features into your applications.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>
                The RewardHub API is organized around REST. Our API has predictable resource-oriented URLs, accepts
                JSON-encoded request bodies, returns JSON-encoded responses, and uses standard HTTP response codes,
                authentication, and verbs.
              </p>

              <div className="bg-muted p-4 rounded-md">
                <div className="flex justify-between items-center mb-2">
                  <div className="font-medium">Base URL</div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => copyToClipboard("https://api.rewardhub.com/v1", "Base URL copied to clipboard")}
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
                <code className="text-sm">https://api.rewardhub.com/v1</code>
              </div>

              <div className="bg-muted p-4 rounded-md">
                <div className="flex justify-between items-center mb-2">
                  <div className="font-medium">Your API Key</div>
                  <div className="flex gap-2">
                    <Button variant="ghost" size="sm" onClick={() => setShowApiKey(!showApiKey)}>
                      {showApiKey ? <Lock className="h-4 w-4" /> : <Key className="h-4 w-4" />}
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => copyToClipboard(apiKey, "API key copied to clipboard")}
                    >
                      <Copy className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <code className="text-sm">{showApiKey ? apiKey : "sk_test_•••••••••••••••••••••••••"}</code>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Authentication</CardTitle>
              <CardDescription>Authenticate your API requests using API keys</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>
                Authentication to the API is performed via HTTP Bearer Authentication. Provide your API key as the
                bearer token in the Authorization header.
              </p>

              <div className="bg-muted p-4 rounded-md">
                <div className="flex justify-between items-center mb-2">
                  <div className="font-medium">Example Request</div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() =>
                      copyToClipboard(
                        'curl -X GET "https://api.rewardhub.com/v1/users" \\\n  -H "Authorization: Bearer sk_test_abc123def456..."',
                        "Example copied to clipboard",
                      )
                    }
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
                <pre className="text-sm overflow-x-auto">
                  <code>
                    curl -X GET "https://api.rewardhub.com/v1/users" \<br />
                    {"  "}-H "Authorization: Bearer sk_test_abc123def456..."
                  </code>
                </pre>
              </div>

              <div className="bg-amber-50 border border-amber-200 p-4 rounded-md">
                <div className="flex items-start gap-2">
                  <Lock className="h-5 w-5 text-amber-600 mt-0.5" />
                  <div>
                    <p className="font-medium text-amber-800">Keep your API keys secure</p>
                    <p className="text-sm text-amber-700 mt-1">
                      Your API keys carry many privileges, so be sure to keep them secure. Do not share your API keys in
                      publicly accessible areas such as GitHub, client-side code, or in your frontend application.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Users API</CardTitle>
              <CardDescription>Manage users in your loyalty program</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Tabs defaultValue="endpoints">
                <TabsList className="mb-4">
                  <TabsTrigger value="endpoints">Endpoints</TabsTrigger>
                  <TabsTrigger value="examples">Examples</TabsTrigger>
                  <TabsTrigger value="models">Models</TabsTrigger>
                </TabsList>

                <TabsContent value="endpoints">
                  <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="get-users">
                      <AccordionTrigger>
                        <div className="flex items-center gap-2">
                          <Badge className="bg-blue-100 text-blue-800">GET</Badge>
                          <span>/users</span>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent>
                        <div className="space-y-4">
                          <p>Returns a list of users in your loyalty program.</p>

                          <div>
                            <h4 className="font-medium mb-2">Query Parameters</h4>
                            <table className="w-full text-sm">
                              <thead>
                                <tr className="border-b">
                                  <th className="text-left py-2">Parameter</th>
                                  <th className="text-left py-2">Type</th>
                                  <th className="text-left py-2">Description</th>
                                </tr>
                              </thead>
                              <tbody>
                                <tr className="border-b">
                                  <td className="py-2">limit</td>
                                  <td className="py-2">integer</td>
                                  <td className="py-2">Maximum number of users to return (default: 20, max: 100)</td>
                                </tr>
                                <tr className="border-b">
                                  <td className="py-2">offset</td>
                                  <td className="py-2">integer</td>
                                  <td className="py-2">Number of users to skip (default: 0)</td>
                                </tr>
                                <tr className="border-b">
                                  <td className="py-2">email</td>
                                  <td className="py-2">string</td>
                                  <td className="py-2">Filter by email (exact match)</td>
                                </tr>
                              </tbody>
                            </table>
                          </div>

                          <div className="bg-muted p-4 rounded-md">
                            <div className="flex justify-between items-center mb-2">
                              <div className="font-medium">Example Response</div>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() =>
                                  copyToClipboard(
                                    JSON.stringify(
                                      {
                                        data: [
                                          {
                                            id: 1,
                                            name: "John Doe",
                                            email: "john@example.com",
                                            points: 750,
                                            tier: "Bronze",
                                            joinDate: "2023-01-15",
                                          },
                                        ],
                                        meta: {
                                          total: 1,
                                          limit: 20,
                                          offset: 0,
                                        },
                                      },
                                      null,
                                      2,
                                    ),
                                    "Response copied to clipboard",
                                  )
                                }
                              >
                                <Copy className="h-4 w-4" />
                              </Button>
                            </div>
                            <pre className="text-sm overflow-x-auto">
                              <code>
                                {JSON.stringify(
                                  {
                                    data: [
                                      {
                                        id: 1,
                                        name: "John Doe",
                                        email: "john@example.com",
                                        points: 750,
                                        tier: "Bronze",
                                        joinDate: "2023-01-15",
                                      },
                                    ],
                                    meta: {
                                      total: 1,
                                      limit: 20,
                                      offset: 0,
                                    },
                                  },
                                  null,
                                  2,
                                )}
                              </code>
                            </pre>
                          </div>
                        </div>
                      </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="get-user">
                      <AccordionTrigger>
                        <div className="flex items-center gap-2">
                          <Badge className="bg-blue-100 text-blue-800">GET</Badge>
                          <span>/users/:id</span>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent>
                        <div className="space-y-4">
                          <p>Returns a specific user by ID.</p>

                          <div>
                            <h4 className="font-medium mb-2">Path Parameters</h4>
                            <table className="w-full text-sm">
                              <thead>
                                <tr className="border-b">
                                  <th className="text-left py-2">Parameter</th>
                                  <th className="text-left py-2">Type</th>
                                  <th className="text-left py-2">Description</th>
                                </tr>
                              </thead>
                              <tbody>
                                <tr className="border-b">
                                  <td className="py-2">id</td>
                                  <td className="py-2">integer</td>
                                  <td className="py-2">The ID of the user to retrieve</td>
                                </tr>
                              </tbody>
                            </table>
                          </div>

                          <div className="bg-muted p-4 rounded-md">
                            <div className="flex justify-between items-center mb-2">
                              <div className="font-medium">Example Response</div>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() =>
                                  copyToClipboard(
                                    JSON.stringify(
                                      {
                                        id: 1,
                                        name: "John Doe",
                                        email: "john@example.com",
                                        points: 750,
                                        tier: "Bronze",
                                        joinDate: "2023-01-15",
                                        transactions: [
                                          {
                                            id: 1,
                                            date: "2023-04-01",
                                            description: "Purchase at Store #123",
                                            points: 50,
                                            type: "earned",
                                          },
                                        ],
                                      },
                                      null,
                                      2,
                                    ),
                                    "Response copied to clipboard",
                                  )
                                }
                              >
                                <Copy className="h-4 w-4" />
                              </Button>
                            </div>
                            <pre className="text-sm overflow-x-auto">
                              <code>
                                {JSON.stringify(
                                  {
                                    id: 1,
                                    name: "John Doe",
                                    email: "john@example.com",
                                    points: 750,
                                    tier: "Bronze",
                                    joinDate: "2023-01-15",
                                    transactions: [
                                      {
                                        id: 1,
                                        date: "2023-04-01",
                                        description: "Purchase at Store #123",
                                        points: 50,
                                        type: "earned",
                                      },
                                    ],
                                  },
                                  null,
                                  2,
                                )}
                              </code>
                            </pre>
                          </div>
                        </div>
                      </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="post-user">
                      <AccordionTrigger>
                        <div className="flex items-center gap-2">
                          <Badge className="bg-green-100 text-green-800">POST</Badge>
                          <span>/users</span>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent>
                        <div className="space-y-4">
                          <p>Creates a new user in your loyalty program.</p>

                          <div>
                            <h4 className="font-medium mb-2">Request Body</h4>
                            <table className="w-full text-sm">
                              <thead>
                                <tr className="border-b">
                                  <th className="text-left py-2">Parameter</th>
                                  <th className="text-left py-2">Type</th>
                                  <th className="text-left py-2">Required</th>
                                  <th className="text-left py-2">Description</th>
                                </tr>
                              </thead>
                              <tbody>
                                <tr className="border-b">
                                  <td className="py-2">name</td>
                                  <td className="py-2">string</td>
                                  <td className="py-2">Yes</td>
                                  <td className="py-2">The user's full name</td>
                                </tr>
                                <tr className="border-b">
                                  <td className="py-2">email</td>
                                  <td className="py-2">string</td>
                                  <td className="py-2">Yes</td>
                                  <td className="py-2">The user's email address</td>
                                </tr>
                                <tr className="border-b">
                                  <td className="py-2">points</td>
                                  <td className="py-2">integer</td>
                                  <td className="py-2">No</td>
                                  <td className="py-2">Initial points balance (default: 0)</td>
                                </tr>
                              </tbody>
                            </table>
                          </div>

                          <div className="bg-muted p-4 rounded-md">
                            <div className="flex justify-between items-center mb-2">
                              <div className="font-medium">Example Request</div>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() =>
                                  copyToClipboard(
                                    JSON.stringify(
                                      {
                                        name: "Jane Smith",
                                        email: "jane@example.com",
                                        points: 100,
                                      },
                                      null,
                                      2,
                                    ),
                                    "Request copied to clipboard",
                                  )
                                }
                              >
                                <Copy className="h-4 w-4" />
                              </Button>
                            </div>
                            <pre className="text-sm overflow-x-auto">
                              <code>
                                {JSON.stringify(
                                  {
                                    name: "Jane Smith",
                                    email: "jane@example.com",
                                    points: 100,
                                  },
                                  null,
                                  2,
                                )}
                              </code>
                            </pre>
                          </div>

                          <div className="bg-muted p-4 rounded-md">
                            <div className="flex justify-between items-center mb-2">
                              <div className="font-medium">Example Response</div>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() =>
                                  copyToClipboard(
                                    JSON.stringify(
                                      {
                                        id: 2,
                                        name: "Jane Smith",
                                        email: "jane@example.com",
                                        points: 100,
                                        tier: "Bronze",
                                        joinDate: "2023-05-01",
                                      },
                                      null,
                                      2,
                                    ),
                                    "Response copied to clipboard",
                                  )
                                }
                              >
                                <Copy className="h-4 w-4" />
                              </Button>
                            </div>
                            <pre className="text-sm overflow-x-auto">
                              <code>
                                {JSON.stringify(
                                  {
                                    id: 2,
                                    name: "Jane Smith",
                                    email: "jane@example.com",
                                    points: 100,
                                    tier: "Bronze",
                                    joinDate: "2023-05-01",
                                  },
                                  null,
                                  2,
                                )}
                              </code>
                            </pre>
                          </div>
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </TabsContent>

                <TabsContent value="examples">
                  <div className="space-y-4">
                    <div>
                      <h3 className="font-medium mb-2">Create a user and add points</h3>
                      <div className="bg-muted p-4 rounded-md">
                        <div className="flex items-center gap-2 mb-2">
                          <FileJson className="h-4 w-4 text-muted-foreground" />
                          <span className="font-medium">JavaScript</span>
                        </div>
                        <pre className="text-sm overflow-x-auto">
                          <code>
                            {`// Create a new user
const response = await fetch('https://api.rewardhub.com/v1/users', {
  method: 'POST',
  headers: {
    'Authorization': 'Bearer sk_test_abc123def456...',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    name: 'Jane Smith',
    email: 'jane@example.com'
  })
});

const user = await response.json();

// Add points to the user
const transactionResponse = await fetch('https://api.rewardhub.com/v1/transactions', {
  method: 'POST',
  headers: {
    'Authorization': 'Bearer sk_test_abc123def456...',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    userId: user.id,
    points: 100,
    description: 'Welcome bonus',
    type: 'earned'
  })
});

const transaction = await transactionResponse.json();
console.log(\`Added \${transaction.points} points to \${user.name}\`);`}
                          </code>
                        </pre>
                      </div>
                    </div>

                    <div>
                      <h3 className="font-medium mb-2">Get a user's point balance</h3>
                      <div className="bg-muted p-4 rounded-md">
                        <div className="flex items-center gap-2 mb-2">
                          <Code className="h-4 w-4 text-muted-foreground" />
                          <span className="font-medium">cURL</span>
                        </div>
                        <pre className="text-sm overflow-x-auto">
                          <code>
                            {`curl -X GET "https://api.rewardhub.com/v1/users/1" \\
  -H "Authorization: Bearer sk_test_abc123def456..."`}
                          </code>
                        </pre>
                      </div>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="models">
                  <div className="space-y-4">
                    <div>
                      <h3 className="font-medium mb-2">User Object</h3>
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="border-b">
                            <th className="text-left py-2">Field</th>
                            <th className="text-left py-2">Type</th>
                            <th className="text-left py-2">Description</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr className="border-b">
                            <td className="py-2">id</td>
                            <td className="py-2">integer</td>
                            <td className="py-2">Unique identifier for the user</td>
                          </tr>
                          <tr className="border-b">
                            <td className="py-2">name</td>
                            <td className="py-2">string</td>
                            <td className="py-2">The user's full name</td>
                          </tr>
                          <tr className="border-b">
                            <td className="py-2">email</td>
                            <td className="py-2">string</td>
                            <td className="py-2">The user's email address</td>
                          </tr>
                          <tr className="border-b">
                            <td className="py-2">points</td>
                            <td className="py-2">integer</td>
                            <td className="py-2">Current points balance</td>
                          </tr>
                          <tr className="border-b">
                            <td className="py-2">tier</td>
                            <td className="py-2">string</td>
                            <td className="py-2">Current loyalty tier name</td>
                          </tr>
                          <tr className="border-b">
                            <td className="py-2">joinDate</td>
                            <td className="py-2">string</td>
                            <td className="py-2">Date the user joined (ISO 8601 format)</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Webhooks</CardTitle>
              <CardDescription>Receive real-time updates about events in your loyalty program</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>
                Webhooks allow you to receive real-time notifications when events happen in your loyalty program. For
                example, you can be notified when a user earns points, redeems a reward, or changes tier.
              </p>

              <div>
                <h3 className="font-medium mb-2">Available Events</h3>
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-2">Event</th>
                      <th className="text-left py-2">Description</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b">
                      <td className="py-2">user.created</td>
                      <td className="py-2">Triggered when a new user is created</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-2">user.updated</td>
                      <td className="py-2">Triggered when a user's information is updated</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-2">transaction.created</td>
                      <td className="py-2">Triggered when a new transaction is created</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-2">points.earned</td>
                      <td className="py-2">Triggered when a user earns points</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-2">points.redeemed</td>
                      <td className="py-2">Triggered when a user redeems points</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-2">tier.changed</td>
                      <td className="py-2">Triggered when a user's tier changes</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="bg-muted p-4 rounded-md">
                <div className="flex justify-between items-center mb-2">
                  <div className="font-medium">Example Webhook Payload</div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() =>
                      copyToClipboard(
                        JSON.stringify(
                          {
                            id: "evt_123456789",
                            type: "points.earned",
                            created: "2023-05-01T12:00:00Z",
                            data: {
                              userId: 1,
                              points: 50,
                              reason: "Purchase at Store #123",
                              transactionId: 456,
                              timestamp: "2023-05-01T12:00:00Z",
                            },
                          },
                          null,
                          2,
                        ),
                        "Payload copied to clipboard",
                      )
                    }
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
                <pre className="text-sm overflow-x-auto">
                  <code>
                    {JSON.stringify(
                      {
                        id: "evt_123456789",
                        type: "points.earned",
                        created: "2023-05-01T12:00:00Z",
                        data: {
                          userId: 1,
                          points: 50,
                          reason: "Purchase at Store #123",
                          transactionId: 456,
                          timestamp: "2023-05-01T12:00:00Z",
                        },
                      },
                      null,
                      2,
                    )}
                  </code>
                </pre>
              </div>

              <div className="bg-amber-50 border border-amber-200 p-4 rounded-md">
                <div className="flex items-start gap-2">
                  <Lock className="h-5 w-5 text-amber-600 mt-0.5" />
                  <div>
                    <p className="font-medium text-amber-800">Verify webhook signatures</p>
                    <p className="text-sm text-amber-700 mt-1">
                      To ensure webhooks are coming from RewardHub, we sign all webhook requests with a signature that
                      you can verify using your webhook secret.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

