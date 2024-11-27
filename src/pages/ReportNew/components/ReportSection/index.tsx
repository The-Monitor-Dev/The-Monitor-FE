import React, { useRef, useState } from "react";
import { DonerIcon } from "@assets/svgs";
import { useOutsideClick } from "@chakra-ui/react";
import LogoUploader from "./LogoUploader";
import ColorPicker from "./ColorPicker";
import TitleEditor from "./TitleEditor";
import DonerMenu from "@features/report/DonerMenu";

interface ReportSectionProps {
  title: string;
  onChangeTitle: (title: string) => void;
  color: string;
  onChangeColor: (color: string) => void;
  logo: string | null;
  onChangeLogo: (logo: string | null, file?: File) => void;
}

const ReportSection: React.FC<ReportSectionProps> = ({
  title,
  onChangeTitle,
  color,
  onChangeColor,
  logo,
  onChangeLogo,
}) => {
  const [isDonerOpen, setIsDonerOpen] = useState(false);
  const donerRef = useRef<HTMLDivElement | null>(null);
  useOutsideClick({
    ref: donerRef,
    handler: () => setIsDonerOpen(false),
  });

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
          {isDonerOpen && <DonerMenu onClose={() => setIsDonerOpen(false)} />}
        </div>
      </div>
      <div className="flex flex-col pl-9">
        <div className="py-3 pl-1 text-xl font-semibold text-title">자사</div>
        {/* <ArticleTable /> */}
      </div>
    </div>
  );
};

export default ReportSection;
