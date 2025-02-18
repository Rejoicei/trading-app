"use client"

import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import { Line } from "react-chartjs-2"
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js"

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend)

const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top" as const,
    },
    title: {
      display: true,
      text: "Stock Price",
    },
  },
}

type StockData = {
  date: string
  price: number
}

export default function PriceChart() {
  const [stockData, setStockData] = useState<StockData[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const searchParams = useSearchParams()
  const symbol = searchParams.get("symbol") || "AAPL"

  useEffect(() => {
    const fetchStockData = async () => {
      setIsLoading(true)
      setError(null)
      try {
        const response = await fetch(`/api/stock?symbol=${symbol}`)
        if (!response.ok) {
          throw new Error("Failed to fetch stock data")
        }
        const data = await response.json()
        setStockData(data)
      } catch (err) {
        setError("Error fetching stock data. Please try again.")
      } finally {
        setIsLoading(false)
      }
    }

    fetchStockData()
    const interval = setInterval(fetchStockData, 60000) // Update every minute

    return () => clearInterval(interval)
  }, [symbol])

  const chartData = {
    labels: stockData.map((d) => d.date),
    datasets: [
      {
        label: symbol,
        data: stockData.map((d) => d.price),
        borderColor: "rgb(75, 192, 192)",
        backgroundColor: "rgba(75, 192, 192, 0.5)",
      },
    ],
  }

  if (isLoading) return <div>Loading...</div>
  if (error) return <div className="text-red-500">{error}</div>

  return <Line options={options} data={chartData} />
}

