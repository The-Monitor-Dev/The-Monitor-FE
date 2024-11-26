import { putEmails } from "@api/keywordsAPI";
import { useToast } from "@chakra-ui/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const usePutEmails = () => {
  const toast = useToast();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ clientId, data }: { clientId: number; data: FormData }) =>
      putEmails(clientId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["emails"] });
      toast({
        title: "메일이 저장되었습니다.",
        status: "success",
      });
    },
  });
};

export default usePutEmails;