import { DefaultImage } from "@assets/images";
import {
  AddCircleFillIcon,
  DeleteIcon,
  EditSquareIcon,
  MoreHorizIcon,
  PersonIcon,
  SearchIcon,
} from "@assets/svgs";
import { useEffect, useRef, useState } from "react";
import DeleteModal from "./components/DeleteModal";
import AddModal from "./components/AddModal";
import EditModal from "./components/EditModal";
import CancelModal from "@components/CancelModal";

const DashboardPage: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleMenuToggle = () => {
    setIsMenuOpen((prev) => !prev);
  };

  const handleMenuClose = () => {
    setIsMenuOpen(false);
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

  const handleAddModalOpen = () => {
    setIsAddModalOpen(true);
  };

  const handleEidtModalOpen = () => {
    setIsEditModalOpen(true);
  };

  const handleEidtModalClose = () => {
    setIsEditModalOpen(false);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const handleClose = () => {
    setIsAddModalOpen(false);
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsAddModalOpen(true);
    setIsModalOpen(false);
  };

  return (
    <div className="flex flex-col items-center">
      <div className="mb-4 mt-[63px] flex w-[1048px] justify-between">
        <div className="flex h-11 w-[480px] items-center rounded border bg-white focus-within:border-primary-500">
          <input
            className="w-[436px] px-4 text-md font-regular placeholder:text-md placeholder:font-regular focus:outline-none"
            placeholder="고객사명을 입력하세요."
          />
          <SearchIcon className="mx-[10px]" />
        </div>
        <button
          type="button"
          className="flex h-10 gap-1 rounded border-[0.5px] border-primary-200 bg-surface-secondary p-2 pl-3 text-md font-semibold text-primary-700"
          onClick={handleAddModalOpen}
        >
          고객사 추가하기
          <AddCircleFillIcon className="fill-primary-500" />
        </button>
      </div>
      <div className="flex w-[253px] rounded bg-white">
        <div className="flex w-full flex-col">
          <div className="relative flex justify-end px-3 py-2">
            <button
              type="button"
              className={`rounded-sm p-[6px] ${isMenuOpen ? "bg-neutral-100" : "hover:bg-neutral-100"}`}
              onClick={handleMenuToggle}
            >
              <MoreHorizIcon />
            </button>

            {isMenuOpen && (
              <div
                ref={menuRef}
                className="absolute left-[204px] top-[52px] rounded border border-neutral-200 bg-white"
              >
                <button
                  type="button"
                  className="flex w-32 px-5 py-2 text-md font-medium hover:bg-neutral-100"
                  onClick={() => {
                    handleEidtModalOpen();
                    handleMenuClose();
                  }}
                >
                  수정하기
                  <EditSquareIcon className="ml-2" />
                </button>
                <div className="border-neutral-200" />
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
          <div className="flex justify-center border-b-1 border-neutral-200">
            <img src={DefaultImage} className="mb-10 mt-5 w-24 rounded" />
          </div>
          <div className="flex w-full flex-col gap-1 py-4 pl-4 pr-5">
            <h2 className="text-left text-xl font-semibold text-title">한솥</h2>
            <div className="flex items-center">
              <PersonIcon className="mr-[6px]" />
              <p className="text-md font-semibold text-disable">이현수</p>
            </div>
          </div>
        </div>
      </div>
      {isDeleteModalOpen && <DeleteModal onClose={handleDeleteModalClose} />}
      {isAddModalOpen && <AddModal onClose={handleClose} />}
      {isEditModalOpen && <EditModal onClose={handleEidtModalClose} />}
      {isModalOpen && (
        <CancelModal
          onClose={handleModalClose}
          handleCancel={handleCancel}
          headingText="정말 중단하시겠어요?"
          bodyText={`작성하던 모든 기록은 지워지며 
              이후 복구가 불가능해요.
              창을 정말 닫으시겠어요?`}
          closeButtonText="창 닫기"
          cancelButtonText="취소"
        />
      )}
    </div>
  );
};

export default DashboardPage;
