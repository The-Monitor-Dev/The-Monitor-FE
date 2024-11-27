import { patchReportArticleSummary } from "@api/reportsAPI";
import { PatchReportArticleSummaryParams } from "@api/types/reports";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const usePatchReportArticleSummary = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (params: PatchReportArticleSummaryParams) =>
      patchReportArticleSummary(params),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["reportDetails"] });
    },
  });
};

export default usePatchReportArticleSummary;
