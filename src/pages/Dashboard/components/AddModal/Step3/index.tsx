import React from "react";
import { AttentionIcon } from "@assets/svgs";
import Button from "@components/Button";
import KeywordInput from "@components/KeywordInput";
import { useFormContext } from "react-hook-form";
import KeywordLabel from "../../KeywordLabel";

const Step3: React.FC = () => {
  const { watch, setValue } = useFormContext();

  const [recipientEmails = [], referenceEmails = []] = watch([
    "recipientEmails",
    "referenceEmails",
  ]);

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email.trim());
  };

  const handleKeywordChange = (
    category: "recipientEmails" | "referenceEmails",
    email: string,
    action: "add" | "delete",
  ) => {
    const currentEmails = watch(category) || [];
    const updatedEmails =
      action === "add"
        ? [...currentEmails, email]
        : currentEmails.filter((e: string) => e !== email);

    setValue(category, updatedEmails);
  };

  return (
    <div className="px-[50px]">
      <div className="flex justify-between">
        <h2 className="mb-2 text-4xl font-semibold text-title">
          메일 설정하기
        </h2>
        <div className="flex items-center gap-2">
          <div className="h-3 w-3 rounded-full bg-neutral-300" />
          <div className="h-3 w-3 rounded-full bg-neutral-300" />
          <div className="h-3 w-3 rounded-full bg-primary-500" />
        </div>
      </div>
      <p className="mb-9 text-md font-regular text-title">
        모니터링 보고서를 받는사람의 메일을 저장해보세요.
      </p>
      <div className="h-[369px] bg-neutral-50 px-4 pb-6 pt-5">
        <div className="mb-7 flex w-full items-center gap-1 bg-surface-primary px-5 py-4">
          <AttentionIcon className="fill-neutral-400" />
          <p className="text-sm font-regular text-body3">
            메일 주소 입력 후 엔터(Enter)를 누르면 메일이 자동 추가됩니다.
          </p>
        </div>
        <div className="h-[265px] overflow-y-auto pb-[17px]">
          <KeywordLabel label="받는 사람" isRequired />
          <KeywordInput
            type="modal"
            placeholder="메일을 입력해주세요."
            keywords={recipientEmails}
            onAddKeyword={(email) =>
              handleKeywordChange("recipientEmails", email, "add")
            }
            onDeleteKeyword={(email) =>
              handleKeywordChange("recipientEmails", email, "delete")
            }
            validateKeyword={validateEmail}
            errorMessage="*잘못된 이메일 형식입니다."
            duplicateErrorMessage="*이미 추가된 이메일입니다."
          />
          <div className="mt-7">
            <KeywordLabel label="참조인" />
            <KeywordInput
              type="modal"
              placeholder="메일을 입력해주세요."
              keywords={referenceEmails}
              onAddKeyword={(email) =>
                handleKeywordChange("referenceEmails", email, "add")
              }
              onDeleteKeyword={(email) =>
                handleKeywordChange("referenceEmails", email, "delete")
              }
              validateKeyword={validateEmail}
              errorMessage="*잘못된 이메일 형식입니다."
              duplicateErrorMessage="*이미 추가된 이메일입니다."
            />
          </div>
        </div>
      </div>
      <Button
        type="submit"
        style="filled"
        className="absolute bottom-16 mx-[60px] w-[360px] py-3"
        disabled={recipientEmails.length === 0}
      >
        완료
      </Button>
    </div>
  );
};

export default Step3;
