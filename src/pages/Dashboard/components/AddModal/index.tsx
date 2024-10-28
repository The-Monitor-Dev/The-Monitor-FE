import { ArrowBeforeThick, CloseIcon } from "@assets/svg";
import Button from "@components/Button";
import { useState } from "react";
import Step1 from "./Step1";
import Step2 from "./Step2";
import Step3 from "./Step3";
import Step4 from "./Step4";

interface AddModalProps {
  onClose: () => void;
}

const AddModal: React.FC<AddModalProps> = ({ onClose }) => {
  const [step, setStep] = useState(1);

  const handleModalClose = () => {
    onClose();
  };

  const handleNextStep = () => {
    if (step < 4) {
      setStep(step + 1);
    }
  };

  const handlePreviousStep = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-65">
      <div className="relative h-[707px] w-[580px] bg-white px-[50px] pb-16 pt-20">
        {step !== 1 && step !== 4 && (
          <ArrowBeforeThick
            className="absolute left-[24px] top-[20px] m-1 cursor-pointer"
            onClick={handlePreviousStep}
          />
        )}
        <CloseIcon
          className="absolute right-[22px] top-[22px] cursor-pointer fill-black"
          onClick={handleModalClose}
        />
        <div className="absolute right-[50px] top-[95px] flex items-center gap-2">
          <div
            className={`h-3 w-3 rounded-full ${
              step === 1 ? "bg-primary-500" : "bg-neutral-300"
            }`}
          />
          <div
            className={`h-3 w-3 rounded-full ${
              step === 2 ? "bg-primary-500" : "bg-neutral-300"
            }`}
          />
          <div
            className={`h-3 w-3 rounded-full ${
              step === 3 ? "bg-primary-500" : "bg-neutral-300"
            }`}
          />
        </div>

        {step === 1 && <Step1 />}
        {step === 2 && <Step2 />}
        {step === 3 && <Step3 />}
        {step === 4 && <Step4 />}

        <div className="absolute bottom-[38px] flex-col justify-end">
          <Button
            type="button"
            className="mx-[60px] w-[360px] py-3"
            onClick={() => {
              if (step === 4) {
                handleModalClose();
              } else {
                handleNextStep();
              }
            }}
          >
            {step === 4 ? "완료" : "다음"}
          </Button>

          <span className="mx-[86px] text-xs font-regular">
            도움이 필요하시면{" "}
            <a
              href="mailto:themonitor2024@gmail.com"
              className="text-primary-500"
            >
              themonitor2024@gmail.com
            </a>
            로 문의주세요
          </span>
        </div>
      </div>
    </div>
  );
};

export default AddModal;
