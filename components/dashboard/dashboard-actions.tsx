"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Download, Mic, Send, FileText, MessageSquare, Brain, Volume2, VolumeX } from "lucide-react"
import { useState } from "react"

export function DashboardActions() {
  const [question, setQuestion] = useState("")
  const [isSpeaking, setIsSpeaking] = useState(false)
  const [isListening, setIsListening] = useState(false)
  const [aiResponse, setAiResponse] = useState("")
  const [reportType, setReportType] = useState("summary")
  const [isGeneratingReport, setIsGeneratingReport] = useState(false)
  const [conversationHistory, setConversationHistory] = useState<Array<{ type: "user" | "ai"; message: string }>>([])

  const handleAskQuestion = async () => {
    if (!question.trim()) return

    // Add user question to conversation
    const newHistory = [...conversationHistory, { type: "user" as const, message: question }]
    setConversationHistory(newHistory)

    // Simulate AI processing
    const responses = [
      "Based on the current data, your electronics category is performing exceptionally well with a 23% growth rate. This is primarily driven by mobile accessories and smart home devices.",
      "The revenue spike in Week 2 can be attributed to a successful marketing campaign in the southern region, combined with seasonal demand patterns.",
      "Your customer retention rate has improved by 12% this quarter, largely due to the personalized recommendation system implementation.",
      "The beauty category decline appears to be temporary and seasonal. Historical data suggests a recovery in the next quarter.",
      "Your conversion rate optimization efforts have resulted in a 15% improvement in overall sales performance.",
    ]

    setTimeout(() => {
      const response = responses[Math.floor(Math.random() * responses.length)]
      setAiResponse(response)
      setConversationHistory([...newHistory, { type: "ai", message: response }])
    }, 1500)

    setQuestion("")
  }

  const handleVoiceInput = () => {
    setIsListening(!isListening)
    // In a real app, this would integrate with Web Speech API
    if (!isListening) {
      setTimeout(() => {
        setQuestion("What are the key drivers behind this week's revenue growth?")
        setIsListening(false)
      }, 2000)
    }
  }

  const handleSpeakInsights = () => {
    setIsSpeaking(!isSpeaking)
    // In a real app, this would trigger text-to-speech
    if (!isSpeaking && aiResponse) {
      // Simulate speaking
      setTimeout(() => {
        setIsSpeaking(false)
      }, 5000)
    }
  }

  const handleGenerateReport = async () => {
    setIsGeneratingReport(true)
    // Simulate report generation
    await new Promise((resolve) => setTimeout(resolve, 3000))
    setIsGeneratingReport(false)

    // In a real app, this would generate and download a report
    const reportData = {
      type: reportType,
      timestamp: new Date().toISOString(),
      data: "Generated report content...",
    }

    const blob = new Blob([JSON.stringify(reportData, null, 2)], { type: "application/json" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `${reportType}-report-${Date.now()}.json`
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div className="space-y-6">
      {/* AI Chat Interface */}
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center gap-2 mb-4">
            <Brain className="h-5 w-5 text-purple-500" />
            <h3 className="font-medium">AI Assistant</h3>
            <Badge variant="outline" className="bg-purple-50 text-purple-700">
              GPT-4 Powered
            </Badge>
          </div>

          {/* Conversation History */}
          {conversationHistory.length > 0 && (
            <div className="max-h-40 overflow-y-auto mb-4 space-y-2 p-3 bg-muted/30 rounded-lg">
              {conversationHistory.slice(-4).map((item, index) => (
                <div key={index} className={`text-sm ${item.type === "user" ? "text-right" : "text-left"}`}>
                  <div
                    className={`inline-block p-2 rounded-lg max-w-[80%] ${
                      item.type === "user" ? "bg-primary text-primary-foreground" : "bg-background border"
                    }`}
                  >
                    {item.message}
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className="flex gap-2">
            <div className="flex-1 relative">
              <Input
                placeholder="Ask AI about your business data..."
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleAskQuestion()
                  }
                }}
                className="pr-10"
              />
              <Button
                variant="ghost"
                size="sm"
                className={`absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8 p-0 ${
                  isListening ? "text-red-500 animate-pulse" : ""
                }`}
                onClick={handleVoiceInput}
              >
                <Mic className="h-4 w-4" />
              </Button>
            </div>
            <Button onClick={handleAskQuestion} disabled={!question.trim()}>
              <Send className="h-4 w-4 mr-2" />
              Ask
            </Button>
          </div>

          {aiResponse && (
            <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-950/20 rounded-lg border border-blue-200 dark:border-blue-800">
              <div className="flex items-start justify-between">
                <p className="text-sm">{aiResponse}</p>
                <Button variant="ghost" size="sm" onClick={handleSpeakInsights} className="ml-2">
                  {isSpeaking ? <VolumeX className="h-4 w-4 text-red-500" /> : <Volume2 className="h-4 w-4" />}
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Report Generation */}
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center gap-2 mb-4">
            <FileText className="h-5 w-5 text-green-500" />
            <h3 className="font-medium">Report Generator</h3>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <Select value={reportType} onValueChange={setReportType}>
                <SelectTrigger>
                  <SelectValue placeholder="Select report type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="summary">Executive Summary</SelectItem>
                  <SelectItem value="detailed">Detailed Analytics</SelectItem>
                  <SelectItem value="financial">Financial Report</SelectItem>
                  <SelectItem value="performance">Performance Metrics</SelectItem>
                  <SelectItem value="predictions">Predictive Analysis</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Button onClick={handleGenerateReport} disabled={isGeneratingReport} className="sm:w-auto w-full">
              <Download className="h-4 w-4 mr-2" />
              {isGeneratingReport ? "Generating..." : "Generate Report"}
            </Button>
          </div>

          {isGeneratingReport && (
            <div className="mt-4 p-3 bg-yellow-50 dark:bg-yellow-950/20 rounded-lg border border-yellow-200 dark:border-yellow-800">
              <div className="flex items-center gap-2">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-yellow-600"></div>
                <span className="text-sm">AI is analyzing your data and generating insights...</span>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center gap-2 mb-4">
            <MessageSquare className="h-5 w-5 text-blue-500" />
            <h3 className="font-medium">Quick Actions</h3>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            <Button variant="outline" size="sm" className="h-auto p-3 flex-col gap-1">
              <Brain className="h-4 w-4" />
              <span className="text-xs">Auto Insights</span>
            </Button>
            <Button variant="outline" size="sm" className="h-auto p-3 flex-col gap-1">
              <Download className="h-4 w-4" />
              <span className="text-xs">Export Data</span>
            </Button>
            <Button variant="outline" size="sm" className="h-auto p-3 flex-col gap-1">
              <Volume2 className="h-4 w-4" />
              <span className="text-xs">Voice Brief</span>
            </Button>
            <Button variant="outline" size="sm" className="h-auto p-3 flex-col gap-1">
              <FileText className="h-4 w-4" />
              <span className="text-xs">Schedule Report</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
