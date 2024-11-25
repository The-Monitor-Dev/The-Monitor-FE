import usePutClient from "@api/hooks/clients/usePutClient";
import { AddCircleThinIcon, AttentionIcon, CloseIcon } from "@assets/svgs";
import Button from "@components/Button";
import Input from "@components/Input";
import { useState } from "react";

interface EditModalProps {
  onClose: () => void;
  clientId: number;
  manager: string;
  name: string;
  logoUrl: string;
}

const EditModal: React.FC<EditModalProps> = ({
  onClose,
  clientId,
  manager,
  name,
  logoUrl,
}) => {
  const [uploadingImg, setUploadingImg] = useState<string | null>(logoUrl);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [clientName, setClientName] = useState(name);
  const [clientManager, setClientManager] = useState(manager);
  const { mutate } = usePutClient();

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const previewUrl = URL.createObjectURL(file);
      setUploadingImg(previewUrl);
      setSelectedFile(file);
    }
  };

  const handleDeleteImage = () => {
    setUploadingImg(null);
    setSelectedFile(null);
  };

  const handleAddImage = () => {
    document.getElementById("fileInput")?.click();
  };

  const handleSave = () => {
    const formData = new FormData();

    const clientData = {
      name: clientName,
      managerName: clientManager,
    };
    formData.append("clientData", JSON.stringify(clientData));

    if (selectedFile) {
      formData.append("logo", selectedFile);
    }

    mutate({ clientId: clientId, data: formData });

    onClose();
  };

  return (
    <div className="fixed inset-0 z-[99] flex items-center justify-center bg-black bg-opacity-65">
      <div className="relative z-[100] h-[707px] w-[580px] bg-white px-[50px] pt-20">
        <h2 className="mb-2 text-4xl font-semibold text-title">
          고객사 정보 수정하기
        </h2>
        <CloseIcon
          type="button"
          className="absolute right-[22px] top-[22px] cursor-pointer fill-neutral-700"
          onClick={onClose}
        />
        <p className="mb-12 text-md font-regular text-title">
          새로운 고객사의 정보를 입력해주세요.
        </p>
        <div className="mx-1">
          <label className="text-md font-semibold text-title">회사명</label>
          <Input
            className="mb-7 mt-2"
            value={clientName}
            onChange={(e) => setClientName(e.target.value)}
          />
          <label className="mb-2 text-md font-semibold text-title">
            담당자
          </label>
          <Input
            className="mb-7 mt-2"
            value={clientManager}
            onChange={(e) => setClientManager(e.target.value)}
          />
          <div className="mb-4 flex items-center">
            <label className="mr-2 text-md font-semibold text-title">
              로고
            </label>
            <AttentionIcon className="mr-[2px] h-4 w-4 fill-neutral-400" />
            <p className="text-xs font-regular text-disable">
              파일 형식: PNG, JPG | 최소 크기: 96 X 72(px)
            </p>
          </div>

          {uploadingImg ? (
            <div className="relative h-[76px] w-24 overflow-hidden rounded shadow-lg">
              <img
                src={uploadingImg}
                alt="uploaded logo"
                className="h-full w-full object-contain"
              />
              <button
                type="button"
                className="absolute right-1 top-1 flex h-5 w-7 cursor-pointer items-center justify-center rounded bg-black bg-opacity-30"
                onClick={handleDeleteImage}
              >
                <CloseIcon type="button" className="h-4 w-4 fill-white" />
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
        <Button
          type="button"
          style="filled"
          className="mx-[60px] mt-[69px] w-[360px] py-3"
          onClick={handleSave}
        >
          저장
        </Button>
      </div>
    </div>
  );
};

export default EditModal;
