import {
  authApiDelete,
  authApiGet,
  authApiPatch,
  authApiPost,
} from "./apiUtils";
import {
  GetReportDetailsResponse,
  PatchReportColorParams,
  PatchReportLogoParams,
  PatchReportTitleParams,
  PostReportArticleParams,
  PostSearchReportsParams,
  ReportParams,
  ReportResponse,
} from "./types/reports";

export const getReports = () => {
  return authApiGet<ReportResponse[]>("/reports");
};

export const getReportDetails = ({ clientId, reportId }: ReportParams) => {
  return authApiGet<GetReportDetailsResponse>("/reports/details", {
    clientId,
    reportId,
  });
};

export const postSearchReports = ({
  clientId,
  searchTitle,
}: PostSearchReportsParams) => {
  return authApiPost<ReportResponse[]>(
    "/reports/search",
    {
      searchTitle,
    },
    {
      clientId,
    },
  );
};

export const postReportArticle = ({
  clientId,
  reportId,
  data,
}: PostReportArticleParams) => {
  return authApiPost("reports/articles/update", data, {
    clientId,
    reportId,
  });
};

export const deleteReport = ({ clientId, reportId }: ReportParams) => {
  return authApiDelete("/reports", {
    clientId,
    reportId,
  });
};

export const patchReportTitle = ({
  clientId,
  reportId,
  data,
}: PatchReportTitleParams) => {
  return authApiPatch("/reports/title", data, {
    clientId,
    reportId,
  });
};

export const patchReportColor = ({
  clientId,
  reportId,
  data,
}: PatchReportColorParams) => {
  return authApiPatch("/reports/color", data, {
    clientId,
    reportId,
  });
};

export const patchReportLogo = ({
  clientId,
  reportId,
  logo,
}: PatchReportLogoParams) => {
  const formData = new FormData();
  formData.append("logo", logo);

  return authApiPatch("/reports/logo", formData, {
    clientId,
    reportId,
  });
};
