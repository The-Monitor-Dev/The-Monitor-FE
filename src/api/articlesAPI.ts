import { authApiGet } from "./apiUtils";
import {
  GetArticlesByKeywordParams,
  GetArticlesParams,
  GetArticlesResponse,
} from "./types/articles";

export const getArticles = async ({
  clientId,
  categoryType,
  page,
}: GetArticlesParams) => {
  return authApiGet<GetArticlesResponse>("/articles", {
    clientId,
    categoryType,
    page,
  });
};

export const getArticlesByKeyword = async ({
  keywordId,
  clientId,
  categoryType,
  page,
}: GetArticlesByKeywordParams) => {
  return authApiGet<GetArticlesResponse>("/articles/search", {
    keywordId,
    clientId,
    categoryType,
    page,
  });
};
