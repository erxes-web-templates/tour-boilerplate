import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import Image from "next/image"
import type { TravelCard } from "@/types/travel"

interface TravelCardProps {
  card: TravelCard
  isFullWidth?: boolean
}

export function TravelCardComponent({ card, isFullWidth = false }: TravelCardProps) {
  return (
    <Card className="bg-[#f5f0e8] overflow-hidden">
      {isFullWidth ? (
        <div className="grid md:grid-cols-5">
          <div className="md:col-span-3 h-[400px] relative">
            <Image src={card.image || "/placeholder.svg"} alt={card.title} fill className="object-cover" />
          </div>
          <div className="md:col-span-2 p-8 flex flex-col justify-center">
            <span className="text-sm font-light uppercase tracking-wider">{card.category}</span>
            <h3 className="text-xl font-light mt-4 mb-4">{card.title}</h3>
            <p className="text-xs font-light text-gray-600 mb-6">{card.description}</p>
            <Button variant="link" className="text-black font-light underline hover:no-underline p-0 h-auto">
                DISCOVER MORE
            </Button>
          </div>
        </div>
      ) : (
        <div className="flex flex-col h-full">
          <div className="h-[300px] relative">
            <Image src={card.image || "/placeholder.svg"} alt={card.title} fill className="object-cover" />
          </div>
          <CardContent className="p-8 flex flex-col flex-grow">
            <div className="flex-grow">
                <span className="text-sm font-light uppercase tracking-wider">{card.category}</span>
                <h3 className="text-xl font-light mt-4 mb-4">{card.title}</h3>
                <p className="text-xs font-light text-gray-600 mb-6">{card.description}</p>
            </div>
            <Button variant="link" className="place-self-start text-black font-light underline hover:no-underline p-0 h-auto">
                DISCOVER MORE
            </Button>
          </CardContent>
        </div>
      )}
    </Card>
  )
}

