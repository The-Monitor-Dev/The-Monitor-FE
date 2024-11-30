import { getClientInfo } from "@api/clientsAPI";
import { useQuery } from "@tanstack/react-query";

const useGetClientInfo = (clientId: number) => {
  return useQuery({
    queryKey: ["clientInfo", clientId],
    queryFn: () => getClientInfo(clientId),
    select: (data) => data.result,
  });
};

export default useGetClientInfo;
