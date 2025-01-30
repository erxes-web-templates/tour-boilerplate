import { TravelCardComponent } from "./JourneyCard"

export default function JourneyCardGrid() {
    const travelData = {
        rows: [
          {
            id: "row-1",
            cards: [
              {
                id: "private-travel",
                category: "TRAVEL PRIVATELY",
                title: "Adventures Custom-Made For You",
                description:
                  "Every A&K private journey is unique. Whether you want to personalize one of our expert-designed Tailormade Journeys, or an adventure that's completely bespoke, we will craft the trip of your dreams, exclusively for you.",
                image:
                  "/why-tour/why-tour1.jpg",
              },
            ],
          },
          {
            id: "row-2",
            cards: [
              {
                id: "cruise",
                category: "CRUISE",
                title: "Voyages of a Lifetime",
                description:
                  "Travelling by boat brings a fresh perspective on the world. A&K voyages transport you to sensational new frontiers, whether that's an expedition to the North or South Poles, island-hopping in the Galápagos or Indonesia, or dreamy cruises along the great rivers of the world: Amazon, Mekong, Nile or Danube.",
                image:
                  "/why-tour/why-tour2.jpeg",
              },
              {
                id: "private-jet",
                category: "PRIVATE JET",
                title: "The Ultimate Way to Travel",
                description:
                  "Flying privately opens up the farthest-flung corners of the world. Charter your own for total freedom, or join one of our Private Jet Journeys or Inspiring Expeditions led by our founder, Geoffrey Kent.",
                image:
                  "/why-tour/why-card2.jpeg",
              },
            ],
          },
          {
            id: "row-3",
            cards: [
              {
                id: "small-group",
                category: "SMALL GROUP JOURNEYS",
                title: "Join the Adventure",
                description:
                  "Our guided journeys redefine the group tour, bringing together a select collective of like-minded travellers seeking shared adventures and meaningful connections.",
                image:
                  "/why-tour/why-tour4.webp",
              },
              {
                id: "safari",
                category: "SAFARI EXPERIENCES",
                title: "Close Encounters of the Exhilarating Kind",
                description:
                  "Since our founding safari in Kenya in 1962, we have been perfecting the art of the African safari. Today our lodges span six countries across Africa, and our guides can get you closer to nature's widescreen spectacles than anyone else.",
                image:
                  "/why-tour/why-tour1.jpg",
              },
            ],
          },
        ],
      }      

  return (
    <section className="container max-w-5xl mx-auto px-4 py-16 space-y-8">
      {/* Header */}
      <div className="text-center mb-12">
        <span className="font-extralight text-sm tracking-widest text-[#CD7F32]">JOURNEYS</span>
        <h2 className="text-3xl md:text-4xl font-extralight mt-2">How do you want to travel?</h2>
      </div>

      {/* Grid Layout */}
      <div className="grid gap-8">
        {travelData.rows.map((row) => (
          <div key={row.id} className={`grid ${row.cards.length > 1 ? "md:grid-cols-2" : ""} gap-8`}>
            {row.cards.map((card) => (
              <TravelCardComponent key={card.id} card={card} isFullWidth={row.cards.length === 1} />
            ))}
          </div>
        ))}
      </div>
    </section>
  )
}

