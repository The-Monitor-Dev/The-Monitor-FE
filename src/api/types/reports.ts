// Response

export interface ReportResponse {
  reportId: number;
  title: string;
  createdAt: string;
  updatedAt: string;
}

export interface GetReportDetailsResponse {
  reportId: number;
  title: string;
  logo: string;
  color: string;
}

// Params

export interface PostSearchReportsParams {
  clientId: number;
  searchTitle: string;
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
