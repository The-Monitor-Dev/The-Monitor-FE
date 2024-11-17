import { CloseIcon, SearchIcon } from "@assets/svgs";
import cn from "@utils/cn";
import React, { ChangeEvent, useState } from "react";

interface SearchBarProps {
  placeholder: string;
  bgColor: string;
}

const SearchBar: React.FC<SearchBarProps> = ({ placeholder, bgColor }) => {
  const [value, setValue] = useState("");
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };
  const hasText = value.trim().length > 0;

  const handleClear = () => {
    setValue("");
  };

  return (
    <div
      className={cn(
        "flex h-11 w-[480px] items-center justify-between rounded border-1 border-transparent pl-4 pr-[10px] focus-within:border-primary-500",
        `bg-${bgColor}`,
      )}
    >
      <input
        value={value}
        onChange={handleChange}
        className={cn(
          "w-[388px] text-md font-regular placeholder:text-md placeholder:font-regular focus:outline-none",
          `bg-${bgColor}`,
        )}
        placeholder={placeholder}
      />
      {hasText && (
        <CloseIcon
          type="button"
          onClick={handleClear}
          className="ml-[10px] mr-2 cursor-pointer fill-neutral-700"
        />
      )}
      <SearchIcon
        className={`${hasText ? "fill-neutral-700" : "fill-neutral-400"}`}
      />
    </div>
  );
};

export default SearchBar;
