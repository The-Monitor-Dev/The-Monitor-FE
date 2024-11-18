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
  isRequired = false,
}) => {
  const [inputValue, setInputValue] = useState<string>("");
  const [isValid, setIsValid] = useState<boolean>(true);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);

    if (value.trim() === "") {
      setIsValid(true);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && inputValue.trim()) {
      e.preventDefault();
      const keyword = inputValue.trim();

      if (validateKeyword && !validateKeyword(keyword)) {
        setIsValid(false);
        return;
      }

      if (keywords.includes(keyword)) {
        setIsValid(false);
        return;
      }

      onAddKeyword(keyword);
      setInputValue("");
      setIsValid(true);
    }
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
        onKeyPress={handleKeyPress}
        className="mt-4 border-b border-neutral-200 bg-transparent px-3 py-2 outline-none"
      />
      {inputValue.trim() !== "" && !isValid && (
        <p className="mt-1 text-xs font-regular text-error-500">
          {errorMessage}
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
              className="h-5 w-5 fill-primary-500"
              onClick={() => onDeleteKeyword(keyword)}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default KeywordInput;
