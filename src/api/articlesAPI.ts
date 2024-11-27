import { authApiGet } from "./apiUtils";
import {
  GetArticlesByKeywordParams,
  GetArticlesParams,
  GetArticlesResponse,
} from "./types/articles";

export const getArticles = async ({
  categoryType,
  page,
}: GetArticlesParams) => {
  return authApiGet<GetArticlesResponse>("/articles", {
    categoryType,
    page,
  });
};

export const getArticlesByKeyword = async ({
  keywordId,
  categoryType,
  page,
}: GetArticlesByKeywordParams) => {
  return authApiGet<GetArticlesResponse>("/articles/keyword", {
    keywordId,
    categoryType,
    page,
  });
};
