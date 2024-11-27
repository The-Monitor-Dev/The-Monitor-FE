import { postSignIn } from "@api/accountsAPI";
import { PostSignInData } from "@api/types/accounts";
import { useToast } from "@chakra-ui/react";
import routes from "@constants/routes";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

const usePostSignIn = () => {
  const navigate = useNavigate();
  const toast = useToast();

  return useMutation({
    mutationFn: (singInData: PostSignInData) => postSignIn(singInData),
    onSuccess: (res) => {
      if (res.code === "COMMON200") {
        navigate(routes.dashboard);
      } else {
        toast({
          title: `${res.message}`,
          status: "error",
        });
      }
    },
  });
};

export default usePostSignIn;
