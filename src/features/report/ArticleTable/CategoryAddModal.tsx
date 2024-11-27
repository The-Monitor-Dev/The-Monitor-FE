import React, { useRef, useState } from "react";
import { useOutsideClick } from "@chakra-ui/react";
import Button from "@components/Button";

interface CategoryAddModalProps {
  onClose: () => void;
  onAddCategory: (category: string) => void;
}

const CategoryAddModal: React.FC<CategoryAddModalProps> = ({
  onClose,
  onAddCategory,
}) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>("");

  useOutsideClick({
    ref: ref,
    handler: onClose,
  });

  const categories = ["보도 자료", "기획 기사", "사용자 입력"];

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
  };

  const handleAddCategory = () => {
    if (selectedCategory) {
      onAddCategory(selectedCategory);
      onClose();
    }
  };

  return (
    <div
      ref={ref}
      className="absolute left-0 top-[52px] z-10 flex w-[160px] flex-col items-center bg-white shadow-form"
    >
      <div className="w-full border-b-1 border-b-neutral-200 py-3 text-center text-md font-semibold text-title">
        기사 카테고리
      </div>
      <div className="flex w-[100px] flex-col gap-2 py-3">
        {categories.map((category) => (
          <label key={category} className="flex items-center gap-2">
            <input
              type="radio"
              name="category"
              value={category}
              checked={selectedCategory === category}
              onChange={() => handleCategoryChange(category)}
              className="form-radio"
            />
            <span className="text-sm font-medium text-body1">{category}</span>
          </label>
        ))}
      </div>
      <div className="pb-3 pt-2">
        <Button
          style="filled"
          className="w-[120px] rounded-[2px] py-1 text-sm"
          onClick={handleAddCategory}
        >
          추가하기
        </Button>
      </div>
    </div>
  );
};

export default CategoryAddModal;
