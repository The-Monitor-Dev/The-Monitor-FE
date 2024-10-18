import { postVerifyCode, PostVerifyCodeData } from "@api/accountsAPI";
import { useMutation } from "@tanstack/react-query";

const usePostVerifyCode = () => {
  return useMutation({
    mutationFn: (data: PostVerifyCodeData) => postVerifyCode(data),
  });
};

export default usePostVerifyCode;
