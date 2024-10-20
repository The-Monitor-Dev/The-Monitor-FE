import { postSendPasswordChangeEmail } from "@api/accountsAPI";
import { PostSendPasswordChangeEmailData } from "@api/types/accounts";
import { useMutation } from "@tanstack/react-query";

const usePostSendPasswordChangeEmail = () => {
  return useMutation({
    mutationFn: (data: PostSendPasswordChangeEmailData) =>
      postSendPasswordChangeEmail(data),
  });
};

export default usePostSendPasswordChangeEmail;
