import { getArticles } from "@api/articlesAPI";
import { GetArticlesParams } from "@api/types/articles";
import { keepPreviousData, useQuery } from "@tanstack/react-query";

const useGetArticles = ({
  clientId,
  categoryType,
  page,
}: GetArticlesParams) => {
  return useQuery({
    queryKey: ["articles", clientId, categoryType, page],
    queryFn: () => getArticles({ clientId, categoryType, page }),
    select: (data) => data.result,
    placeholderData: keepPreviousData,
    enabled: !!categoryType,
  });
};

export default useGetArticles;
