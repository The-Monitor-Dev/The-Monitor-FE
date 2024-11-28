import tokenInstance from "./tokenInstance";
import { ReportParams } from "./types/reports";

export const getExcel = async ({ reportId }: ReportParams) => {
  const response = await tokenInstance.get("/excel/generate", {
    params: { reportId },
    responseType: "blob",
  });
  return response;
};
