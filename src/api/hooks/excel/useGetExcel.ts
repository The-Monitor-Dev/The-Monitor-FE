import { getExcel } from "@api/excelAPI";
import { ReportParams } from "@api/types/reports";
import { useToast } from "@chakra-ui/react";
import { useMutation } from "@tanstack/react-query";

const useGetExcel = () => {
  const toast = useToast();
  return useMutation({
    mutationFn: (params: ReportParams) => getExcel(params),
    onSuccess: (res) => {
      const url = window.URL.createObjectURL(new Blob([res.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "견적리스트.xlsx");
      document.body.appendChild(link);
      link.click();
      link.remove();
      toast({
        title: "엑셀이 추출되었습니다.",
        status: "success",
      });
    },
  });
};

export default useGetExcel;
