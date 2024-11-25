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

export interface GetEmailsResponse {
  recipients: string[];
  ccs: string[];
  signatureImageUrl: string;
}

export const getKeywords = async (clientId: number) => {
  return authApiGet<GetKeywordsResponse>("/keywords", { clientId });
};

export const getEmails = async (clientId: number) => {
  return authApiGet<GetEmailsResponse>("/emails", { clientId });
};
