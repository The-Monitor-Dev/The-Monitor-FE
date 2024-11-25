import React, { useRef, useState } from "react";
import useValidateEmail from "@hooks/useValidateEmail";
import KeywordInput from "@components/KeywordInput";
import { AddCircleFillIcon, AttentionIcon } from "@assets/svgs";

interface KeywordListProps {
  title: string;
  keywords?: string[];
  onAddKeyword?: (keyword: string) => void;
  onDeleteKeyword?: (keyword: string) => void;
  type: string;
  showBorder?: boolean;
  signatureImageUrl?: string | null;
  onImageChange?: (image: File | null) => void;
}

const KeywordList = ({
  title,
  keywords = [],
  onAddKeyword,
  onDeleteKeyword,
  type,
  showBorder = true,
  onImageChange,
  signatureImageUrl,
}: KeywordListProps) => {
  const validateEmail = useValidateEmail(type);
  const [uploadingImg, setUploadingImg] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setUploadingImg(URL.createObjectURL(file));
      onImageChange?.(file);
    }
  };

  const handleButtonClick = () => fileInputRef.current?.click();

  return (
    <div
      className={`w-[348px] ${showBorder ? "border-r-1 border-neutral-200" : ""}`}
    >
      <div className="border-b-1 border-neutral-200 px-5 py-4 text-xl font-medium">
        {title}
      </div>

      <div className="my-5 max-h-[600px] overflow-y-auto px-6">
        {type === "sign" ? (
          <>
            <div className="flex w-full items-center gap-[2px] py-3">
              <AttentionIcon className="h-4 w-4 fill-disable" />
              <p className="text-sm font-medium text-disable">
                파일 형식: PNG, JPG
              </p>
              <p className="text-sm font-medium text-disable">
                | 최소 크기: 300 X 100(px)
              </p>
            </div>

            {signatureImageUrl ? (
              <img
                src={signatureImageUrl}
                className="h-[100px] w-[300px] rounded object-contain"
              />
            ) : uploadingImg ? (
              <img
                src={uploadingImg}
                className="h-[100px] w-[300px] rounded object-contain"
              />
            ) : (
              <button
                type="button"
                className="flex h-[100px] w-[300px] items-center justify-center rounded bg-surface-primary"
                onClick={handleButtonClick}
              >
                <AddCircleFillIcon className="fill-neutral-400" />
              </button>
            )}

            <input
              ref={fileInputRef}
              type="file"
              accept="image/png, image/jpeg"
              className="hidden"
              onChange={handleFileChange}
            />
          </>
        ) : (
          <KeywordInput
            placeholder={
              type === "email"
                ? "메일 주소 입력 후 엔터(Enter)를 눌러주세요."
                : "키워드 입력 후 엔터(Enter)를 눌러주세요."
            }
            keywords={keywords}
            onAddKeyword={onAddKeyword}
            onDeleteKeyword={onDeleteKeyword}
            validateKeyword={validateEmail}
            duplicateErrorMessage={
              type === "email"
                ? "*이미 추가된 이메일입니다."
                : "*이미 추가된 키워드입니다."
            }
            errorMessage={type === "email" ? "*잘못된 이메일 형식입니다." : ""}
          />
        )}
      </div>
    </div>
  );
};

export default KeywordList;
