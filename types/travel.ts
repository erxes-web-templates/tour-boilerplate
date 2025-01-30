export interface TravelCard {
  id: string
  category: string
  title: string
  description: string
  image: string
  layout?: "full" | "left-wide" | "right-wide"
}

export interface TravelRow {
  id: string
  cards: TravelCard[]
}

export interface TravelCardProps {
  image: string;
  title: string;
  description: string;
}

