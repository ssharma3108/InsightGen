import { NextResponse } from "next/server"

// Simulate AI-powered insights generation
export async function POST(request: Request) {
  try {
    const { question, context } = await request.json()

    // Simulate processing delay
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Mock AI responses based on common business questions
    const responses: Record<string, string> = {
      revenue:
        "Based on current trends, your revenue is projected to grow by 18% next quarter. The main drivers are increased customer acquisition in the electronics category and improved conversion rates.",
      customers:
        "Customer behavior analysis shows a 23% increase in repeat purchases. The southern region shows the highest customer lifetime value, suggesting successful regional marketing strategies.",
      inventory:
        "Inventory optimization recommendations: Increase electronics stock by 25%, reduce beauty products by 15%. Predicted stockout risk for mobile accessories in 2 weeks.",
      performance:
        "Overall performance metrics show strong growth across all KPIs. Revenue per customer increased by 12%, and customer acquisition cost decreased by 8%.",
      default:
        "I've analyzed your data and found several key insights. Your business is showing strong performance with particular strength in the electronics category. Would you like me to dive deeper into any specific area?",
    }

    // Simple keyword matching for demo purposes
    let response = responses.default
    const lowerQuestion = question.toLowerCase()

    if (lowerQuestion.includes("revenue") || lowerQuestion.includes("sales")) {
      response = responses.revenue
    } else if (lowerQuestion.includes("customer") || lowerQuestion.includes("user")) {
      response = responses.customers
    } else if (lowerQuestion.includes("inventory") || lowerQuestion.includes("stock")) {
      response = responses.inventory
    } else if (lowerQuestion.includes("performance") || lowerQuestion.includes("metric")) {
      response = responses.performance
    }

    return NextResponse.json({
      response,
      confidence: Math.floor(Math.random() * 20) + 80, // 80-100%
      timestamp: new Date().toISOString(),
      suggestions: [
        "Would you like to see a detailed breakdown?",
        "Should I generate a report on this topic?",
        "Do you want predictions for next quarter?",
      ],
    })
  } catch (error) {
    return NextResponse.json({ error: "Failed to generate insights" }, { status: 500 })
  }
}
