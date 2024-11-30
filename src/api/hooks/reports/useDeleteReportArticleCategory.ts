import { deleteReportArticleCategory } from "@api/reportsAPI";
import { DeleteReportArticleCategoryPrams } from "@api/types/reports";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const useDeleteReportArticleCategory = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (params: DeleteReportArticleCategoryPrams) =>
      deleteReportArticleCategory(params),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["reportDetails"] });
    },
  });
};

export default useDeleteReportArticleCategory;
