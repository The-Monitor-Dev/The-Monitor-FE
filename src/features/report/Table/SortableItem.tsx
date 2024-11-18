import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { HandleIcon, SummarizeIcon, DeleteIcon } from "@assets/svgs";
import { useState } from "react";
import SummarizeModal from "../SummarizeModal";

interface Row {
  id: string;
  date: string;
  keyword: string;
  headline: string;
  media: string;
  reporter: string;
}

interface SortableItemProps {
  idx: number;
  id: string;
  row: Row;
}

const SortableItem: React.FC<SortableItemProps> = ({ idx, id, row }) => {
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
        <td className="border-r border-neutral-200 p-3">{row.date}</td>
        <td className="border-r border-neutral-200 p-3">{row.keyword}</td>
        <td className="border-r border-neutral-200 p-3 text-left text-base-dark underline">
          {row.headline}
        </td>
        <td className="border-r border-neutral-200 p-3">{row.media}</td>
        <td className="border-r border-neutral-200 p-3">{row.reporter}</td>
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
            className="flex h-6 w-6 items-center justify-center"
          >
            <DeleteIcon className="h-4 w-4 fill-neutral-500" />
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
        <SummarizeModal onClose={handleSummarizeModalClose} />
      )}
    </>
  );
};

export default SortableItem;
