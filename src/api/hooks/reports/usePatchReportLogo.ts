import { useMutation, useQueryClient } from "@tanstack/react-query";
import { patchReportLogo } from "@api/reportsAPI";
import { PatchReportLogoParams } from "@api/types/reports";
const usePatchReportLogo = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (params: PatchReportLogoParams) => patchReportLogo(params),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["reportDetails"] });
    },
  });
};

export default usePatchReportLogo;
