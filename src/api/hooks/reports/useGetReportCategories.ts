import { getReportCategories } from "@api/reportsAPI";
import { ReportParams } from "@api/types/reports";
import { useQuery } from "@tanstack/react-query";

const useGetReportCategories = ({ reportId }: ReportParams) => {
  return useQuery({
    queryKey: ["reportCategories", reportId],
    queryFn: () => getReportCategories({ reportId }),
    select: (data) => data.result,
  });
};

export default useGetReportCategories;
