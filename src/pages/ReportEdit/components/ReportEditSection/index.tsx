import React, { useEffect, useRef, useState } from "react";
import { DonerIcon } from "@assets/svgs";
import { useOutsideClick } from "@chakra-ui/react";
import { clientId } from "@constants/clientId";
import useGetReportDetails from "@api/hooks/reports/useGetReportDetails";
import LogoUploader from "./components/LogoUploader";
import TitleEditor from "./components/TitleEditor";
import ColorPicker from "./components/ColorPicker";
import { CategoryTypeEn } from "types/category";
import { ReportCategory } from "@api/types/reports";
import DonerMenu from "./components/DonerMenu";
import ArticleTable from "./components/ArticleTable";

interface ReportEditSectionProps {
  reportId: number;
  isMedia: boolean | undefined;
  isReporter: boolean | undefined;
}

const ReportEditSection: React.FC<ReportEditSectionProps> = ({
  reportId,
  isMedia,
  isReporter,
}) => {
  const { data: reportDetail } = useGetReportDetails({
    reportId,
  });

  const [color, setColor] = useState("#FFFFFF");

  useEffect(() => {
    if (reportDetail) setColor(reportDetail?.color);
  }, [reportDetail]);

  const handleChangeColor = (color: string) => {
    setColor(color);
  };

  const [isDonerOpen, setIsDonerOpen] = useState(false);
  const donerRef = useRef<HTMLDivElement | null>(null);
  useOutsideClick({
    ref: donerRef,
    handler: () => setIsDonerOpen(false),
  });

  return (
    <div className="flex w-[852px] flex-col bg-white px-8 pt-5">
      <div
        className="flex items-center justify-between border-b-1 border-neutral-200 px-4 py-3"
        style={{ backgroundColor: color }}
      >
        <LogoUploader
          clientId={clientId}
          reportId={reportId}
          initialLogo={reportDetail?.logo}
        />
        <ColorPicker
          reportId={reportId}
          color={color}
          onChangeColor={handleChangeColor}
        />
      </div>
      <div className="flex items-center gap-2 py-3 pr-2">
        <TitleEditor reportId={reportId} initialTitle={reportDetail?.title} />
        <div ref={donerRef} className="relative">
          <DonerIcon
            type="button"
            onClick={() => setIsDonerOpen((prev) => !prev)}
            className="cursor-pointer rounded-[2px] hover:bg-neutral-100"
          />
          {isDonerOpen && (
            <DonerMenu
              reportId={reportId}
              isMedia={isMedia}
              isReporter={isReporter}
              onClose={() => setIsDonerOpen(false)}
            />
          )}
        </div>
      </div>
      <div className="flex flex-col gap-3 pl-9">
        {reportDetail?.articles[0] &&
          (
            Object.entries(reportDetail.articles[0]) as [
              CategoryTypeEn,
              ReportCategory[],
            ][]
          ).map(([categoryType, categories]) => (
            <ArticleTable
              key={reportId}
              reportId={reportId}
              tableCategory={categoryType}
              categories={categories}
              isMedia={isMedia}
              isReporter={isReporter}
            />
          ))}
      </div>
    </div>
  );
};

export default ReportEditSection;
