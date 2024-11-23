import { deleteReport } from "@api/reportsAPI";
import { ReportParams } from "@api/types/reports";
import { useToast } from "@chakra-ui/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const useDeleteReport = () => {
  const toast = useToast();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (params: ReportParams) => deleteReport(params),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["reports"] });
      toast({
        title: "보고서가 삭제되었습니다.",
        status: "success",
      });
    },
  });
};

export default useDeleteReport;
