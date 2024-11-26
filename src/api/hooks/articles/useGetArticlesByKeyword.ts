import { getArticlesByKeyword } from "@api/articlesAPI";
import { GetArticlesByKeywordParams } from "@api/types/articles";
import { keepPreviousData, useQuery } from "@tanstack/react-query";

const useGetArticlesByKeyword = ({
  keywordId,
  clientId,
  categoryType,
  page,
}: GetArticlesByKeywordParams) => {
  return useQuery({
    queryKey: ["articles", keywordId, clientId, categoryType, page],
    queryFn: () =>
      getArticlesByKeyword({ keywordId, clientId, categoryType, page }),
    select: (data) => data.result,
    placeholderData: keepPreviousData,
    enabled: !!keywordId,
  });
};

export default useGetArticlesByKeyword;
