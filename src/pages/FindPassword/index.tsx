import usePostSendPasswordChangeEmail from "@api/hooks/accounts/usePostSendPasswordChangeEmail";
import { LoadingIcon } from "@assets/svgs";
import Button from "@components/Button";
import Input from "@components/Input";
import React, { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import PasswordSentModal from "./components/PasswordSentModal";

type FindPasswordFormData = {
  email: string;
};

const FindPasswordPage: React.FC = () => {
  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm<FindPasswordFormData>();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isError, setIsError] = useState(false);

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const email = watch("email");

  const { mutate, isPending } = usePostSendPasswordChangeEmail();

  const onSubmit: SubmitHandler<FindPasswordFormData> = (data) => {
    mutate(data, {
      onSuccess: () => {
        setIsModalOpen(true);
        setIsError(false);
      },
      onError: () => {
        setIsError(true);
      },
    });
  };

  return (
    <>
      <div className="flex h-full items-center justify-center">
        <div className="flex h-[500px] w-[500px] flex-col bg-white px-[70px] shadow-form">
          <h2 className="mt-[62px] text-4xl font-semibold text-title">
            비밀번호 변경
          </h2>
          <p className="font-md mt-2 font-regular text-title">
            가입 시 사용했던 이메일 주소를 입력해주세요.
            <br />
            해당 이메일로 임시 비밀번호를 보내드립니다.
          </p>
          <form onSubmit={handleSubmit(onSubmit)} noValidate>
            <div className="relative mt-10 flex flex-col gap-2">
              <label className="text-sm font-semibold text-title">이메일</label>
              <Input
                type="email"
                placeholder="이메일(E-mail) 주소를 입력해주세요."
                isInvalid={!!errors.email || isError}
                maxLength={24}
                {...register("email", {
                  required: true,
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: "*올바르지 않은 이메일 형식입니다.",
                  },
                  onChange: () => setIsError(false),
                })}
              />
              {errors.email && (
                <p className="absolute -bottom-5 left-4 text-xs font-regular text-error-500">
                  {errors.email?.message?.toString()}
                </p>
              )}
            </div>
            <Button
              type="submit"
              style="filled"
              disabled={!email || isPending}
              className="mt-11 flex w-full justify-center py-3 text-md font-semibold text-white"
            >
              {isPending ? (
                <LoadingIcon className="h-6 w-6 animate-spin" />
              ) : (
                "임시 비밀번호 발급받기"
              )}
            </Button>
          </form>
          <div className="mt-[82px] flex w-full justify-center">
            <a
              href="mailto:themonitor2024@gmail.com"
              className="text-sm font-medium text-body1 underline"
            >
              문의하기
            </a>
          </div>
        </div>
      </div>
      {isModalOpen && <PasswordSentModal onClose={handleModalClose} />}
    </>
  );
};

export default FindPasswordPage;
