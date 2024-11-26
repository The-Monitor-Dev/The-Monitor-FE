import Button from "@components/Button";
import { ChangeEvent, useState } from "react";

interface SummarizeModalProps {
  onClose: () => void;
}

const SummarizeModal: React.FC<SummarizeModalProps> = ({ onClose }) => {
  const [text, setText] = useState("");
  const handleTextChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
  };
  return (
    <div className="fixed inset-0 z-10 flex items-center justify-center bg-black bg-opacity-65">
      <div className="flex h-[273px] w-[480px] flex-col rounded bg-white">
        <div className="mb-4 mt-5 flex flex-col gap-4 px-6">
          <span className="text-xl font-semibold">기사 한 줄 요약</span>
          <div className="flex flex-col gap-3 bg-surface-primary px-3 pb-2 pt-3">
            <textarea
              value={text}
              maxLength={100}
              onChange={handleTextChange}
              placeholder="기사 한 줄 요약을 입력해주세요."
              className="h-[72px] resize-none bg-surface-primary text-md font-regular outline-none placeholder:text-disable"
            />
            <div className="self-end text-body3">{text.length}/100</div>
          </div>
        </div>
        <div className="flex items-center justify-end gap-2 border-t-1 border-t-neutral-200 px-6 py-4">
          <Button
            style="tertiary"
            onClick={onClose}
            className="px-10 py-2 text-sm font-semibold"
          >
            취소
          </Button>
          <Button style="filled" className="px-10 py-2 text-sm font-semibold">
            적용
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SummarizeModal;
