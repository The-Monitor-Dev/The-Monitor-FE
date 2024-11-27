import { Keyword } from "@api/types/keywords";
import { CategoryTypeEn, CategoryTypeKr } from "types/category";

interface CategoryProps {
  categoryKr: CategoryTypeKr;
  categoryEn: CategoryTypeEn;
  selectedCategory: CategoryTypeEn | undefined;
  onSelectCategory: (category: CategoryTypeEn | undefined) => void;
  keywords: Keyword[];
  selectedKeyword: Keyword | undefined;
  onSelectKeyword: (keyword: Keyword | undefined) => void;
}

const Category: React.FC<CategoryProps> = ({
  categoryKr,
  categoryEn,
  selectedCategory,
  onSelectCategory,
  keywords,
  selectedKeyword,
  onSelectKeyword,
}) => {
  return (
    <div className="border-t-1 border-neutral-200">
      <button
        type="button"
        className={`w-full p-2 text-left text-md font-semibold hover:bg-surface-secondary ${
          selectedCategory === categoryEn
            ? "bg-surface-secondary text-primary-700"
            : "text-neutral-700"
        }`}
        onClick={() => {
          onSelectCategory(categoryEn);
          onSelectKeyword(undefined);
        }}
      >
        {categoryKr}
      </button>
      <ul className="mt-1 flex flex-col gap-1 text-sm font-medium text-body3">
        {keywords.map((keyword) => (
          <li key={keyword.keywordId}>
            <button
              type="button"
              className={`w-full py-2 pl-6 text-left ${
                selectedKeyword?.keywordId === keyword.keywordId
                  ? "bg-surface-secondary text-primary-700"
                  : "text-body3"
              }`}
              onClick={() => {
                onSelectCategory(undefined);
                onSelectKeyword(keyword);
              }}
            >
              {keyword.keywordName}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Category;
