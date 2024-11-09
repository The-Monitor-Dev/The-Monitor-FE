import { AttentionIcon, CloseIcon } from "@assets/svgs";
import Button from "@components/Button";
import { useEffect, useState } from "react";

const Step3: React.FC = () => {
  const [recipientKeyword, setRecipientKeyword] = useState<string>("");
  const [recipientKeywords, setRecipientKeywords] = useState<string[]>([]);
  const [isRecipientEmailValid, setIsRecipientEmailValid] =
    useState<boolean>(true);

  const [referenceKeyword, setReferenceKeyword] = useState<string>("");
  const [referenceKeywords, setReferenceKeywords] = useState<string[]>([]);
  const [isReferenceEmailValid, setIsReferenceEmailValid] =
    useState<boolean>(true);
  const [isComplete, setIsComplete] = useState<boolean>(false);

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email.trim());
  };

  const handleRecipientKeyPress = (
    e: React.KeyboardEvent<HTMLInputElement>,
  ) => {
    if (e.key === "Enter") {
      if (validateEmail(recipientKeyword)) {
        setRecipientKeywords((prev) => [...prev, recipientKeyword.trim()]);
        setRecipientKeyword("");
        setIsRecipientEmailValid(true);
      } else {
        setIsRecipientEmailValid(false);
      }
    }
  };

  const handleReferenceKeyPress = (
    e: React.KeyboardEvent<HTMLInputElement>,
  ) => {
    if (e.key === "Enter") {
      if (validateEmail(referenceKeyword)) {
        setReferenceKeywords((prev) => [...prev, referenceKeyword.trim()]);
        setReferenceKeyword("");
        setIsReferenceEmailValid(true);
      } else {
        setIsReferenceEmailValid(false);
      }
    }
  };

  const handleDeleteRecipientKeyword = (keywordToDelete: string) => {
    setRecipientKeywords((prev) =>
      prev.filter((keyword) => keyword !== keywordToDelete),
    );
  };

  const handleDeleteReferenceKeyword = (keywordToDelete: string) => {
    setReferenceKeywords((prev) =>
      prev.filter((keyword) => keyword !== keywordToDelete),
    );
  };

  useEffect(() => {
    if (recipientKeywords.length > 0) {
      setIsComplete(true);
    } else {
      setIsComplete(false);
    }
  }, [recipientKeywords]);

  const handleRecipientChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRecipientKeyword(e.target.value);
    if (isRecipientEmailValid === false && e.target.value === "") {
      setIsRecipientEmailValid(true);
    }
  };

  const handleReferenceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setReferenceKeyword(e.target.value);
    if (isReferenceEmailValid === false && e.target.value === "") {
      setIsReferenceEmailValid(true);
    }
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
          <div className="flex flex-col">
            <label className="flex items-center">
              <p className="mr-[6px] text-md font-semibold text-title">
                받는 사람
              </p>
              <p className="text-sm font-regular text-body3">[필수]</p>
            </label>
            <input
              placeholder="메일을 입력해주세요."
              value={recipientKeyword}
              onChange={handleRecipientChange}
              onKeyPress={handleRecipientKeyPress}
              className="mt-4 border-b border-neutral-200 bg-transparent px-3 py-2 outline-none"
            />
            {!isRecipientEmailValid && (
              <p className="mt-1 text-xs font-regular text-error-500">
                *잘못된 이메일 형식입니다.
              </p>
            )}
            <div className="mt-3 flex flex-wrap gap-2">
              {recipientKeywords.map((keyword, index) => (
                <div
                  key={index}
                  className="flex items-center gap-1 rounded border-[0.5px] border-primary-200 bg-surface-secondary py-1 pl-3 pr-2 text-primary-500"
                >
                  <span className="text-sm font-semibold text-primary-700">
                    {keyword}
                  </span>
                  <CloseIcon
                    type="button"
                    className="h-5 w-5 fill-primary-500"
                    onClick={() => handleDeleteRecipientKeyword(keyword)}
                  />
                </div>
              ))}
            </div>
          </div>
          <div className="mt-7 flex flex-col">
            <label className="flex items-center">
              <p className="mr-[6px] text-md font-semibold text-title">
                참조인
              </p>
              <p className="text-sm font-regular text-body3">[선택]</p>
            </label>
            <input
              placeholder="메일을 입력해주세요."
              value={referenceKeyword}
              onChange={handleReferenceChange}
              onKeyPress={handleReferenceKeyPress}
              className="mt-4 border-b border-neutral-200 bg-transparent px-3 py-2 outline-none"
            />
            {!isReferenceEmailValid && (
              <p className="mt-1 text-xs font-regular text-error-500">
                *잘못된 이메일 형식입니다.
              </p>
            )}
            <div className="mt-3 flex flex-wrap gap-2">
              {referenceKeywords.map((keyword, index) => (
                <div
                  key={index}
                  className="flex items-center gap-1 rounded border-[0.5px] border-primary-200 bg-surface-secondary py-1 pl-3 pr-2 text-primary-500"
                >
                  <span className="text-sm font-semibold text-primary-700">
                    {keyword}
                  </span>
                  <CloseIcon
                    type="button"
                    className="h-5 w-5 fill-primary-500"
                    onClick={() => handleDeleteReferenceKeyword(keyword)}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <Button
        type="submit"
        style="filled"
        className="absolute bottom-16 mx-[60px] w-[360px] py-3"
        disabled={!isComplete}
      >
        완료
      </Button>
    </div>
  );
};

export default Step3;
