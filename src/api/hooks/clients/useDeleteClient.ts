import { deleteClient } from "@api/clientsAPI";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const useDeleteClient = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (params: number) => deleteClient(params),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["clients"] });
    },
  });
};

export default useDeleteClient;
