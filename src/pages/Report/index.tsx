import { ClockIcon, DeleteIcon, DonerIcon, EditNoteIcon } from "@assets/svgs";
import SearchBar from "@components/SearchBar";
import { useState } from "react";

type SortOption = "updatedDate" | "newest";

const ReportPage = () => {
  const [selectedSort, setSelectedSort] = useState<SortOption>("updatedDate");
  return (
    <div className="flex h-full flex-col bg-white pl-8 pt-5">
      <div className="flex items-end gap-[62px]">
        <SearchBar
          placeholder="보고서 제목을 입력해주세요."
          bgColor="neutral-100"
        />
        <div className="flex h-6 items-center gap-1">
          <DonerIcon className="h-4 w-4 scale-x-[-1]" />
          <button
            type="button"
            onClick={() => setSelectedSort("updatedDate")}
            className={`text-sm font-semibold ${selectedSort === "updatedDate" ? "text-primary-500" : "text-body3"}`}
          >
            수정일순
          </button>
          <div className="mx-1 h-full w-[1px] bg-neutral-200" />
          <button
            type="button"
            onClick={() => setSelectedSort("newest")}
            className={`text-sm font-semibold ${selectedSort === "newest" ? "text-primary-500" : "text-body3"}`}
          >
            최신순
          </button>
        </div>
      </div>
      <div className="mt-5 flex flex-col">
        <div className="flex h-[108px] w-[700px] items-center border-b-1 border-b-neutral-200 pl-4 pr-7 hover:bg-neutral-50">
          <div className="flex w-[568px] flex-col gap-2">
            <span className="text-lg font-semibold text-title">
              한솥 20213 데일리 모니터링
            </span>
            <div className="flex items-center gap-[2px]">
              <ClockIcon />
              <div className="text-md font-regular text-body3">24.10.10</div>
            </div>
          </div>
          <div className="flex flex-grow items-center gap-1">
            <button
              type="button"
              className="flex h-9 w-9 items-center justify-center rounded-[2px] hover:bg-neutral-200"
            >
              <EditNoteIcon />
            </button>
            <button
              type="button"
              className="flex h-9 w-9 items-center justify-center rounded-[2px] hover:bg-neutral-100"
            >
              <DeleteIcon className="fill-neutral-400" />
            </button>
          </div>
        </div>
        <div className="flex h-[108px] w-[700px] items-center border-b-1 border-b-neutral-200 pl-4 pr-7 hover:bg-neutral-50">
          <div className="flex w-[568px] flex-col gap-2">
            <span className="text-lg font-semibold text-title">
              한솥 20213 데일리 모니터링
            </span>
            <div className="flex items-center gap-[2px]">
              <ClockIcon />
              <div className="text-md font-regular text-body3">24.10.10</div>
            </div>
          </div>
          <div className="flex flex-grow items-center gap-1">
            <button
              type="button"
              className="flex h-9 w-9 items-center justify-center rounded-[2px] hover:bg-neutral-100"
            >
              <EditNoteIcon />
            </button>
            <button
              type="button"
              className="flex h-9 w-9 items-center justify-center rounded-[2px] hover:bg-neutral-100"
            >
              <DeleteIcon className="fill-neutral-400" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportPage;
