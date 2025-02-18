"use client"

import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"

type Trade = {
  id: number
  price: number
  amount: number
  type: "buy" | "sell"
  timestamp: Date
}

export default function RecentTrades() {
  const [trades, setTrades] = useState<Trade[]>([])
  const searchParams = useSearchParams()
  const symbol = searchParams.get("symbol") || "AAPL"

  useEffect(() => {
    const generateTrade = (): Trade => ({
      id: Date.now(),
      price: Math.random() * 100 + 100, // Random price between 100 and 200
      amount: Math.random() * 100 + 1, // Random amount between 1 and 101
      type: Math.random() > 0.5 ? "buy" : "sell",
      timestamp: new Date(),
    })

    const interval = setInterval(() => {
      const newTrade = generateTrade()
      setTrades((currentTrades) => [newTrade, ...currentTrades.slice(0, 9)])
    }, 2000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="bg-white shadow-md rounded-lg p-4">
      <h2 className="text-xl font-semibold mb-4">Recent Trades for {symbol}</h2>
      <ul className="space-y-2">
        {trades.map((trade) => (
          <li key={trade.id} className="flex justify-between items-center">
            <span className={`font-medium ${trade.type === "buy" ? "text-green-600" : "text-red-600"}`}>
              {trade.type.toUpperCase()}
            </span>
            <span>{trade.amount.toFixed(2)} shares</span>
            <span>${trade.price.toFixed(2)}</span>
            <span className="text-gray-500 text-sm">{trade.timestamp.toLocaleTimeString()}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

