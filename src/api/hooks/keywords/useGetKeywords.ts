import { getKeywords } from "@api/keywordsAPI";
import { useQuery } from "@tanstack/react-query";

const useGetKeywords = () => {
  return useQuery({
    queryKey: ["keywords"],
    queryFn: getKeywords,
    select: (data) => data.result,
  });
};

export default useGetKeywords;
