import React, { ChangeEvent, useEffect, useState } from "react";
import { AddCircleThinIcon, CloseIcon } from "@assets/svgs";
import usePatchReportLogo from "@api/hooks/reports/usePatchReportLogo";
import { clientId } from "@constants/clientId";

interface LogoUploaderProps {
  clientId: number;
  reportId: number;
  initialLogo?: string | null;
}

const LogoUploader: React.FC<LogoUploaderProps> = ({
  reportId,
  initialLogo,
}) => {
  const [image, setImage] = useState<string | null>(initialLogo || null);
  const { mutate: updateLogo } = usePatchReportLogo();

  useEffect(() => {
    if (initialLogo) {
      setImage(initialLogo);
    }
  }, [initialLogo]);

  const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setImage(imageUrl);
      updateLogo({ clientId: clientId, reportId, logo: file });
    }
  };

  const removeImage = () => {
    setImage(null);
  };

  return (
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
            accept="image/png, image/jpeg"
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
