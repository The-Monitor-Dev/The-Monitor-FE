import { putKeywords } from "@api/keywordsAPI";
import { PutKeywordsParams } from "@api/types/keywords";
import { useToast } from "@chakra-ui/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const usePutkeywords = () => {
  const toast = useToast();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ clientId, data }: PutKeywordsParams) =>
      putKeywords(clientId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["keywords"] });
      toast({
        title: "키워드가 저장되었습니다.",
        status: "success",
      });
    },
  });
};

export default usePutkeywords;
