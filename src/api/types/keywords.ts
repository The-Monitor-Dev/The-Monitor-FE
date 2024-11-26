import { CategoryTypeEn } from "types/category";

export interface Keyword {
  keywordId: number;
  keywordName: string;
  categoryType: CategoryTypeEn;
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
