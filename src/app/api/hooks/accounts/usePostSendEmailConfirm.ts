import {
  postSendEmailConfirm,
  PostSendEmailConfirmData,
} from "@app/api/accountsAPI";
import { useToast } from "@chakra-ui/react";
import { useMutation } from "@tanstack/react-query";

const usePostSendEmailConfirm = () => {
  const toast = useToast();
  return useMutation({
    mutationFn: (data: PostSendEmailConfirmData) => postSendEmailConfirm(data),
    onSuccess: () => {
      toast({
        title: "인증메일이 발송되었습니다.",
        status: "success",
      });
    },
  });
};

export default usePostSendEmailConfirm;
