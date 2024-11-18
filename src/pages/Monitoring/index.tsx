import {
  BookmarkBlankIcon,
  BookmarkFillIcon,
  ClockIcon,
  PersonIcon,
  ReportCheckIcon,
} from "@assets/svgs";
import { subDays } from "date-fns";
import React, { useRef, useState } from "react";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import DateSelector from "./components/DateSelector";
import PortalDropdown from "./components/PortalDropdown";
import { DefaultImage } from "@assets/images";
import Button from "@components/Button";
import { useOutsideClick } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import routes from "@constants/routes";

const MonitoringPage: React.FC = () => {
  const navigate = useNavigate();
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
  const [portalDisplay, setPortalDisplay] = useState("구글");
  const [selectedPortals, setSelectedPortals] = useState<{
    네이버: boolean;
    구글: boolean;
    다음: boolean;
    줌: boolean;
  }>({
    네이버: false,
    구글: true,
    다음: false,
    줌: false,
  });

  const [tempSelectedPortals, setTempSelectedPortals] =
    useState(selectedPortals);

  const handleCheckboxChange = (key: "네이버" | "구글" | "다음" | "줌") => {
    const isOnlyOneSelected =
      Object.values(tempSelectedPortals).filter(Boolean).length === 1;
    if (isOnlyOneSelected && tempSelectedPortals[key]) return;

    setTempSelectedPortals((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const applySelection = () => {
    setSelectedPortals(tempSelectedPortals);
    const selectedKeys = Object.keys(tempSelectedPortals).filter(
      (key) => tempSelectedPortals[key as keyof typeof tempSelectedPortals],
    );
    setPortalDisplay(
      selectedKeys.length === 4 ? "전체 포털" : selectedKeys.join(" / "),
    );
    setShowDropdown(false);
  };

  const dropdownRef = useRef<HTMLDivElement | null>(null);
  useOutsideClick({
    ref: dropdownRef,
    handler: () => setShowDropdown(false),
  });

  // 임시 state
  const [isBookmarkChecked, setIsBookmarkChecked] = useState(false);

  return (
    <div className="flex h-full bg-white">
      <div className="flex h-full w-[232px] flex-col gap-3 border-r border-neutral-200 px-4 py-5">
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
          <ul className="mt-2 flex flex-col gap-1 pl-6 text-sm font-medium text-body3">
            <li className="my-2">keyword</li>
            <li className="my-2">keyword</li>
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
          <ul className="mt-2 flex flex-col gap-1 pl-6 text-sm font-medium text-body3">
            <li className="my-2">keyword</li>
            <li className="my-2">keyword</li>
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
          <ul className="mt-2 flex flex-col gap-1 pl-6 text-sm font-medium text-body3">
            <li className="my-2">keyword</li>
            <li className="my-2">keyword</li>
          </ul>
        </div>
      </div>
      <div className="flex w-[976px] flex-col">
        <div className="flex h-[69px] w-full items-center justify-between px-8">
          <div className="flex gap-3">
            <div className="flex items-center gap-1 border-r-1 border-neutral-200 pr-3 text-sm">
              <div className="font-regular text-body1">검색 결과</div>
              <div className="w-[39px] text-right font-semibold text-primary-800">
                57건
              </div>
            </div>
            <DateSelector
              dateRange={dateRange}
              setDateRange={setDateRange}
              showDatePicker={showDatePicker}
              toggleDatePicker={toggleDatePicker}
            />
            <PortalDropdown
              showDropdown={showDropdown}
              setShowDropdown={(show) => {
                setShowDropdown(show);
                if (show) {
                  setTempSelectedPortals(selectedPortals);
                }
              }}
              selectedPortals={tempSelectedPortals}
              handleCheckboxChange={handleCheckboxChange}
              applySelection={applySelection}
              portalDisplay={portalDisplay}
              ref={dropdownRef}
            />
          </div>
          <Button
            type="button"
            style="filled"
            onClick={() => navigate(routes.reportNew)}
            className="flex items-center gap-1 p-2"
          >
            <ReportCheckIcon />
            <span>보고서 편집하기</span>
          </Button>
        </div>
        <div className="flex flex-col pl-8">
          <div className="flex h-[132px] w-[658px] gap-4 border-b-1 border-b-neutral-200">
            <img
              src={DefaultImage}
              className="mt-4 h-[92px] w-[92px] rounded-[6px]"
            />
            <div className="flex w-[466px] flex-col gap-[6px] py-4">
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
              <div className="text-md font-semibold text-neutral-700">
                한솥도시락, 달콤·고소·담백 ‘제주녹차 미니꿀호떡’ 출시
              </div>
              <p className="line-clamp-2 text-sm font-normal text-body3">
                한솥도시락은 이번 리뉴얼 출시를 통해 보다 업그레이드된 맛과
                품질로 그간 받은 관심과 성원에 보답하겠다는 입장이다. ‘제주녹차
                미니꿀호떡’은 기존 메뉴에 있던 달콤한 꿀과 고소한 견과류에
                녹차가 추가됐다. 은은한 녹차 향과 담백한 맛이 가미돼 깊은 풍미를
                선사하는 것이 특징이다. 출출할 때 간식 대용으로 찾거나 식사 후
                풍성한 디저트로 즐기기에 안성맞춤이다. 이처럼 깊은 맛을 내는
                핵심 비결은 녹차에 있다. 진한 맛과 풍미가 일품인 제주산 프리미엄
                녹차를 사용했기 때문이다. 실제로 제주도는 중국 황산, 일본
                후지산과 더불어 세계 3대 녹차 생산지로 손꼽히며 깊은 녹차 향을
                내는 것으로 유명하다.
              </p>
            </div>
            <div className="px-4 pt-[18px]">
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
  );
};
export default MonitoringPage;
