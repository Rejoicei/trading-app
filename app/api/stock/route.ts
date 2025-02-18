import { NextResponse } from "next/server"

const API_KEY = process.env.ALPHA_VANTAGE_API_KEY

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const symbol = searchParams.get("symbol")

  if (!symbol) {
    return NextResponse.json({ error: "Symbol is required" }, { status: 400 })
  }

  try {
    const response = await fetch(
      `https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${symbol}&interval=5min&apikey=${API_KEY}`,
    )

    if (!response.ok) {
      throw new Error("Failed to fetch stock data")
    }

    const data = await response.json()
    const timeSeries = data["Time Series (5min)"]

    if (!timeSeries) {
      throw new Error("Invalid data received from Alpha Vantage")
    }

    const stockData = Object.entries(timeSeries)
      .map(([date, values]: [string, any]) => ({
        date,
        price: Number.parseFloat(values["4. close"]),
      }))
      .reverse()
      .slice(0, 100) // Get last 100 data points

    return NextResponse.json(stockData)
  } catch (error) {
    console.error("Error fetching stock data:", error)
    return NextResponse.json({ error: "Failed to fetch stock data" }, { status: 500 })
  }
}

