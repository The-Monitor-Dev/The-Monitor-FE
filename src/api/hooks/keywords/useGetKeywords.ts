import { getKeywords } from "@api/keywordsAPI";
import { useQuery } from "@tanstack/react-query";

const useGetKeywords = (clientId: number) => {
  return useQuery({
    queryKey: ["keywords", clientId],
    queryFn: () => getKeywords(clientId),
    select: (data) => data.result,
  });
};

export default useGetKeywords;
