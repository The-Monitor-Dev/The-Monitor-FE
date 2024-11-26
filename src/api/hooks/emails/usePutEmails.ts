import { putEmails } from "@api/emailsAPI";
import { putEmailsParams } from "@api/types/emails";
import { useToast } from "@chakra-ui/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const usePutEmails = () => {
  const toast = useToast();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ clientId, data }: putEmailsParams) =>
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
