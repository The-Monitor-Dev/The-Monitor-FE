export interface Keyword {
  keywordId: number;
  keywordName: string;
}

export type GetKeywordsResponse = {
  [key: string]: Keyword[];
};

interface KeywordsByCategory {
  SELF: string[];
  COMPETITOR: string[];
  INDUSTRY: string[];
}

export interface putKeywordsData {
  keywordsByCategory: KeywordsByCategory;
}

export interface PutKeywordsParams {
  clientId: number;
  data: putKeywordsData;
}
