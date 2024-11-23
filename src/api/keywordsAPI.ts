import { authApiGet } from "./apiUtils";

export interface Keyword {
  keywordId: number;
  keywordName: string;
}

export interface GetKeywordsResponse {
  SELF: Keyword[];
  COMPETITOR: Keyword[];
  INDUSTRY: Keyword[];
}

export const getKeywords = async (clientId: number) => {
  return authApiGet<GetKeywordsResponse>("/keywords", { clientId });
};
