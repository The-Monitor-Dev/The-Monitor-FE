import { AddCircleFillIcon } from "@assets/svgs";
import { useState } from "react";
import AddModal from "./components/AddModal";
import MonitoringCard from "./components/MonitoringCard";
import SearchBar from "@components/SearchBar";
import ClientNotFound from "./components/ClientNotFound";
import { useGetClients } from "@api/hooks/clients/useGetClients";
import Button from "@components/Button";
import usePostSearchClient from "@api/hooks/clients/usePostSearchClient";

const DashboardPage: React.FC = () => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const { data: clientsData, isLoading } = useGetClients();
  const { data: searchData, isLoading: isSearching } =
    usePostSearchClient(searchText);

  if (isLoading || isSearching) {
    return null;
  }

  const handleAddModalOpen = () => {
    setIsAddModalOpen(true);
  };

  const handleClose = () => {
    setIsAddModalOpen(false);
  };

  const handleSubmit = () => {
    setIsAddModalOpen(false);
  };

  const handleChangeSearchText = (value: string) => {
    setSearchText(value);
    if (!value.trim()) {
      setSearchQuery("");
    }
  };

  const handleSearch = () => {
    if (!searchText.trim()) {
      setSearchQuery("");
    } else {
      setSearchQuery(searchText);
    }
  };

  const displayClientData = searchQuery ? searchData : clientsData;

  return (
    <div className="flex h-full flex-col items-center">
      {clientsData?.length === 0 ? (
        <ClientNotFound handleAddModalOpen={handleAddModalOpen} />
      ) : (
        <>
          <div className="mb-[42px] mt-[63px] flex w-[1048px] justify-between">
            <SearchBar
              value={searchText}
              onChange={handleChangeSearchText}
              placeholder="고객사명을 입력해주세요."
              bgColor="white"
              onSearch={handleSearch}
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
              {displayClientData?.map((client) => (
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
    </div>
  );
};

export default DashboardPage;
