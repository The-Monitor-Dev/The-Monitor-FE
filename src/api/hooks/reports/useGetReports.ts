import { getReports } from "@api/reportsAPI";
import { useQuery } from "@tanstack/react-query";

const useGetReports = (clientId: number) => {
  return useQuery({
    queryKey: ["reports", clientId],
    queryFn: () => getReports(clientId),
    select: (data) => data.result,
  });
};

export default useGetReports;
