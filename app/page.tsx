import Hero from "./components/home/Hero";
import FeaturedTours from "./components/home/FeaturedTours";
import TrendingTours from "./components/home/TrendingTours";
import TravelCardGrid from "./components/home/Travel/TravelCardGrid";
import JourneyCardGrid from "./components/home/Journey/JourneyCardGrid";
import About from "./components/home/About";
import data from "@/data/configs.json";

export const metadata = {
  title: data.meta.title,
  description: data.meta.description,
};

export default function Home() {
  return (
    <div>
      <Hero/>
      <FeaturedTours/>
      <JourneyCardGrid/>
      <TrendingTours/>
      <TravelCardGrid/>
      <About/>
    </div>
  );
}
