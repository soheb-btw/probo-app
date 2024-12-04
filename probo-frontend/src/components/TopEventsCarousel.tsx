import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Card from "./card"
import { Button } from "./ui/button"
import { Calendar } from "lucide-react"

interface Event {
  id: number
  title: string
  description: string
  date: string
  category: string
  probability: number
}

interface TopEventsCarouselProps {
  events: Event[]
}

export const TopEventsCarousel = ({ events }: TopEventsCarouselProps) => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const navigate = useNavigate()

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => 
        prevIndex === events.length - 1 ? 0 : prevIndex + 1
      )
    }, 5000) // Change slide every 5 seconds

    return () => clearInterval(interval)
  }, [events.length])

  const currentEvent = events[currentIndex]

  const handleEventClick = () => {
    navigate(`/trade/${currentEvent.id}`)
  }

  return (
    <Card>
      <div className="p-8 min-h-[400px] flex flex-col justify-between" onClick={handleEventClick}>
        <div>
          <div className="flex justify-between items-start mb-6">
            <div className="max-w-2xl">
              <h2 className="text-2xl font-bold mb-4">{currentEvent.title}</h2>
              <p className="text-gray-600 text-lg">{currentEvent.description}</p>
            </div>
            <span className="bg-indigo-100 text-indigo-800 text-sm font-medium px-3 py-1 rounded-full">
              {currentEvent.category}
            </span>
          </div>
          
          <div className="flex justify-between items-center">
            <div className="text-sm text-gray-500">
              <Calendar className="inline-block mr-1 h-4 w-4" />
              {currentEvent.date}
            </div>
            <div className="text-sm font-medium">
              Probability: {(currentEvent.probability * 100).toFixed(0)}%
            </div>
          </div>
        </div>

        <div className="mt-8">
          <Button size="lg" className="w-full md:w-auto px-8">
            Trade Now
          </Button>
        </div>

  
      </div>
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
          {events.map((_, index) => (
            <button
              key={index}
              className={`w-2 h-2 rounded-full transition-colors ${
                index === currentIndex ? 'bg-indigo-600' : 'bg-gray-300'
              }`}
              onClick={() => setCurrentIndex(index)}
            />
          ))}
        </div>
    </Card>
  )
}
