import { postSignIn } from "@api/accountsAPI";
import { PostSignInData } from "@api/types/accounts";
import routes from "@constants/routes";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

const usePostSignIn = () => {
  const navigate = useNavigate();
  return useMutation({
    mutationFn: (singInData: PostSignInData) => postSignIn(singInData),
    onSuccess: () => {
      navigate(routes.dashboard);
    },
  });
};

export default usePostSignIn;
