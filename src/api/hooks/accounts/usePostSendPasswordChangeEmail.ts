import { postSendPasswordChangeEmail } from "@api/accountsAPI";
import { PostSendPasswordChangeEmailData } from "@api/types/accounts";
import { useMutation } from "@tanstack/react-query";

const usePostSendPasswordChangeEmail = () => {
  return useMutation({
    mutationFn: (data: PostSendPasswordChangeEmailData) =>
      postSendPasswordChangeEmail(data),
    onSuccess: (res) => {
      console.log(res);
    },
  });
};

export default usePostSendPasswordChangeEmail;
