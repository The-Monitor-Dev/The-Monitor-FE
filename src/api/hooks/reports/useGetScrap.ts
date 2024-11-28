import { getScrap } from "@api/scrapAPI";
import { useQuery } from "@tanstack/react-query";

const useGetScrap = () => {
  return useQuery({
    queryKey: ["scrap"],
    queryFn: getScrap,
    select: (data) => data.result,
  });
};

export default useGetScrap;
