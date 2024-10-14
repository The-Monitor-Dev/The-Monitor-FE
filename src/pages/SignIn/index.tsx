import { CheckboxBlankIcon } from "@assets/svg";
import { Checkbox } from "@chakra-ui/react";
import { useState } from "react";

const SignInPage = () => {
  const [step, setStep] = useState(1);

  const handleNext = () => {
    setStep((prev) => prev + 1);
  };

  return (
    <div className="flex h-full items-center justify-center">
      <div className="flex h-[660px] w-[500px] flex-col overflow-hidden bg-white shadow-form">
        <div className="relative w-full">
          <div
            className={`absolute w-full px-[70px] transition-transform duration-500 ${
              step === 1 ? "translate-x-0" : "-translate-x-full"
            }`}
          >
            <div className="mt-[62px] flex items-center justify-between">
              <h2 className="text-4xl font-semibold">계정 만들기</h2>
              <div className="flex items-center gap-2">
                <div className="h-3 w-3 rounded-full bg-primary-500" />
                <div className="h-3 w-3 rounded-full bg-neutral-300" />
              </div>
            </div>
            <div className="mt-9 flex flex-col gap-2">
              <label className="text-sm font-semibold text-title">이메일</label>
              <div className="flex h-14 gap-2">
                <input
                  type="email"
                  className="w-[272px] rounded-[4px] bg-surface-primary px-4 placeholder:text-disable"
                  placeholder="이메일(E-mail) 주소를 입력해주세요."
                />
                <button
                  type="button"
                  className="flex-grow rounded-[4px] bg-surface-disable text-md font-semibold text-disable"
                >
                  인증요청
                </button>
              </div>
              <div className="flex h-14 gap-2">
                <input
                  type="text"
                  className="w-[272px] rounded-[4px] bg-surface-primary px-4 placeholder:text-disable"
                  placeholder="인증번호를 입력해주세요."
                />
                <button
                  type="button"
                  className="flex-grow rounded-[4px] bg-surface-disable text-md font-semibold text-disable"
                >
                  확인
                </button>
              </div>
            </div>
            <div className="mt-11 flex flex-col gap-2">
              <label className="text-sm font-semibold text-title">
                비밀번호
              </label>
              <input
                type="password"
                className="h-14 rounded-[4px] bg-surface-primary px-4 placeholder:text-disable"
                placeholder="비밀번호를 입력해주세요."
              />
            </div>
            <div className="mt-4 flex flex-col pl-[14px] text-xs font-semibold">
              <div className="flex items-center gap-[6px]">
                <CheckboxBlankIcon />
                <span className="text-body3">8자리 이상으로 써야 해요</span>
              </div>
              <div className="flex items-center gap-[6px]">
                <CheckboxBlankIcon />
                <span className="text-body3">
                  영문과 숫자가 포함되어야 해요
                </span>
              </div>
              <div className="flex items-center gap-[6px]">
                <CheckboxBlankIcon />
                <span className="text-body3">
                  ?,!와 같은 특수기호가 포함되어야 해요
                </span>
              </div>
            </div>
            <button
              type="button"
              onClick={handleNext}
              className="mt-6 w-full rounded-[4px] bg-surface-disable py-3 text-md font-semibold text-disable"
            >
              다음
            </button>
            <div className="mt-2 flex w-full justify-center">
              <span className="text-xs font-regular">
                도움이 필요하시면{" "}
                <a
                  href="mailto:tyalejahsl@naver.com"
                  className="text-primary-500"
                >
                  tyalejahsl@naver.com
                </a>
                로 문의주세요
              </span>
            </div>
          </div>

          <div
            className={`absolute w-full px-[70px] transition-transform duration-500 ${
              step === 2 ? "translate-x-0" : "translate-x-full"
            }`}
          >
            <div className="mt-[62px] flex items-center justify-between">
              <h2 className="text-4xl font-semibold">정보 작성하기</h2>
              <div className="flex items-center gap-2">
                <button type="button" onClick={() => setStep(1)}>
                  <div className="h-3 w-3 rounded-full bg-neutral-300" />
                </button>
                <div className="h-3 w-3 rounded-full bg-primary-500" />
              </div>
            </div>
            <div className="mt-9 flex flex-col gap-6">
              <div className="flex flex-col gap-2">
                <label className="text-sm font-semibold text-title">
                  기업명
                </label>
                <input
                  type="text"
                  className="h-14 rounded-[4px] bg-surface-primary px-4 placeholder:text-disable"
                  placeholder="기업명을 입력해주세요."
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-sm font-semibold text-title">
                  담당자명
                </label>
                <input
                  type="text"
                  className="h-14 rounded-[4px] bg-surface-primary px-4 placeholder:text-disable"
                  placeholder="기업명을 입력해주세요."
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-sm font-semibold text-title">
                  담당자 전화번호 (선택)
                </label>
                <input
                  type="text"
                  className="h-14 rounded-[4px] bg-surface-primary px-4 placeholder:text-disable"
                  placeholder="'-'를 제외하고 숫자만 입력해주세요."
                />
              </div>
            </div>
            <div className="mt-8 flex items-center gap-2">
              <Checkbox
                borderColor="#A3A3A3"
                sx={{
                  "& .chakra-checkbox__control": {
                    width: "16px",
                    height: "16px",
                    borderRadius: "0px",
                    bg: "white",
                    borderWidth: "2px",
                  },
                  "& .chakra-checkbox__control[data-checked]": {
                    bg: "#0050F0",
                    borderColor: "#0050F0",
                  },
                }}
              />
              <span className="text-sm font-semibold text-body3 underline">
                이용 약관 및 개인정보 수집에 동의합니다
              </span>
            </div>
            <button
              type="button"
              className="mt-6 w-full rounded-[4px] bg-surface-disable py-3 text-md font-semibold text-disable"
            >
              제출
            </button>
            <div className="mt-2 flex w-full justify-center">
              <span className="text-xs font-regular">
                도움이 필요하시면{" "}
                <a
                  href="mailto:tyalejahsl@naver.com"
                  className="text-primary-500"
                >
                  tyalejahsl@naver.com
                </a>
                로 문의주세요
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignInPage;
