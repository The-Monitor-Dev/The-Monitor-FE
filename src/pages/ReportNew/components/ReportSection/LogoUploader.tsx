import React, { ChangeEvent } from "react";
import { AddCircleThinIcon, CloseIcon } from "@assets/svgs";

interface LogoUploaderProps {
  logo: string | null;
  onChangeLogo: (logo: string | null, file?: File) => void;
}

const LogoUploader: React.FC<LogoUploaderProps> = ({ logo, onChangeLogo }) => {
  const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      onChangeLogo(imageUrl, file);
    }
  };

  const removeImage = () => {
    onChangeLogo(null);
  };

  return (
    <div className="relative h-[72px] w-24">
      {logo ? (
        <div className="relative">
          <img
            src={logo}
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
  );
};

export default LogoUploader;
