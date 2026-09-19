import Footer from "@/components/Footer";
import HeroSection from "@/components/HeroSection";
import StatsSection from "@/components/StatsSection";
import FeaturedEbooks from "@/components/FeaturedEbooks";
import FeaturesSection from "@/components/FeaturesSection";
import TopWriters from "@/components/TopWriters";
import GenreSection from "@/components/GenreSection";


export default function Home() {
  return (
    <>
      <HeroSection />
      <StatsSection />
      <FeaturedEbooks />
      <FeaturesSection />
      <TopWriters />
      <GenreSection />
      <Footer />
    </>
  );
}