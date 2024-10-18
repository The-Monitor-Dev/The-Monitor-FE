import Button from "@components/Button";
import Input from "@components/Input";
import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";

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

  const email = watch("email");

  const onSubmit: SubmitHandler<FindPasswordFormData> = (data) => {
    console.log(data);
  };

  return (
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
              isInvalid={!!errors.email}
              maxLength={24}
              {...register("email", {
                required: true,
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "*올바르지 않은 이메일 형식입니다.",
                },
              })}
            />
            {errors.email && (
              <p className="absolute -bottom-5 left-4 text-xs font-regular text-error">
                {errors.email?.message?.toString()}
              </p>
            )}
          </div>
          <Button
            type="submit"
            disabled={!email}
            className="mt-11 w-full py-3 text-md font-semibold text-white"
          >
            임시 비밀번호 발급받기
          </Button>
        </form>
        <div className="mt-[82px] flex w-full justify-center">
          <span className="text-xs font-regular">
            도움이 필요하시면
            <a href="mailto:tyalejahsl@naver.com" className="text-primary-500">
              tyalejahsl@naver.com
            </a>
            로 문의주세요
          </span>
        </div>
      </div>
    </div>
  );
};

export default FindPasswordPage;
