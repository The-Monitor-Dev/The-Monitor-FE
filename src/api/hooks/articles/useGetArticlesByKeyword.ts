import { getArticlesByKeyword } from "@api/articlesAPI";
import { GetArticlesByKeywordParams } from "@api/types/articles";
import { keepPreviousData, useQuery } from "@tanstack/react-query";

const useGetArticlesByKeyword = ({
  keyword,
  page,
}: GetArticlesByKeywordParams) => {
  return useQuery({
    queryKey: ["articles", keyword, page],
    queryFn: () => getArticlesByKeyword({ keyword, page }),
    select: (data) => data.result,
    placeholderData: keepPreviousData,
    enabled: !!keyword,
  });
};

export default useGetArticlesByKeyword;
