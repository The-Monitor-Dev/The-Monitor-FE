import { postVerifyCode } from "@api/accountsAPI";
import { PostVerifyCodeData } from "@api/types/accounts";
import { useMutation } from "@tanstack/react-query";

const usePostVerifyCode = () => {
  return useMutation({
    mutationFn: (data: PostVerifyCodeData) => postVerifyCode(data),
  });
};

export default usePostVerifyCode;
