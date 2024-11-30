import { AddIcon, DeleteIcon } from "@assets/svgs";
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
import React, { Fragment, KeyboardEvent, useRef, useState } from "react";
import SortableItem from "./SortableItem";
import { ReportCategory } from "@api/types/reports";
import { enToKrCategoryMap } from "@constants/category";
import { useOutsideClick } from "@chakra-ui/react";
import usePostReportArticleCategory from "@api/hooks/reports/usePostReportArticleCategory";
import useDeleteReportArticleCategory from "@api/hooks/reports/useDeleteReportArticleCategory";
import CategoryAddModal from "./CategoryAddModal";
import { CategoryTypeEn } from "types/category";

interface ArticleTableProps {
  reportId: number;
  tableCategory: CategoryTypeEn;
  categories: ReportCategory[];
  isMedia: boolean | undefined;
  isReporter: boolean | undefined;
}

const ArticleTable: React.FC<ArticleTableProps> = ({
  reportId,
  tableCategory,
  categories,
  isMedia,
  isReporter,
}) => {
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor),
  );

  const [isCategoryAddModalOpen, setIsCategoryAddModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<string | null>(null);
  const [categoryDescription, setCategoryDescription] = useState<string>("");

  const inputRef = useRef<HTMLInputElement | null>(null);
  const categoryAddModalRef = useRef<HTMLDivElement | null>(null);

  const { mutate: postCategory } = usePostReportArticleCategory();

  useOutsideClick({
    ref: categoryAddModalRef,
    handler: () => setIsCategoryAddModalOpen(false),
  });

  const handleAddCategory = (category: string) => {
    setEditingCategory(category);
    setTimeout(() => {
      inputRef.current?.focus();
    }, 0);
  };

  const handleCategorySubmit = () => {
    if (editingCategory) {
      postCategory({
        reportId,
        data: {
          reportCategoryName:
            editingCategory === "사용자 입력"
              ? categoryDescription
              : editingCategory,
          reportCategoryDescription:
            editingCategory === "사용자 입력" ? "" : categoryDescription,
          reportCategoryType: tableCategory,
        },
      });
      setEditingCategory(null);
      setCategoryDescription("");
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleCategorySubmit();
    }
  };

  const { mutate: deleteArticleCategory } = useDeleteReportArticleCategory();

  const handleDeleteArticleCategory = (categoryId: number) => {
    deleteArticleCategory({ reportId, categoryId });
  };

  return (
    <div className="flex flex-col">
      <div className="py-3 pl-1 text-xl font-semibold text-title">
        {enToKrCategoryMap[tableCategory]}
      </div>
      <DndContext sensors={sensors} collisionDetection={closestCenter}>
        <table className="w-full">
          <thead className="border-b-1 border-b-neutral-200 bg-neutral-50 text-sm text-body3">
            <tr>
              <th className="w-10 border-r border-neutral-200 py-[5px] font-medium">
                번호
              </th>
              <th className="w-[100px] border-r border-neutral-200 py-[5px] font-medium">
                날짜
              </th>
              <th className="w-[100px] border-r border-neutral-200 py-[5px] font-medium">
                키워드
              </th>
              <th className="w-[260px] border-r border-neutral-200 py-[5px] font-medium">
                헤드라인
              </th>
              <th className="w-20 border-r border-neutral-200 py-[5px] font-medium">
                {isMedia && "미디어"}
              </th>
              <th className="w-20 border-r border-neutral-200 py-[5px] font-medium">
                {isReporter && "기자"}
              </th>
              <th className="w-[92px] py-[5px]" />
            </tr>
          </thead>
          <tbody className="text-sm">
            <tr className="w-full border-b-1 border-b-neutral-200 hover:bg-neutral-100">
              <td colSpan={7}>
                <div ref={categoryAddModalRef} className="relative">
                  <button
                    type="button"
                    onClick={() => setIsCategoryAddModalOpen((prev) => !prev)}
                    className="flex w-full items-center gap-1 py-3"
                  >
                    <div className="flex w-10 justify-center">
                      <AddIcon />
                    </div>
                    <span className="w-[104px] font-regular text-body1">
                      기사 카테고리 추가
                    </span>
                  </button>
                  {isCategoryAddModalOpen && (
                    <CategoryAddModal
                      onClose={() => setIsCategoryAddModalOpen(false)}
                      onAddCategory={handleAddCategory}
                    />
                  )}
                </div>
              </td>
            </tr>
            {editingCategory && (
              <tr>
                <td
                  colSpan={7}
                  className="border-b-1 border-b-neutral-200 py-2"
                >
                  <div className="flex items-center">
                    {editingCategory !== "사용자 입력" && (
                      <span className="ml-3 mr-4 text-sm font-semibold text-body1">
                        {editingCategory}
                      </span>
                    )}
                    <input
                      ref={inputRef}
                      type="text"
                      placeholder="카테고리 이름을 입력해주세요"
                      className="flex-1 rounded p-2 text-sm font-regular text-body1 outline outline-1 outline-neutral-300 focus:outline-primary-500"
                      value={categoryDescription}
                      onChange={(e) => setCategoryDescription(e.target.value)}
                      onKeyDown={handleKeyDown}
                    />
                    <button
                      type="button"
                      onClick={() => {
                        setEditingCategory(null);
                        setCategoryDescription("");
                      }}
                      className="ml-3 flex h-6 w-6 items-center justify-center"
                    >
                      <DeleteIcon className="h-4 w-4 fill-neutral-500" />
                    </button>
                  </div>
                </td>
              </tr>
            )}
            {categories.map((category) => (
              <Fragment key={category.reportCategoryId}>
                <tr>
                  {!category.default && (
                    <td
                      colSpan={7}
                      className="border-b-1 border-b-neutral-200 bg-neutral-50 px-3 py-3"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <span className="font-semibold text-title">
                            {category.reportCategoryName}
                          </span>
                          <span className="text-sm font-regular text-body1">
                            {category.reportCategoryDescription}
                          </span>
                        </div>
                        <button
                          type="button"
                          onClick={() =>
                            handleDeleteArticleCategory(
                              category.reportCategoryId,
                            )
                          }
                          className="flex h-6 w-6 items-center justify-center"
                        >
                          <DeleteIcon className="h-4 w-4 fill-neutral-500" />
                        </button>
                      </div>
                    </td>
                  )}
                </tr>
                <SortableContext
                  items={category.reportArticlesResponses.map(
                    (article) => article.reportArticleId,
                  )}
                  strategy={verticalListSortingStrategy}
                >
                  {category.reportArticlesResponses.map((article, idx) => (
                    <SortableItem
                      key={article.reportArticleId}
                      id={article.reportArticleId}
                      idx={idx}
                      article={article}
                      categoryType={tableCategory}
                      articleCategoryId={category.reportCategoryId}
                      reportId={reportId}
                      media={isMedia}
                      reporter={isReporter}
                    />
                  ))}
                </SortableContext>
              </Fragment>
            ))}
          </tbody>
        </table>
      </DndContext>
    </div>
  );
};

export default ArticleTable;
