import {
  AddCircleThinIcon,
  CloseIcon,
  DonerIcon,
  MailIcon,
  ReportIcon,
  UndoIcon,
} from "@assets/svgs";
import { useOutsideClick } from "@chakra-ui/react";
import Button from "@components/Button";
import routes from "@constants/routes";
import React, { ChangeEvent, KeyboardEvent, useRef, useState } from "react";
import { HexColorPicker } from "react-colorful";
import { useNavigate } from "react-router-dom";
import Table from "./components/Table";
import AddNews from "./components/AddNews";
import DonerMenu from "./components/DonerMenu";
import SendEmailModal from "./components/SendEmailModal";

const ReportEditPage: React.FC = () => {
  const navigate = useNavigate();

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
  const colorPickerRef = useRef<HTMLDivElement | null>(null);
  useOutsideClick({
    ref: colorPickerRef,
    handler: () => setIsColorPickerOpen(false),
  });

  const [isTitleEditing, setIsTitleEditing] = useState(false);
  const [title, setTitle] = useState("보고서 제목");
  const inputRef = useRef<HTMLInputElement>(null);

  const handleTitleClick = () => {
    setIsTitleEditing(true);
    setTimeout(() => inputRef.current?.focus(), 0);
  };

  const handleBlur = () => {
    setIsTitleEditing(false);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleBlur();
    }
  };

  const [isDonerOpen, setIsDonerOpen] = useState(false);
  const donerRef = useRef<HTMLDivElement | null>(null);
  useOutsideClick({
    ref: donerRef,
    handler: () => setIsDonerOpen(false),
  });

  const [isSendEmailModalOpen, setIsSendEmailModalOpen] = useState(false);
  const handleSendEmailModalClose = () => {
    setIsSendEmailModalOpen(false);
  };

  return (
    <div className="flex h-full justify-center">
      <div className="flex w-[1280px] flex-col">
        <div className="mt-[38px] flex justify-between">
          <Button
            type="button"
            style="outline-m"
            onClick={() => navigate(routes.monitoring)}
            className="flex items-center gap-1 py-2 pl-2 pr-3"
          >
            <UndoIcon />
            <span>나가기</span>
          </Button>
          <div className="flex items-center gap-3">
            <Button
              type="button"
              style="outline-m"
              className="flex items-center gap-1 py-2 pl-2 pr-3"
            >
              <ReportIcon />
              <span>액셀 내보내기</span>
            </Button>
            <Button
              type="button"
              style="outline-m"
              onClick={() => setIsSendEmailModalOpen(true)}
              className="flex items-center gap-1 py-2 pl-2 pr-3"
            >
              <MailIcon />
              <span>메일 전송하기</span>
            </Button>
            {isSendEmailModalOpen && (
              <SendEmailModal onClose={handleSendEmailModalClose} />
            )}
            <Button type="button" style="filled" className="px-3 py-2">
              저장하기
            </Button>
          </div>
        </div>
        <div className="mt-4 flex flex-grow gap-7">
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
              <div ref={colorPickerRef} className="relative">
                <button
                  type="button"
                  onClick={() => setIsColorPickerOpen((prev) => !prev)}
                  className="flex items-center gap-2 rounded-3xl border-1 border-neutral-200 bg-white px-3 py-2"
                >
                  <div
                    className="h-7 w-7 rounded-full border-1 border-[#D9D9D9]"
                    style={{ backgroundColor: color }}
                  />
                  <div className="w-[68px] text-sm font-semibold text-body1">
                    {color.toUpperCase()}
                  </div>
                </button>
                {isColorPickerOpen && (
                  <div className="absolute right-0 top-14">
                    <HexColorPicker color={color} onChange={setColor} />
                  </div>
                )}
              </div>
            </div>
            <div className="flex items-center gap-2 py-3 pr-2">
              {isTitleEditing ? (
                <input
                  ref={inputRef}
                  className="flex-grow px-5 py-3 text-3xl font-semibold text-title outline-1 outline-primary-500"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  onBlur={handleBlur}
                  onKeyDown={handleKeyDown}
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
                {isDonerOpen && (
                  <DonerMenu onClose={() => setIsDonerOpen(false)} />
                )}
              </div>
            </div>
            <div className="flex flex-col pl-9">
              <div className="py-3 pl-1 text-xl font-semibold text-title">
                자사
              </div>
              <Table />
            </div>
          </div>
          <AddNews />
        </div>
      </div>
    </div>
  );
};

export default ReportEditPage;
