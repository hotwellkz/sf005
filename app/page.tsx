import { Navbar } from "@/components/navbar";
import { Hero } from "@/components/hero";
import { RankingSection } from "@/components/ranking/ranking-section";

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <RankingSection />
      </main>
    </>
  );
}
