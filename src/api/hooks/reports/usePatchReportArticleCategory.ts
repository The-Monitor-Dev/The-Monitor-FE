import { patchReportArticleCategory } from "@api/reportsAPI";
import { PatchReportArticleCategoryParams } from "@api/types/reports";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const usePatchReportArticleCategory = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (params: PatchReportArticleCategoryParams) =>
      patchReportArticleCategory(params),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["reportDetails"] });
    },
  });
};

export default usePatchReportArticleCategory;
