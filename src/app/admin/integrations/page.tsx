"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import { AlertCircle, RefreshCw, ShoppingBag, Store } from "lucide-react"

export default function IntegrationsPage() {
  const [shopifyConfig, setShopifyConfig] = useState({
    enabled: false,
    shopName: "",
    apiKey: "",
    apiSecret: "",
    accessToken: "",
    lastSync: null as Date | null,
    status: "disconnected" as "connected" | "disconnected" | "error",
  })

  const [wooConfig, setWooConfig] = useState({
    enabled: false,
    siteUrl: "",
    consumerKey: "",
    consumerSecret: "",
    lastSync: null as Date | null,
    status: "disconnected" as "connected" | "disconnected" | "error",
  })

  const [isSyncing, setIsSyncing] = useState(false)

  const handleShopifyConnect = async () => {
    // In a real implementation, you would validate and save the configuration
    // and then test the connection
    setShopifyConfig({
      ...shopifyConfig,
      enabled: true,
      status: "connected",
      lastSync: new Date(),
    })
  }

  const handleWooConnect = async () => {
    // In a real implementation, you would validate and save the configuration
    // and then test the connection
    setWooConfig({
      ...wooConfig,
      enabled: true,
      status: "connected",
      lastSync: new Date(),
    })
  }

  const handleSync = async (platform: "shopify" | "woocommerce") => {
    setIsSyncing(true)

    // In a real implementation, you would call your API to sync orders
    // This is just a simulation
    setTimeout(() => {
      if (platform === "shopify") {
        setShopifyConfig({
          ...shopifyConfig,
          lastSync: new Date(),
        })
      } else {
        setWooConfig({
          ...wooConfig,
          lastSync: new Date(),
        })
      }
      setIsSyncing(false)
    }, 2000)
  }

  return (
    <div className="flex flex-col gap-4">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Integrations</h1>
        <p className="text-muted-foreground">Connect your loyalty program with e-commerce platforms and POS systems</p>
      </div>

      <Tabs defaultValue="ecommerce" className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-4">
          <TabsTrigger value="ecommerce">E-commerce</TabsTrigger>
          <TabsTrigger value="pos">POS Systems</TabsTrigger>
        </TabsList>

        <TabsContent value="ecommerce">
          <div className="grid gap-4 md:grid-cols-2">
            {/* Shopify Integration Card */}
            <Card>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div className="flex items-center gap-2">
                    <ShoppingBag className="h-5 w-5 text-purple-500" />
                    <CardTitle>Shopify</CardTitle>
                  </div>
                  <Badge
                    variant={shopifyConfig.status === "connected" ? "default" : "secondary"}
                    className={
                      shopifyConfig.status === "connected"
                        ? "bg-green-100 text-green-800"
                        : shopifyConfig.status === "error"
                          ? "bg-red-100 text-red-800"
                          : ""
                    }
                  >
                    {shopifyConfig.status === "connected"
                      ? "Connected"
                      : shopifyConfig.status === "error"
                        ? "Error"
                        : "Disconnected"}
                  </Badge>
                </div>
                <CardDescription>Connect your Shopify store to award points for purchases</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {shopifyConfig.status === "connected" ? (
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">Store:</span>
                      <span className="text-sm">{shopifyConfig.shopName}.myshopify.com</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">Last Sync:</span>
                      <span className="text-sm">
                        {shopifyConfig.lastSync ? shopifyConfig.lastSync.toLocaleString() : "Never"}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">Auto-sync:</span>
                      <Switch checked={shopifyConfig.enabled} />
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="grid gap-2">
                      <Label htmlFor="shopify-store">Shopify Store Name</Label>
                      <Input
                        id="shopify-store"
                        placeholder="your-store"
                        value={shopifyConfig.shopName}
                        onChange={(e) => setShopifyConfig({ ...shopifyConfig, shopName: e.target.value })}
                      />
                      <p className="text-xs text-muted-foreground">Enter just the store name, without .myshopify.com</p>
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="shopify-key">API Key</Label>
                      <Input
                        id="shopify-key"
                        value={shopifyConfig.apiKey}
                        onChange={(e) => setShopifyConfig({ ...shopifyConfig, apiKey: e.target.value })}
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="shopify-secret">API Secret</Label>
                      <Input
                        id="shopify-secret"
                        type="password"
                        value={shopifyConfig.apiSecret}
                        onChange={(e) => setShopifyConfig({ ...shopifyConfig, apiSecret: e.target.value })}
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="shopify-token">Access Token</Label>
                      <Input
                        id="shopify-token"
                        type="password"
                        value={shopifyConfig.accessToken}
                        onChange={(e) => setShopifyConfig({ ...shopifyConfig, accessToken: e.target.value })}
                      />
                    </div>
                  </div>
                )}
              </CardContent>
              <CardFooter className="flex justify-between">
                {shopifyConfig.status === "connected" ? (
                  <>
                    <Button
                      variant="outline"
                      onClick={() => setShopifyConfig({ ...shopifyConfig, status: "disconnected" })}
                    >
                      Disconnect
                    </Button>
                    <Button onClick={() => handleSync("shopify")} disabled={isSyncing}>
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
                  <Button className="w-full" onClick={handleShopifyConnect}>
                    Connect Shopify
                  </Button>
                )}
              </CardFooter>
            </Card>

            {/* WooCommerce Integration Card */}
            <Card>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div className="flex items-center gap-2">
                    <Store className="h-5 w-5 text-blue-500" />
                    <CardTitle>WooCommerce</CardTitle>
                  </div>
                  <Badge
                    variant={wooConfig.status === "connected" ? "default" : "secondary"}
                    className={
                      wooConfig.status === "connected"
                        ? "bg-green-100 text-green-800"
                        : wooConfig.status === "error"
                          ? "bg-red-100 text-red-800"
                          : ""
                    }
                  >
                    {wooConfig.status === "connected"
                      ? "Connected"
                      : wooConfig.status === "error"
                        ? "Error"
                        : "Disconnected"}
                  </Badge>
                </div>
                <CardDescription>Connect your WooCommerce store to award points for purchases</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {wooConfig.status === "connected" ? (
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">Site URL:</span>
                      <span className="text-sm">{wooConfig.siteUrl}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">Last Sync:</span>
                      <span className="text-sm">
                        {wooConfig.lastSync ? wooConfig.lastSync.toLocaleString() : "Never"}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">Auto-sync:</span>
                      <Switch checked={wooConfig.enabled} />
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="grid gap-2">
                      <Label htmlFor="woo-url">Site URL</Label>
                      <Input
                        id="woo-url"
                        placeholder="https://your-store.com"
                        value={wooConfig.siteUrl}
                        onChange={(e) => setWooConfig({ ...wooConfig, siteUrl: e.target.value })}
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="woo-key">Consumer Key</Label>
                      <Input
                        id="woo-key"
                        value={wooConfig.consumerKey}
                        onChange={(e) => setWooConfig({ ...wooConfig, consumerKey: e.target.value })}
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="woo-secret">Consumer Secret</Label>
                      <Input
                        id="woo-secret"
                        type="password"
                        value={wooConfig.consumerSecret}
                        onChange={(e) => setWooConfig({ ...wooConfig, consumerSecret: e.target.value })}
                      />
                    </div>
                  </div>
                )}
              </CardContent>
              <CardFooter className="flex justify-between">
                {wooConfig.status === "connected" ? (
                  <>
                    <Button variant="outline" onClick={() => setWooConfig({ ...wooConfig, status: "disconnected" })}>
                      Disconnect
                    </Button>
                    <Button onClick={() => handleSync("woocommerce")} disabled={isSyncing}>
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
                  <Button className="w-full" onClick={handleWooConnect}>
                    Connect WooCommerce
                  </Button>
                )}
              </CardFooter>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="pos">
          <Card className="p-8 text-center">
            <div className="flex flex-col items-center gap-2 mb-4">
              <AlertCircle className="h-8 w-8 text-amber-500" />
              <h3 className="text-lg font-medium">Coming Soon</h3>
            </div>
            <p className="text-muted-foreground mb-4">
              POS system integrations are coming soon. We're working on integrations with Square, Clover, and other
              popular POS systems.
            </p>
            <Button variant="outline">Get Notified</Button>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

