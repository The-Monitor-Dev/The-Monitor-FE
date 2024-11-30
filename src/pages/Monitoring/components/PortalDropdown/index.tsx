import { forwardRef } from "react";
import { Checkbox } from "@chakra-ui/react";
import { InternetIcon, ArrowDownIcon } from "@assets/svgs";

interface PortalDropdownProps {
  showDropdown: boolean;
  setShowDropdown: (show: boolean) => void;
  selectedPortals: { [key: string]: boolean };
  handleCheckboxChange: (key: "네이버" | "구글" | "다음" | "줌") => void;
  applySelection: () => void;
  portalDisplay: string;
}

const PortalDropdown = forwardRef<HTMLDivElement, PortalDropdownProps>(
  (
    {
      showDropdown,
      setShowDropdown,
      selectedPortals,
      handleCheckboxChange,
      applySelection,
      portalDisplay,
    },
    ref,
  ) => (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setShowDropdown(!showDropdown)}
        className="flex h-[29px] items-center rounded-[2px] border-[0.5px] border-primary-200 bg-surface-secondary p-1 hover:bg-primary-100"
      >
        <InternetIcon />
        <div className="text-sm font-semibold text-primary-700">
          {portalDisplay}
        </div>
        <ArrowDownIcon className="fill-base-dark" />
      </button>
      {showDropdown && (
        <div className="absolute top-10 flex h-[185px] w-[144px] flex-col justify-between rounded bg-white px-5 pb-3 pt-4 shadow-form">
          <div className="flex flex-col gap-2 px-1">
            {(
              Object.keys(selectedPortals) as Array<
                "네이버" | "구글" | "다음" | "줌"
              >
            ).map((key) => (
              <div key={key} className="flex items-center justify-between">
                <div className="text-sm font-medium text-body1">{key}</div>
                <Checkbox
                  isChecked={selectedPortals[key]}
                  onChange={() => handleCheckboxChange(key)}
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
            ))}
          </div>
          <button
            onClick={applySelection}
            className="w-full rounded-[2px] bg-primary-500 py-1 text-sm font-semibold text-white"
          >
            적용하기
          </button>
        </div>
      )}
    </div>
  ),
);

PortalDropdown.displayName = "PortalDropdown";

export default PortalDropdown;
