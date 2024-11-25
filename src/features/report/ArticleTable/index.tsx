import { AddIcon } from "@assets/svgs";
import {
  closestCenter,
  DndContext,
  DragEndEvent,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { useState } from "react";
import SortableItem from "./SortableItem";

interface Row {
  id: string;
  date: string;
  keyword: string;
  headline: string;
  media: string;
  reporter: string;
}

interface ArticleTableProps {
  tableCategory: string;
}

const ArticleTable: React.FC<ArticleTableProps> = ({ tableCategory }) => {
  const [rows, setRows] = useState<Row[]>([
    {
      id: "1",
      date: "2024.11.01",
      keyword: "한솥",
      headline: "한솥도시락 출시",
      media: "데일리단",
      reporter: "임유정",
    },
    {
      id: "2",
      date: "2024.11.01",
      keyword: "한솥",
      headline: "새로운 메뉴",
      media: "뉴스미디어",
      reporter: "김철수",
    },
  ]);
  function arrayMove<T>(array: T[], fromIndex: number, toIndex: number): T[] {
    const newArray = [...array];
    const [movedItem] = newArray.splice(fromIndex, 1);
    newArray.splice(toIndex, 0, movedItem);
    return newArray;
  }

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor),
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const oldIndex = rows.findIndex((row) => row.id === active.id);
    const newIndex = rows.findIndex((row) => row.id === over.id);

    setRows((items) => arrayMove(items, oldIndex, newIndex));
  };

  return (
    <div className="flex flex-col">
      <div className="py-3 pl-1 text-xl font-semibold text-title">
        {tableCategory}
      </div>
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext items={rows} strategy={verticalListSortingStrategy}>
          <table className="w-full">
            <thead className="border-b-1 border-b-neutral-200 bg-neutral-50 text-sm text-body3">
              <tr className="">
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
                  미디어
                </th>
                <th className="w-20 border-r border-neutral-200 py-[5px] font-medium">
                  기자
                </th>
                <th className="w-[92px] py-[5px]" />
              </tr>
            </thead>
            <tbody className="text-sm">
              <tr className="w-full border-b-1 border-b-neutral-200 hover:bg-neutral-100">
                <td colSpan={7}>
                  <button className="flex w-full items-center gap-1 py-3">
                    <div className="flex w-10 justify-center">
                      <AddIcon />
                    </div>
                    <span className="w-[104px] font-regular text-body1">
                      기사 카테고리 추가
                    </span>
                  </button>
                </td>
              </tr>
              {rows.map((row, idx) => (
                <SortableItem key={row.id} idx={idx} id={row.id} row={row} />
              ))}
            </tbody>
          </table>
        </SortableContext>
      </DndContext>
    </div>
  );
};

export default ArticleTable;
