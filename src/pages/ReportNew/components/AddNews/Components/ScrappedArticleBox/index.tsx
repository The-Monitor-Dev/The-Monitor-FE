import {
  CheckCircleFillIcon,
  CheckCircleOutlineIcon,
  ClockIcon,
  PersonIcon,
} from "@assets/svgs";

interface ScrappedArticleBoxProps {
  publisherName: string;
  reporterName: string;
  publishDate: string;
  title: string;
  isChecked: boolean;
  onToggle: () => void;
}

const ScrappedArticleBox: React.FC<ScrappedArticleBoxProps> = ({
  publisherName,
  reporterName,
  publishDate,
  title,
  isChecked,
  onToggle,
}) => {
  return (
    <div
      className={`flex items-center gap-5 rounded border-1 py-4 pl-5 pr-4 ${
        isChecked
          ? "border-primary-200 hover:border-primary-500"
          : "border-neutral-200 hover:border-neutral-400"
      }`}
    >
      <div className="flex w-[264px] flex-col gap-1">
        <div className="flex items-center gap-[6px] text-xs text-body3">
          {publisherName && (
            <div className="max-w-16 truncate font-medium text-title">
              {publisherName}
            </div>
          )}
          <div className="flex items-center gap-[2px]">
            <PersonIcon className="h-4 w-4" />
            <div className="max-w-16 truncate font-regular">{reporterName}</div>
          </div>
          <div className="flex items-center gap-[2px]">
            <ClockIcon className="fill-neutral-400" />
            <div className="font-regular">{publishDate}</div>
          </div>
        </div>
        <div className="truncate text-md font-medium">{title}</div>
      </div>
      <button type="button" onClick={onToggle}>
        {isChecked ? <CheckCircleFillIcon /> : <CheckCircleOutlineIcon />}
      </button>
    </div>
  );
};

export default ScrappedArticleBox;
