import Button from "@components/Button";
import Input from "@components/Input";
import { ChangeEvent, useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";
import PasswordCondition from "./PasswordCondtion";

interface Step1Props {
  handleNext: () => void;
}

const Step1: React.FC<Step1Props> = ({ handleNext }) => {
  const {
    register,
    watch,
    setValue,
    formState: { errors },
  } = useFormContext();

  const [email, password] = watch(["email", "password"]);

  const [isVerificationButtonEnabled, setIsVerificationButtonEnabled] =
    useState(false);

  useEffect(() => {
    const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    setIsVerificationButtonEnabled(isValidEmail);
  }, [email]);

  const [passwordChecks, setPasswordChecks] = useState({
    length: false,
    hasNumberAndLetter: false,
    hasSpecialChar: false,
  });

  const validatePassword = (password: string) => {
    setPasswordChecks({
      length: password.length >= 8,
      hasNumberAndLetter: /[A-Za-z]/.test(password) && /\d/.test(password),
      hasSpecialChar: /[!@#$%^&*(),.?":{}|<>]/.test(password),
    });
  };
  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    const trimmedPassword = e.target.value.trim();
    setValue("password", trimmedPassword);
    validatePassword(trimmedPassword);
  };

  return (
    <div className="w-full px-[70px]">
      <div className="mt-[62px] flex items-center justify-between">
        <h2 className="text-4xl font-semibold text-title">계정 만들기</h2>
        <div className="flex items-center gap-2">
          <div className="h-3 w-3 rounded-full bg-primary-500" />
          <div className="h-3 w-3 rounded-full bg-neutral-300" />
        </div>
      </div>
      <div className="mt-9 flex flex-col gap-2">
        <label className="text-sm font-semibold text-title">이메일</label>
        <div className="flex gap-2">
          <Input
            type="email"
            placeholder="이메일(E-mail) 주소를 입력해주세요."
            maxLength={24}
            className="w-[272px]"
            {...register("email")}
          />
          <Button
            type="button"
            className="flex-grow"
            disabled={!isVerificationButtonEnabled}
          >
            인증요청
          </Button>
        </div>
        {errors.email && (
          <span className="text-xs text-red-500">
            {errors.email.message?.toString()}
          </span>
        )}
        <div className="flex gap-2">
          <Input
            type="text"
            placeholder="인증번호를 입력해주세요."
            className="w-[272px]"
          />
          <Button type="button" className="flex-grow">
            확인
          </Button>
        </div>
      </div>
      <div className="mt-11 flex flex-col gap-2">
        <label className="text-sm font-semibold text-title">비밀번호</label>
        <Input
          type="password"
          maxLength={24}
          isInvalid={
            password &&
            !(
              passwordChecks.length &&
              passwordChecks.hasNumberAndLetter &&
              passwordChecks.hasSpecialChar
            )
          }
          placeholder="비밀번호를 입력해주세요."
          {...register("password", {
            required: "비밀번호를 입력해주세요.",
            onChange: handlePasswordChange,
          })}
        />
      </div>
      <div className="mt-4 flex flex-col pl-[14px] text-xs font-semibold">
        <PasswordCondition
          conditionMet={passwordChecks.length}
          conditionText="8자리 이상으로 써야 해요"
          password={password}
        />
        <PasswordCondition
          conditionMet={passwordChecks.hasNumberAndLetter}
          conditionText="영문과 숫자가 포함되어야 해요"
          password={password}
        />
        <PasswordCondition
          conditionMet={passwordChecks.hasSpecialChar}
          conditionText="특수기호가 포함되어야 해요"
          password={password}
        />
      </div>
      <Button type="button" onClick={handleNext} className="mt-7 w-full py-3">
        다음
      </Button>
    </div>
  );
};

export default Step1;
