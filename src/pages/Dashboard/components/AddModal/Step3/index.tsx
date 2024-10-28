import { AttentionIcon, CloseIcon } from "@assets/svg";
import { useState } from "react";

const Step3 = () => {
  const [recipientKeyword, setRecipientKeyword] = useState<string>("");
  const [recipientKeywords, setRecipientKeywords] = useState<string[]>([]);

  const [referenceKeyword, setReferenceKeyword] = useState<string>("");
  const [referenceKeywords, setReferenceKeywords] = useState<string[]>([]);

  const handleRecipientKeyPress = (
    e: React.KeyboardEvent<HTMLInputElement>,
  ) => {
    if (e.key === "Enter" && recipientKeyword.trim()) {
      setRecipientKeywords((prev) => [...prev, recipientKeyword.trim()]);
      setRecipientKeyword("");
    }
  };

  const handleReferenceKeyPress = (
    e: React.KeyboardEvent<HTMLInputElement>,
  ) => {
    if (e.key === "Enter" && referenceKeyword.trim()) {
      setReferenceKeywords((prev) => [...prev, referenceKeyword.trim()]);
      setReferenceKeyword("");
    }
  };

  const handleDeleteRecipientKeyword = (keywordToDelete: string) => {
    setRecipientKeywords((prev) => prev.filter((kw) => kw !== keywordToDelete));
  };

  const handleDeleteReferenceKeyword = (keywordToDelete: string) => {
    setReferenceKeywords((prev) => prev.filter((kw) => kw !== keywordToDelete));
  };

  return (
    <>
      <div>
        <h2 className="mb-2 text-4xl font-semibold text-title">
          메일 설정하기
        </h2>
      </div>
      <p className="mb-9 text-md font-regular text-title">
        데일리모니터링을 위한 키워드를 설정해주세요
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
              onChange={(e) => setRecipientKeyword(e.target.value)}
              onKeyPress={handleRecipientKeyPress}
              className="mb-2 mt-4 border-b border-neutral-200 bg-transparent px-3 py-2 outline-none"
            />
            <div className="flex flex-wrap gap-2">
              {recipientKeywords.map((kw, index) => (
                <div
                  key={index}
                  className="flex items-center gap-1 rounded border-[0.5px] border-primary-200 bg-surface-secondary py-1 pl-3 pr-2 text-primary-500"
                >
                  <span className="text-sm font-semibold text-primary-700">
                    {kw}
                  </span>
                  <CloseIcon
                    className="h-5 w-5 fill-primary-500"
                    onClick={() => handleDeleteRecipientKeyword(kw)}
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
              onChange={(e) => setReferenceKeyword(e.target.value)}
              onKeyPress={handleReferenceKeyPress}
              className="mb-2 mt-4 border-b border-neutral-200 bg-transparent px-3 py-2 outline-none"
            />
            <div className="flex flex-wrap gap-2">
              {referenceKeywords.map((kw, index) => (
                <div
                  key={index}
                  className="flex items-center gap-1 rounded border-[0.5px] border-primary-200 bg-surface-secondary py-1 pl-3 pr-2 text-primary-500"
                >
                  <span className="text-sm font-semibold text-primary-700">
                    {kw}
                  </span>
                  <CloseIcon
                    className="h-5 w-5 fill-primary-500"
                    onClick={() => handleDeleteReferenceKeyword(kw)}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Step3;
