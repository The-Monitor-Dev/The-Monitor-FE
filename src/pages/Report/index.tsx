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

{
  /* <div
  className="relative flex h-full w-[92px] cursor-default items-center border-l-[0.5px] border-neutral-200 px-7 group-hover:bg-neutral-100"
  onMouseEnter={(e) => e.currentTarget.parentElement?.classList.remove("group")}
  onMouseLeave={(e) => e.currentTarget.parentElement?.classList.add("group")}
>
  <button
    type="button"
    className={`rounded-[2.25px] p-[6px] ${isMenuOpen ? "bg-neutral-100" : "hover:bg-neutral-100"}`}
    onClick={handleMenuToggle}
  >
    <MoreHorizIcon />
  </button>

  {isMenuOpen && (
    <div
      ref={menuRef}
      className="absolute left-7 top-[76px] rounded border border-neutral-200 bg-white"
    >
      <button
        type="button"
        className="flex w-32 px-5 py-2 text-md font-medium hover:bg-neutral-100"
        onClick={() => {
          handleMenuClose();
        }}
      >
        수정하기
        <EditSquareIcon className="ml-2" />
      </button>
      <div className="border-t border-neutral-200" />
      <button
        type="button"
        className="flex w-32 px-5 py-2 text-md font-medium hover:bg-neutral-100"
        onClick={() => {
          handleDeleteModalOpen();
          handleMenuClose();
        }}
      >
        삭제하기
        <DeleteIcon className="ml-2" />
      </button>
    </div>
  )}
</div>; */
}

export default ReportPage;
