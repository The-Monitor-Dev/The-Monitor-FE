import { putKeywords, putKeywordsData } from "@api/keywordsAPI";
import { useToast } from "@chakra-ui/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const usePutkeywords = () => {
  const toast = useToast();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      clientId,
      data,
    }: {
      clientId: number;
      data: putKeywordsData;
    }) => putKeywords(clientId, data),
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
