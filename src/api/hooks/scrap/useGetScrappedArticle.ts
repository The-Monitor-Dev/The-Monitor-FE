import { getScrappedArticle } from "@api/scrapAPI";
import { useQuery } from "@tanstack/react-query";

const useGetScrappedArticle = (scrapId: number) => {
  return useQuery({
    queryKey: ["scrappedArticle", scrapId],
    queryFn: () => getScrappedArticle(scrapId),
    select: (data) => data.result,
  });
};

export default useGetScrappedArticle;
