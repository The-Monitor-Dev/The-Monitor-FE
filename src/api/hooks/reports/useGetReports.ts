import { getReports } from "@api/reportsAPI";
import { useQuery } from "@tanstack/react-query";

const useGetReports = () => {
  return useQuery({
    queryKey: ["reports"],
    queryFn: getReports,
    select: (data) => data.result,
  });
};

export default useGetReports;
