import { postScrap } from "@api/scrapAPI";
import { ScrapParam } from "@api/types/scrap";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const usePostScrap = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (param: ScrapParam) => postScrap(param),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["articles"] });
      queryClient.invalidateQueries({ queryKey: ["articlesByKeyword"] });
    },
  });
};

export default usePostScrap;
