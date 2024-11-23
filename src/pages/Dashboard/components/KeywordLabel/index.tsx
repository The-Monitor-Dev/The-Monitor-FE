import React from "react";

interface KeywordLabelProps {
  label: string;
  isRequired?: boolean;
}

const KeywordLabel: React.FC<KeywordLabelProps> = ({ label, isRequired }) => {
  return (
    <label className="mb-4 flex items-center">
      <p className="mr-[6px] text-md font-semibold text-title">{label}</p>
      <p className="text-sm font-regular text-body3">
        [{isRequired ? "필수" : "선택"}]
      </p>
    </label>
  );
};

export default KeywordLabel;
