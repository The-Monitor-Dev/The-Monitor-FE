import useDeleteClient from "@api/hooks/clients/useDeleteClient";
import { CloseIcon, ErrorIcon } from "@assets/svgs";
import Input from "@components/Input";
import { useState } from "react";

interface DeleteModalProps {
  onClose: () => void;
  clientId: number;
  name: string;
}

const DeleteModal: React.FC<DeleteModalProps> = ({
  clientId,
  onClose,
  name,
}) => {
  const [clientName, setClientName] = useState<string>("");
  const [error, setError] = useState<string>("");

  const { mutate } = useDeleteClient();

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setClientName(value);

    if (value === "") {
      setError("");
    }
  };

  const handleModalClose = () => {
    onClose();
  };

  const handleDelete = () => {
    if (clientName === name) {
      mutate(clientId);
      handleModalClose();
    } else {
      setError("*해당하는 고객사가 존재하지 않습니다.");
    }
  };

  return (
    <div className="fixed inset-0 z-[99] flex items-center justify-center bg-black bg-opacity-65">
      <div className="w-120 relative z-[100] flex h-[430px] flex-col rounded bg-white px-[70px] pb-11 pt-10">
        <CloseIcon
          type="button"
          className="absolute right-5 top-5 cursor-pointer fill-neutral-700"
          onClick={handleModalClose}
        />
        <div className="flex w-full justify-center">
          <ErrorIcon className="h-[52px] w-[52px]" />
        </div>
        <h2 className="mt-5 text-2xl font-semibold">
          고객사 정보를 정말 삭제하시겠어요?
        </h2>
        <p className="mt-1 text-md font-regular text-body3">
          모든 정보는 삭제되며 이후 복구가 불가능합니다
        </p>
        <p className="mt-8 text-sm font-medium">
          삭제하려는 고객사명을 다시 입력해주세요.
        </p>
        <Input
          className="mt-1"
          placeholder="고객사명을 입력해주세요."
          value={clientName}
          onChange={handleInputChange}
        />
        {clientName !== name && (
          <p className="absolute bottom-[124px] text-xs font-regular text-red-500">
            {error}
          </p>
        )}
        <div className="mt-[56px] flex justify-center gap-3">
          <button
            type="button"
            className={`w-[111px] rounded py-2 text-lg font-semibold ${
              clientName
                ? "bg-error-500 text-white"
                : "cursor-not-allowed bg-surface-disable text-disable"
            }`}
            onClick={handleDelete}
            disabled={!clientName}
          >
            삭제하기
          </button>
          <button
            type="button"
            className="w-[111px] rounded border border-error-500 py-2 text-lg font-semibold text-error-500"
            onClick={handleModalClose}
          >
            취소하기
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;
