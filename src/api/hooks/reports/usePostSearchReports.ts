import { postSearchReports } from "@api/reportsAPI";
import { PostSearchReportsParams } from "@api/types/reports";
import { keepPreviousData, useQuery } from "@tanstack/react-query";

const usePostSearchReports = ({
  clientId,
  searchTitle,
}: PostSearchReportsParams) => {
  return useQuery({
    queryKey: ["searchReports", clientId, searchTitle],
    queryFn: () =>
      postSearchReports({
        clientId,
        searchTitle,
      }),
    select: (data) => data.result,
    placeholderData: keepPreviousData,
    enabled: !!searchTitle,
  });
};

export default usePostSearchReports;
