import { CloseIcon, ErrorIcon } from "@assets/svg";

interface ModalProps {
  onClose: () => void;
  handleCancel: () => void;
}

const Modal: React.FC<ModalProps> = ({ onClose, handleCancel }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-65">
      <div className="relative flex h-[340px] w-[460px] flex-col items-center rounded bg-white pt-10">
        <CloseIcon
          fill="neutral-700"
          className="absolute right-5 top-5 cursor-pointer"
          onClick={onClose}
        />
        <ErrorIcon className="h-[53px] w-[53px]" />
        <h2 className="mt-5 text-2xl font-semibold">정말 중단하시겠어요?</h2>
        <p className="mt-2 text-center text-md font-regular">
          작성하던 모든 기록은 지워지며 <br />
          이후 복구가 불가능해요. <br />
          창을 정말 닫으시겠어요?
        </p>
        <div className="mt-[29px] flex justify-center gap-3">
          <button
            type="button"
            className="w-[111px] rounded bg-error-500 py-2 text-white"
            onClick={onClose}
          >
            창 닫기
          </button>
          <button
            type="button"
            className="w-[111px] rounded border border-error-500 py-2 text-error-500"
            onClick={handleCancel}
          >
            취소하기
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
