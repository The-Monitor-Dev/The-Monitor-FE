import { CloseIcon, ErrorIcon } from "@assets/svgs";

interface ExitModalProps {
  onClose: () => void;
  handleSaveExit: () => void;
  handleDeleteExit: () => void;
}

const ExitModal: React.FC<ExitModalProps> = ({
  onClose,
  handleSaveExit,
  handleDeleteExit,
}) => {
  return (
    <div className="fixed inset-0 z-10 flex items-center justify-center bg-black bg-opacity-65">
      <div className="relative flex w-[460px] flex-col items-center rounded bg-white pb-[42px] pt-10">
        <CloseIcon
          type="button"
          className="absolute right-5 top-5 cursor-pointer fill-neutral-700"
          onClick={onClose}
        />
        <ErrorIcon className="h-[53px] w-[53px]" />
        <h2 className="mt-5 text-2xl font-semibold text-title">
          임시저장 하시겠어요?
        </h2>
        <p className="mt-2 whitespace-pre-line text-center text-md font-regular text-body3">
          저장을 하지 않으실 경우
          <br />
          작성 중이던 모든 기록은 지워지며
          <br />
          이후 복구가 불가능해요.
        </p>
        <div className="mt-[29px] flex justify-center gap-3">
          <button
            type="button"
            className="w-[111px] rounded bg-error-500 py-2 text-lg font-semibold text-white"
            onClick={handleSaveExit}
          >
            임시저장
          </button>
          <button
            type="button"
            className="w-[111px] rounded border border-error-500 py-2 text-lg font-semibold text-error-500"
            onClick={handleDeleteExit}
          >
            삭제하기
          </button>
        </div>
      </div>
    </div>
  );
};

export default ExitModal;
