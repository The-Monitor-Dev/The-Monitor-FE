import { getReportArticlesOptions } from "@api/reportsAPI";
import { ReportParams } from "@api/types/reports";
import { useQuery } from "@tanstack/react-query";

const useGetReportArticlesOptions = ({ reportId }: ReportParams) => {
  return useQuery({
    queryKey: ["reportArticlesOptions", reportId],
    queryFn: () => getReportArticlesOptions({ reportId }),
    select: (data) => data.result,
  });
};

export default useGetReportArticlesOptions;
