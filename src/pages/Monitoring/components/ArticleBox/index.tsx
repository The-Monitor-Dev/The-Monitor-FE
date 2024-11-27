import { DefaultImage } from "@assets/images";
import {
  BookmarkBlankIcon,
  BookmarkFillIcon,
  ClockIcon,
  PersonIcon,
} from "@assets/svgs";
import { useState } from "react";

interface ArticleBoxProps {
  title: string;
  body: string;
  publisherName: string;
  reporterName: string;
  publishDate: string;
  imageUrl: string;
  url: string;
}

const ArticleBox: React.FC<ArticleBoxProps> = ({
  title,
  body,
  publisherName,
  reporterName,
  publishDate,
  imageUrl,
  url,
}) => {
  const [isBookmarkChecked, setIsBookmarkChecked] = useState(false);

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
      </a>
      <div className="px-4 pt-[18px]">
        <button
          type="button"
          onClick={() => setIsBookmarkChecked((prev) => !prev)}
          className="flex h-8 w-8 items-center justify-center hover:bg-neutral-100"
        >
          {isBookmarkChecked ? <BookmarkFillIcon /> : <BookmarkBlankIcon />}
        </button>
      </div>
    </div>
  );
};

export default ArticleBox;
