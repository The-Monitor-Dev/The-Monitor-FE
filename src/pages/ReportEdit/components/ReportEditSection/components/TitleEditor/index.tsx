import React, { KeyboardEvent, useEffect, useRef, useState } from "react";
import usePatchReportTitle from "@api/hooks/reports/usePatchReportTitle";

interface TitleEditorProps {
  reportId: number;
  initialTitle: string | undefined;
}

const TitleEditor: React.FC<TitleEditorProps> = ({
  reportId,
  initialTitle,
}) => {
  const [isTitleEditing, setIsTitleEditing] = useState(false);
  const [title, setTitle] = useState(initialTitle);
  const titleInputRef = useRef<HTMLInputElement>(null);
  const { mutate: updateTitle } = usePatchReportTitle();

  useEffect(() => {
    setTitle(initialTitle);
  }, [initialTitle]);

  const handleTitleClick = () => {
    setIsTitleEditing(true);
    setTimeout(() => titleInputRef.current?.focus(), 0);
  };

  const handleTitleBlur = () => {
    setIsTitleEditing(false);
    if (title && title !== initialTitle) {
      updateTitle({ reportId, data: { title } });
    }
  };

  const handleTitleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleTitleBlur();
    }
  };

  return isTitleEditing ? (
    <input
      ref={titleInputRef}
      value={title}
      onChange={(e) => setTitle(e.target.value)}
      onBlur={handleTitleBlur}
      onKeyDown={handleTitleKeyDown}
      className="flex-grow px-5 py-3 text-3xl font-semibold text-title outline-1 outline-primary-500"
    />
  ) : (
    <span
      className="h-[60px] flex-grow cursor-pointer px-5 py-3 text-3xl font-semibold text-title"
      onClick={handleTitleClick}
    >
      {title}
    </span>
  );
};

export default TitleEditor;
