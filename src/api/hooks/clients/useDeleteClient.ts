import { deleteClient } from "@api/clientsAPI";
import { clientParams } from "@api/types/clients";
import { useToast } from "@chakra-ui/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const useDeleteClient = () => {
  const toast = useToast();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (params: clientParams) => deleteClient(params),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["clients"] });
      toast({
        title: "고객사가 삭제되었습니다.",
        status: "success",
      });
    },
  });
};

export default useDeleteClient;
