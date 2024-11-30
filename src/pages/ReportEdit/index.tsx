import ReportHeader from "@features/report/ReportHeader";
import { useParams } from "react-router-dom";
import ReportEditSection from "./components/ReportEditSection";
import AddArticleForm from "./components/AddArticleForm";
import useGetReportArticlesOptions from "@api/hooks/reports/useGetReportArticlesOptions";

const ReportEditPage = () => {
  const { reportId } = useParams<{ reportId: string }>();
  const numericReportId = Number(reportId);

  const { data: options } = useGetReportArticlesOptions({
    reportId: numericReportId,
  });

  return (
    <div className="flex min-h-full justify-center bg-base-bg p-10">
      <div className="flex w-[1280px] flex-col">
        <ReportHeader reportId={numericReportId} />
        <div className="mt-4 flex flex-grow gap-7">
          <ReportEditSection
            reportId={numericReportId}
            isMedia={options?.media}
            isReporter={options?.reporter}
          />
          <AddArticleForm
            reportId={numericReportId}
            isMedia={options?.media}
            isReporter={options?.reporter}
          />
        </div>
      </div>
    </div>
  );
};

export default ReportEditPage;
