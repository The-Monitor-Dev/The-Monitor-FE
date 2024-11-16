import React, { useRef } from "react";
import { Checkbox, useOutsideClick } from "@chakra-ui/react";
import Button from "@components/Button";

interface DonerMenuProps {
  onClose: () => void;
}

const DonerMenu: React.FC<DonerMenuProps> = ({ onClose }) => {
  const donerRef = useRef<HTMLDivElement | null>(null);

  useOutsideClick({
    ref: donerRef,
    handler: onClose,
  });

  return (
    <div
      ref={donerRef}
      className="absolute right-0 top-8 z-10 flex w-[160px] flex-col items-center bg-white shadow-form"
    >
      <div className="w-full border-b-1 border-b-neutral-200 py-4 text-center text-md font-semibold text-title">
        보고서 구성요소
      </div>
      <div className="flex w-[100px] flex-col gap-2 py-3">
        <div className="flex items-center justify-between">
          <div>미디어</div>
          <Checkbox
            borderColor="#A3A3A3"
            sx={{
              "& .chakra-checkbox__control": {
                width: "16px",
                height: "16px",
                borderRadius: "0px",
                bg: "white",
                borderWidth: "2px",
              },
              "& .chakra-checkbox__control[data-checked]": {
                bg: "#0050F0",
                borderColor: "#0050F0",
                _hover: {
                  bg: "#0050F0",
                  borderColor: "#0050F0",
                },
              },
            }}
          />
        </div>
        <div className="flex items-center justify-between">
          <div>기자</div>
          <Checkbox
            borderColor="#A3A3A3"
            sx={{
              "& .chakra-checkbox__control": {
                width: "16px",
                height: "16px",
                borderRadius: "0px",
                bg: "white",
                borderWidth: "2px",
              },
              "& .chakra-checkbox__control[data-checked]": {
                bg: "#0050F0",
                borderColor: "#0050F0",
                _hover: {
                  bg: "#0050F0",
                  borderColor: "#0050F0",
                },
              },
            }}
          />
        </div>
      </div>
      <div className="pb-3 pt-2">
        <Button style="filled" className="w-[120px] rounded-[2px] py-1 text-sm">
          적용하기
        </Button>
      </div>
    </div>
  );
};

export default DonerMenu;