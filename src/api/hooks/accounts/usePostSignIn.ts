import { postSignIn, PostSignInData } from "@api/accountsAPI";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

const usePostSignIn = () => {
  const navigate = useNavigate();
  return useMutation({
    mutationFn: (singInData: PostSignInData) => postSignIn(singInData),
    onSuccess: () => {
      navigate("/");
    },
  });
};

export default usePostSignIn;
