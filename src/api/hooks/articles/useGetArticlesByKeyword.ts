import { getArticlesByKeyword } from "@api/articlesAPI";
import { GetArticlesByKeywordParams } from "@api/types/articles";
import { keepPreviousData, useQuery } from "@tanstack/react-query";

const useGetArticlesByKeyword = ({
  keywordId,
  categoryType,
  page,
}: GetArticlesByKeywordParams) => {
  return useQuery({
    queryKey: ["articles", keywordId, categoryType, page],
    queryFn: () => getArticlesByKeyword({ keywordId, categoryType, page }),
    select: (data) => data.result,
    placeholderData: keepPreviousData,
    enabled: !!keywordId,
  });
};

export default useGetArticlesByKeyword;
