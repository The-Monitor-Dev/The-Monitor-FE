import {
  authApiDelete,
  authApiGet,
  authApiPatch,
  authApiPost,
} from "./apiUtils";
import {
  DeleteReportArticleCategoryPrams,
  DeleteReportArticleParams,
  GetReportArticleCategoriesResponse,
  GetReportArticlesOptionsResponse,
  GetReportDetailsResponse,
  PatchReportArticleCategoryParams,
  PatchReportArticlesOptionsParams,
  PatchReportArticleSummaryParams,
  PatchReportColorParams,
  PatchReportLogoParams,
  PatchReportTitleParams,
  PostReportArticleCategoryParams,
  PostReportArticleParams,
  PostReportParams,
  PostReportResponse,
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

export const getReportCategories = ({ reportId }: ReportParams) => {
  return authApiGet<GetReportArticleCategoriesResponse>("/reports/categories", {
    reportId,
  });
};

export const getReportArticlesOptions = ({ reportId }: ReportParams) => {
  return authApiGet<GetReportArticlesOptionsResponse>(
    "/reports/articles/options",
    {
      reportId,
    },
  );
};

export const postSearchReports = (searchTitle: string) => {
  return authApiPost<ReportResponse[]>("/reports/search", {
    searchTitle,
  });
};

export const postReport = ({ data, logo }: PostReportParams) => {
  const formData = new FormData();

  formData.append("request", JSON.stringify(data));

  if (logo) {
    formData.append("logo", logo);
  }

  return authApiPost<PostReportResponse>("/reports", formData);
};

export const postReportArticle = ({
  reportId,
  data,
}: PostReportArticleParams) => {
  return authApiPost("/reports/articles/update", data, {
    reportId,
  });
};

export const postReportArticleCategory = ({
  reportId,
  data,
}: PostReportArticleCategoryParams) => {
  return authApiPost("/reports/category", data, {
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

export const patchReportArticleCategory = ({
  reportId,
  reportArticleId,
  newCategoryId,
}: PatchReportArticleCategoryParams) => {
  return authApiPatch("/reports/articles/category", undefined, {
    reportId,
    reportArticleId,
    newCategoryId,
  });
};

export const patchReportArticlesOptions = ({
  reportId,
  data,
}: PatchReportArticlesOptionsParams) => {
  return authApiPatch("/reports/articles/options", data, { reportId });
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

export const deleteReportArticleCategory = ({
  reportId,
  categoryId,
}: DeleteReportArticleCategoryPrams) => {
  return authApiPatch("/reports/category/delete", undefined, {
    reportId,
    categoryId,
  });
};
