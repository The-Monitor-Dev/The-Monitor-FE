import { CloseIcon, ErrorIcon } from "@assets/svgs";

interface ModalProps {
  onClose: () => void;
  handleCancel: () => void;
  headingText?: string;
  bodyText?: React.ReactNode;
  closeButtonText?: string;
  cancelButtonText?: string;
}

const Modal: React.FC<ModalProps> = ({
  onClose,
  handleCancel,
  headingText,
  bodyText,
  closeButtonText,
  cancelButtonText,
}) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-65">
      <div className="relative flex h-[340px] w-[460px] flex-col items-center rounded bg-white pt-10">
        <CloseIcon
          type="button"
          className="absolute right-5 top-5 cursor-pointer fill-neutral-700"
          onClick={onClose}
        />
        <ErrorIcon className="h-[53px] w-[53px]" />
        <h2 className="mt-5 text-2xl font-semibold text-title">
          {headingText}
        </h2>
        <p className="mt-2 whitespace-pre-line text-center text-md font-regular text-body3">
          {bodyText}
        </p>
        <div className="mt-[29px] flex justify-center gap-3">
          <button
            type="button"
            className="w-[111px] rounded bg-error-500 py-2 text-lg font-semibold text-white"
            onClick={onClose}
          >
            {closeButtonText}
          </button>
          <button
            type="button"
            className="w-[111px] rounded border border-error-500 py-2 text-lg font-semibold text-error-500"
            onClick={handleCancel}
          >
            {cancelButtonText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
