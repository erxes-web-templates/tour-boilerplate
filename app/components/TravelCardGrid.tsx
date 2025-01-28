import TravelCard from './TravelCard';

export default function TravelCardGrid(){
    const cards = [
      {
        image: "/why-tour/why-tour1.jpg",
        title: "Travel Your Way",
        description: "For six decades we have been refining the art of bespoke travel, showing every guest the world in a fresh light."
      },
      {
        image: "/why-tour/why-tour2.jpeg",
        title: "With You All The Way",
        description: "Let our experts guide you through your ideal journey, with personalized support every step of the way."
      },
      {
        image: "/why-tour/why-card2.jpeg",
        title: "Travel Thoughtfully",
        description: "We believe travel should be considered, mindful, and responsible. Every trip supports conservation efforts in the places we visit."
      },
      {
        image: "/why-tour/why-tour4.webp",
        title: "The A&K Family",
        description: "Join our family of passionate travelers and experienced guides who make every journey unique and memorable."
      }
    ];
  
    return (
      <div className="bg-[#f1e7d3] container mx-auto p-8">
        <h1 className="text-3xl md:text-4xl font-extralight text-center mb-12">Why Travel with Abercrombie & Kent?</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {cards.map((card, index) => (
            <TravelCard key={index} {...card} />
          ))}
        </div>
      </div>
    );
  };