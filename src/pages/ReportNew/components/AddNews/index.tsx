import Button from "@components/Button";
import ScrappedSection from "./Components/ScrappedSection";
import { CategoryTypeEn } from "types/category";
import { useNavigate } from "react-router-dom";
import routes from "@constants/routes";

import { GetScrapResponse } from "@api/types/scrap";

interface AddNewsProps {
  scrappedArticles: GetScrapResponse | undefined;
  selectedArticles: { [key in CategoryTypeEn]: number[] };
  onToggleArticleSelection: (
    categoryType: CategoryTypeEn,
    articleId: number,
  ) => void;
}

const AddNews: React.FC<AddNewsProps> = ({
  scrappedArticles,
  selectedArticles,
  onToggleArticleSelection,
}) => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-grow flex-col rounded bg-white">
      <div className="flex items-center justify-between border-b-1 border-b-neutral-200 px-6 py-5">
        <span className="text-xl font-semibold text-title">추가한 뉴스</span>
        <Button
          onClick={() => navigate(routes.monitoring)}
          style="outline-s"
          className="px-3 py-1"
        >
          기사 추가하기
        </Button>
      </div>
      <div className="flex flex-col gap-3 px-7 pb-10">
        {scrappedArticles &&
          Object.entries(scrappedArticles).map(([categoryType, articles]) => (
            <ScrappedSection
              key={categoryType}
              categoryType={categoryType as CategoryTypeEn}
              articles={articles}
              selectedArticles={
                selectedArticles[categoryType as CategoryTypeEn]
              }
              onToggleArticle={(articleId) =>
                onToggleArticleSelection(
                  categoryType as CategoryTypeEn,
                  articleId,
                )
              }
            />
          ))}
      </div>
    </div>
  );
};

export default AddNews;
