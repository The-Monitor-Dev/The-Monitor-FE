import {
  closestCenter,
  DndContext,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import React, { useEffect, useState } from "react";
import SortableItem from "./SortableItem";
import { enToKrCategoryMap } from "@constants/category";
import { CategoryTypeEn } from "types/category";
import { ScrappedArticle } from "@api/types/scrap";
import { arrayMove } from "@dnd-kit/sortable";

interface ArticleTableProps {
  tableCategory: CategoryTypeEn;
  articles: ScrappedArticle[];
  isMedia: boolean | undefined;
  isReporter: boolean | undefined;
  onUpdateArticles?: (updatedArticles: ScrappedArticle[]) => void;
}

const ArticleTable: React.FC<ArticleTableProps> = ({
  tableCategory,
  articles,
  isMedia,
  isReporter,
  onUpdateArticles,
}) => {
  const [sortedArticles, setSortedArticles] =
    useState<ScrappedArticle[]>(articles);

  useEffect(() => {
    setSortedArticles(articles);
  }, [articles]);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor),
  );

  const handleDragEnd = (event: any) => {
    const { active, over } = event;

    if (active.id !== over.id) {
      const oldIndex = sortedArticles.findIndex(
        (article) => article.originalArticleId === active.id,
      );
      const newIndex = sortedArticles.findIndex(
        (article) => article.originalArticleId === over.id,
      );

      const updatedArticles = arrayMove(sortedArticles, oldIndex, newIndex);
      setSortedArticles(updatedArticles);

      if (onUpdateArticles) {
        onUpdateArticles(updatedArticles);
      }
    }
  };

  return (
    <div className="flex flex-col">
      <div className="py-3 pl-1 text-xl font-semibold text-title">
        {enToKrCategoryMap[tableCategory]}
      </div>
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <table className="w-full">
          <thead className="border-b-1 border-b-neutral-200 bg-neutral-50 text-sm text-body3">
            <tr>
              <th className="w-10 border-r border-neutral-200 py-[5px] font-medium">
                번호
              </th>
              <th className="w-[110px] border-r border-neutral-200 py-[5px] font-medium">
                날짜
              </th>
              <th className="w-[100px] border-r border-neutral-200 py-[5px] font-medium">
                키워드
              </th>
              <th className="border-r border-neutral-200 py-[5px] font-medium">
                헤드라인
              </th>
              <th className="w-24 border-r border-neutral-200 py-[5px] font-medium">
                {isMedia && "미디어"}
              </th>
              <th className="w-24 border-r border-neutral-200 py-[5px] font-medium">
                {isReporter && "기자"}
              </th>
            </tr>
          </thead>
          <tbody className="text-sm">
            <SortableContext
              items={sortedArticles.map((article) => article.originalArticleId)}
              strategy={verticalListSortingStrategy}
            >
              {sortedArticles.map((article, idx) => (
                <SortableItem
                  key={article.originalArticleId}
                  article={article}
                  idx={idx}
                  categoryType={tableCategory}
                  media={isMedia}
                  reporter={isReporter}
                />
              ))}
            </SortableContext>
          </tbody>
        </table>
      </DndContext>
    </div>
  );
};

export default ArticleTable;
