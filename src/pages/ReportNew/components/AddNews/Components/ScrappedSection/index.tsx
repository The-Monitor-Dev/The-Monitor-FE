import { ArrowDownIcon, ArrowUpIcon } from "@assets/svgs";
import ScrappedArticleBox from "../ScrappedArticleBox";
import { useState } from "react";
import { CategoryTypeEn } from "types/category";
import { enToKrCategoryMap } from "@constants/category";
import { ScrappedArticle } from "@api/types/scrap";

interface ScrappedSectionProps {
  categoryType: CategoryTypeEn;
  articles: ScrappedArticle[];
  selectedArticles: number[]; // originalArticleId 리스트
  onToggleArticle: (originalArticleId: number) => void;
}

const ScrappedSection: React.FC<ScrappedSectionProps> = ({
  categoryType,
  articles,
  selectedArticles,
  onToggleArticle,
}) => {
  const [isCompanyOpen, setIsCompanyOpen] = useState(true);

  const height = 88 * articles.length - 8;

  return (
    <div className="flex flex-col">
      <div
        className={`flex items-center justify-between py-4 ${
          categoryType !== "SELF" ? "border-t-1 border-t-neutral-200" : ""
        }`}
      >
        <span className="text-lg font-semibold text-title">
          {enToKrCategoryMap[categoryType]}
        </span>
        <button
          disabled={articles.length === 0}
          onClick={() => setIsCompanyOpen((prev) => !prev)}
        >
          {articles.length === 0 || !isCompanyOpen ? (
            <ArrowDownIcon className="fill-neutral-700" />
          ) : (
            <ArrowUpIcon />
          )}
        </button>
      </div>
      {articles.length === 0 ? (
        <div className="text-sm font-regular text-body3">
          데일리 모니터링에서 뉴스를 추가해주세요.
        </div>
      ) : (
        <div
          className={`transition-height flex flex-col gap-2 overflow-hidden duration-300 ease-in-out`}
          style={{ height: isCompanyOpen ? height : "0px" }}
        >
          {articles.map((article) => (
            <ScrappedArticleBox
              key={article.originalArticleId}
              publisherName={article.publisherName}
              reporterName={article.reporterName}
              publishDate={article.publishDate.slice(0, 10)}
              title={article.title}
              isChecked={selectedArticles.includes(article.originalArticleId)}
              onToggle={() => onToggleArticle(article.originalArticleId)}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default ScrappedSection;
