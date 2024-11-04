import {
  BookmarkBlankIcon,
  BookmarkFillIcon,
  ClockIcon,
  PersonIcon,
  ReportCheckIcon,
} from "@assets/svg";
import { subDays } from "date-fns";
import React, { useState } from "react";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import DateSelector from "./components/DateSelector";
import PortalDropdown from "./components/PortalDropdown";
import { DefaultImage } from "@assets/images";

const MonitoringPage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState("Company");
  const [dateRange, setDateRange] = useState([
    {
      startDate: subDays(new Date(), 1) as Date,
      endDate: new Date() as Date,
      key: "selection",
    },
  ]);
  const [showDatePicker, setShowDatePicker] = useState(false);

  const toggleDatePicker = () => {
    setShowDatePicker((prev) => !prev);
  };

  const [showDropdown, setShowDropdown] = useState(false);
  const [portalDisplay, setPortalDisplay] = useState("전체 포털");
  const [selectedPortals, setSelectedPortals] = useState<{
    네이버: boolean;
    구글: boolean;
    다음: boolean;
    줌: boolean;
  }>({
    네이버: true,
    구글: true,
    다음: true,
    줌: true,
  });

  const handleCheckboxChange = (key: "네이버" | "구글" | "다음" | "줌") => {
    const isOnlyOneSelected =
      Object.values(selectedPortals).filter(Boolean).length === 1;
    if (isOnlyOneSelected && selectedPortals[key]) return;

    setSelectedPortals((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const applySelection = () => {
    const selectedKeys = Object.keys(selectedPortals).filter(
      (key) => selectedPortals[key as keyof typeof selectedPortals],
    );
    const displayText =
      selectedKeys.length === 4 ? "전체 포털" : selectedKeys.join(", ");
    setPortalDisplay(displayText);
    setShowDropdown(false);
  };

  // 임시 state
  const [isBookmarkChecked, setIsBookmarkChecked] = useState(false);

  return (
    <div className="flex h-full">
      <div className="flex h-full w-[232px] flex-col gap-3 border-r border-neutral-200 bg-white px-4 py-5">
        <div className="border-t-1 border-neutral-200">
          <button
            className={`w-full p-2 text-left text-md font-semibold hover:bg-surface-secondary ${
              selectedCategory === "Company"
                ? "bg-surface-secondary text-primary-700"
                : "text-neutral-700"
            }`}
            onClick={() => setSelectedCategory("Company")}
          >
            자사
          </button>
          <ul className="flex flex-col gap-1 pl-6 text-sm font-semibold text-body3">
            <li className="my-1">keyword</li>
            <li>keyword</li>
          </ul>
        </div>
        <div className="border-t-1 border-neutral-200">
          <button
            className={`w-full p-2 text-left text-md font-semibold hover:bg-surface-secondary ${
              selectedCategory === "Competitor"
                ? "bg-surface-secondary text-primary-700"
                : "text-neutral-700"
            }`}
            onClick={() => setSelectedCategory("Competitor")}
          >
            경쟁사
          </button>
          <ul className="flex flex-col gap-1 pl-6 text-sm font-semibold text-body3">
            <li className="my-1">keyword</li>
            <li>keyword</li>
          </ul>
        </div>
        <div className="border-t-1 border-neutral-200">
          <button
            className={`w-full p-2 text-left text-md font-semibold hover:bg-surface-secondary ${
              selectedCategory === "Industry"
                ? "bg-surface-secondary text-primary-700"
                : "text-neutral-700"
            }`}
            onClick={() => setSelectedCategory("Industry")}
          >
            업계
          </button>
          <ul className="flex flex-col gap-1 pl-6 text-sm font-semibold text-body3">
            <li className="my-1">keyword</li>
            <li>keyword</li>
          </ul>
        </div>
      </div>

      <div className="flex flex-grow">
        <div className="w-1/12 min-w-20" />
        <div className="mt-10 flex w-[626px] flex-col">
          <div className="flex items-end justify-between">
            <div className="flex gap-3">
              <div className="flex items-center gap-1 border-r-1 border-neutral-200 pr-3 text-sm">
                <div className="font-regular text-body1">검색 결과</div>
                <div className="font-semibold text-primary-800">57건</div>
              </div>
              <DateSelector
                dateRange={dateRange}
                setDateRange={setDateRange}
                showDatePicker={showDatePicker}
                toggleDatePicker={toggleDatePicker}
              />
              <PortalDropdown
                showDropdown={showDropdown}
                setShowDropdown={setShowDropdown}
                selectedPortals={selectedPortals}
                handleCheckboxChange={handleCheckboxChange}
                applySelection={applySelection}
                portalDisplay={portalDisplay}
              />
            </div>
            <button
              type="button"
              className="flex items-center gap-1 rounded bg-primary-500 p-2"
            >
              <ReportCheckIcon />
              <div className="text-md font-semibold text-white">
                보고서 편집하기
              </div>
            </button>
          </div>
          <div className="mt-5 flex flex-col gap-3">
            <div className="flex flex-col rounded bg-white pb-4 pl-6 pr-5 pt-5">
              <div className="flex items-center justify-between">
                <div className="flex w-[406px] flex-col gap-[6px]">
                  <div className="flex items-center gap-[6px] text-xs font-regular text-body3">
                    <div className="font-semibold text-title">데일리단</div>
                    <div className="flex items-center gap-[2px]">
                      <PersonIcon className="h-4 w-4" />
                      <div>임유정 기자</div>
                    </div>
                    <div className="flex items-center gap-[2px]">
                      <ClockIcon />
                      <div>2024. 10. 04</div>
                    </div>
                  </div>
                  <div className="text-md font-semibold text-primary-800">
                    한솥도시락, 달콤·고소·담백 ‘제주녹차 미니꿀호떡’ 출시
                  </div>
                  <p className="line-clamp-2 text-sm font-normal text-body3">
                    한솥도시락은 이번 리뉴얼 출시를 통해 보다 업그레이드된 맛과
                    품질로 그간 받은 관심과 성원에 보답하겠다는 입장이다.
                    ‘제주녹차 미니꿀호떡’은 기존 메뉴에 있던 달콤한 꿀과 고소한
                    견과류에 녹차가 추가됐다. 은은한 녹차 향과 담백한 맛이
                    가미돼 깊은 풍미를 선사하는 것이 특징이다. 출출할 때 간식
                    대용으로 찾거나 식사 후 풍성한 디저트로 즐기기에
                    안성맞춤이다. 이처럼 깊은 맛을 내는 핵심 비결은 녹차에 있다.
                    진한 맛과 풍미가 일품인 제주산 프리미엄 녹차를 사용했기
                    때문이다. 실제로 제주도는 중국 황산, 일본 후지산과 더불어
                    세계 3대 녹차 생산지로 손꼽히며 깊은 녹차 향을 내는 것으로
                    유명하다.
                  </p>
                </div>
                <img
                  src={DefaultImage}
                  className="h-[100px] w-[100px] rounded-[6px]"
                />
                <button
                  type="button"
                  onClick={() => setIsBookmarkChecked((prev) => !prev)}
                  className="flex h-8 w-8 items-center justify-center hover:bg-neutral-100"
                >
                  {isBookmarkChecked ? (
                    <BookmarkFillIcon />
                  ) : (
                    <BookmarkBlankIcon />
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default MonitoringPage;
