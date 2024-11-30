import { getArticles } from "@api/articlesAPI";
import { GetArticlesParams } from "@api/types/articles";
import { keepPreviousData, useQuery } from "@tanstack/react-query";

const useGetArticles = ({ categoryType, page }: GetArticlesParams) => {
  return useQuery({
    queryKey: ["articles", categoryType, page],
    queryFn: () => getArticles({ categoryType, page }),
    select: (data) => data.result,
    placeholderData: keepPreviousData,
    enabled: !!categoryType,
  });
};

export default useGetArticles;
