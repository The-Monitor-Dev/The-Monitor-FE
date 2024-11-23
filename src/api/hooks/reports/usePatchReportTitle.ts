import { patchReportTitle } from "@api/reportsAPI";
import { PatchReportTitleParams } from "@api/types/reports";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const usePatchReportTitle = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (params: PatchReportTitleParams) => patchReportTitle(params),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["reportDetails"] });
    },
  });
};

export default usePatchReportTitle;
