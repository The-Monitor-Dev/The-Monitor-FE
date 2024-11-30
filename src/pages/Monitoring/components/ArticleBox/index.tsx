import { usePatchReportRead } from "@api/hooks/articles/usePatchArticleRead";
import usePostScrap from "@api/hooks/scrap/usePostScrap";
import { DefaultImage } from "@assets/images";
import {
  AddedIcon,
  BookmarkBlankIcon,
  BookmarkFillIcon,
  ClockIcon,
  PersonCheckIcon,
  PersonIcon,
} from "@assets/svgs";

interface ArticleBoxProps {
  articleId: number;
  title: string;
  body: string;
  publisherName: string;
  reporterName: string;
  publishDate: string;
  imageUrl: string;
  url: string;
  isScrapped: boolean;
  isAdded: boolean;
  isRead: boolean;
}

const ArticleBox: React.FC<ArticleBoxProps> = ({
  articleId,
  title,
  body,
  publisherName,
  reporterName,
  publishDate,
  imageUrl,
  url,
  isScrapped,
  isAdded,
  isRead,
}) => {
  const { mutate } = usePostScrap();
  const { mutate: patchReportRead } = usePatchReportRead();

  const handleArticleClick = () => {
    patchReportRead(articleId);
  };

  return (
    <div className="flex min-h-[132px] w-[658px] gap-4 border-b-1 border-b-neutral-200">
      <img
        src={imageUrl || DefaultImage}
        alt={title}
        className="mt-4 h-[92px] w-[92px] rounded-[6px]"
      />
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        onClick={handleArticleClick}
        className="flex w-[466px] flex-col gap-[6px] py-4"
      >
        <div className="flex items-center gap-[6px] text-xs font-regular text-body3">
          <div className="font-semibold text-title">{publisherName}</div>
          <div className="flex items-center gap-[2px]">
            <PersonIcon className="h-4 w-4" />
            <div>{reporterName}</div>
          </div>
          <div className="flex items-center gap-[2px]">
            <ClockIcon className="fill-neutral-400" />
            <div>{publishDate.slice(0, 10)}</div>
          </div>
        </div>
        <div className="text-md font-semibold text-neutral-700">{title}</div>
        <p className="line-clamp-2 text-sm font-normal text-body3">{body}</p>
        <div className="flex items-center gap-[10px]">
          {isAdded && (
            <div className="flex items-center gap-1 rounded-xl bg-attention-50 px-2 py-[2px]">
              <AddedIcon />
              <span className="text-xs font-medium text-neutral-500">
                이전에 추가됨
              </span>
            </div>
          )}
          {isRead && (
            <div className="flex items-center gap-1 rounded-xl bg-success-50 px-2 py-[2px]">
              <PersonCheckIcon />
              <span className="text-xs font-medium text-neutral-500">읽음</span>
            </div>
          )}
        </div>
      </a>
      <div className="px-4 pt-[18px]">
        <button
          type="button"
          onClick={() => mutate({ articleId })}
          className="flex h-8 w-8 items-center justify-center hover:bg-neutral-100"
        >
          {isScrapped ? <BookmarkFillIcon /> : <BookmarkBlankIcon />}
        </button>
      </div>
    </div>
  );
};

export default ArticleBox;
