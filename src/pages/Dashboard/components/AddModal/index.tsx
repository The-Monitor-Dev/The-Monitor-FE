import { ArrowBeforeThick, CloseIcon } from "@assets/svgs";
import { useState } from "react";
import Step1 from "./components/Step1";
import { useForm, FormProvider, SubmitHandler } from "react-hook-form";
import usePostClient from "@api/hooks/clients/usePostClient";
import CancelModal from "@components/CancelModal";
import Step2 from "./components/Step2";
import Step3 from "./components/Step3";

type AddModalFormData = {
  companyName: string;
  personInCharge: string;
  logoFile: File | null;
  keywordsByCategory: {
    SELF: string[];
    COMPETITOR: string[];
    INDUSTRY: string[];
  };
  recipientEmails: string[];
  referenceEmails: string[];
};

interface AddModalProps {
  onClose: () => void;
  onSubmit: () => void;
}

const AddModal: React.FC<AddModalProps> = ({ onClose, onSubmit }) => {
  const [step, setStep] = useState(1);
  const [isCancelModalOpen, setIsCancelModalOpen] = useState(false);
  const methods = useForm<AddModalFormData>({ mode: "onChange" });
  const { mutate, isPending } = usePostClient();

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

  const handleClose = () => {
    setIsCancelModalOpen(true);
  };

  const handleModalClose = () => {
    setIsCancelModalOpen(false);
    onClose();
  };

  const handleCancel = () => {
    setIsCancelModalOpen(false);
  };

  const handleSubmit: SubmitHandler<AddModalFormData> = (data) => {
    const clientData = {
      name: data.companyName,
      manager_name: data.personInCharge,
      category_keywords: {
        SELF: data.keywordsByCategory.SELF,
        COMPETITOR: data.keywordsByCategory.COMPETITOR,
        INDUSTRY: data.keywordsByCategory.INDUSTRY,
      },
      recipient_emails: data.recipientEmails,
      cc_emails: data.referenceEmails ?? [],
    };

    mutate(
      { data: clientData, logo: data.logoFile },
      {
        onSuccess: () => {
          onSubmit();
        },
      },
    );
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-65">
      <div className="relative h-[707px] w-[580px] bg-white pt-20">
        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(handleSubmit)}>
            {step !== 1 && (
              <ArrowBeforeThick
                className="absolute left-[24px] top-[20px] m-1 cursor-pointer"
                onClick={handlePreviousStep}
              />
            )}
            <CloseIcon
              type="button"
              className="absolute right-[22px] top-[22px] cursor-pointer fill-neutral-700"
              onClick={handleClose}
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
                <Step3 isPending={isPending} />
              </div>
            </div>
          </form>
        </FormProvider>
        {isCancelModalOpen && (
          <CancelModal
            onClose={handleModalClose}
            handleCancel={handleCancel}
            headingText="정말 중단하시겠어요?"
            bodyText={`작성하던 모든 기록은 지워지며 이후 복구가 불가능해요. 
              창을 정말 닫으시겠어요?`}
            closeButtonText="창 닫기"
            cancelButtonText="취소"
          />
        )}
      </div>
    </div>
  );
};

export default AddModal;
