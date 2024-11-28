// Response

export interface ReportResponse {
  reportId: number;
  title: string;
  createdAt: string;
  updatedAt: string;
}
export interface ReportArticle {
  reportArticleId: number;
  keyword: string;
  publishedDate: string;
  headLine: string;
  url: string;
  media: string;
  reporter: string;
  summary: string;
}

export interface ReportCategory {
  reportCategoryId: number;
  reportCategoryName: string;
  reportCategoryDescription: string;
  reportArticlesResponses: ReportArticle[];
  default: boolean;
}

export interface GetReportDetailsResponse {
  title: string;
  color: string;
  logo: string;
  articles: [
    {
      SELF: ReportCategory[];
      COMPETITOR: ReportCategory[];
      INDUSTRY: ReportCategory[];
    },
  ];
}

interface ReportCategoryInfo {
  reportCategoryId: number;
  reportCategoryName: string;
  reportCategoryDescription: string;
  isDefault: string;
}

export interface GetReportArticleCategoriesResponse {
  SELF: ReportCategoryInfo[];
  COMPETITOR: ReportCategoryInfo[];
  INDUSTRY: ReportCategoryInfo[];
}

export interface GetReportArticlesOptionsResponse {
  media: boolean;
  reporter: boolean;
}
export interface PostReportResponse {
  reportId: number;
}

// Params
export interface ReportParams {
  reportId: number;
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

interface PostReportCategory {
  reportCategoryName: string;
  reportCategoryDescription: string;
  articleId: number[];
}

export interface PostReportParams {
  data: {
    reportTitle: string;
    color: string;
    media: boolean;
    reporter: boolean;
    articles: {
      SELF: PostReportCategory[];
      COMPETITOR: PostReportCategory[];
      INDUSTRY: PostReportCategory[];
    };
  };
  logo: File | null;
}

export interface PostReportArticleCategoryParams extends ReportParams {
  data: {
    reportCategoryName: string;
    reportCategoryDescription: string;
    reportCategoryType: string;
  };
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

export interface PatchReportArticleSummaryParams extends ReportParams {
  reportArticleId: number;
  data: {
    summary: string;
  };
}

export interface PatchReportArticleCategoryParams extends ReportParams {
  reportArticleId: number;
  newCategoryId: number;
}

export interface PatchReportArticlesOptionsParams extends ReportParams {
  data: {
    media: boolean;
    reporter: boolean;
  };
}

export interface DeleteReportArticleParams extends ReportParams {
  reportArticleId: number;
}

export interface DeleteReportArticleCategoryPrams extends ReportParams {
  categoryId: number;
}
