import { useQueryClient, useMutation } from "@tanstack/react-query";
import { postClient } from "@api/clientsAPI";

const usePostClient = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: FormData) => {
      return postClient(data);
    },
    onMutate: async () => {
      return queryClient.getQueryData(["clients"]);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["clients"] });
    },
  });
};

export default usePostClient;
