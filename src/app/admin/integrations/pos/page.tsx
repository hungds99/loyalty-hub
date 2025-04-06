"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { RefreshCw, CreditCard, Smartphone } from "lucide-react"

export default function POSIntegrationsPage() {
  const [squareConfig, setSquareConfig] = useState({
    enabled: false,
    accessToken: "",
    locationId: "",
    environment: "sandbox" as "sandbox" | "production",
    lastSync: null as Date | null,
    status: "disconnected" as "connected" | "disconnected" | "error",
  })

  const [cloverConfig, setCloverConfig] = useState({
    enabled: false,
    apiKey: "",
    merchantId: "",
    environment: "sandbox" as "sandbox" | "production",
    lastSync: null as Date | null,
    status: "disconnected" as "connected" | "disconnected" | "error",
  })

  const [isSyncing, setIsSyncing] = useState(false)

  const handleSquareConnect = async () => {
    // In a real implementation, you would validate and save the configuration
    // and then test the connection
    setSquareConfig({
      ...squareConfig,
      enabled: true,
      status: "connected",
      lastSync: new Date(),
    })
  }

  const handleCloverConnect = async () => {
    // In a real implementation, you would validate and save the configuration
    // and then test the connection
    setCloverConfig({
      ...cloverConfig,
      enabled: true,
      status: "connected",
      lastSync: new Date(),
    })
  }

  const handleSync = async (platform: "square" | "clover") => {
    setIsSyncing(true)

    // In a real implementation, you would call your API to sync orders
    // This is just a simulation
    setTimeout(() => {
      if (platform === "square") {
        setSquareConfig({
          ...squareConfig,
          lastSync: new Date(),
        })
      } else {
        setCloverConfig({
          ...cloverConfig,
          lastSync: new Date(),
        })
      }
      setIsSyncing(false)
    }, 2000)
  }

  return (
    <div className="flex flex-col gap-4">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">POS Integrations</h1>
        <p className="text-muted-foreground">Connect your loyalty program with point-of-sale systems</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {/* Square Integration Card */}
        <Card>
          <CardHeader>
            <div className="flex justify-between items-start">
              <div className="flex items-center gap-2">
                <CreditCard className="h-5 w-5 text-orange-500" />
                <CardTitle>Square</CardTitle>
              </div>
              <Badge
                variant={squareConfig.status === "connected" ? "default" : "secondary"}
                className={
                  squareConfig.status === "connected"
                    ? "bg-green-100 text-green-800"
                    : squareConfig.status === "error"
                      ? "bg-red-100 text-red-800"
                      : ""
                }
              >
                {squareConfig.status === "connected"
                  ? "Connected"
                  : squareConfig.status === "error"
                    ? "Error"
                    : "Disconnected"}
              </Badge>
            </div>
            <CardDescription>Connect your Square POS to award points for in-store purchases</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {squareConfig.status === "connected" ? (
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Environment:</span>
                  <span className="text-sm capitalize">{squareConfig.environment}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Location ID:</span>
                  <span className="text-sm">{squareConfig.locationId}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Last Sync:</span>
                  <span className="text-sm">
                    {squareConfig.lastSync ? squareConfig.lastSync.toLocaleString() : "Never"}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Auto-sync:</span>
                  <Switch checked={squareConfig.enabled} />
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="grid gap-2">
                  <Label htmlFor="square-env">Environment</Label>
                  <Select
                    value={squareConfig.environment}
                    onValueChange={(value) =>
                      setSquareConfig({
                        ...squareConfig,
                        environment: value as "sandbox" | "production",
                      })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select environment" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="sandbox">Sandbox</SelectItem>
                      <SelectItem value="production">Production</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="square-token">Access Token</Label>
                  <Input
                    id="square-token"
                    type="password"
                    value={squareConfig.accessToken}
                    onChange={(e) => setSquareConfig({ ...squareConfig, accessToken: e.target.value })}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="square-location">Location ID</Label>
                  <Input
                    id="square-location"
                    value={squareConfig.locationId}
                    onChange={(e) => setSquareConfig({ ...squareConfig, locationId: e.target.value })}
                  />
                </div>
              </div>
            )}
          </CardContent>
          <CardFooter className="flex justify-between">
            {squareConfig.status === "connected" ? (
              <>
                <Button variant="outline" onClick={() => setSquareConfig({ ...squareConfig, status: "disconnected" })}>
                  Disconnect
                </Button>
                <Button onClick={() => handleSync("square")} disabled={isSyncing}>
                  {isSyncing ? (
                    <>
                      <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                      Syncing...
                    </>
                  ) : (
                    <>
                      <RefreshCw className="mr-2 h-4 w-4" />
                      Sync Now
                    </>
                  )}
                </Button>
              </>
            ) : (
              <Button className="w-full" onClick={handleSquareConnect}>
                Connect Square
              </Button>
            )}
          </CardFooter>
        </Card>

        {/* Clover Integration Card */}
        <Card>
          <CardHeader>
            <div className="flex justify-between items-start">
              <div className="flex items-center gap-2">
                <Smartphone className="h-5 w-5 text-green-500" />
                <CardTitle>Clover</CardTitle>
              </div>
              <Badge
                variant={cloverConfig.status === "connected" ? "default" : "secondary"}
                className={
                  cloverConfig.status === "connected"
                    ? "bg-green-100 text-green-800"
                    : cloverConfig.status === "error"
                      ? "bg-red-100 text-red-800"
                      : ""
                }
              >
                {cloverConfig.status === "connected"
                  ? "Connected"
                  : cloverConfig.status === "error"
                    ? "Error"
                    : "Disconnected"}
              </Badge>
            </div>
            <CardDescription>Connect your Clover POS to award points for in-store purchases</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {cloverConfig.status === "connected" ? (
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Environment:</span>
                  <span className="text-sm capitalize">{cloverConfig.environment}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Merchant ID:</span>
                  <span className="text-sm">{cloverConfig.merchantId}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Last Sync:</span>
                  <span className="text-sm">
                    {cloverConfig.lastSync ? cloverConfig.lastSync.toLocaleString() : "Never"}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Auto-sync:</span>
                  <Switch checked={cloverConfig.enabled} />
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="grid gap-2">
                  <Label htmlFor="clover-env">Environment</Label>
                  <Select
                    value={cloverConfig.environment}
                    onValueChange={(value) =>
                      setCloverConfig({
                        ...cloverConfig,
                        environment: value as "sandbox" | "production",
                      })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select environment" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="sandbox">Sandbox</SelectItem>
                      <SelectItem value="production">Production</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="clover-key">API Key</Label>
                  <Input
                    id="clover-key"
                    type="password"
                    value={cloverConfig.apiKey}
                    onChange={(e) => setCloverConfig({ ...cloverConfig, apiKey: e.target.value })}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="clover-merchant">Merchant ID</Label>
                  <Input
                    id="clover-merchant"
                    value={cloverConfig.merchantId}
                    onChange={(e) => setCloverConfig({ ...cloverConfig, merchantId: e.target.value })}
                  />
                </div>
              </div>
            )}
          </CardContent>
          <CardFooter className="flex justify-between">
            {cloverConfig.status === "connected" ? (
              <>
                <Button variant="outline" onClick={() => setCloverConfig({ ...cloverConfig, status: "disconnected" })}>
                  Disconnect
                </Button>
                <Button onClick={() => handleSync("clover")} disabled={isSyncing}>
                  {isSyncing ? (
                    <>
                      <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                      Syncing...
                    </>
                  ) : (
                    <>
                      <RefreshCw className="mr-2 h-4 w-4" />
                      Sync Now
                    </>
                  )}
                </Button>
              </>
            ) : (
              <Button className="w-full" onClick={handleCloverConnect}>
                Connect Clover
              </Button>
            )}
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}

