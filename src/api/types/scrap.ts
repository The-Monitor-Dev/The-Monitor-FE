export interface ScrappedArticle {
  originalArticleId: number;
  scrapId: number;
  keyword: string;
  title: string;
  body: string;
  url: string;
  imageUrl: string;
  publisherName: string;
  publishDate: string;
  reporterName: string;
  categoryType: string;
}

export interface GetScrapResponse {
  SELF: ScrappedArticle[];
  COMPETITOR: ScrappedArticle[];
  INDUSTRY: ScrappedArticle[];
}

export interface ScrapParam {
  articleId: number;
}
