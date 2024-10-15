import { useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import Step1 from "./components/Step1";
import Step2 from "./components/Step2";

type FormData = {
  email: string;
  password: string;
  companyName: string;
  managerName: string;
  managerPhone: string;
  agreement: boolean;
};

const SignInPage = () => {
  const [step, setStep] = useState(1);
  const methods = useForm<FormData>();

  const handleNext = () => setStep(2);
  const handleBack = () => setStep(1);

  const onSubmit = (data: FormData) => {
    console.log(data);
  };

  return (
    <div className="flex h-full items-center justify-center">
      <div className="flex h-[660px] w-[500px] flex-col overflow-hidden bg-white shadow-form">
        <FormProvider {...methods}>
          <form
            onSubmit={methods.handleSubmit(onSubmit)}
            className="relative w-full"
          >
            <div
              className={`absolute w-full transition-transform duration-500 ${
                step === 1 ? "translate-x-0" : "-translate-x-full"
              }`}
            >
              <Step1 handleNext={handleNext} />
            </div>
            <div
              className={`absolute w-full transition-transform duration-500 ${
                step === 2 ? "translate-x-0" : "translate-x-full"
              }`}
            >
              <Step2 handleBack={handleBack} />
            </div>
          </form>
        </FormProvider>
      </div>
    </div>
  );
};

export default SignInPage;
