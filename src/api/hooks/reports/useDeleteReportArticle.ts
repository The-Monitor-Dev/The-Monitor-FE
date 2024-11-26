import { deleteReportArticle } from "@api/reportsAPI";
import { DeleteReportArticleParams } from "@api/types/reports";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const useDeleteReportArticle = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (params: DeleteReportArticleParams) =>
      deleteReportArticle(params),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["reportDetails"] });
    },
  });
};

export default useDeleteReportArticle;
