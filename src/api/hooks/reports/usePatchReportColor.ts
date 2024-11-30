import { patchReportColor } from "@api/reportsAPI";
import { PatchReportColorParams } from "@api/types/reports";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const usePatchReportColor = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (params: PatchReportColorParams) => patchReportColor(params),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["reportDetails"] });
    },
  });
};

export default usePatchReportColor;
