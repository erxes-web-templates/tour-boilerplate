import Link from "next/link"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"

export default function TrendingTours() {
    const trendingTours = [
        {
            id: 1,
            title: "Discover Magical Ancient Kingdoms on Our Latest Private Jet Journey",
            description: "Hop between intriguing destinations including Zanzibar, India, Morocco, Cambodia and Oman on our latest A&K Private Jet Journey, Ancient Kingdoms & Dynasties.",
            price: "$999",
            image: "/tours/tour1.jpg",
        },
        { id: 2, title: "Arctic Cruise Adventure: In Search of the Polar Bear", description: "Set sail for the Arctic Circle on an Expedition Cruise with Manfredi Lefebvre d’Ovidio, Executive Chairman of A&K Travel Group.", price: "$799", image: "/tours/tour2.jpg" },
        { id: 3, title: "A&K Private Estates: Five Quintessential Tuscan Hideaways", description: "Hop between intriguing destinations including Zanzibar, India, Morocco, Cambodia and Oman on our latest A&K Private Jet Journey, Ancient Kingdoms & Dynasties.", price: "$899", image: "/tours/tour1.jpg" },
    ];

    return (
        <section className="py-16 bg-[#FAF7F2]">
            <div className="container max-w-5xl mx-auto px-4">
                <div className="text-center mb-12">
                <span className="font-extralight text-sm tracking-widest text-[#CD7F32]">TRENDING</span>
                <h2 className="text-3xl md:text-4xl font-extralight mt-2">New Adventures to Get Excited About</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {trendingTours.map((item) => (
                    <Link key={item.title} href="/">
                    <Card className="group overflow-hidden border-none rounded-none bg-transparent">
                        <div className="relative aspect-[3/4] overflow-hidden">
                        <Image
                            src={item.image || "/placeholder.svg"}
                            alt={item.title}
                            fill
                            className="object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                        <CardContent className="absolute inset-0 flex flex-col justify-end p-6 text-white">
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