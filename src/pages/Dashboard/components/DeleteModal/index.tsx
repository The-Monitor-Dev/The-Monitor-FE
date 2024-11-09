import { CloseIcon, ErrorIcon } from "@assets/svgs";
import Input from "@components/Input";

interface DeleteModalProps {
  onClose: () => void;
}

const DeleteModal: React.FC<DeleteModalProps> = ({ onClose }) => {
  const handleModalClose = () => {
    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-65">
      <div className="w-120 relative flex flex-col rounded bg-white px-[70px] pb-11 pt-10">
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
        <Input className="mt-1" placeholder="고객사명을 입력해주세요." />
        <div className="mt-6 flex justify-center gap-3">
          <button
            type="button"
            className="w-[111px] rounded bg-error-500 py-2 text-lg font-semibold text-white"
            onClick={handleModalClose}
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
