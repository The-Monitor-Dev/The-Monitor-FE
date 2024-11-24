import { useMutation } from "@tanstack/react-query";
import { postClient } from "@api/clientsAPI";

const usePostClient = () => {
  return useMutation({
    mutationFn: (data: FormData) => {
      return postClient(data);
    },
  });
};

export default usePostClient;
