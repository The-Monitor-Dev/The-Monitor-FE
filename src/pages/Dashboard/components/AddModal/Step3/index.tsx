import React, { useState } from "react";
import { AttentionIcon } from "@assets/svgs";
import Button from "@components/Button";
import KeywordInput from "@components/KeywordInput";

const Step3: React.FC = () => {
  const [recipientKeywords, setRecipientKeywords] = useState<string[]>([]);
  const [referenceKeywords, setReferenceKeywords] = useState<string[]>([]);

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email.trim());
  };

  const handleAddRecipientKeyword = (keyword: string) => {
    setRecipientKeywords((prev) => [...prev, keyword]);
  };

  const handleDeleteRecipientKeyword = (keyword: string) => {
    setRecipientKeywords((prev) => prev.filter((k) => k !== keyword));
  };

  const handleAddReferenceKeyword = (keyword: string) => {
    setReferenceKeywords((prev) => [...prev, keyword]);
  };

  const handleDeleteReferenceKeyword = (keyword: string) => {
    setReferenceKeywords((prev) => prev.filter((k) => k !== keyword));
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
        <KeywordInput
          label="받는 사람"
          placeholder="메일을 입력해주세요."
          keywords={recipientKeywords}
          onAddKeyword={handleAddRecipientKeyword}
          onDeleteKeyword={handleDeleteRecipientKeyword}
          validateKeyword={validateEmail}
          errorMessage="*잘못된 이메일 형식입니다."
          isRequired
        />
        <div className="mt-7">
          <KeywordInput
            label="참조인"
            placeholder="메일을 입력해주세요."
            keywords={referenceKeywords}
            onAddKeyword={handleAddReferenceKeyword}
            onDeleteKeyword={handleDeleteReferenceKeyword}
            validateKeyword={validateEmail}
            errorMessage="*잘못된 이메일 형식입니다."
          />
        </div>
      </div>
      <Button
        type="submit"
        style="filled"
        className="absolute bottom-16 mx-[60px] w-[360px] py-3"
        disabled={recipientKeywords.length === 0}
      >
        완료
      </Button>
    </div>
  );
};

export default Step3;
