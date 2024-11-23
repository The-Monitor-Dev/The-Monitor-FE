import { getReportDetails } from "@api/reportsAPI";
import { ReportParams } from "@api/types/reports";
import { useQuery } from "@tanstack/react-query";

const useGetReportDetails = ({ clientId, reportId }: ReportParams) => {
  return useQuery({
    queryKey: ["reportDetails", clientId, reportId],
    queryFn: () => getReportDetails({ clientId, reportId }),
    select: (data) => data.result,
  });
};

export default useGetReportDetails;
