import {
  ArrowLeftIcon,
  ArrowRightIcon,
  DoubleArrowLeftIcon,
  DoubleArrowRightIcon,
} from "@assets/svgs";
import React from "react";

interface PaginationProps {
  totalCount: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  totalCount,
  currentPage,
  onPageChange,
}) => {
  const totalPages = Math.ceil(totalCount / 10);
  const startPage = Math.floor((currentPage - 1) / 10) * 10 + 1;
  const endPage = Math.min(startPage + 9, totalPages);

  const pages = Array.from(
    { length: endPage - startPage + 1 },
    (_, i) => startPage + i,
  );

  const handleNextGroup = () => {
    if (endPage < totalPages) {
      onPageChange(endPage + 1);
    }
  };

  const handlePrevGroup = () => {
    if (startPage > 1) {
      onPageChange(startPage - 1);
    }
  };

  const handleFirstPage = () => {
    onPageChange(1);
  };

  const handleLastPage = () => {
    onPageChange(totalPages);
  };

  return (
    <div className="ml-12 mt-7 flex h-14 w-[626px] items-center justify-center">
      <button
        onClick={handleFirstPage}
        disabled={currentPage <= 10}
        className={`mr-2 flex h-8 w-8 items-center justify-center ${!(currentPage <= 10) && "rounded-full hover:bg-neutral-100"}`}
      >
        <DoubleArrowLeftIcon
          className={`${currentPage <= 10 ? "fill-neutral-300" : "fill-neutral-700"}`}
        />
      </button>
      <button
        onClick={handlePrevGroup}
        disabled={startPage === 1}
        className={`flex h-8 w-8 items-center justify-center ${!(startPage === 1) && "rounded-full hover:bg-neutral-100"}`}
      >
        <ArrowLeftIcon
          className={`${startPage === 1 ? "fill-neutral-300" : "fill-neutral-700"}`}
        />
      </button>
      <div className="mx-1 flex items-center gap-1 font-bold">
        {pages.map((page) => (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            className={`flex h-10 w-10 items-center justify-center`}
          >
            <div
              className={`${
                page === currentPage
                  ? "border-b-1 border-primary-500 text-primary-500"
                  : "text-body1"
              }`}
            >
              {page}
            </div>
          </button>
        ))}
      </div>
      <button
        onClick={handleNextGroup}
        disabled={endPage === totalPages}
        className={`mr-2 flex h-8 w-8 items-center justify-center ${!(endPage === totalPages) && "rounded-full hover:bg-neutral-100"}`}
      >
        <ArrowRightIcon
          className={`${endPage === totalPages ? "fill-neutral-300" : "fill-neutral-700"}`}
        />
      </button>
      <button
        onClick={handleLastPage}
        disabled={endPage === totalPages}
        className={`flex h-8 w-8 items-center justify-center ${!(endPage === totalPages) && "rounded-full hover:bg-neutral-100"}`}
      >
        <DoubleArrowRightIcon
          className={`${endPage === totalPages ? "fill-neutral-300" : "fill-neutral-700"}`}
        />
      </button>
    </div>
  );
};

export default Pagination;
