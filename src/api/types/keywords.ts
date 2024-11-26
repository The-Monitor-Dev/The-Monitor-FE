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

export interface PutKeywordsData {
  keywordsByCategory: KeywordsByCategory;
}

export interface PutKeywordsParams {
  data: PutKeywordsData;
}
