import { postSetClient } from "@api/accountsAPI";
import { useMutation } from "@tanstack/react-query";

const usePostSetClient = () => {
  return useMutation({
    mutationFn: (clientId: number) => postSetClient(clientId),
  });
};

export default usePostSetClient;
