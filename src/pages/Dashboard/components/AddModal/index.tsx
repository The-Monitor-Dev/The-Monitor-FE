import {
  AddCircleThinIcon,
  ArrowBeforeThick,
  AttentionIcon,
  CloseIcon,
} from "@assets/svg";
import Button from "@components/Button";
import Input from "@components/Input";
import { useState } from "react";

interface AddModalProps {
  onClose: () => void;
}

const AddModal: React.FC<AddModalProps> = ({ onClose }) => {
  const [uploadImg, setuploadImg] = useState<string | null>(null);
  const [step, setStep] = useState(1);
  const [selectedButton, setSelectedButton] = useState<string>("자사");

  const [searchKeyword, setSearchKeyword] = useState<string>("");
  const [searchKeywords, setSearchKeywords] = useState<string[]>([]);

  const [excludeKeyword, setExcludeKeyword] = useState<string>("");
  const [excludeKeywords, setExcludeKeywords] = useState<string[]>([]);

  const [recipientKeyword, setRecipientKeyword] = useState<string>("");
  const [recipientKeywords, setRecipientKeywords] = useState<string[]>([]);

  const [referenceKeyword, setReferenceKeyword] = useState<string>("");
  const [referenceKeywords, setReferenceKeywords] = useState<string[]>([]);

  const handleModalClose = () => {
    onClose();
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const uploadImg = URL.createObjectURL(file);
      setuploadImg(uploadImg);
    }
  };

  const handleAddImage = () => {
    document.getElementById("fileInput")?.click();
  };

  const handleDeleteImage = () => {
    setuploadImg(null);
  };

  const handleNextStep = () => {
    if (step < 4) {
      setStep(step + 1);
    }
  };

  const handlePreviousStep = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const handleButtonClick = (buttonName: string) => {
    setSelectedButton(buttonName);
  };

  const handleSearchKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && searchKeyword.trim()) {
      setSearchKeywords((prev) => [...prev, searchKeyword.trim()]);
      setSearchKeyword("");
    }
  };

  const handleDeleteSearchKeyword = (keywordToDelete: string) => {
    setSearchKeywords((prev) => prev.filter((kw) => kw !== keywordToDelete));
  };

  const handleExcludeKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && excludeKeyword.trim()) {
      setExcludeKeywords((prev) => [...prev, excludeKeyword.trim()]);
      setExcludeKeyword("");
    }
  };

  const handleDeleteExcludeKeyword = (keywordToDelete: string) => {
    setExcludeKeywords((prev) => prev.filter((kw) => kw !== keywordToDelete));
  };

  const handleRecipientKeyPress = (
    e: React.KeyboardEvent<HTMLInputElement>,
  ) => {
    if (e.key === "Enter" && recipientKeyword.trim()) {
      setRecipientKeywords((prev) => [...prev, recipientKeyword.trim()]);
      setRecipientKeyword("");
    }
  };

  const handleReferenceKeyPress = (
    e: React.KeyboardEvent<HTMLInputElement>,
  ) => {
    if (e.key === "Enter" && referenceKeyword.trim()) {
      setReferenceKeywords((prev) => [...prev, referenceKeyword.trim()]);
      setReferenceKeyword("");
    }
  };

  const handleDeleteRecipientKeyword = (keywordToDelete: string) => {
    setRecipientKeywords((prev) => prev.filter((kw) => kw !== keywordToDelete));
  };

  const handleDeleteReferenceKeyword = (keywordToDelete: string) => {
    setReferenceKeywords((prev) => prev.filter((kw) => kw !== keywordToDelete));
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-65">
      <div className="relative h-[707px] w-[580px] bg-white px-[50px] pb-16 pt-20">
        {step !== 1 && step !== 4 && (
          <ArrowBeforeThick
            className="absolute left-[24px] top-[20px] m-1 cursor-pointer"
            onClick={handlePreviousStep}
          />
        )}
        <CloseIcon
          className="absolute right-[22px] top-[22px] cursor-pointer fill-black"
          onClick={handleModalClose}
        />
        {step === 1 && (
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
              <Input className="mb-7 mt-2" placeholder="사명을 입력해주세요." />
              <label className="mb-2 text-md font-semibold text-title">
                담당자
              </label>
              <Input
                className="mb-7 mt-2"
                placeholder="담당자 또는 팀명을 입력해주세요."
              />
              <div className="mb-4 flex items-center">
                <label className="mr-2 text-md font-semibold text-title">
                  로고
                </label>
                <AttentionIcon className="mr-[2px] fill-neutral-400" />
                <p className="text-xs font-regular text-disable">
                  파일 형식: PNG, JPG | 최소 크기: 96 X 72(px)
                </p>
              </div>

              {uploadImg ? (
                <div className="relative h-[76px] w-24 overflow-hidden rounded shadow-lg">
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
        )}
        {step === 2 && (
          <>
            <div>
              <h2 className="mb-2 text-4xl font-semibold text-title">
                키워드 설정하기
              </h2>
            </div>
            <p className="mb-9 text-md font-regular text-title">
              데일리모니터링을 위한 키워드를 설정해주세요
            </p>
            <div className="h-[377px] bg-neutral-50 px-4 pb-6 pt-5">
              <div className="flex gap-4">
                {["자사", "경쟁사", "업계"].map((buttonName) => (
                  <button
                    key={buttonName}
                    className={`h-10 w-[138px] rounded border-[0.5px] border-primary-500 px-5 py-2 text-md font-semibold ${
                      selectedButton === buttonName
                        ? "bg-primary-500 text-white"
                        : "bg-white text-primary-500"
                    }`}
                    onClick={() => handleButtonClick(buttonName)}
                  >
                    {buttonName}
                  </button>
                ))}
              </div>
              <div className="mb-7 mt-3 flex w-full items-center gap-1 bg-surface-primary px-5 py-4">
                <AttentionIcon className="h-4 w-4 fill-neutral-400" />
                <p className="text-sm font-regular text-body3">
                  키워드 입력 후 엔터(Enter)를 누르면 키워드 태그가 자동
                  생성됩니다.
                </p>
              </div>
              <div className="h-[221px] overflow-y-auto pb-[17px]">
                <div className="flex flex-col">
                  <label className="mb-4 flex items-center">
                    <p className="mr-[6px] text-md font-semibold text-title">
                      검색 키워드
                    </p>
                    <p className="text-sm font-regular text-body3">[필수]</p>
                  </label>
                  <input
                    placeholder="검색할 키워드를 입력해주세요..."
                    value={searchKeyword}
                    onChange={(e) => setSearchKeyword(e.target.value)}
                    onKeyPress={handleSearchKeyPress}
                    maxLength={20}
                    className="border-b border-neutral-200 bg-transparent px-3 py-2 outline-none"
                  />
                  {searchKeywords.length > 0 && (
                    <div className="mt-2 flex flex-wrap gap-2">
                      {searchKeywords.map((keyword, index) => (
                        <div
                          key={index}
                          className="flex items-center gap-1 rounded border-[0.5px] border-primary-200 bg-surface-secondary py-1 pl-3 pr-2 text-primary-500"
                        >
                          <span className="text-sm font-semibold text-primary-700">
                            {keyword}
                          </span>
                          <CloseIcon
                            className="h-5 w-5 fill-primary-500"
                            onClick={() => handleDeleteSearchKeyword(keyword)}
                          />
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                <div className="mt-7 flex flex-col">
                  <label className="mb-4 flex items-center">
                    <p className="mr-[6px] text-md font-semibold text-title">
                      제외 키워드
                    </p>
                    <p className="text-sm font-regular text-body3">[선택]</p>
                  </label>
                  <input
                    placeholder="제외할 키워드를 입력해주세요..."
                    value={excludeKeyword}
                    onChange={(e) => setExcludeKeyword(e.target.value)}
                    onKeyPress={handleExcludeKeyPress}
                    maxLength={20}
                    className="border-b border-neutral-200 bg-transparent px-3 py-2 outline-none"
                  />
                  {excludeKeywords.length > 0 && (
                    <div className="mt-2 flex flex-wrap gap-2">
                      {excludeKeywords.map((excludeKeyword, index) => (
                        <div
                          key={index}
                          className="flex items-center gap-1 rounded border-[0.5px] border-primary-200 bg-surface-secondary py-1 pl-3 pr-2 text-primary-500"
                        >
                          <span className="text-sm font-semibold text-primary-700">
                            {excludeKeyword}
                          </span>
                          <CloseIcon
                            className="h-5 w-5 fill-primary-500"
                            onClick={() =>
                              handleDeleteExcludeKeyword(excludeKeyword)
                            }
                          />
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </>
        )}

        {step === 3 && (
          <>
            <div>
              <h2 className="mb-2 text-4xl font-semibold text-title">
                메일 설정하기
              </h2>
            </div>
            <p className="mb-9 text-md font-regular text-title">
              데일리모니터링을 위한 키워드를 설정해주세요
            </p>
            <div className="h-[369px] bg-neutral-50 px-4 pb-6 pt-5">
              <div className="mb-7 flex w-full items-center gap-1 bg-surface-primary px-5 py-4">
                <AttentionIcon className="fill-neutral-400" />
                <p className="text-sm font-regular text-body3">
                  메일 주소 입력 후 엔터(Enter)를 누르면 메일이 자동 추가됩니다.
                </p>
              </div>
              <div className="h-[265px] overflow-y-auto pb-[17px]">
                <div className="flex flex-col">
                  <label className="flex items-center">
                    <p className="mr-[6px] text-md font-semibold text-title">
                      받는 사람
                    </p>
                    <p className="text-sm font-regular text-body3">[필수]</p>
                  </label>
                  <input
                    placeholder="메일을 입력해주세요."
                    value={recipientKeyword}
                    onChange={(e) => setRecipientKeyword(e.target.value)}
                    onKeyPress={handleRecipientKeyPress}
                    className="mb-2 mt-4 border-b border-neutral-200 bg-transparent px-3 py-2 outline-none"
                  />
                  <div className="flex flex-wrap gap-2">
                    {recipientKeywords.map((kw, index) => (
                      <div
                        key={index}
                        className="flex items-center gap-1 rounded border-[0.5px] border-primary-200 bg-surface-secondary py-1 pl-3 pr-2 text-primary-500"
                      >
                        <span className="text-sm font-semibold text-primary-700">
                          {kw}
                        </span>
                        <CloseIcon
                          className="h-5 w-5 fill-primary-500"
                          onClick={() => handleDeleteRecipientKeyword(kw)}
                        />
                      </div>
                    ))}
                  </div>
                </div>
                <div className="mt-7 flex flex-col">
                  <label className="flex items-center">
                    <p className="mr-[6px] text-md font-semibold text-title">
                      참조인
                    </p>
                    <p className="text-sm font-regular text-body3">[선택]</p>
                  </label>
                  <input
                    placeholder="메일을 입력해주세요."
                    value={referenceKeyword}
                    onChange={(e) => setReferenceKeyword(e.target.value)}
                    onKeyPress={handleReferenceKeyPress}
                    className="mb-2 mt-4 border-b border-neutral-200 bg-transparent px-3 py-2 outline-none"
                  />
                  <div className="flex flex-wrap gap-2">
                    {referenceKeywords.map((kw, index) => (
                      <div
                        key={index}
                        className="flex items-center gap-1 rounded border-[0.5px] border-primary-200 bg-surface-secondary py-1 pl-3 pr-2 text-primary-500"
                      >
                        <span className="text-sm font-semibold text-primary-700">
                          {kw}
                        </span>
                        <CloseIcon
                          className="h-5 w-5 fill-primary-500"
                          onClick={() => handleDeleteReferenceKeyword(kw)}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
        {step === 4 && (
          <>
            <div>
              <h2 className="mb-2 text-4xl font-semibold text-title">
                고객사 정보 수정하기
              </h2>
            </div>
            <p className="mb-12 text-md font-regular text-title">
              새로운 고객사의 정보를 입력해주세요.
            </p>
            <div className="mx-1">
              <label className="text-md font-semibold text-title">회사명</label>
              <div className="mb-7 mt-2 flex h-[56px] w-full items-center rounded bg-surface-primary px-4 py-1">
                <p className="text-md font-regular text-body1">쇼미 더 모니</p>
              </div>
              <label className="mb-2 text-md font-semibold text-title">
                담당자
              </label>
              <div className="mb-7 mt-2 flex h-[56px] w-full items-center rounded bg-surface-primary px-4 py-1">
                <p className="text-md font-regular text-body1">이현수</p>
              </div>
              <div className="mb-4 flex items-center">
                <label className="mr-2 text-md font-semibold text-title">
                  로고
                </label>
                <AttentionIcon className="mr-[2px] fill-neutral-400" />
                <p className="text-xs font-regular text-disable">
                  파일 형식: PNG, JPG | 최소 크기: 96 X 72(px)
                </p>
              </div>

              {uploadImg ? (
                <div className="relative h-[76px] w-24 overflow-hidden rounded shadow-lg">
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
        )}
        <div className="absolute bottom-[38px] flex-col justify-end">
          <Button
            type="button"
            className="mx-[60px] w-[360px] py-3"
            onClick={() => {
              if (step === 4) {
                handleModalClose();
              } else {
                handleNextStep();
              }
            }}
          >
            {step === 4 ? "완료" : "다음"}
          </Button>

          <span className="mx-[86px] text-xs font-regular">
            도움이 필요하시면{" "}
            <a
              href="mailto:themonitor2024@gmail.com"
              className="text-primary-500"
            >
              themonitor2024@gmail.com
            </a>
            로 문의주세요
          </span>
        </div>
      </div>
    </div>
  );
};

export default AddModal;
