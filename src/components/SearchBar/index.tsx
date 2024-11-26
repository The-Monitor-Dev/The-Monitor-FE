import { CloseIcon, SearchIcon } from "@assets/svgs";
import cn from "@utils/cn";
import React, { ChangeEvent, KeyboardEvent } from "react";

interface SearchBarProps {
  placeholder: string;
  bgColor: string;
  value: string;
  onChange: (value: string) => void;
  onSearch: () => void;
}

const SearchBar: React.FC<SearchBarProps> = ({
  placeholder,
  bgColor,
  value,
  onChange,
  onSearch,
}) => {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  const handleClear = () => {
    onChange("");
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      onSearch();
    }
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
        onKeyDown={handleKeyDown}
        className={cn(
          "w-[388px] text-md font-regular placeholder:text-md placeholder:font-regular focus:outline-none",
          `bg-${bgColor}`,
        )}
        placeholder={placeholder}
      />
      {value.trim() && (
        <CloseIcon
          type="button"
          onClick={handleClear}
          className="ml-[10px] mr-2 cursor-pointer fill-neutral-700"
        />
      )}
      <SearchIcon
        className={`${value.trim() ? "fill-neutral-700" : "fill-neutral-400"} cursor-pointer`}
        onClick={onSearch}
      />
    </div>
  );
};

export default SearchBar;
