import { authApiGet, authApiPut } from "./apiUtils";

export interface Keyword {
  keywordId: number;
  keywordName: string;
}

type GetKeywordsResponse = {
  [key: string]: Keyword[];
};

export interface GetEmailsResponse {
  recipients: string[];
  ccs: string[];
  signatureImageUrl: string | null;
}

interface KeywordsByCategory {
  SELF: string[];
  COMPETITOR: string[];
  INDUSTRY: string[];
}

export interface putKeywordsData {
  keywordsByCategory: KeywordsByCategory;
}

export interface putEmailsData {
  recipients: string[];
  ccs: string[];
}

export const getKeywords = async (clientId: number) => {
  return authApiGet<GetKeywordsResponse>("/keywords", { clientId });
};

export const getEmails = async (clientId: number) => {
  return authApiGet<GetEmailsResponse>("/emails", { clientId });
};

export const putKeywords = async (clientId: number, data: putKeywordsData) => {
  return authApiPut<putKeywordsData>("/keywords", data, { clientId });
};

export const putEmails = async (clientId: number, data: FormData) => {
  return authApiPut("/emails", data, { clientId });
};
