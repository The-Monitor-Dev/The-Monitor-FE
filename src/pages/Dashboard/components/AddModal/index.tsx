import { ArrowBeforeThick, CloseIcon } from "@assets/svg";
import { useState } from "react";
import Step1 from "./Step1";
import Step2 from "./Step2";
import Step3 from "./Step3";

interface AddModalProps {
  onClose: () => void;
}

const AddModal: React.FC<AddModalProps> = ({ onClose }) => {
  const [step, setStep] = useState(1);

  const handleModalClose = () => {
    onClose();
  };

  const handleNextStep = () => {
    if (step < 3) {
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
      <div className="relative h-[707px] w-[580px] bg-white pt-20">
        {step !== 1 && (
          <ArrowBeforeThick
            className="absolute left-[24px] top-[20px] m-1 cursor-pointer"
            onClick={handlePreviousStep}
          />
        )}
        <CloseIcon
          className="absolute right-[22px] top-[22px] cursor-pointer fill-black"
          onClick={handleModalClose}
        />

        <div className="relative h-[627px] w-full overflow-hidden">
          <div
            className={`absolute h-full w-full transition-transform duration-300 ${
              step === 1 ? "translate-x-0" : "-translate-x-full"
            }`}
          >
            <Step1 handleNext={handleNextStep} />
          </div>
          <div
            className={`absolute h-full w-full transition-transform duration-300 ${
              step === 2
                ? "translate-x-0"
                : step < 2
                  ? "translate-x-full"
                  : "-translate-x-full"
            }`}
          >
            <Step2 handleNext={handleNextStep} />
          </div>
          <div
            className={`absolute h-full w-full transition-transform duration-300 ${
              step === 3
                ? "translate-x-0"
                : step < 3
                  ? "translate-x-full"
                  : "-translate-x-full"
            }`}
          >
            <Step3 onClose={onClose} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddModal;
