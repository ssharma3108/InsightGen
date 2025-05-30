import { NextResponse } from "next/server"

// Simulate real-time data fetching
export async function GET() {
  try {
    // Generate mock real-time data
    const data = {
      metrics: {
        revenue: {
          current: Math.floor(Math.random() * 10000) + 40000,
          change: (Math.random() - 0.5) * 40,
          trend: Math.random() > 0.5 ? "up" : "down",
        },
        users: {
          current: Math.floor(Math.random() * 500) + 2000,
          change: (Math.random() - 0.5) * 30,
          trend: Math.random() > 0.6 ? "up" : "down",
        },
        orders: {
          current: Math.floor(Math.random() * 200) + 1000,
          change: (Math.random() - 0.5) * 20,
          trend: Math.random() > 0.4 ? "up" : "down",
        },
        conversion: {
          current: (Math.random() * 2 + 2).toFixed(2),
          change: (Math.random() - 0.5) * 10,
          trend: Math.random() > 0.5 ? "up" : "down",
        },
      },
      charts: {
        revenue: Array.from({ length: 7 }, (_, i) => ({
          day: `Day ${i + 1}`,
          value: Math.floor(Math.random() * 5000) + 3000,
          target: Math.floor(Math.random() * 1000) + 4000,
        })),
        categories: [
          { name: "Electronics", value: Math.floor(Math.random() * 200) + 300, growth: (Math.random() - 0.5) * 20 },
          { name: "Clothing", value: Math.floor(Math.random() * 150) + 250, growth: (Math.random() - 0.5) * 15 },
          { name: "Home", value: Math.floor(Math.random() * 100) + 150, growth: (Math.random() - 0.5) * 10 },
          { name: "Beauty", value: Math.floor(Math.random() * 80) + 80, growth: (Math.random() - 0.5) * 12 },
        ],
      },
      timestamp: new Date().toISOString(),
    }

    return NextResponse.json(data)
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch data" }, { status: 500 })
  }
}
