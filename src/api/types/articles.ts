import { CategoryTypeEn } from "types/category";

export interface Article {
  articleId: number;
  title: string;
  body: string;
  url: string;
  imageUrl: string;
  publisherName: string;
  publishDate: string;
  reporterName: string;
  scrapped: boolean;
  added: boolean;
  read: boolean;
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
  categoryType: CategoryTypeEn | undefined;
  page: number;
}
export interface GetArticlesByKeywordParams {
  keywordId: number | undefined;
  categoryType: CategoryTypeEn | undefined;
  page: number;
}
