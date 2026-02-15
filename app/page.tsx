import { Navbar } from "@/components/navbar";
import { Hero } from "@/components/hero";
import { AIScoreLadder } from "@/components/home/AIScoreLadder";
import { RankingSection } from "@/components/ranking/ranking-section";
import { Testimonials } from "@/components/home/Testimonials";
import { AIScoreDataBlock } from "@/components/home/AIScoreDataBlock";
import { UseCasesBlock } from "@/components/home/UseCasesBlock";
import { StrategyPerformanceBlock } from "@/components/home/StrategyPerformanceBlock";
import { TradeIdeasBlock } from "@/components/home/TradeIdeasBlock";
import { ExplainableSignalsBlock } from "@/components/home/ExplainableSignalsBlock";
import { PortfolioTrackingBlock } from "@/components/home/PortfolioTrackingBlock";
import { HistoricalScoresBlock } from "@/components/home/HistoricalScoresBlock";

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <RankingSection />
        <Testimonials />
        <AIScoreLadder />
        <AIScoreDataBlock />
        <UseCasesBlock />
        <StrategyPerformanceBlock />
        <TradeIdeasBlock />
        <ExplainableSignalsBlock />
        <PortfolioTrackingBlock />
        <HistoricalScoresBlock />
      </main>
    </>
  );
}
