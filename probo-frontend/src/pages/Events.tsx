import { Calendar } from "lucide-react"
import Card from "@/components/card"
import { Button } from "@/components/ui/button"
import { TopEventsCarousel } from "@/components/TopEventsCarousel"

export const Events = () => {
  const topEvents = [
    {
      id: 1,
      title: "Cricket World Cup Final",
      description: "India vs Australia - Final Match of the ICC Cricket World Cup 2024. Will India bring home the trophy? Join thousands of traders in predicting the outcome of this historic match.",
      date: "2024-04-15",
      category: "Sports",
      probability: 0.75,
    },
    {
      id: 2,
      title: "Bitcoin Price Prediction",
      description: "Will Bitcoin reach $100,000 by end of 2024? With institutional adoption on the rise and the upcoming halving event, crypto enthusiasts are betting big on Bitcoin's future.",
      date: "2024-12-31",
      category: "Cryptocurrency",
      probability: 0.65,
    },
    {
      id: 3,
      title: "US Presidential Election",
      description: "Who will win the 2024 US Presidential Election? As campaign season heats up, traders are placing their bets on the next leader of the world's largest economy.",
      date: "2024-11-05",
      category: "Politics",
      probability: 0.55,
    },
    {
      id: 4,
      title: "Tesla Stock Price Target",
      description: "Will Tesla (TSLA) stock hit $500 by Q2 2024? With new model launches and expansion into emerging markets, investors are closely watching Tesla's next move.",
      date: "2024-06-30",
      category: "Finance",
      probability: 0.62,
    },
    {
      id: 5,
      title: "FIFA World Cup Host 2030",
      description: "Will Saudi Arabia win the bid to host FIFA World Cup 2030? As the bidding process enters its final stages, traders are speculating on the next host nation.",
      date: "2024-09-15",
      category: "Sports",
      probability: 0.45,
    }
  ]

  const allEvents = [
    ...topEvents,
    {
      id: 6,
      title: "AI Regulation Bill",
      description: "Will the EU pass comprehensive AI regulation by 2024?",
      date: "2024-08-20",
      category: "Technology",
      probability: 0.70,
    },
    {
      id: 7,
      title: "Olympic Medal Count",
      description: "Will USA win the most gold medals in Paris 2024?",
      date: "2024-07-26",
      category: "Sports",
      probability: 0.68,
    },
    // Add more events as needed
  ]

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Prediction Events</h1>
          <Button>
            <Calendar className="mr-2" />
            Create Event
          </Button>
        </div>

        {/* Top Stories Section */}
        <div className="mb-12">
          <h2 className="text-2xl font-semibold mb-6">Top Stories</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <TopEventsCarousel events={topEvents} />
          </div>
        </div>

        {/* All Events Section */}
        <div>
          <h2 className="text-2xl font-semibold mb-6">All Events</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {allEvents.map((event) => (
              <Card key={event.id}>
                <div className="p-6 min-h-[250px] flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-xl font-semibold mb-2">{event.title}</h3>
                        <p className="text-gray-600">{event.description}</p>
                      </div>
                      <span className="bg-indigo-100 text-indigo-800 text-sm font-medium px-2.5 py-0.5 rounded">
                        {event.category}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <div className="text-sm text-gray-500">
                        <Calendar className="inline-block mr-1 h-4 w-4" />
                        {event.date}
                      </div>
                      <div className="text-sm font-medium">
                        Probability: {(event.probability * 100).toFixed(0)}%
                      </div>
                    </div>
                  </div>
                  <div className="mt-4">
                    <Button className="w-full">Trade Now</Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
