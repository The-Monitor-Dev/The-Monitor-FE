import React, { useState } from "react";
import { CloseIcon } from "@assets/svgs";

interface KeywordInputProps {
  label: string;
  placeholder: string;
  keywords: string[];
  onAddKeyword: (keyword: string) => void;
  onDeleteKeyword: (keyword: string) => void;
  validateKeyword?: (keyword: string) => boolean;
  errorMessage?: string;
  duplicateErrorMessage?: string;
  isRequired?: boolean;
}

const KeywordInput: React.FC<KeywordInputProps> = ({
  label,
  placeholder,
  keywords,
  onAddKeyword,
  onDeleteKeyword,
  validateKeyword,
  errorMessage,
  duplicateErrorMessage,
  isRequired = false,
}) => {
  const [inputValue, setInputValue] = useState<string>("");
  const [errorType, setErrorType] = useState<"invalid" | "duplicate" | null>(
    null,
  );

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value.trim());
    setErrorType(null);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.nativeEvent.isComposing || e.key !== "Enter" || !inputValue) return;

    e.preventDefault();
    const keyword = inputValue;

    if (validateKeyword && !validateKeyword(keyword)) {
      setErrorType("invalid");
      return;
    }

    if (keywords.includes(keyword)) {
      setErrorType("duplicate");
      return;
    }

    onAddKeyword(keyword);
    setInputValue("");
    setErrorType(null);
  };

  return (
    <div className="flex flex-col">
      <label className="flex items-center">
        <p className="mr-[6px] text-md font-semibold text-title">{label}</p>
        <p className="text-sm font-regular text-body3">
          [{isRequired ? "필수" : "선택"}]
        </p>
      </label>
      <input
        placeholder={placeholder}
        value={inputValue}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        className="mt-4 border-b border-neutral-200 bg-transparent px-3 py-2 outline-none"
      />
      {errorType && (
        <p className="mt-1 text-xs font-regular text-error-500">
          {errorType === "invalid" ? errorMessage : duplicateErrorMessage}
        </p>
      )}
      <div className="mt-3 flex flex-wrap gap-2">
        {keywords.map((keyword, index) => (
          <div
            key={index}
            className="flex items-center gap-1 rounded border-[0.5px] border-primary-200 bg-surface-secondary py-1 pl-3 pr-2 text-primary-500"
          >
            <span className="text-sm font-semibold text-primary-700">
              {keyword}
            </span>
            <CloseIcon
              type="button"
              className="h-5 w-5 cursor-pointer fill-primary-500"
              onClick={() => onDeleteKeyword(keyword)}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default KeywordInput;
