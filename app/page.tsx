import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
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
      image: "/placeholder.svg",
    },
    { id: 2, title: "Beach Getaway", description: "Relax on pristine beaches", price: "$799", image: "/placeholder.svg" },
    { id: 3, title: "City Explorer", description: "Discover vibrant city cultures", price: "$899", image: "/placeholder.svg" },
  ];

  return (
    <div>
      {/* Hero Section */}
      <section className="relative h-[600px]">
        <Image src="/placeholder.svg" alt="Beautiful landscape" layout="fill" objectFit="cover" />
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="text-center text-white">
            <h1 className="text-5xl font-bold mb-4">Discover Your Next Adventure.</h1>
            <p className="text-xl mb-8">Explore the world with our exciting tour packages</p>
            <Button size="lg" variant="secondary">
              Book Now
            </Button>
          </div>
        </div>
      </section>

      {/* Featured Tours */}
      <section className="py-16 bg-gray-100">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 text-center">Featured Tours</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredTours.map((tour) => (
              <Card key={tour.id}>
                <CardHeader>
                  <Image src={tour.image} alt={tour.title} width={300} height={200} className="rounded-t-lg" />
                </CardHeader>
                <CardContent>
                  <CardTitle>{tour.title}</CardTitle>
                  <CardDescription>{tour.description}</CardDescription>
                </CardContent>
                <CardFooter className="flex justify-between items-center">
                  <span className="text-lg font-bold">{tour.price}</span>
                  <Button>Book Now</Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 text-center">About Us</h2>
          <div className="flex flex-wrap items-center">
            <div className="w-full md:w-1/2 mb-8 md:mb-0">
              <Image src="/placeholder.svg" alt="About us" width={600} height={400} className="rounded-lg" />
            </div>
            <div className="w-full md:w-1/2 md:pl-8">
              <p className="text-lg mb-4">
                {`    Adventure Tours is your gateway to unforgettable experiences around the world. With over a decade of expertise in crafting unique and
                exciting tours, we're passionate about helping you create memories that last a lifetime.`}
              </p>
              <p className="text-lg mb-4">
                Our team of experienced travel enthusiasts is dedicated to providing you with top-notch service, ensuring every aspect of your journey
                is carefully planned and executed to perfection.
              </p>
              <Button variant="outline">Learn More</Button>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form */}
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
      </section>
    </div>
  );
}
