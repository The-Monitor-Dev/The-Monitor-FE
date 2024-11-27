import {
  authApiDelete,
  authApiGet,
  authApiPatch,
  authApiPost,
} from "./apiUtils";
import {
  DeleteReportArticleParams,
  GetReportDetailsResponse,
  PatchReportArticleSummaryParams,
  PatchReportColorParams,
  PatchReportLogoParams,
  PatchReportTitleParams,
  PostReportArticleParams,
  PostReportParams,
  ReportParams,
  ReportResponse,
} from "./types/reports";

export const getReports = () => {
  return authApiGet<ReportResponse[]>("/reports");
};

export const getReportDetails = ({ reportId }: ReportParams) => {
  return authApiGet<GetReportDetailsResponse>("/reports/details", {
    reportId,
  });
};

export const postSearchReports = (searchTitle: string) => {
  return authApiPost<ReportResponse[]>("/reports/search", {
    searchTitle,
  });
};

export const postReport = ({ data, logo }: PostReportParams) => {
  const formData = new FormData();

  formData.append("data", JSON.stringify(data));

  if (logo) {
    formData.append("logo", logo);
  }

  return authApiPost("/reports", formData);
};

export const postReportArticle = ({
  reportId,
  data,
}: PostReportArticleParams) => {
  return authApiPost("/reports/articles/update", data, {
    reportId,
  });
};

export const deleteReport = ({ reportId }: ReportParams) => {
  return authApiDelete("/reports", {
    reportId,
  });
};

export const patchReportTitle = ({
  reportId,
  data,
}: PatchReportTitleParams) => {
  return authApiPatch("/reports/title", data, {
    reportId,
  });
};

export const patchReportColor = ({
  reportId,
  data,
}: PatchReportColorParams) => {
  return authApiPatch("/reports/color", data, {
    reportId,
  });
};

export const patchReportLogo = ({ reportId, logo }: PatchReportLogoParams) => {
  const formData = new FormData();
  formData.append("logo", logo);

  return authApiPatch("/reports/logo", formData, {
    reportId,
  });
};

export const patchReportArticleSummary = ({
  reportId,
  reportArticleId,
  data,
}: PatchReportArticleSummaryParams) => {
  return authApiPatch("/reports/articles/summary", data, {
    reportId,
    reportArticleId,
  });
};

export const deleteReportArticle = ({
  reportId,
  reportArticleId,
}: DeleteReportArticleParams) => {
  return authApiDelete("/reports/articles/delete", {
    reportId,
    reportArticleId,
  });
};
