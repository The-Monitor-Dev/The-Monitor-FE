import { useQueryClient, useMutation } from "@tanstack/react-query";
import { postClient } from "@api/clientsAPI";
import { useToast } from "@chakra-ui/react";
import { PostClientParams } from "@api/types/clients";

const usePostClient = () => {
  const toast = useToast();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (params: PostClientParams) => {
      return postClient(params);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["clients"] });
      toast({
        title: "고객사 정보가 생성되었습니다.",
        status: "success",
      });
    },
  });
};

export default usePostClient;
