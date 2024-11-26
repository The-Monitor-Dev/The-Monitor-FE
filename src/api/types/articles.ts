import { CategoryTypeEn } from "types/category";

export interface Article {
  title: string;
  body: string;
  url: string;
  imageUrl: string;
  publisherName: string;
  publishDate: string;
  reporterName: string;
}

export interface ListPageResponse {
  googleArticles: Article[];
  totalResults: number;
  keyword: string;
}

export interface GetArticlesResponse {
  listPageResponse: ListPageResponse[];
  totalCount: number;
  size: number;
}

export interface GetArticlesParams {
  clientId: number;
  categoryType: CategoryTypeEn | undefined;
  page: number;
}
export interface GetArticlesByKeywordParams {
  keywordId: number | undefined;
  clientId: number;
  categoryType: CategoryTypeEn | undefined;
  page: number;
}
