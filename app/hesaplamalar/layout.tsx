import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Hukuki Hesaplamalar - Hukuk Bürosu",
  description: "Nafaka, kıdem tazminatı, tapu harcı ve diğer hukuki hesaplamalar için ücretsiz hesaplama araçları.",
  keywords: "nafaka hesaplama, kıdem tazminatı, ihbar tazminatı, tapu harcı, hukuki hesaplama, avukat hesaplama",
};

export default function HesaplamalarLayout({ children }: { children: React.ReactNode }) {
  return children;
}