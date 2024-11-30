import { checkToken } from "@api/accountsAPI";
import routes from "@constants/routes";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const useCheckToken = () => {
  const navigate = useNavigate();

  const query = useQuery({
    queryKey: ["tokenValidity"],
    queryFn: checkToken,
    select: (data) => data.isSuccess,
    refetchOnWindowFocus: false,
    retry: false,
  });

  useEffect(() => {
    if (query.isSuccess) {
      navigate(routes.dashboard);
    }
  }, [query.isSuccess, navigate]);

  return query;
};

export default useCheckToken;
