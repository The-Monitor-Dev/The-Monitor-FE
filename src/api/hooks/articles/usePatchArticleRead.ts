import { patchArticleRead } from "@api/articlesAPI";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const usePatchReportRead = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (articleId: number) => patchArticleRead(articleId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["articles"] });
      queryClient.invalidateQueries({ queryKey: ["articlesByKeyword"] });
    },
  });
};
