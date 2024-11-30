import { getReportDetails } from "@api/reportsAPI";
import { ReportParams } from "@api/types/reports";
import { useQuery } from "@tanstack/react-query";

const useGetReportDetails = ({ reportId }: ReportParams) => {
  return useQuery({
    queryKey: ["reportDetails", reportId],
    queryFn: () => getReportDetails({ reportId }),
    select: (data) => data.result,
  });
};

export default useGetReportDetails;
