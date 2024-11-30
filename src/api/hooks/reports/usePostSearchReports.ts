import { postSearchReports } from "@api/reportsAPI";
import { keepPreviousData, useQuery } from "@tanstack/react-query";

const usePostSearchReports = (searchTitle: string) => {
  return useQuery({
    queryKey: ["searchReports", searchTitle],
    queryFn: () => postSearchReports(searchTitle),
    select: (data) => data.result,
    placeholderData: keepPreviousData,
    enabled: !!searchTitle,
  });
};

export default usePostSearchReports;
