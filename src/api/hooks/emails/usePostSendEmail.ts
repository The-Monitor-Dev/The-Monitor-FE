import { postSendEmail } from "@api/emailsAPI";
import { PostSendEmailParams } from "@api/types/emails";
import { useToast } from "@chakra-ui/react";
import { useMutation } from "@tanstack/react-query";

const usePostSendEmail = () => {
  const toast = useToast();
  return useMutation({
    mutationFn: (params: PostSendEmailParams) => postSendEmail(params),
    onSuccess: () => {
      toast({
        title: "메일이 전송되었습니다.",
        status: "success",
      });
    },
  });
};

export default usePostSendEmail;
