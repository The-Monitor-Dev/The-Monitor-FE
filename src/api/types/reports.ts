// Response

export interface ReportResponse {
  reportId: number;
  title: string;
  createdAt: string;
  updatedAt: string;
}
interface ReportArticle {
  publishedDate: string;
  headLine: string;
  url: string;
  media: string;
  reporter: string;
  summary: string;
}

interface ReportCategory {
  reportCategoryId: number;
  reportCategoryName: string;
  reportCategoryDescription: string;
  reportArticlesResponses: ReportArticle[];
}

export interface GetReportDetailsResponse {
  title: string;
  color: string;
  logo: string;
  articles: {
    SELF: ReportCategory[];
    COMPETITOR: ReportCategory[];
    INDUSTRY: ReportCategory[];
  };
}

// Params

export interface PostSearchReportsParams {
  clientId: number;
  searchTitle: string;
}

export interface PostReportArticleParams extends ReportParams {
  data: {
    categoryType: string;
    keyword: string;
    headLine: string;
    url: string;
    publishedDate: string;
    media: string;
    reporter: string;
  };
}

export interface ReportParams {
  clientId: number;
  reportId: number;
}

export interface PatchReportTitleParams extends ReportParams {
  data: {
    title: string;
  };
}
export interface PatchReportColorParams extends ReportParams {
  data: {
    color: string;
  };
}
export interface PatchReportLogoParams extends ReportParams {
  logo: File;
}
