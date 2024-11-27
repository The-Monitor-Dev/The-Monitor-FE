import { getEmails } from "@api/emailsAPI";
import { useQuery } from "@tanstack/react-query";

const useGetEmails = () => {
  return useQuery({
    queryKey: ["emails"],
    queryFn: getEmails,
    select: (data) => data.result,
  });
};

export default useGetEmails;
