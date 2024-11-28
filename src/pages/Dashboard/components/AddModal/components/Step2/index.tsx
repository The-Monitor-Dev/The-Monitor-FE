import { AttentionIcon } from "@assets/svgs";
import Button from "@components/Button";
import KeywordInput from "@components/KeywordInput";

import { useState } from "react";
import { useFormContext } from "react-hook-form";
import { enToKrCategoryMap } from "@constants/category";
import KeywordLabel from "@pages/Dashboard/components/KeywordLabel";

interface Step2Props {
  handleNext: () => void;
}

const Step2: React.FC<Step2Props> = ({ handleNext }) => {
  const { watch, setValue } = useFormContext();

  const keywordsByCategory: { [key: string]: string[] } = watch(
    "keywordsByCategory",
  ) || {
    SELF: [],
    COMPETITOR: [],
    INDUSTRY: [],
  };

  const [selectedButton, setSelectedButton] =
    useState<keyof typeof keywordsByCategory>("SELF");
  const [resetInput, setResetInput] = useState(false);

  const handleButtonClick = (buttonName: keyof typeof keywordsByCategory) => {
    setSelectedButton(buttonName);
    setResetInput(true);
    setTimeout(() => setResetInput(false), 0);
  };

  const updateKeywords = (action: "add" | "delete", keyword: string) => {
    const updatedKeywords = {
      ...keywordsByCategory,
      [selectedButton]:
        action === "add"
          ? [...keywordsByCategory[selectedButton], keyword]
          : keywordsByCategory[selectedButton].filter(
              (existingKeyword) => existingKeyword !== keyword,
            ),
    };
    setValue("keywordsByCategory", updatedKeywords);
  };

  return (
    <div className="px-[50px]">
      <div className="flex justify-between">
        <h2 className="mb-2 text-4xl font-semibold text-title">
          키워드 설정하기
        </h2>
        <div className="flex items-center gap-2">
          <div className="h-3 w-3 rounded-full bg-neutral-300" />
          <div className="h-3 w-3 rounded-full bg-primary-500" />
          <div className="h-3 w-3 rounded-full bg-neutral-300" />
        </div>
      </div>
      <p className="mb-9 text-md font-regular text-title">
        데일리모니터링을 위한 키워드를 설정해주세요
      </p>
      <div className="h-[377px] bg-neutral-50 px-4 pb-6 pt-5">
        <div className="flex gap-4">
          {Object.keys(keywordsByCategory).map((buttonName) => (
            <button
              type="button"
              key={buttonName}
              className={`h-10 w-[138px] rounded border-[0.5px] border-primary-500 px-5 py-2 text-md font-semibold ${
                selectedButton === buttonName
                  ? "bg-primary-500 text-white"
                  : "bg-white text-primary-500"
              }`}
              onClick={() =>
                handleButtonClick(buttonName as keyof typeof keywordsByCategory)
              }
            >
              {enToKrCategoryMap[buttonName]}
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
          <KeywordLabel label="검색 키워드" isRequired />
          <KeywordInput
            type="modal"
            placeholder="검색할 키워드를 입력해주세요..."
            keywords={keywordsByCategory[selectedButton]}
            onAddKeyword={(keyword) => updateKeywords("add", keyword)}
            onDeleteKeyword={(keyword) => updateKeywords("delete", keyword)}
            duplicateErrorMessage="*이미 추가된 키워드입니다."
            resetInput={resetInput}
          />
        </div>
      </div>
      <Button
        style="filled"
        className="absolute bottom-16 mx-[60px] w-[360px] py-3"
        onClick={handleNext}
        disabled={
          !Object.values(keywordsByCategory).every(
            (keywords) => keywords.length > 0,
          )
        }
      >
        다음
      </Button>
    </div>
  );
};

export default Step2;
