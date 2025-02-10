import Image from "next/image";
import HeroSection from "../components/herosec";
import PracticeAreas from "../components/practiceareas";
export default function Home() {
  return (
    <div>
      <HeroSection />
      <PracticeAreas />      
    </div>
  );
}
