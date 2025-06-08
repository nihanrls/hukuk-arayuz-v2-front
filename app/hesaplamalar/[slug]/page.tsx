import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { FiArrowLeft } from "react-icons/fi";
import NafakaCalculator from "@/components/calculators/NafakaCalculator";
import KidemTazminatiCalculator from "@/components/calculators/KidemTazminatiCalculator";
import IhbarTazminatiCalculator from "@/components/calculators/IhbarTazminatiCalculator";
import FazlaMesaiCalculator from "@/components/calculators/FazlaMesaiCalculator";
import TapuHarciCalculator from "@/components/calculators/TapuHarciCalculator";
import IcraMasraflariCalculator from "@/components/calculators/IcraMasraflariCalculator";
import VekaletUcretiCalculator from "@/components/calculators/VekaletUcretiCalculator";
import DavaMasraflariCalculator from "@/components/calculators/DavaMasraflariCalculator";

interface CalculatorPageProps {
  params: Promise<{ slug: string }>;
}

const calculators = {
  "nafaka-hesaplama": {
    title: "Nafaka Hesaplama",
    description: "Boşanma davalarında nafaka miktarını hesaplayın",
    component: NafakaCalculator,
    category: "Aile Hukuku",
  },
  "kidem-tazminati": {
    title: "Kıdem Tazminatı Hesaplama",
    description: "İş sözleşmesi sonunda kıdem tazminatı hesaplayın",
    component: KidemTazminatiCalculator,
    category: "İş Hukuku",
  },
  "ihbar-tazminati": {
    title: "İhbar Tazminatı Hesaplama",
    description: "İş sözleşmesi feshi ihbar tazminatı hesaplayın",
    component: IhbarTazminatiCalculator,
    category: "İş Hukuku",
  },
  "fazla-mesai": {
    title: "Fazla Mesai Ücreti Hesaplama",
    description: "Fazla mesai ve hafta tatili çalışma ücretlerini hesaplayın",
    component: FazlaMesaiCalculator,
    category: "İş Hukuku",
  },
  "tapu-harci": {
    title: "Tapu Harcı Hesaplama",
    description: "Gayrimenkul alım-satım tapu harçlarını hesaplayın",
    component: TapuHarciCalculator,
    category: "Gayrimenkul Hukuku",
  },
  "icra-masraflari": {
    title: "İcra Masrafları Hesaplama",
    description: "İcra takibi masraf ve harçlarını hesaplayın",
    component: IcraMasraflariCalculator,
    category: "İcra Hukuku",
  },
  "vekalet-ucreti": {
    title: "Vekalet Ücreti Hesaplama",
    description: "Avukatlık vekalet ücret tarifesini hesaplayın",
    component: VekaletUcretiCalculator,
    category: "Genel",
  },
  "dava-masraflari": {
    title: "Dava Masrafları Hesaplama",
    description: "Dava açma harç ve masraflarını hesaplayın",
    component: DavaMasraflariCalculator,
    category: "Genel",
  },
};

export async function generateMetadata({ params }: CalculatorPageProps): Promise<Metadata> {
  const { slug } = await params;
  const calculator = calculators[slug as keyof typeof calculators];

  if (!calculator) {
    return {
      title: "Hesaplama Bulunamadı",
    };
  }

  return {
    title: `${calculator.title} - Hukuk Bürosu`,
    description: calculator.description,
    keywords: `${calculator.title.toLowerCase()}, hukuki hesaplama, ${calculator.category.toLowerCase()}`,
  };
}

export async function generateStaticParams() {
  return Object.keys(calculators).map((slug) => ({
    slug,
  }));
}

export default async function CalculatorPage({ params }: CalculatorPageProps) {
  const { slug } = await params;
  const calculator = calculators[slug as keyof typeof calculators];

  if (!calculator) {
    notFound();
  }

  const CalculatorComponent = calculator.component;

  return (
    <div className="min-h-screen bg-gray-50 py-20 pt-32 text-black">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Breadcrumb */}
        <div className="mb-8">
          <Link
            href="/hesaplamalar"
            className="inline-flex items-center text-blue-600 hover:text-blue-700 transition-colors"
          >
            <FiArrowLeft className="mr-2 h-4 w-4" />
            Hesaplamalara Dön
          </Link>
        </div>

        {/* Calculator Component */}
        <CalculatorComponent />
      </div>
    </div>
  );
} 