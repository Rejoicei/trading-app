"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export default function SearchBar() {
  const [query, setQuery] = useState("")
  const router = useRouter()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (query) {
      router.push(`/?symbol=${query.toUpperCase()}`)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <Input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Enter stock symbol (e.g., AAPL)"
        className="flex-grow"
      />
      <Button type="submit">Search</Button>
    </form>
  )
}

