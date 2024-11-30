import { postReport } from "@api/reportsAPI";
import { PostReportParams } from "@api/types/reports";
import { useMutation } from "@tanstack/react-query";

const usePostReport = () => {
  return useMutation({
    mutationFn: (params: PostReportParams) => postReport(params),
  });
};

export default usePostReport;
