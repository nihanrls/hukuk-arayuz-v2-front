import Image from "next/image";
import HeroSection from "../components/herosec";
import PracticeAreas from "../components/practiceareas";
import PrivacyComponent from "../components/bilgigizliligi";

export default function Home() {
  return (
    <div>
      <HeroSection />
      <PracticeAreas />      
      <PrivacyComponent />
    </div>
  );
}
