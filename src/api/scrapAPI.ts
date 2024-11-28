import { authApiGet, authApiPatch, authApiPost } from "./apiUtils";
import { GetScrapResponse, ScrapParam, ScrappedArticle } from "./types/scrap";

export const getScrap = () => {
  return authApiGet<GetScrapResponse>("/scrap");
};

export const getScrappedArticle = (scrapId: number) => {
  return authApiGet<ScrappedArticle>("/scrap/info", { scrapId });
};

export const postScrap = ({ articleId }: ScrapParam) => {
  return authApiPost("/scrap", undefined, { articleId });
};

export const patchUnScrap = () => {
  return authApiPatch("/scrap/unscrap");
};
