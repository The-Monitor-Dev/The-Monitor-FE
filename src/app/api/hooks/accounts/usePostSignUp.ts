import { postSignUp, PostSignUpData } from "@app/api/accountsAPI";
import { useToast } from "@chakra-ui/react";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

const usePostSignUp = () => {
  const toast = useToast();
  const navigate = useNavigate();
  return useMutation({
    mutationFn: (data: PostSignUpData) => postSignUp(data),
    onSuccess: () => {
      toast({
        title: "회원가입이 완료되었습니다.",
        status: "success",
      });
      navigate("/sign-in");
    },
  });
};

export default usePostSignUp;
