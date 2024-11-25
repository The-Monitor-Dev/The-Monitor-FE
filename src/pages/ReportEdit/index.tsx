import ReportHeader from "@features/report/ReportHeader";
import { useParams } from "react-router-dom";
import ReportEditSection from "./components/ReportEditSection";
import AddArticleForm from "./components/AddArticleForm";

const ReportEditPage = () => {
  const { reportId } = useParams<{ reportId: string }>();
  const numericReportId = Number(reportId);

  return (
    <div className="flex h-full justify-center">
      <div className="flex w-[1280px] flex-col">
        <ReportHeader />
        <div className="mt-4 flex flex-grow gap-7">
          <ReportEditSection reportId={numericReportId} />
          <AddArticleForm reportId={numericReportId} />
        </div>
      </div>
    </div>
  );
};

export default ReportEditPage;
