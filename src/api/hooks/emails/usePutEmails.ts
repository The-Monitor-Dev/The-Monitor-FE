import { putEmails } from "@api/emailsAPI";
import { PutEmailsParams } from "@api/types/emails";
import { useToast } from "@chakra-ui/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const usePutEmails = () => {
  const toast = useToast();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (params: PutEmailsParams) => putEmails(params),
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
