import { authApiGet } from "./apiUtils";

export interface Keyword {
  keywordId: number;
  keywordName: string;
}

type GetKeywordsResponse = {
  [key: string]: Keyword[];
};

export const getKeywords = async (clientId: number) => {
  return authApiGet<GetKeywordsResponse>("/keywords", { clientId });
};
