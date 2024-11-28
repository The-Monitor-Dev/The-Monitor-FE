import { patchUnScrap } from "@api/scrapAPI";
import { useMutation } from "@tanstack/react-query";

const usePatchUnScrap = () => {
  return useMutation({
    mutationFn: patchUnScrap,
  });
};

export default usePatchUnScrap;
