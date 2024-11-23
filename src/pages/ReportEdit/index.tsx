import useGetReportDetails from "@api/hooks/reports/useGetReportDetails";
import Button from "@components/Button";
import Dropdown from "@components/Dropdown";
import Input from "@components/Input";
import ReportHeader from "@features/report/ReportHeader";
import ReportSection from "@features/report/ReportSection";
import { useState } from "react";
import { useParams } from "react-router-dom";

const ReportEditPage = () => {
  const { reportId } = useParams<{ reportId: string }>();
  const numericReportId = Number(reportId);

  const categoryOptions = ["자사", "경쟁사", "업계"];
  const [selectedOption, setSelectedOption] = useState("자사");
  const handleSelectOption = (option: string) => {
    setSelectedOption(option);
  };
  const { data: reportDetail } = useGetReportDetails({
    clientId: 1,
    reportId: numericReportId,
  });

  return (
    <div className="flex h-full justify-center">
      <div className="flex w-[1280px] flex-col">
        <ReportHeader />
        <div className="mt-4 flex flex-grow gap-7">
          <ReportSection
            initialTitle={reportDetail?.title}
            initialColor={reportDetail?.color}
            reportId={numericReportId}
          />

          <div className="flex h-[667px] flex-col rounded bg-white">
            <span className="border-b-1 border-neutral-200 px-6 py-5 text-xl font-semibold text-title">
              기사 추가하기
            </span>
            <div className="flex flex-col gap-5 px-7 py-6">
              <div className="flex items-center gap-5">
                <div className="flex w-[108px] flex-col gap-2">
                  <div className="text-sm font-medium text-title">카테고리</div>
                  <Dropdown
                    width={108}
                    options={categoryOptions}
                    selectedOption={selectedOption}
                    onSelectOption={handleSelectOption}
                  />
                </div>
                <div className="flex flex-grow flex-col gap-2">
                  <div className="text-sm font-medium text-title">키워드</div>
                  <Dropdown
                    width={216}
                    options={categoryOptions}
                    selectedOption={selectedOption}
                    onSelectOption={handleSelectOption}
                  />
                </div>
              </div>
              <div className="flex w-[344px] flex-col gap-3 text-sm font-medium">
                <div className="flex flex-col gap-2">
                  <label>헤드라인</label>
                  <Input placeholder="기사제목을 입력해주세요." />
                </div>
                <div className="flex flex-col gap-2">
                  <label>URL</label>
                  <Input placeholder="기사의 링크를 첨부해주세요." />
                </div>
                <div className="flex flex-col gap-2">
                  <label>발행일자</label>
                  <Input placeholder="YYYY.MM.DD " />
                </div>
                <div className="flex items-center gap-5">
                  <div className="flex flex-col gap-2">
                    <label>미디어</label>
                    <Input placeholder="예) 가나일보" />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label>기자</label>
                    <Input placeholder="예) 홍길동" />
                  </div>
                </div>
              </div>
            </div>
            <div className="flex justify-center">
              <Button type="submit" style="filled" className="w-[360px] py-3">
                추가하기
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportEditPage;
