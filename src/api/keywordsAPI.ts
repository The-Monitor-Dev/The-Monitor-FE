import { authApiGet, authApiPut } from "./apiUtils";
import { GetKeywordsResponse, putKeywordsData } from "./types/keywords";

export const getKeywords = async (clientId: number) => {
  return authApiGet<GetKeywordsResponse>("/keywords", { clientId });
};

export const putKeywords = async (clientId: number, data: putKeywordsData) => {
  return authApiPut<putKeywordsData>("/keywords", data, { clientId });
};
