import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import TravelCardGrid from "./components/TravelCardGrid";
import data from "@/data/configs.json";

export const metadata = {
  title: data.meta.title,
  description: data.meta.description,
};

export default function Home() {

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
    <div>
      {/* Hero Section */}
      <div className="relative h-screen w-full overflow-hidden">
        <video autoPlay muted loop playsInline className="absolute top-0 left-0 w-full h-full object-cover">
          <source src="https://cdn.abercrombiekent.com/files/bsiop5ln/production/5b783d00300c87f2ae7550551195a54378d361e3.mov" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-black/40" />
        {/* Content */}
        <div className="relative h-full flex flex-col items-center justify-center px-4 text-white">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-extralight leading-tight">
              Since 1962 we have set the standard for experiential travel. We believe that every journey should be
              extraordinary; every life, well-travelled.
            </h1>
            <div className="max-w-md mx-auto w-full">
              <Button className="bg-white/10 border-white/20 text-white font-light placeholder:text-white/70 text-center h-12">
                WHERE DO YOU WANT TO GO              
              </Button>
            </div>
          </div>
      </div>
      <Button className="font-light absolute bottom-8 right-8 bg-[#CD7F32] hover:bg-[#B87333] text-white">
        SPEAK TO AN EXPERT
      </Button>
    </div>

      {/* Featured Tours */}
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
      
      {/* Trending Tours */}
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
      
      {/* Why travel section*/}
      <TravelCardGrid/>

      {/* About Section */}
      <section className="bg-[#FAF7F2] grid grid-cols-1 lg:grid-cols-2">
        <div className="relative h-[600px] lg:h-auto">
          <video autoPlay muted loop playsInline className="absolute inset-0 w-full h-full object-cover">
            <source src="https://cdn.abercrombiekent.com/files/bsiop5ln/production/bf8abe3ec1b71c32d3310d070755321c1d3553dd.mov" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-black/20" /> {/* Optional overlay for better text contrast */}
        </div>
        <div className="bg-[#FAF7F2] p-8 md:p-16 lg:p-24 flex flex-col justify-center">
          <div className="max-w-xl">
          <div className="text-center pb-20">
            <span className="font-extralight text-sm tracking-widest text-[#CD7F32]">OUR STORY</span>
          </div>
            <h2 className="text-3xl md:text-4xl font-extralight mb-8">Travel Responsibly</h2>

            <div className="space-y-6 text-gray-700 text-sm font-light">
              <p>
                We believe travel should be a force for good. In the 1960s, our founder Geoffrey Kent and Jorie Butler
                Kent pioneered the community-first approach to conservation. Today, we still believe that the best way to
                protect our planet's remaining wilderness is to invest in the communities who live there.
              </p>

              <p>
                Every trip you book with us benefits grassroots community and conservation initiatives led by our
                nonprofit arm, A&K Philanthropy (AKP). We now support 55 projects in 25 countries, helping preserve some
                of the world's most precious ecosystems, and ensuring that the people in the places where we travel are
                benefitting directly from tourism.
              </p>

              <p>
                We are committed to advancing conscious travel. With your help, we aim to incorporate A&K Philanthropy
                ventures into every journey we create in the destinations where AKP operates.
              </p>
            </div>

            <div className="mt-12 space-y-4">
              <Button variant="link" className="text-black font-light underline hover:no-underline p-0 h-auto">
                FIND OUT MORE
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form
      <section id="contact" className="py-16 bg-gray-100">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 text-center">Contact Us</h2>
          <div className="max-w-md mx-auto">
            <form>
              <div className="mb-4">
                <Input type="text" placeholder="Your Name" />
              </div>
              <div className="mb-4">
                <Input type="email" placeholder="Your Email" />
              </div>
              <div className="mb-4">
                <Textarea placeholder="Your Message" />
              </div>
              <Button type="submit" className="w-full" variant="secondary">
                Send Message
              </Button>
            </form>
          </div>
        </div>
      </section> */}
    </div>
  );
}
