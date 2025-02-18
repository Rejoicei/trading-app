"use client"

import { useState } from "react"
import { useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

export default function OrderForm() {
  const [orderType, setOrderType] = useState("buy")
  const [amount, setAmount] = useState("")
  const [price, setPrice] = useState("")
  const searchParams = useSearchParams()
  const symbol = searchParams.get("symbol") || "AAPL"

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would typically send the order to your backend or trading API
    console.log("Order submitted:", { symbol, orderType, amount, price })
    // Reset form
    setAmount("")
    setPrice("")
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-lg p-4">
      <h2 className="text-xl font-semibold mb-4">Place Order for {symbol}</h2>
      <div className="space-y-4">
        <RadioGroup value={orderType} onValueChange={setOrderType}>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="buy" id="buy" />
            <Label htmlFor="buy">Buy</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="sell" id="sell" />
            <Label htmlFor="sell">Sell</Label>
          </div>
        </RadioGroup>

        <div className="space-y-2">
          <Label htmlFor="amount">Amount (Shares)</Label>
          <Input
            id="amount"
            type="number"
            step="1"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="price">Price (USD)</Label>
          <Input
            id="price"
            type="number"
            step="0.01"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />
        </div>

        <Button type="submit" className="w-full">
          Place {orderType.charAt(0).toUpperCase() + orderType.slice(1)} Order
        </Button>
      </div>
    </form>
  )
}

