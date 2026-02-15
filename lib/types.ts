export type ScoreRecord = {
  aiscore: number;
  fundamental: number;
  technical: number;
  sentiment: number;
  low_risk: number;
};

export type RankingRow = {
  ticker: string;
  rank: number;
  companyName: string | null;
  country: string | null;
  countryCode: string | null;
  aiscore: number;
  fundamental: number;
  technical: number;
  sentiment: number;
  low_risk: number;
  change: number | null;
  volume: number | null;
  industry: string | null;
  buyTrackRecord?: boolean;
  sellTrackRecord?: boolean;
};

export type SectorItem = { sector: string };
export type IndustryItem = { industry: string };

export type SectorScoresResponse = {
  sector?: string;
  slug?: string;
  scores: Array<{
    date: string;
    aiscore: string;
    technical: string;
    fundamental: string;
    sentiment: string;
    low_risk: string;
  }>;
};

export type IndustryScoresResponse = {
  industry: string;
  scores: Array<{
    date: string;
    aiscore: string;
    technical: string;
    fundamental: string;
    sentiment: string;
    low_risk: string;
  }>;
};

export type RankingApiResponse = Record<string, Record<string, ScoreRecord>>;
