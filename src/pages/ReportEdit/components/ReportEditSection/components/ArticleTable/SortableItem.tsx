import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import {
  HandleIcon,
  SummarizeIcon,
  DeleteIcon,
  DashboardIcon,
} from "@assets/svgs";
import { useState } from "react";
import { ReportArticle } from "@api/types/reports";
import useDeleteReportArticle from "@api/hooks/reports/useDeleteReportArticle";
import CategorySelectModal from "./CategorySelectModal";
import { CategoryTypeEn } from "types/category";
import SummarizeModal from "@features/report/SummarizeModal";

interface SortableItemProps {
  reportId: number;
  idx: number;
  id: number;
  article: ReportArticle;
  categoryType: CategoryTypeEn;
  articleCategoryId: number;
  media: boolean | undefined;
  reporter: boolean | undefined;
}

const SortableItem: React.FC<SortableItemProps> = ({
  idx,
  id,
  article,
  reportId,
  categoryType,
  articleCategoryId,
  media,
  reporter,
}) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const [isSummarizeModalOpen, setIsSummarizeModalOpen] = useState(false);

  const handleSummarizeModalClose = () => {
    setIsSummarizeModalOpen(false);
  };

  const { mutate: deleteArticle } = useDeleteReportArticle();

  const handleDeleteArticle = () => {
    deleteArticle({ reportId, reportArticleId: article.reportArticleId });
  };

  const [isCategorySelectModalOpen, setIsCategorySelectModalOpen] =
    useState(false);

  const handleCategorySelectModalClose = () => {
    setIsCategorySelectModalOpen(false);
  };
  return (
    <>
      <tr
        ref={setNodeRef}
        style={style}
        {...attributes}
        className="group relative border-b-1 border-b-neutral-200 text-center align-top text-body1 hover:bg-neutral-100"
      >
        <td className="w-10 border-r border-neutral-200 p-3 py-3 text-disable">
          {idx + 1}
        </td>
        <td className="border-r border-neutral-200 p-3">
          {article.publishedDate.slice(0, 10)}
        </td>
        <td className="max-w-[100px] border-r border-neutral-200 p-3">
          {article.keyword}
        </td>
        <td className="border-r border-neutral-200 p-3 text-left">
          <div className="flex flex-col">
            <a
              href={
                article.url.startsWith("http")
                  ? article.url
                  : `https://${article.url}`
              }
              target="_blank"
              rel="noopener noreferrer"
              className="text-base-dark underline hover:text-primary-500"
            >
              {article.headLine}
            </a>
            {article.summary && (
              <span className="text-body2">{article.summary}</span>
            )}
          </div>
        </td>
        <td className="border-r border-neutral-200 p-3">
          {media && article.media}
        </td>
        <td className="border-r border-neutral-200 p-3">
          {reporter && article.reporter}
        </td>
        <td className="flex justify-center p-3">
          <button
            type="button"
            className="flex h-6 w-6 items-center justify-center"
          >
            <SummarizeIcon
              type="button"
              onClick={() => setIsSummarizeModalOpen(true)}
              className="cursor-pointer"
            />
          </button>
          <button
            type="button"
            onClick={handleDeleteArticle}
            className="flex h-6 w-6 items-center justify-center"
          >
            <DeleteIcon className="h-4 w-4 fill-neutral-500" />
          </button>
          <button
            type="button"
            onClick={() => setIsCategorySelectModalOpen(true)}
            className="flex h-6 w-6 items-center justify-center"
          >
            <DashboardIcon className="h-4 w-4" />
          </button>
        </td>
        <div
          className="absolute -left-9 top-1/2 -translate-y-1/2 transform opacity-0 group-hover:opacity-100"
          {...listeners}
        >
          <HandleIcon className="fill-white hover:fill-surface-disable" />
        </div>
      </tr>
      {isSummarizeModalOpen && (
        <SummarizeModal
          reportId={reportId}
          reportArticleId={article.reportArticleId}
          onClose={handleSummarizeModalClose}
        />
      )}
      {isCategorySelectModalOpen && (
        <CategorySelectModal
          reportId={reportId}
          reportArticleId={article.reportArticleId}
          categoryType={categoryType}
          onClose={handleCategorySelectModalClose}
          articleCategoryId={articleCategoryId}
        />
      )}
    </>
  );
};

export default SortableItem;
