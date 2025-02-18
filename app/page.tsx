import SearchBar from "@/components/SearchBar"
import PriceChart from "@/components/PriceChart"
import RecentTrades from "@/components/RecentTrades"
import OrderForm from "@/components/OrderForm"

export default function Home() {
  return (
    <main className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Live Trading Dashboard</h1>
      <SearchBar />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        <div className="col-span-1 md:col-span-2">
          <PriceChart />
        </div>
        <div>
          <RecentTrades />
        </div>
        <div>
          <OrderForm />
        </div>
      </div>
    </main>
  )
}

