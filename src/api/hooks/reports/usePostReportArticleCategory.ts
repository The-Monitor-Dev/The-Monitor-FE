import { postReportArticleCategory } from "@api/reportsAPI";
import { PostReportArticleCategoryParams } from "@api/types/reports";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const usePostReportArticleCategory = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (params: PostReportArticleCategoryParams) =>
      postReportArticleCategory(params),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["reportDetails"] });
    },
  });
};

export default usePostReportArticleCategory;
