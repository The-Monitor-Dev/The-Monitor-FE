import {
  ArrowDownIcon,
  ArrowUpIcon,
  CheckCircleFillIcon,
  CheckCircleOutlineIcon,
  ClockIcon,
  PersonIcon,
} from "@assets/svgs";
import Button from "@components/Button";
import { useState } from "react";

const AddNews: React.FC = () => {
  const [isBoxChecked, setIsBoxChecked] = useState(false);
  const [isCompanyOpen, setIsCompanyOpen] = useState(true);
  return (
    <div className="flex flex-grow flex-col bg-white">
      <div className="flex items-center justify-between border-b-1 border-b-neutral-200 px-6 py-5">
        <span className="text-xl font-semibold text-title">추가한 뉴스</span>
        <Button type="button" style="outline-s" className="px-3 py-1">
          기사 추가하기
        </Button>
      </div>
      <div className="flex flex-col gap-3 px-7">
        <div className="flex flex-col">
          <div className="flex items-center justify-between py-4">
            <span className="text-lg font-semibold text-title">자사</span>
            <button onClick={() => setIsCompanyOpen((prev) => !prev)}>
              {isCompanyOpen ? (
                <ArrowUpIcon />
              ) : (
                <ArrowDownIcon className="fill-neutral-700" />
              )}
            </button>
          </div>
          <div
            className={`transition-height overflow-hidden duration-300 ease-in-out`}
            style={{ height: isCompanyOpen ? "80px" : "0px" }}
          >
            <div
              className={`flex items-center gap-5 rounded border-1 py-4 pl-5 pr-4 ${
                isBoxChecked
                  ? "border-primary-200 hover:border-primary-500"
                  : "border-neutral-200 hover:border-neutral-400"
              }`}
            >
              <div className="flex w-[264px] flex-col gap-1">
                <div className="flex items-center gap-[6px] text-xs text-body3">
                  <div className="font-medium text-title">데일리단</div>
                  <div className="flex items-center gap-[2px]">
                    <PersonIcon className="h-4 w-4" />
                    <div className="font-regular">임유정 기자</div>
                  </div>
                  <div className="flex items-center gap-[2px]">
                    <ClockIcon />
                    <div className="font-regular">2024. 10. 04</div>
                  </div>
                </div>
                <div className="truncate text-md font-medium">
                  한솥도시락, 달콤·고소·담백 ‘제주녹차 미니꿀호떡’ 출시
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsBoxChecked((prev) => !prev)}
              >
                {isBoxChecked ? (
                  <CheckCircleFillIcon />
                ) : (
                  <CheckCircleOutlineIcon />
                )}
              </button>
            </div>
          </div>
        </div>
        <div className="flex flex-col">
          <div className="flex items-center justify-between border-t-1 border-t-neutral-200 py-4">
            <span className="text-lg font-semibold text-title">경쟁사</span>
            <ArrowUpIcon />
          </div>
          <div className="text-sm font-regular text-body3">
            데일리 모니터링에서 뉴스를 추가해주세요.
          </div>
        </div>
        <div className="flex items-center justify-between border-t-1 border-t-neutral-200 py-4">
          <span className="text-lg font-semibold text-title">업계</span>
          <ArrowUpIcon />
        </div>
      </div>
    </div>
  );
};

export default AddNews;
