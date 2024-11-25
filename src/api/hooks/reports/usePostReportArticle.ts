import { postReportArticle } from "@api/reportsAPI";
import { PostReportArticleParams } from "@api/types/reports";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const usePostReportArticle = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (params: PostReportArticleParams) => postReportArticle(params),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["reportDetails"] });
    },
  });
};

export default usePostReportArticle;
