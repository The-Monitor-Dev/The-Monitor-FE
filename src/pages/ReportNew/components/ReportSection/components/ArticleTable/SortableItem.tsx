import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { HandleIcon } from "@assets/svgs";
import { CategoryTypeEn } from "types/category";
import { ScrappedArticle } from "@api/types/scrap";

interface SortableItemProps {
  idx: number;
  article: ScrappedArticle;
  categoryType: CategoryTypeEn;
  media: boolean | undefined;
  reporter: boolean | undefined;
}

const SortableItem: React.FC<SortableItemProps> = ({
  idx,
  article,
  media,
  reporter,
}) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: article.originalArticleId });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
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
          {article?.publishDate.slice(0, 10)}
        </td>
        <td className="max-w-[100px] border-r border-neutral-200 p-3">
          {article?.keyword}
        </td>
        <td className="border-r border-neutral-200 p-3 text-left">
          <div className="flex flex-col">
            <a
              href={
                article?.url.startsWith("http")
                  ? article.url
                  : `https://${article?.url}`
              }
              target="_blank"
              rel="noopener noreferrer"
              className="text-base-dark underline hover:text-primary-500"
            >
              {article?.title}
            </a>
          </div>
        </td>
        <td className="border-r border-neutral-200 p-3">
          {media && article?.publisherName}
        </td>
        <td className="border-r border-neutral-200 p-3">
          {reporter && article?.reporterName}
        </td>
        <div
          className="absolute -left-9 top-1/2 -translate-y-1/2 transform opacity-0 group-hover:opacity-100"
          {...listeners}
        >
          <HandleIcon className="fill-white hover:fill-surface-disable" />
        </div>
      </tr>
    </>
  );
};

export default SortableItem;
