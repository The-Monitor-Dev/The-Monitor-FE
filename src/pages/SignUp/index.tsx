import { useState } from "react";
import { useForm, FormProvider, SubmitHandler } from "react-hook-form";
import Step1 from "./components/Step1";
import Step2 from "./components/Step2";
import usePostSignUp from "@api/hooks/accounts/usePostSignUp";

type SingUpFormData = {
  email: string;
  verificationCode: string;
  password: string;
  companyName: string;
  managerName: string;
  managerPhone: string;
  agreement: boolean;
};

const SignUpPage: React.FC = () => {
  const [step, setStep] = useState(1);
  const methods = useForm<SingUpFormData>({ mode: "onChange" });

  const handleNext = () => setStep(2);

  const { mutate } = usePostSignUp();

  const handleSubmit: SubmitHandler<SingUpFormData> = (data) => {
    const signUpData = {
      email: data.email,
      password: data.password,
      companyName: data.companyName,
      managerName: data.managerName,
      managerPhone: data.managerPhone,
      agreement: data.agreement,
    };
    mutate(signUpData);
  };

  return (
    <div className="flex h-full items-center justify-center">
      <div className="flex h-[660px] w-[500px] flex-col overflow-hidden bg-white shadow-form">
        <FormProvider {...methods}>
          <form
            onSubmit={methods.handleSubmit(handleSubmit)}
            className="relative w-full"
          >
            <div
              className={`absolute w-full transition-transform duration-300 ${
                step === 1 ? "translate-x-0" : "-translate-x-full"
              }`}
            >
              <Step1 handleNext={handleNext} />
            </div>
            <div
              className={`absolute w-full transition-transform duration-300 ${
                step === 2 ? "translate-x-0" : "translate-x-full"
              }`}
            >
              <Step2 />
            </div>
          </form>
        </FormProvider>
      </div>
    </div>
  );
};

export default SignUpPage;
