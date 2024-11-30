import { authApiGet, authApiPut } from "./apiUtils";
import { GetKeywordsResponse, PutKeywordsParams } from "./types/keywords";

export const getKeywords = async () => {
  return authApiGet<GetKeywordsResponse>("/keywords");
};

export const putKeywords = async ({ data }: PutKeywordsParams) => {
  return authApiPut("/keywords", data);
};
