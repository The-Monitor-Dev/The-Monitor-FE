import { AddCircleFillIcon } from "@assets/svgs";
import { useState } from "react";
import AddModal from "./components/AddModal";
import CancelModal from "@components/CancelModal";
import MonitoringCard from "./components/MonitoringCard";
import SearchBar from "@components/SearchBar";
import ClientNotFound from "./components/ClientNotFound";
import { useGetClients } from "@api/hooks/clients/useGetClients";
import Button from "@components/Button";

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

  const [value, setValue] = useState("");

  const handleChange = (value: string) => {
    setValue(value);
  };

  const { data: clientsData, isLoading } = useGetClients();

  if (isLoading) {
    return null;
  }

  return (
    <div className="flex flex-col items-center">
      {clientsData?.length === 0 ? (
        <ClientNotFound handleAddModalOpen={handleAddModalOpen} />
      ) : (
        <>
          <div className="mb-4 mt-[63px] flex w-[1048px] justify-between">
            <SearchBar
              value={value}
              onChange={handleChange}
              placeholder="고객사명을 입력해주세요."
              bgColor="white"
            />
            <Button
              style="tonal"
              className="flex h-10 items-center gap-1 p-2 pl-3"
              onClick={handleAddModalOpen}
            >
              고객사 추가하기
              <AddCircleFillIcon className="fill-primary-500" />
            </Button>
          </div>
          <div className="flex max-h-[calc(100vh-217px)] w-full justify-center overflow-y-auto">
            <div className="pb-б grid w-[1048px] grid-cols-4 gap-3">
              {clientsData?.map((client) => (
                <MonitoringCard
                  key={client.clientId}
                  clientId={client.clientId}
                  name={client.name}
                  manager={client.managerName}
                  logoUrl={client.logoUrl}
                />
              ))}
            </div>
          </div>
        </>
      )}
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
