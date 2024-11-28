import React, { useState } from "react";
import Button from "@components/Button";
import useGetReportCategories from "@api/hooks/reports/useGetReportCategories";
import { CategoryTypeEn } from "types/category";
import usePatchReportArticleCategory from "@api/hooks/reports/usePatchReportArticleCategory";

interface CategorySelectModalProps {
  reportId: number;
  reportArticleId: number;
  categoryType: CategoryTypeEn;
  articleCategoryId: number;
  onClose: () => void;
}

const CategorySelectModal: React.FC<CategorySelectModalProps> = ({
  reportId,
  reportArticleId,
  categoryType,
  articleCategoryId,
  onClose,
}) => {
  const [selectedCategory, setSelectedCategory] =
    useState<number>(articleCategoryId);

  const { data: categories } = useGetReportCategories({ reportId });

  const filteredCategories = categories?.[categoryType] || [];

  const handleCategoryChange = (categoryId: number) => {
    setSelectedCategory(categoryId);
  };

  const { mutate: updateCategory } = usePatchReportArticleCategory();

  const handleApply = () => {
    if (selectedCategory !== null) {
      updateCategory({
        reportId,
        reportArticleId,
        newCategoryId: selectedCategory,
      });
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-10 flex items-center justify-center bg-black bg-opacity-65">
      <div className="flex min-w-[472px] flex-col rounded bg-white">
        <div className="w-full border-b-1 border-b-neutral-200 py-4 text-center text-lg font-semibold text-title">
          카테고리 선택하기
        </div>
        <div className="flex flex-col gap-1 border-b-1 border-b-neutral-200 px-6 py-4">
          {filteredCategories.map((category) => (
            <label
              key={category.reportCategoryId}
              className="flex items-center gap-2"
            >
              <input
                type="radio"
                name="category"
                value={category.reportCategoryId}
                checked={selectedCategory === category.reportCategoryId}
                onChange={() => handleCategoryChange(category.reportCategoryId)}
                className="form-radio"
              />
              <span className="text-md font-semibold text-body1">
                {category.reportCategoryName === "default"
                  ? "카테고리 제거"
                  : category.reportCategoryName}
              </span>
              {category.reportCategoryName !== "default" && (
                <span className="text-md font-regular text-body1">
                  {category.reportCategoryDescription}
                </span>
              )}
            </label>
          ))}
        </div>
        <div className="flex justify-end gap-2 px-6 py-4">
          <Button
            style="tertiary"
            onClick={onClose}
            className="w-[105px] bg-surface-primary py-2 text-sm"
          >
            취소
          </Button>
          <Button
            style="filled"
            className="w-[105px] rounded-[2px] py-2 text-sm"
            onClick={handleApply}
          >
            적용
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CategorySelectModal;
