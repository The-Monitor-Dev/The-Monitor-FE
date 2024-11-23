import {
  authApiDelete,
  authApiGet,
  authApiPatch,
  authApiPost,
} from "./apiUtils";
import {
  GetReportDetailsResponse,
  PatchReportColorParams,
  PatchReportTitleParams,
  PostSearchReportsParams,
  ReportParams,
  ReportResponse,
} from "./types/reports";

export const getReports = (clientId: number) => {
  return authApiGet<ReportResponse[]>("/reports", { clientId });
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
