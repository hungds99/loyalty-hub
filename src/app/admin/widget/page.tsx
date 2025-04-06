"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { AlertCircle, Copy, Save, Award } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { toast } from "@/components/ui/use-toast"

export default function WidgetPage() {
  const [widgetConfig, setWidgetConfig] = useState({
    enabled: false,
    position: "bottom-right" as "bottom-right" | "bottom-left" | "top-right" | "top-left",
    theme: {
      primaryColor: "#10b981",
      textColor: "#ffffff",
      backgroundColor: "#1f2937",
      borderRadius: 8,
    },
    content: {
      title: "Rewards Program",
      subtitle: "Join our loyalty program and earn rewards!",
      pointsLabel: "Your Points",
      signInLabel: "Sign In",
      registerLabel: "Join Now",
    },
    features: {
      showPoints: true,
      showProgress: true,
      showRewards: true,
      showReferral: true,
    },
    display: {
      initialState: "collapsed" as "collapsed" | "expanded",
      mobileEnabled: true,
      desktopEnabled: true,
      displayDelay: 2,
      animation: "slide" as "slide" | "fade" | "none",
    },
  })

  const [activeTab, setActiveTab] = useState("appearance")
  const [isSaving, setIsSaving] = useState(false)
  const [previewMode, setPreviewMode] = useState<"desktop" | "mobile">("desktop")

  const handleSaveConfig = async () => {
    setIsSaving(true)

    // In a real implementation, you would save the configuration to your backend
    // This is just a simulation
    setTimeout(() => {
      setIsSaving(false)
      toast({
        title: "Widget settings saved",
        description: "Your widget configuration has been updated successfully.",
      })
    }, 1500)
  }

  const generateEmbedCode = () => {
    return `<script>
  (function(w,d,s,o,f,js,fjs){
    w['RewardHubWidget']=o;w[o]=w[o]||function(){(w[o].q=w[o].q||[]).push(arguments)};
    js=d.createElement(s),fjs=d.getElementsByTagName(s)[0];
    js.id=o;js.src=f;js.async=1;fjs.parentNode.insertBefore(js,fjs);
  }(window,document,'script','rewardhub','https://widget.rewardhub.com/loader.js'));
  rewardhub('init', '${Math.random().toString(36).substring(2, 15)}');
</script>`
  }

  const copyEmbedCode = () => {
    navigator.clipboard.writeText(generateEmbedCode())
    toast({
      title: "Copied to clipboard",
      description: "Widget embed code has been copied to your clipboard.",
    })
  }

  return (
    <div className="flex flex-col gap-4">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Loyalty Widget</h1>
        <p className="text-muted-foreground">Customize and embed your loyalty widget on your website</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>Widget Settings</CardTitle>
                <Switch
                  checked={widgetConfig.enabled}
                  onCheckedChange={(checked) => setWidgetConfig({ ...widgetConfig, enabled: checked })}
                />
              </div>
              <CardDescription>
                {widgetConfig.enabled ? "Widget is currently active on your site" : "Widget is currently disabled"}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="grid grid-cols-4 mb-4">
                  <TabsTrigger value="appearance">Appearance</TabsTrigger>
                  <TabsTrigger value="content">Content</TabsTrigger>
                  <TabsTrigger value="features">Features</TabsTrigger>
                  <TabsTrigger value="display">Display</TabsTrigger>
                </TabsList>

                <TabsContent value="appearance" className="space-y-4">
                  <div className="grid gap-2">
                    <Label htmlFor="position">Widget Position</Label>
                    <Select
                      value={widgetConfig.position}
                      onValueChange={(value: any) => setWidgetConfig({ ...widgetConfig, position: value })}
                    >
                      <SelectTrigger id="position">
                        <SelectValue placeholder="Select position" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="bottom-right">Bottom Right</SelectItem>
                        <SelectItem value="bottom-left">Bottom Left</SelectItem>
                        <SelectItem value="top-right">Top Right</SelectItem>
                        <SelectItem value="top-left">Top Left</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="grid gap-2">
                    <Label>Primary Color</Label>
                    <div className="flex gap-2">
                      <div
                        className="w-10 h-10 rounded border"
                        style={{ backgroundColor: widgetConfig.theme.primaryColor }}
                      />
                      <Input
                        value={widgetConfig.theme.primaryColor}
                        onChange={(e) =>
                          setWidgetConfig({
                            ...widgetConfig,
                            theme: { ...widgetConfig.theme, primaryColor: e.target.value },
                          })
                        }
                      />
                    </div>
                  </div>

                  <div className="grid gap-2">
                    <Label>Text Color</Label>
                    <div className="flex gap-2">
                      <div
                        className="w-10 h-10 rounded border"
                        style={{ backgroundColor: widgetConfig.theme.textColor }}
                      />
                      <Input
                        value={widgetConfig.theme.textColor}
                        onChange={(e) =>
                          setWidgetConfig({
                            ...widgetConfig,
                            theme: { ...widgetConfig.theme, textColor: e.target.value },
                          })
                        }
                      />
                    </div>
                  </div>

                  <div className="grid gap-2">
                    <Label>Background Color</Label>
                    <div className="flex gap-2">
                      <div
                        className="w-10 h-10 rounded border"
                        style={{ backgroundColor: widgetConfig.theme.backgroundColor }}
                      />
                      <Input
                        value={widgetConfig.theme.backgroundColor}
                        onChange={(e) =>
                          setWidgetConfig({
                            ...widgetConfig,
                            theme: { ...widgetConfig.theme, backgroundColor: e.target.value },
                          })
                        }
                      />
                    </div>
                  </div>

                  <div className="grid gap-2">
                    <Label>Border Radius</Label>
                    <div className="flex gap-4 items-center">
                      <Slider
                        value={[widgetConfig.theme.borderRadius]}
                        min={0}
                        max={20}
                        step={1}
                        onValueChange={(value) =>
                          setWidgetConfig({
                            ...widgetConfig,
                            theme: { ...widgetConfig.theme, borderRadius: value[0] },
                          })
                        }
                        className="flex-1"
                      />
                      <span className="w-8 text-center">{widgetConfig.theme.borderRadius}px</span>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="content" className="space-y-4">
                  <div className="grid gap-2">
                    <Label htmlFor="title">Widget Title</Label>
                    <Input
                      id="title"
                      value={widgetConfig.content.title}
                      onChange={(e) =>
                        setWidgetConfig({
                          ...widgetConfig,
                          content: { ...widgetConfig.content, title: e.target.value },
                        })
                      }
                    />
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="subtitle">Widget Subtitle</Label>
                    <Input
                      id="subtitle"
                      value={widgetConfig.content.subtitle}
                      onChange={(e) =>
                        setWidgetConfig({
                          ...widgetConfig,
                          content: { ...widgetConfig.content, subtitle: e.target.value },
                        })
                      }
                    />
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="pointsLabel">Points Label</Label>
                    <Input
                      id="pointsLabel"
                      value={widgetConfig.content.pointsLabel}
                      onChange={(e) =>
                        setWidgetConfig({
                          ...widgetConfig,
                          content: { ...widgetConfig.content, pointsLabel: e.target.value },
                        })
                      }
                    />
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="signInLabel">Sign In Button Text</Label>
                    <Input
                      id="signInLabel"
                      value={widgetConfig.content.signInLabel}
                      onChange={(e) =>
                        setWidgetConfig({
                          ...widgetConfig,
                          content: { ...widgetConfig.content, signInLabel: e.target.value },
                        })
                      }
                    />
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="registerLabel">Register Button Text</Label>
                    <Input
                      id="registerLabel"
                      value={widgetConfig.content.registerLabel}
                      onChange={(e) =>
                        setWidgetConfig({
                          ...widgetConfig,
                          content: { ...widgetConfig.content, registerLabel: e.target.value },
                        })
                      }
                    />
                  </div>
                </TabsContent>

                <TabsContent value="features" className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="showPoints" className="block">
                        Show Points Balance
                      </Label>
                      <p className="text-sm text-muted-foreground">Display the user's current points balance</p>
                    </div>
                    <Switch
                      id="showPoints"
                      checked={widgetConfig.features.showPoints}
                      onCheckedChange={(checked) =>
                        setWidgetConfig({
                          ...widgetConfig,
                          features: { ...widgetConfig.features, showPoints: checked },
                        })
                      }
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="showProgress" className="block">
                        Show Tier Progress
                      </Label>
                      <p className="text-sm text-muted-foreground">Display progress towards the next loyalty tier</p>
                    </div>
                    <Switch
                      id="showProgress"
                      checked={widgetConfig.features.showProgress}
                      onCheckedChange={(checked) =>
                        setWidgetConfig({
                          ...widgetConfig,
                          features: { ...widgetConfig.features, showProgress: checked },
                        })
                      }
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="showRewards" className="block">
                        Show Available Rewards
                      </Label>
                      <p className="text-sm text-muted-foreground">Display rewards that the user can redeem</p>
                    </div>
                    <Switch
                      id="showRewards"
                      checked={widgetConfig.features.showRewards}
                      onCheckedChange={(checked) =>
                        setWidgetConfig({
                          ...widgetConfig,
                          features: { ...widgetConfig.features, showRewards: checked },
                        })
                      }
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="showReferral" className="block">
                        Show Referral Option
                      </Label>
                      <p className="text-sm text-muted-foreground">Allow users to refer friends to earn points</p>
                    </div>
                    <Switch
                      id="showReferral"
                      checked={widgetConfig.features.showReferral}
                      onCheckedChange={(checked) =>
                        setWidgetConfig({
                          ...widgetConfig,
                          features: { ...widgetConfig.features, showReferral: checked },
                        })
                      }
                    />
                  </div>
                </TabsContent>

                <TabsContent value="display" className="space-y-4">
                  <div className="grid gap-2">
                    <Label htmlFor="initialState">Initial State</Label>
                    <Select
                      value={widgetConfig.display.initialState}
                      onValueChange={(value: any) =>
                        setWidgetConfig({
                          ...widgetConfig,
                          display: { ...widgetConfig.display, initialState: value },
                        })
                      }
                    >
                      <SelectTrigger id="initialState">
                        <SelectValue placeholder="Select initial state" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="collapsed">Collapsed (Icon Only)</SelectItem>
                        <SelectItem value="expanded">Expanded</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="mobileEnabled" className="block">
                        Enable on Mobile
                      </Label>
                      <p className="text-sm text-muted-foreground">Show the widget on mobile devices</p>
                    </div>
                    <Switch
                      id="mobileEnabled"
                      checked={widgetConfig.display.mobileEnabled}
                      onCheckedChange={(checked) =>
                        setWidgetConfig({
                          ...widgetConfig,
                          display: { ...widgetConfig.display, mobileEnabled: checked },
                        })
                      }
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="desktopEnabled" className="block">
                        Enable on Desktop
                      </Label>
                      <p className="text-sm text-muted-foreground">Show the widget on desktop devices</p>
                    </div>
                    <Switch
                      id="desktopEnabled"
                      checked={widgetConfig.display.desktopEnabled}
                      onCheckedChange={(checked) =>
                        setWidgetConfig({
                          ...widgetConfig,
                          display: { ...widgetConfig.display, desktopEnabled: checked },
                        })
                      }
                    />
                  </div>

                  <div className="grid gap-2">
                    <Label>Display Delay (seconds)</Label>
                    <div className="flex gap-4 items-center">
                      <Slider
                        value={[widgetConfig.display.displayDelay]}
                        min={0}
                        max={10}
                        step={1}
                        onValueChange={(value) =>
                          setWidgetConfig({
                            ...widgetConfig,
                            display: { ...widgetConfig.display, displayDelay: value[0] },
                          })
                        }
                        className="flex-1"
                      />
                      <span className="w-8 text-center">{widgetConfig.display.displayDelay}s</span>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Time to wait before showing the widget after page load (0 = immediate)
                    </p>
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="animation">Animation Style</Label>
                    <Select
                      value={widgetConfig.display.animation}
                      onValueChange={(value: any) =>
                        setWidgetConfig({
                          ...widgetConfig,
                          display: { ...widgetConfig.display, animation: value },
                        })
                      }
                    >
                      <SelectTrigger id="animation">
                        <SelectValue placeholder="Select animation style" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="slide">Slide In</SelectItem>
                        <SelectItem value="fade">Fade In</SelectItem>
                        <SelectItem value="none">No Animation</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button
                variant="outline"
                onClick={() =>
                  setActiveTab(
                    activeTab === "appearance"
                      ? "content"
                      : activeTab === "content"
                        ? "features"
                        : activeTab === "features"
                          ? "display"
                          : "appearance",
                  )
                }
              >
                {activeTab === "display" ? "Back to Appearance" : "Next"}
              </Button>
              <Button onClick={handleSaveConfig} disabled={isSaving}>
                <Save className="mr-2 h-4 w-4" />
                {isSaving ? "Saving..." : "Save Settings"}
              </Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Embed Code</CardTitle>
              <CardDescription>Add this code to your website to display the loyalty widget</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="relative">
                <Textarea value={generateEmbedCode()} readOnly className="font-mono text-sm h-32" />
                <Button variant="ghost" size="icon" className="absolute top-2 right-2" onClick={copyEmbedCode}>
                  <Copy className="h-4 w-4" />
                </Button>
              </div>

              <Alert className="mt-4">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Where to add this code</AlertTitle>
                <AlertDescription>
                  Add this code just before the closing <code>&lt;/body&gt;</code> tag on every page where you want the
                  widget to appear.
                </AlertDescription>
              </Alert>
            </CardContent>
            <CardFooter>
              <div className="text-sm text-muted-foreground">
                <p>
                  Need help? Check out our{" "}
                  <a href="#" className="text-primary underline">
                    installation guide
                  </a>{" "}
                  or{" "}
                  <a href="#" className="text-primary underline">
                    contact support
                  </a>
                  .
                </p>
              </div>
            </CardFooter>
          </Card>
        </div>

        <div className="lg:col-span-1">
          <Card className="sticky top-20">
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>Widget Preview</CardTitle>
                <div className="flex gap-2">
                  <Button
                    variant={previewMode === "desktop" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setPreviewMode("desktop")}
                  >
                    Desktop
                  </Button>
                  <Button
                    variant={previewMode === "mobile" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setPreviewMode("mobile")}
                  >
                    Mobile
                  </Button>
                </div>
              </div>
              <CardDescription>Preview how your widget will appear on your website</CardDescription>
            </CardHeader>
            <CardContent>
              <div
                className={`border rounded-lg overflow-hidden ${previewMode === "mobile" ? "w-[320px] h-[568px]" : "w-full h-[500px]"} mx-auto relative bg-gray-100`}
              >
                {/* Mock website content */}
                <div className="w-full h-12 bg-white border-b flex items-center px-4">
                  <div className="w-24 h-6 bg-gray-200 rounded"></div>
                  <div className="ml-auto flex gap-2">
                    <div className="w-16 h-6 bg-gray-200 rounded"></div>
                    <div className="w-16 h-6 bg-gray-200 rounded"></div>
                    <div className="w-16 h-6 bg-gray-200 rounded"></div>
                  </div>
                </div>

                <div className="p-4">
                  <div className="w-full h-40 bg-gray-200 rounded mb-4"></div>
                  <div className="w-3/4 h-6 bg-gray-200 rounded mb-2"></div>
                  <div className="w-full h-4 bg-gray-200 rounded mb-1"></div>
                  <div className="w-full h-4 bg-gray-200 rounded mb-1"></div>
                  <div className="w-2/3 h-4 bg-gray-200 rounded mb-4"></div>

                  <div className="w-full h-40 bg-gray-200 rounded mb-4"></div>
                  <div className="w-1/2 h-6 bg-gray-200 rounded mb-2"></div>
                  <div className="w-full h-4 bg-gray-200 rounded mb-1"></div>
                  <div className="w-full h-4 bg-gray-200 rounded mb-1"></div>
                  <div className="w-3/4 h-4 bg-gray-200 rounded"></div>
                </div>

                {/* Widget preview */}
                {widgetConfig.enabled && (
                  <div
                    className={`absolute ${
                      widgetConfig.position === "bottom-right"
                        ? "bottom-4 right-4"
                        : widgetConfig.position === "bottom-left"
                          ? "bottom-4 left-4"
                          : widgetConfig.position === "top-right"
                            ? "top-20 right-4"
                            : "top-20 left-4"
                    }`}
                  >
                    {widgetConfig.display.initialState === "collapsed" ? (
                      <div
                        className="w-12 h-12 rounded-full flex items-center justify-center shadow-lg"
                        style={{
                          backgroundColor: widgetConfig.theme.primaryColor,
                          color: widgetConfig.theme.textColor,
                        }}
                      >
                        <Award className="h-6 w-6" />
                      </div>
                    ) : (
                      <div
                        className="w-64 rounded shadow-lg overflow-hidden"
                        style={{
                          backgroundColor: widgetConfig.theme.backgroundColor,
                          color: widgetConfig.theme.textColor,
                          borderRadius: `${widgetConfig.theme.borderRadius}px`,
                        }}
                      >
                        <div className="p-3 font-medium" style={{ backgroundColor: widgetConfig.theme.primaryColor }}>
                          {widgetConfig.content.title}
                        </div>
                        <div className="p-4">
                          <p className="text-sm mb-4">{widgetConfig.content.subtitle}</p>

                          {!widgetConfig.features.showPoints ? null : (
                            <div className="mb-4">
                              <div className="text-xs mb-1">{widgetConfig.content.pointsLabel}</div>
                              <div className="text-xl font-bold">750</div>
                            </div>
                          )}

                          {!widgetConfig.features.showProgress ? null : (
                            <div className="mb-4">
                              <div className="text-xs mb-1">Progress to Silver</div>
                              <div className="w-full h-2 bg-gray-700 rounded-full overflow-hidden">
                                <div
                                  className="h-full"
                                  style={{
                                    width: "75%",
                                    backgroundColor: widgetConfig.theme.primaryColor,
                                  }}
                                ></div>
                              </div>
                              <div className="text-xs mt-1">750 / 1000 points</div>
                            </div>
                          )}

                          <div className="flex gap-2">
                            <Button
                              className="flex-1 text-xs h-8"
                              style={{
                                backgroundColor: widgetConfig.theme.primaryColor,
                                color: widgetConfig.theme.textColor,
                              }}
                            >
                              {widgetConfig.content.signInLabel}
                            </Button>
                            <Button
                              variant="outline"
                              className="flex-1 text-xs h-8"
                              style={{
                                borderColor: widgetConfig.theme.primaryColor,
                                color: widgetConfig.theme.primaryColor,
                              }}
                            >
                              {widgetConfig.content.registerLabel}
                            </Button>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

