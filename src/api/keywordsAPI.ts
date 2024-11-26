import { authApiGet, authApiPut } from "./apiUtils";
import {
  GetKeywordsResponse,
  putKeywordsData,
  PutKeywordsParams,
} from "./types/keywords";

export const getKeywords = async (clientId: number) => {
  return authApiGet<GetKeywordsResponse>("/keywords", { clientId });
};

export const putKeywords = async ({ clientId, data }: PutKeywordsParams) => {
  return authApiPut<putKeywordsData>("/keywords", data, { clientId });
};
