import { patchReportArticlesOptions } from "@api/reportsAPI";
import { PatchReportArticlesOptionsParams } from "@api/types/reports";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const usePatchReportArticlesOptions = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (params: PatchReportArticlesOptionsParams) =>
      patchReportArticlesOptions(params),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["reportDetails"] });
      window.location.reload();
    },
  });
};

export default usePatchReportArticlesOptions;
