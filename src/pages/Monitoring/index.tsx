import { NotFoundIcon, ReportCheckIcon } from "@assets/svgs";
import { subDays } from "date-fns";
import React, { useRef, useState } from "react";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import DateSelector from "./components/DateSelector";
import PortalDropdown from "./components/PortalDropdown";
import Button from "@components/Button";
import { useOutsideClick } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import routes from "@constants/routes";
import useGetKeywords from "@api/hooks/keywords/useGetKeywords";
import Category from "./components/Category";
import useGetArticlesByKeyword from "@api/hooks/articles/useGetArticlesByKeyword";
import ArticleBox from "./components/ArticleBox";
import Pagination from "./components/Pagination";
import useGetArticles from "@api/hooks/articles/useGetArticles";
import { CategoryTypeEn, CategoryTypeKr } from "types/category";
import { enToKrCategoryMap } from "@constants/category";
import { Keyword } from "@api/types/keywords";

const MonitoringPage: React.FC = () => {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState<
    CategoryTypeEn | undefined
  >("SELF");

  const handleSelectCategory = (category: CategoryTypeEn | undefined) => {
    setSelectedCategory(category);
  };
  const { data: keywordsData } = useGetKeywords();

  const [selectedKeyword, setSelectedKeyword] = useState<Keyword | undefined>();
  const handleSelectKeyword = (keyword: Keyword | undefined) => {
    setSelectedKeyword(keyword);
  };

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

  const [page, setPage] = useState(1);
  const { data: articles } = useGetArticles({
    categoryType: selectedCategory,
    page,
  });
  const { data: articlesByKeyword } = useGetArticlesByKeyword({
    keywordId: selectedKeyword?.keywordId,
    categoryType: selectedKeyword?.categoryType,
    page,
  });

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  const articlesToDisplay = selectedCategory ? articles : articlesByKeyword;

  return (
    <div className="flex h-full bg-white">
      <div className="flex h-full w-[232px] flex-col gap-3 border-r border-neutral-200 px-4 py-5">
        {keywordsData &&
          (
            Object.entries(enToKrCategoryMap) as [
              CategoryTypeEn,
              CategoryTypeKr,
            ][]
          ).map(([categoryEn, categoryKr]) => (
            <Category
              key={categoryEn}
              categoryKr={categoryKr}
              categoryEn={categoryEn}
              selectedCategory={selectedCategory}
              onSelectCategory={handleSelectCategory}
              keywords={keywordsData[categoryEn]}
              selectedKeyword={selectedKeyword}
              onSelectKeyword={handleSelectKeyword}
            />
          ))}
      </div>
      <div className="flex w-[976px] flex-col">
        <div className="flex h-[69px] w-full items-center justify-between px-8">
          <div className="flex gap-3">
            <div className="flex items-center gap-1 border-r-1 border-neutral-200 pr-3 text-sm">
              <div className="font-regular text-body1">검색 결과</div>
              <div className="text-right font-semibold text-primary-800">
                {articlesToDisplay?.totalCount}건
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
            className="flex items-center gap-1 p-2 pr-3"
          >
            <ReportCheckIcon />
            <span>보고서 편집하기</span>
          </Button>
        </div>
        {articlesToDisplay?.totalCount === 0 ? (
          <div className="mt-[200px] flex flex-col items-center">
            <NotFoundIcon className="h-[100px] w-[100px] fill-black" />
            <span className="mt-6 text-3xl font-semibold text-body1">
              검색 결과가 없습니다.
            </span>
            <span className="mt-1 text-lg font-medium text-body3">
              기간을 다시 설정해주세요.
            </span>
          </div>
        ) : (
          <div className="flex max-h-[calc(100vh-137px)] flex-col overflow-y-auto pb-9">
            <div className="flex flex-col pl-8">
              {articlesToDisplay?.listPageResponse[0].googleArticles.map(
                (article) => (
                  <ArticleBox
                    key={article.articleId}
                    articleId={article.articleId}
                    title={article.title}
                    body={article.body}
                    publisherName={article.publisherName}
                    reporterName={article.reporterName}
                    publishDate={article.publishDate}
                    imageUrl={article.imageUrl}
                    url={article.url}
                    isScrapped={article.scrapped}
                    isAdded={article.added}
                    isRead={article.read}
                  />
                ),
              )}
            </div>
            <Pagination
              totalCount={articlesToDisplay?.totalCount || 0}
              currentPage={page}
              onPageChange={handlePageChange}
            />
          </div>
        )}
      </div>
    </div>
  );
};
export default MonitoringPage;
