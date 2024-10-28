import { AttentionIcon, CloseIcon } from "@assets/svg";
import { useState } from "react";

const Step2 = () => {
  const [selectedButton, setSelectedButton] = useState<string>("자사");

  const [searchKeyword, setSearchKeyword] = useState<string>("");
  const [searchKeywords, setSearchKeywords] = useState<string[]>([]);

  const [excludeKeyword, setExcludeKeyword] = useState<string>("");
  const [excludeKeywords, setExcludeKeywords] = useState<string[]>([]);

  const handleButtonClick = (buttonName: string) => {
    setSelectedButton(buttonName);
  };

  const handleSearchKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && searchKeyword.trim()) {
      setSearchKeywords((prev) => [...prev, searchKeyword.trim()]);
      setSearchKeyword("");
    }
  };

  const handleDeleteSearchKeyword = (keywordToDelete: string) => {
    setSearchKeywords((prev) => prev.filter((kw) => kw !== keywordToDelete));
  };

  const handleExcludeKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && excludeKeyword.trim()) {
      setExcludeKeywords((prev) => [...prev, excludeKeyword.trim()]);
      setExcludeKeyword("");
    }
  };

  const handleDeleteExcludeKeyword = (keywordToDelete: string) => {
    setExcludeKeywords((prev) => prev.filter((kw) => kw !== keywordToDelete));
  };

  return (
    <>
      <div>
        <h2 className="mb-2 text-4xl font-semibold text-title">
          키워드 설정하기
        </h2>
      </div>
      <p className="mb-9 text-md font-regular text-title">
        데일리모니터링을 위한 키워드를 설정해주세요
      </p>
      <div className="h-[377px] bg-neutral-50 px-4 pb-6 pt-5">
        <div className="flex gap-4">
          {["자사", "경쟁사", "업계"].map((buttonName) => (
            <button
              key={buttonName}
              className={`h-10 w-[138px] rounded border-[0.5px] border-primary-500 px-5 py-2 text-md font-semibold ${
                selectedButton === buttonName
                  ? "bg-primary-500 text-white"
                  : "bg-white text-primary-500"
              }`}
              onClick={() => handleButtonClick(buttonName)}
            >
              {buttonName}
            </button>
          ))}
        </div>
        <div className="mb-7 mt-3 flex w-full items-center gap-1 bg-surface-primary px-5 py-4">
          <AttentionIcon className="h-4 w-4 fill-neutral-400" />
          <p className="text-sm font-regular text-body3">
            키워드 입력 후 엔터(Enter)를 누르면 키워드 태그가 자동 생성됩니다.
          </p>
        </div>
        <div className="h-[221px] overflow-y-auto pb-[17px]">
          <div className="flex flex-col">
            <label className="mb-4 flex items-center">
              <p className="mr-[6px] text-md font-semibold text-title">
                검색 키워드
              </p>
              <p className="text-sm font-regular text-body3">[필수]</p>
            </label>
            <input
              placeholder="검색할 키워드를 입력해주세요..."
              value={searchKeyword}
              onChange={(e) => setSearchKeyword(e.target.value)}
              onKeyPress={handleSearchKeyPress}
              maxLength={20}
              className="border-b border-neutral-200 bg-transparent px-3 py-2 outline-none"
            />
            {searchKeywords.length > 0 && (
              <div className="mt-2 flex flex-wrap gap-2">
                {searchKeywords.map((keyword, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-1 rounded border-[0.5px] border-primary-200 bg-surface-secondary py-1 pl-3 pr-2 text-primary-500"
                  >
                    <span className="text-sm font-semibold text-primary-700">
                      {keyword}
                    </span>
                    <CloseIcon
                      className="h-5 w-5 fill-primary-500"
                      onClick={() => handleDeleteSearchKeyword(keyword)}
                    />
                  </div>
                ))}
              </div>
            )}
          </div>
          <div className="mt-7 flex flex-col">
            <label className="mb-4 flex items-center">
              <p className="mr-[6px] text-md font-semibold text-title">
                제외 키워드
              </p>
              <p className="text-sm font-regular text-body3">[선택]</p>
            </label>
            <input
              placeholder="제외할 키워드를 입력해주세요..."
              value={excludeKeyword}
              onChange={(e) => setExcludeKeyword(e.target.value)}
              onKeyPress={handleExcludeKeyPress}
              maxLength={20}
              className="border-b border-neutral-200 bg-transparent px-3 py-2 outline-none"
            />
            {excludeKeywords.length > 0 && (
              <div className="mt-2 flex flex-wrap gap-2">
                {excludeKeywords.map((excludeKeyword, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-1 rounded border-[0.5px] border-primary-200 bg-surface-secondary py-1 pl-3 pr-2 text-primary-500"
                  >
                    <span className="text-sm font-semibold text-primary-700">
                      {excludeKeyword}
                    </span>
                    <CloseIcon
                      className="h-5 w-5 fill-primary-500"
                      onClick={() => handleDeleteExcludeKeyword(excludeKeyword)}
                    />
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Step2;
