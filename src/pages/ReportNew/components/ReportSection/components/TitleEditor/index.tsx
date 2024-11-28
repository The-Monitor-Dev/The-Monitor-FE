import { useRef, useState, KeyboardEvent } from "react";

interface TitleEditorProps {
  title: string;
  onChangeTitle: (title: string) => void;
}

const TitleEditor: React.FC<TitleEditorProps> = ({ title, onChangeTitle }) => {
  const [isTitleEditing, setIsTitleEditing] = useState(false);
  const titleInputRef = useRef<HTMLInputElement>(null);

  const handleTitleClick = () => {
    setIsTitleEditing(true);
    setTimeout(() => titleInputRef.current?.focus(), 0);
  };

  const handleTitleBlur = () => {
    setIsTitleEditing(false);
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
      onChange={(e) => onChangeTitle(e.target.value)}
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
