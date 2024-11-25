import { getEmails } from "@api/keywordsAPI";
import { useQuery } from "@tanstack/react-query";

const useGetEmails = (clientId: number) => {
  return useQuery({
    queryKey: ["emails", clientId],
    queryFn: () => getEmails(clientId),
    select: (data) => data.result,
  });
};

export default useGetEmails;
