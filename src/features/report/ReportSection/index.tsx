import React, { ChangeEvent, KeyboardEvent, useRef, useState } from "react";
import { AddCircleThinIcon, CloseIcon, DonerIcon } from "@assets/svgs";
import { useOutsideClick } from "@chakra-ui/react";
import { HexColorPicker } from "react-colorful";
import DonerMenu from "../DonerMenu";
import Table from "../Table";

interface ReportSectionProps {
  initialTitle?: string;
}

const ReportSection: React.FC<ReportSectionProps> = ({
  initialTitle = "보고서 제목",
}) => {
  const [image, setImage] = useState<string | null>(null);
  const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setImage(imageUrl);
    }
  };

  const removeImage = () => {
    setImage(null);
  };

  const [color, setColor] = useState("#ffffff");
  const [isColorPickerOpen, setIsColorPickerOpen] = useState(false);
  const [isColorEditing, setIsColorEditing] = useState(false);
  const colorPickerRef = useRef<HTMLDivElement | null>(null);
  const colorInputRef = useRef<HTMLInputElement>(null);
  useOutsideClick({
    ref: colorPickerRef,
    handler: () => setIsColorPickerOpen(false),
  });

  const handleColorClick = () => {
    setIsColorEditing(true);
    setTimeout(() => colorInputRef.current?.focus(), 0);
  };

  const handleColorBlur = () => {
    if (/^#[0-9A-F]{6}$/i.test(color)) {
      setIsColorEditing(false);
    } else {
      alert("유효한 HEX 색상 코드를 입력하세요.");
      setColor("#ffffff");
    }
  };

  const handleColorKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleColorBlur();
    }
  };

  const [isTitleEditing, setIsTitleEditing] = useState(false);
  const [title, setTitle] = useState(initialTitle);
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
        <div className="relative h-[72px] w-24">
          {image ? (
            <div className="relative">
              <img
                src={image}
                alt="logo"
                className="h-[72px] w-24 rounded object-contain"
              />
              <button
                className="absolute right-1 top-1 rounded bg-black/30 px-[6px] py-[2px]"
                onClick={removeImage}
              >
                <CloseIcon className="h-4 w-4 fill-white" />
              </button>
            </div>
          ) : (
            <label className="flex h-full w-full cursor-pointer items-center justify-center rounded bg-surface-primary">
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleImageChange}
              />
              <AddCircleThinIcon className="h-7 w-7 fill-neutral-400" />
            </label>
          )}
        </div>
        <div>
          <div className="flex items-center gap-2 rounded-3xl border-1 border-neutral-200 bg-white px-3 py-2">
            <div ref={colorPickerRef} className="relative h-7 w-7">
              <button
                type="button"
                onClick={() => setIsColorPickerOpen((prev) => !prev)}
                className="h-7 w-7 rounded-full border-1 border-[#D9D9D9]"
                style={{ backgroundColor: color }}
              />
              {isColorPickerOpen && (
                <div className="absolute right-0 top-14 z-10">
                  <HexColorPicker color={color} onChange={setColor} />
                </div>
              )}
            </div>
            {isColorEditing ? (
              <input
                ref={colorInputRef}
                value={color.toUpperCase()}
                onChange={(e) => setColor(e.target.value)}
                onBlur={handleColorBlur}
                onKeyDown={handleColorKeyDown}
                className="w-[68px] text-sm font-semibold text-body1 outline-none"
              />
            ) : (
              <span
                className="w-[68px] cursor-pointer text-sm font-semibold text-body1"
                onClick={handleColorClick}
              >
                {color.toUpperCase()}
              </span>
            )}
          </div>
        </div>
      </div>
      <div className="flex items-center gap-2 py-3 pr-2">
        {isTitleEditing ? (
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
            className="flex-grow cursor-pointer px-5 py-3 text-3xl font-semibold text-title"
            onClick={handleTitleClick}
          >
            {title}
          </span>
        )}
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
        <Table />
      </div>
    </div>
  );
};

export default ReportSection;
