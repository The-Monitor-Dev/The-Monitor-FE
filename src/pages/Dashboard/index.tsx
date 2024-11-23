import { AddCircleFillIcon } from "@assets/svgs";
import { useState } from "react";
import AddModal from "./components/AddModal";
import CancelModal from "@components/CancelModal";
import MonitoringCard from "./components/MonitoringCard";
import SearchBar from "@components/SearchBar";
import ClientNotFound from "./components/ClientNotFound";

const DashboardPage: React.FC = () => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleAddModalOpen = () => {
    setIsAddModalOpen(true);
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

  const handleSubmit = () => {
    setIsAddModalOpen(false);
  };

  return (
    <div className="flex flex-col items-center">
      <div className="mb-4 mt-[63px] flex w-[1048px] justify-between">
        <SearchBar placeholder="고객사명을 입력해주세요." bgColor="white" />
        <button
          type="button"
          className="flex h-10 gap-1 rounded border-[0.5px] border-primary-200 bg-surface-secondary p-2 pl-3 text-md font-semibold text-primary-700"
          onClick={handleAddModalOpen}
        >
          고객사 추가하기
          <AddCircleFillIcon className="fill-primary-500" />
        </button>
      </div>
      <div className="grid w-[1048px] grid-cols-4 gap-3">
        <MonitoringCard name="한솥" manager="이현수" />
      </div>
      {/* <ClientNotFound handleAddModalOpen={handleAddModalOpen} /> */}
      {isAddModalOpen && (
        <AddModal onClose={handleClose} onSubmit={handleSubmit} />
      )}
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
