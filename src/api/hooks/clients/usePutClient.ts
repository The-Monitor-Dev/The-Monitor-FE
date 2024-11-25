import { putClient } from "@api/clientsAPI";
import { Toast } from "@chakra-ui/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const usePutClient = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ clientId, data }: { clientId: number; data: FormData }) =>
      putClient(clientId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["clients"] });
      Toast({
        title: "고객사 정보가 수정되었습니다.",
        status: "success",
      });
    },
    onError: () => {
      Toast({
        title: "고객사 정보 수정 실패",
        status: "error",
      });
    },
  });
};

export default usePutClient;
