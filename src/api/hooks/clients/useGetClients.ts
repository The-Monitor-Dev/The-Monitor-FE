import { useQuery } from "@tanstack/react-query";
import { getClients } from "@api/clientsAPI";

export const useGetClients = () => {
  return useQuery({
    queryKey: ["clients"],
    queryFn: getClients,
    select: (data) => data.result,
  });
};
