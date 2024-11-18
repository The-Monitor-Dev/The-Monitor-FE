import AddNews from "./components/AddNews";
import ReportHeader from "@features/report/ReportHeader";
import ReportSection from "@features/report/ReportSection";

const ReportNewPage: React.FC = () => {
  return (
    <div className="flex h-full justify-center">
      <div className="flex w-[1280px] flex-col">
        <ReportHeader />
        <div className="mt-4 flex flex-grow gap-7">
          <ReportSection />
          <AddNews />
        </div>
      </div>
    </div>
  );
};

export default ReportNewPage;
