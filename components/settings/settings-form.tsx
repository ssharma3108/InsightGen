"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export function SettingsForm() {
  const [dataSource, setDataSource] = useState("mock")
  const [refreshInterval, setRefreshInterval] = useState("30")
  const [autoRefresh, setAutoRefresh] = useState(true)
  const [voiceEnabled, setVoiceEnabled] = useState(true)

  return (
    <Tabs defaultValue="general" className="w-full">
      <TabsList className="grid w-full max-w-md grid-cols-3">
        <TabsTrigger value="general">General</TabsTrigger>
        <TabsTrigger value="data">Data Sources</TabsTrigger>
        <TabsTrigger value="appearance">Appearance</TabsTrigger>
      </TabsList>
      <TabsContent value="general" className="space-y-4 pt-4">
        <Card>
          <CardHeader>
            <CardTitle>General Settings</CardTitle>
            <CardDescription>Configure general application settings</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="auto-refresh">Auto Refresh</Label>
                <p className="text-sm text-muted-foreground">Automatically refresh data at regular intervals</p>
              </div>
              <Switch id="auto-refresh" checked={autoRefresh} onCheckedChange={setAutoRefresh} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="refresh-interval">Refresh Interval (seconds)</Label>
              <Select value={refreshInterval} onValueChange={setRefreshInterval} disabled={!autoRefresh}>
                <SelectTrigger id="refresh-interval">
                  <SelectValue placeholder="Select interval" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="10">10 seconds</SelectItem>
                  <SelectItem value="30">30 seconds</SelectItem>
                  <SelectItem value="60">1 minute</SelectItem>
                  <SelectItem value="300">5 minutes</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="voice-enabled">Voice Narration</Label>
                <p className="text-sm text-muted-foreground">Enable AI voice narration for insights</p>
              </div>
              <Switch id="voice-enabled" checked={voiceEnabled} onCheckedChange={setVoiceEnabled} />
            </div>
          </CardContent>
          <CardFooter>
            <Button>Save Changes</Button>
          </CardFooter>
        </Card>
      </TabsContent>
      <TabsContent value="data" className="space-y-4 pt-4">
        <Card>
          <CardHeader>
            <CardTitle>Data Source Settings</CardTitle>
            <CardDescription>Configure where your dashboard data comes from</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="data-source">Data Source</Label>
              <Select value={dataSource} onValueChange={setDataSource}>
                <SelectTrigger id="data-source">
                  <SelectValue placeholder="Select data source" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="mock">Mock Data</SelectItem>
                  <SelectItem value="api">External API</SelectItem>
                  <SelectItem value="firebase">Firebase</SelectItem>
                  <SelectItem value="custom">Custom Source</SelectItem>
                </SelectContent>
              </Select>
            </div>
            {dataSource === "api" && (
              <div className="space-y-2">
                <Label htmlFor="api-endpoint">API Endpoint</Label>
                <Input id="api-endpoint" placeholder="https://api.example.com/data" />
              </div>
            )}
            {dataSource === "custom" && (
              <div className="space-y-2">
                <Label htmlFor="custom-source">Custom Source Configuration</Label>
                <Input id="custom-source" placeholder="Enter configuration details" />
              </div>
            )}
          </CardContent>
          <CardFooter>
            <Button>Save Changes</Button>
          </CardFooter>
        </Card>
      </TabsContent>
      <TabsContent value="appearance" className="space-y-4 pt-4">
        <Card>
          <CardHeader>
            <CardTitle>Appearance Settings</CardTitle>
            <CardDescription>Customize how your dashboard looks</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Chart Colors</Label>
              <div className="grid grid-cols-5 gap-2">
                <div className="h-8 rounded-md bg-blue-500" />
                <div className="h-8 rounded-md bg-green-500" />
                <div className="h-8 rounded-md bg-yellow-500" />
                <div className="h-8 rounded-md bg-red-500" />
                <div className="h-8 rounded-md bg-purple-500" />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="chart-animation">Chart Animation Speed</Label>
              <Select defaultValue="medium">
                <SelectTrigger id="chart-animation">
                  <SelectValue placeholder="Select animation speed" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="none">None</SelectItem>
                  <SelectItem value="slow">Slow</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="fast">Fast</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
          <CardFooter>
            <Button>Save Changes</Button>
          </CardFooter>
        </Card>
      </TabsContent>
    </Tabs>
  )
}
