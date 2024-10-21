import { DefaultImage } from "@assets/images";
import {
  AddCircleFillIcon,
  DeleteIcon,
  EditSquareIcon,
  MoreHorizIcon,
  PersonIcon,
  SearchIcon,
} from "@assets/svg";
import { useEffect, useRef, useState } from "react";
import DeleteModal from "./components/DeleteModal";

const DashboardPage: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const handleMenuToggle = () => {
    setIsActive((prev) => !prev);
    setIsMenuOpen((prev) => !prev);
  };

  const handleMenuClose = () => {
    setIsMenuOpen(false);
    setIsActive(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        handleMenuClose();
      }
    };

    if (isMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isMenuOpen]);

  const handleDeleteModalOpen = () => {
    setIsDeleteModalOpen(true);
  };

  const handleDeleteModalClose = () => {
    setIsDeleteModalOpen(false);
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="mt-[63px] flex w-[1048px] justify-between">
        <div className="flex h-11 w-[480px] items-center rounded border bg-white focus-within:border-primary-500">
          <input
            className="w-[436px] px-4 text-md font-regular placeholder:text-md placeholder:font-regular focus:outline-none"
            placeholder="고객사명을 입력하세요."
          />
          <SearchIcon className="mx-[10px]" />
        </div>
        <button
          type="button"
          className="bg-surface-secondary flex h-10 items-center gap-1 rounded border-[0.5px] border-primary-200 p-2 pl-3 text-md font-semibold text-primary-700"
        >
          고객사 추가하기
          <AddCircleFillIcon className="fill-primary-500" />
        </button>
      </div>
      <button
        type="button"
        className="group mt-4 flex h-[108px] w-[1048px] items-center rounded bg-white shadow-main"
      >
        <div className="flex w-full group-hover:bg-neutral-100">
          <img src={DefaultImage} className="m-4 w-24 rounded" />
          <div className="flex w-full flex-col gap-1 py-5 pl-4 pr-5">
            <h2 className="text-left text-2xl font-semibold text-title">
              한솥
            </h2>
            <div className="flex items-center">
              <PersonIcon className="mr-1" />
              <p className="mr-2 text-md font-regular text-body3">담당자</p>
              <p className="text-md font-semibold text-body1">이현수</p>
            </div>
          </div>
        </div>
        <div
          className="relative flex h-full w-[92px] cursor-default items-center border-l-[0.5px] border-neutral-200 px-7 group-hover:bg-neutral-100"
          onMouseEnter={(e) =>
            e.currentTarget.parentElement?.classList.remove("group")
          }
          onMouseLeave={(e) =>
            e.currentTarget.parentElement?.classList.add("group")
          }
        >
          <button
            type="button"
            className={`rounded-[2.25px] p-[6px] ${isActive ? "bg-neutral-100" : "hover:bg-neutral-100"}`}
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
        </div>
      </button>
      {isDeleteModalOpen && <DeleteModal onClose={handleDeleteModalClose} />}
    </div>
  );
};

export default DashboardPage;
