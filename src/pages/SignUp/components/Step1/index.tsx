import Button from "@components/Button";
import Input from "@components/Input";
import { ChangeEvent, useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";
import PasswordCondition from "./PasswordCondition";
import usePostVerifyCode from "@api/hooks/accounts/usePostVerifyCode";
import usePasswordValidation from "@hooks/useCheckPasswordValidation";
import useEmailConfirmation from "@hooks/useEmailConfirmation";
import formatTime from "@utils/formatTime";
import { LoadingIcon } from "@assets/svgs";

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

  const { mutate: verifyCode } = usePostVerifyCode();

  const [email, verificationCode, password] = watch([
    "email",
    "verificationCode",
    "password",
  ]);

  const {
    isPending,
    isEmailSent,
    isEmailConfirmButtonDisabled,
    handleSendEmailConfirm,
  } = useEmailConfirmation(email);
  const [timer, setTimer] = useState(180);
  const [isTimerActive, setIsTimerActive] = useState(false);

  const [isVerificationSuccess, setIsVerificationSuccess] = useState(false);

  const handleVerifyCode = () => {
    verifyCode(
      { email, verificationCode },
      {
        onSuccess: () => {
          setIsVerificationSuccess(true);
          setIsTimerActive(false);
        },
      },
    );
  };

  const { passwordChecks, validatePassword } = usePasswordValidation();

  useEffect(() => {
    let countdown: NodeJS.Timeout | null = null;

    if (isEmailSent && timer > 0 && isTimerActive) {
      countdown = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
    }
    if (timer === 0 || isVerificationSuccess) {
      clearInterval(countdown as NodeJS.Timeout);
    }

    return () => clearInterval(countdown as NodeJS.Timeout);
  }, [isEmailSent, timer, isTimerActive, isVerificationSuccess]);

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    const trimmedPassword = e.target.value.trim();
    setValue("password", trimmedPassword);
    validatePassword(trimmedPassword);
  };

  const isNextStepButtonDisabled = !(
    isEmailSent &&
    isVerificationSuccess &&
    passwordChecks.length &&
    passwordChecks.hasNumberAndLetter &&
    passwordChecks.hasSpecialChar
  );

  const handleSendEmailWithTimer = () => {
    handleSendEmailConfirm();
    if (!isEmailConfirmButtonDisabled) {
      setIsTimerActive(true);
      setTimer(180);
    }
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
            {...register("email", {
              required: true,
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "유효한 이메일 주소를 입력해주세요.",
              },
            })}
          />
          <Button
            type="button"
            style="filled"
            className="flex flex-grow items-center justify-center"
            onClick={handleSendEmailWithTimer}
            disabled={
              isPending ||
              !!errors.email ||
              !email ||
              (isEmailSent && isVerificationSuccess)
            }
          >
            {isPending ? (
              <LoadingIcon className="h-6 w-6 animate-spin" />
            ) : (
              "인증요청"
            )}
          </Button>
        </div>
        <div className="relative flex gap-2">
          <Input
            type="text"
            disabled={!isEmailSent}
            placeholder="인증번호를 입력해주세요."
            className="w-[272px]"
            {...register("verificationCode")}
          />
          <Button
            type="button"
            style="filled"
            onClick={handleVerifyCode}
            disabled={
              !isEmailSent ||
              !verificationCode ||
              (isEmailSent && isVerificationSuccess)
            }
            className="flex-grow"
          >
            확인
          </Button>
          {isEmailSent && !isVerificationSuccess && isTimerActive && (
            <p className="absolute right-[104px] top-1/2 -translate-y-1/2 transform text-sm font-semibold text-primary-700">
              {formatTime(timer)}
            </p>
          )}
          {isEmailSent && isVerificationSuccess && (
            <p className="absolute -bottom-5 left-4 text-xs font-regular text-success-700">
              *인증이 완료되었습니다.
            </p>
          )}
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
      <Button
        type="button"
        style="filled"
        disabled={isNextStepButtonDisabled}
        onClick={handleNext}
        className="mt-7 w-full py-3"
      >
        다음
      </Button>
      <div className="mt-3 flex w-full justify-center">
        <a
          href="mailto:themonitor2024@gmail.com"
          className="text-sm font-medium text-body1 underline"
        >
          문의하기
        </a>
      </div>
    </div>
  );
};

export default Step1;
