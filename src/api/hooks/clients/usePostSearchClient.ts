import { postSearchClient } from "@api/clientsAPI";
import { keepPreviousData, useQuery } from "@tanstack/react-query";

const usePostSearchClient = (searchText: string) => {
  return useQuery({
    queryKey: ["searchClient", searchText],
    queryFn: () => postSearchClient(searchText),
    select: (data) => data.result,
    placeholderData: keepPreviousData,
  });
};

export default usePostSearchClient;
