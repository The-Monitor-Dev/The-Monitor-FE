import { putClient } from "@api/clientsAPI";
import { putClientParams } from "@api/types/clients";
import { useToast } from "@chakra-ui/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const usePutClient = () => {
  const toast = useToast();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ clientId, data }: putClientParams) =>
      putClient(clientId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["clients"] });
      toast({
        title: "고객사 정보가 수정되었습니다.",
        status: "success",
      });
    },
  });
};

export default usePutClient;
