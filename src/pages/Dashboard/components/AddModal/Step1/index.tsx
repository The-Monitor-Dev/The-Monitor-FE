import { AddCircleThinIcon, AttentionIcon, CloseIcon } from "@assets/svg";
import Input from "@components/Input";
import { useEffect, useState } from "react";

interface Step1Props {
  onFormComplete: (isComplete: boolean) => void;
}

const Step1: React.FC<Step1Props> = ({ onFormComplete }) => {
  const [uploadImg, setuploadImg] = useState<string | null>(null);
  const [companyName, setCompanyName] = useState<string>("");
  const [personInCharge, setPersonInCharge] = useState<string>("");

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const uploadImg = URL.createObjectURL(file);
      setuploadImg(uploadImg);
    }
  };

  const handleDeleteImage = () => {
    setuploadImg(null);
  };

  const handleAddImage = () => {
    document.getElementById("fileInput")?.click();
  };

  useEffect(() => {
    const isComplete =
      companyName.trim() !== "" && personInCharge.trim() !== "";
    onFormComplete(isComplete);
  }, [companyName, personInCharge, onFormComplete]);

  return (
    <>
      <div>
        <h2 className="mb-2 text-4xl font-semibold text-title">
          고객사 정보 추가하기
        </h2>
      </div>
      <p className="mb-12 text-md font-regular text-title">
        새로운 고객사의 정보를 입력해주세요.
      </p>
      <div className="mx-1">
        <label className="text-md font-semibold text-title">회사명</label>
        <Input
          className="mb-7 mt-2"
          placeholder="사명을 입력해주세요."
          onChange={(e) => setCompanyName(e.target.value)}
        />
        <label className="mb-2 text-md font-semibold text-title">담당자</label>
        <Input
          className="mb-7 mt-2"
          placeholder="담당자 또는 팀명을 입력해주세요."
          onChange={(e) => setPersonInCharge(e.target.value)}
        />
        <div className="mb-4 flex items-center">
          <label className="mr-2 text-md font-semibold text-title">로고</label>
          <AttentionIcon className="mr-[2px] fill-neutral-400" />
          <p className="text-xs font-regular text-disable">
            파일 형식: PNG, JPG | 최소 크기: 96 X 72(px)
          </p>
        </div>

        {uploadImg ? (
          <div className="relative h-[76px] w-24 overflow-hidden rounded">
            <img
              src={uploadImg}
              alt="uploadImg"
              className="h-full w-full object-contain"
            />
            <button
              type="button"
              className="absolute right-1 top-1 flex h-5 w-7 cursor-pointer items-center justify-center rounded bg-black bg-opacity-30"
              onClick={handleDeleteImage}
            >
              <CloseIcon className="h-4 w-4 fill-white" />
            </button>
          </div>
        ) : (
          <button
            type="button"
            className="flex h-[76px] w-24 items-center justify-center rounded bg-surface-primary"
            onClick={handleAddImage}
          >
            <AddCircleThinIcon className="fill-neutral-400" />
          </button>
        )}

        <input
          type="file"
          id="fileInput"
          className="hidden"
          accept="image/*"
          onChange={handleImageChange}
        />
      </div>
    </>
  );
};

export default Step1;
