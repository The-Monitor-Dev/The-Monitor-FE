import { useState } from "react";
import useGetReports from "@api/hooks/reports/useGetReports";
import usePostSearchReports from "@api/hooks/reports/usePostSearchReports";
import { clientId } from "@constants/clientId";
import { DonerIcon } from "@assets/svgs";
import SearchBar from "@components/SearchBar";
import ReportBox from "./ReportBox";

type SortOption = "updatedAt" | "createdAt";

const ReportPage = () => {
  const [selectedSort, setSelectedSort] = useState<SortOption>("updatedAt");
  const [searchTitle, setSearchTitle] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const { data: reportsData } = useGetReports();
  const { data: searchReportsData } = usePostSearchReports({
    clientId: clientId,
    searchTitle: searchQuery,
  });

  const activeReportsData = searchQuery.trim()
    ? searchReportsData
    : reportsData;

  const sortedReports = activeReportsData?.slice().sort((a, b) => {
    if (selectedSort === "updatedAt") {
      return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
    } else if (selectedSort === "createdAt") {
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    }
    return 0;
  });

  const handleSearch = () => {
    if (!searchTitle.trim()) {
      setSearchQuery("");
    } else {
      setSearchQuery(searchTitle);
    }
  };

  const handleChangeSearchTitle = (value: string) => {
    setSearchTitle(value);
    if (!value.trim()) {
      setSearchQuery("");
    }
  };

  return (
    <div className="flex h-full flex-col bg-white pl-8 pt-5">
      <div className="flex items-end gap-[62px] pb-5">
        <SearchBar
          placeholder="보고서 제목을 입력해주세요."
          bgColor="neutral-100"
          value={searchTitle}
          onChange={handleChangeSearchTitle}
          onSearch={handleSearch}
        />
        <div className="flex h-6 items-center gap-1">
          <DonerIcon className="h-4 w-4 scale-x-[-1]" />
          <button
            type="button"
            onClick={() => setSelectedSort("updatedAt")}
            className={`text-sm font-semibold ${selectedSort === "updatedAt" ? "text-primary-500" : "text-body3"}`}
          >
            수정일순
          </button>
          <div className="mx-1 h-full w-[1px] bg-neutral-200" />
          <button
            type="button"
            onClick={() => setSelectedSort("createdAt")}
            className={`text-sm font-semibold ${selectedSort === "createdAt" ? "text-primary-500" : "text-body3"}`}
          >
            최신순
          </button>
        </div>
      </div>
      {!sortedReports || sortedReports?.length === 0 ? (
        <div className="ml-4 mt-[55px] flex flex-col gap-2">
          <span className="text-4xl font-semibold text-body1">
            아직 저장된 보고서가 없어요!
          </span>
          <p className="text-lg font-regular text-body3">
            데일리 모니터링 보고서를 작성하고, <br />
            이곳에서 보고서를 조회 및 관리해보세요
          </p>
        </div>
      ) : (
        <div className="flex flex-col overflow-y-auto">
          {sortedReports.map((report) => (
            <ReportBox
              key={report.reportId}
              reportId={report.reportId}
              title={report.title}
              createdAt={report.createdAt}
              updatedAt={report.updatedAt}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default ReportPage;
