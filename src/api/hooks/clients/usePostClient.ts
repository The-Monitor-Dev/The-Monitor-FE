import { useQueryClient, useMutation } from "@tanstack/react-query";
import { postClient } from "@api/clientsAPI";

const usePostClient = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: FormData) => {
      return postClient(data);
    },
    onMutate: async (data) => {
      const previousClients = queryClient.getQueryData(["clients"]);

      queryClient.setQueryData(["clients"], (oldData: any) => ({
        ...oldData,
        clients: [...(oldData?.clients || []), { ...data }],
      }));

      return { previousClients };
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["clients"] });
    },
  });
};

export default usePostClient;
