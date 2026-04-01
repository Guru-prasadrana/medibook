import Hero from "./components/home/HeroSection";
import Specialties from "./components/home/Specialties";
import Recommendation from "./components/home/Recommendation";
import Testimonials from "./components/home/Testimonials";
import CTA from "./components/home/CTA";
export default function Home() {
  return (
    <>
      <Hero />
      <Specialties />
      <Recommendation />
      <Testimonials />
      <CTA />
    </>
  );
}
