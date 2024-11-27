import { patchReportArticlesOptions } from "@api/reportsAPI";
import { PatchReportArticlesOptionsParams } from "@api/types/reports";
import { useMutation } from "@tanstack/react-query";

const usePatchReportArticlesOptions = () => {
  return useMutation({
    mutationFn: (params: PatchReportArticlesOptionsParams) =>
      patchReportArticlesOptions(params),
  });
};

export default usePatchReportArticlesOptions;
