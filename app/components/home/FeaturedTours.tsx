import Image from "next/image"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"

export default function FeaturedTours() {
    const featuredTours = [
        {
          id: 1,
          title: "Mountain Trek",
          description: "Experience the thrill of mountain climbing",
          price: "$999",
          image: "/tours/tour1.jpg",
        },
        { id: 2, title: "Beach Getaway", description: "Set sail for the Arctic Circle on an Expedition Cruise with Manfredi Lefebvre d’Ovidio, Executive Chairman of A&K Travel Group.", price: "$799", image: "/tours/tour2.jpg" },
        { id: 3, title: "City Explorer", description: "Discover vibrant city cultures", price: "$899", image: "/tours/tour1.jpg" },
      ];

    return (
        <section className="py-16 bg-[#f1e7d3]">
            <div className="container max-w-5xl mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {featuredTours.map((item) => (
                    <Link key={item.title} href="/">
                        <Card className="group overflow-hidden border-none rounded-none bg-transparent h-72">
                        <div className="relative aspect-[3/4] overflow-hidden">
                            <Image
                            src={item.image || "/placeholder.svg"}
                            alt={item.title}
                            fill
                            className="object-cover transition-transform duration-500 group-hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                            <CardContent className="absolute inset-0 flex flex-col justify-start p-6 text-white">
                            <h3 className="text-xl font-thin mb-3 leading-tight text-center">{item.title}</h3>
                            <p className="text-xs text-white/80 line-clamp-3 text-center">{item.description}</p>
                            </CardContent>
                        </div>
                        </Card>
                    </Link>
                    ))}
                </div>
            </div>
        </section>
    )
}