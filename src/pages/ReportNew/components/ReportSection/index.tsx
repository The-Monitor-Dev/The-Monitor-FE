import React, { useRef, useState } from "react";
import { DonerIcon } from "@assets/svgs";
import { useOutsideClick } from "@chakra-ui/react";
import LogoUploader from "./components/LogoUploader";
import ColorPicker from "./components/ColorPicker";
import TitleEditor from "./components/TitleEditor";
import DonerMenu from "./components/DonerMenu";
import ArticleTable from "./components/ArticleTable";
import { CategoryTypeEn } from "types/category";
import { GetScrapResponse, ScrappedArticle } from "@api/types/scrap";

interface ReportSectionProps {
  title: string;
  onChangeTitle: (title: string) => void;
  color: string;
  onChangeColor: (color: string) => void;
  logo: string | null;
  onChangeLogo: (logo: string | null, file?: File) => void;
  media: boolean;
  onChangeMedia: (value: boolean) => void;
  reporter: boolean;
  onChangeReporter: (value: boolean) => void;
  selectedArticles: { [key in CategoryTypeEn]: number[] };
  scrappedArticles: GetScrapResponse | undefined;
}

const ReportSection: React.FC<ReportSectionProps> = ({
  title,
  onChangeTitle,
  color,
  onChangeColor,
  logo,
  onChangeLogo,
  media,
  onChangeMedia,
  reporter,
  onChangeReporter,
  selectedArticles,
  scrappedArticles,
}) => {
  const [isDonerOpen, setIsDonerOpen] = useState(false);
  const donerRef = useRef<HTMLDivElement | null>(null);
  useOutsideClick({
    ref: donerRef,
    handler: () => setIsDonerOpen(false),
  });

  const filteredArticles = Object.entries(selectedArticles).reduce(
    (acc, [categoryType, articleIds]) => {
      if (scrappedArticles) {
        acc[categoryType as CategoryTypeEn] = scrappedArticles[
          categoryType as CategoryTypeEn
        ].filter((article) => articleIds.includes(article.originalArticleId));
      }
      return acc;
    },
    { SELF: [], COMPETITOR: [], INDUSTRY: [] } as GetScrapResponse,
  );

  return (
    <div className="flex w-[852px] flex-col bg-white px-8 pt-5">
      <div
        className="flex items-center justify-between border-b-1 border-neutral-200 px-4 py-3"
        style={{ backgroundColor: color }}
      >
        <LogoUploader logo={logo} onChangeLogo={onChangeLogo} />
        <ColorPicker color={color} onChangeColor={onChangeColor} />
      </div>
      <div className="flex items-center gap-2 py-3 pr-2">
        <TitleEditor title={title} onChangeTitle={onChangeTitle} />
        <div ref={donerRef} className="relative">
          <DonerIcon
            type="button"
            onClick={() => setIsDonerOpen((prev) => !prev)}
            className="cursor-pointer rounded-[2px] hover:bg-neutral-100"
          />
          {isDonerOpen && (
            <DonerMenu
              onClose={() => setIsDonerOpen(false)}
              media={media}
              onChangeMedia={onChangeMedia}
              reporter={reporter}
              onChangeReporter={onChangeReporter}
            />
          )}
        </div>
      </div>
      <div className="flex flex-col pl-9">
        {Object.entries(filteredArticles).map(([categoryType, articles]) => (
          <ArticleTable
            key={categoryType}
            tableCategory={categoryType as CategoryTypeEn}
            articles={articles as ScrappedArticle[]}
            isMedia={media}
            isReporter={reporter}
          />
        ))}
      </div>
    </div>
  );
};

export default ReportSection;
