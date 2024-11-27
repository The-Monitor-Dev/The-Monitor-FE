// Response

export interface ReportResponse {
  reportId: number;
  title: string;
  createdAt: string;
  updatedAt: string;
}
interface ReportArticle {
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
    articles: {
      SELF: PostReportCategory[];
      COMPETITOR: PostReportCategory[];
      INDUSTRY: PostReportCategory[];
    };
  };
  logo: File | null;
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

export interface DeleteReportArticleParams extends ReportParams {
  reportArticleId: number;
}
