import React, { KeyboardEvent, useRef, useState } from "react";
import { HexColorPicker } from "react-colorful";
import { useOutsideClick } from "@chakra-ui/react";
import usePatchReportColor from "@api/hooks/reports/usePatchReportColor";

interface ColorPickerProps {
  reportId: number;
  color: string;
  onChangeColor: (color: string) => void;
}

const ColorPicker: React.FC<ColorPickerProps> = ({
  reportId,
  color,
  onChangeColor,
}) => {
  const [isColorPickerOpen, setIsColorPickerOpen] = useState(false);
  const [isColorEditing, setIsColorEditing] = useState(false);

  const colorPickerRef = useRef<HTMLDivElement | null>(null);
  const colorInputRef = useRef<HTMLInputElement>(null);
  const { mutate: updateColor } = usePatchReportColor();

  const handleMutateColor = () => {
    updateColor({ reportId, data: { color } });
  };

  useOutsideClick({
    ref: colorPickerRef,
    handler: () => {
      setIsColorPickerOpen(false);
      handleMutateColor();
    },
  });

  const handleColorClick = () => {
    setIsColorEditing(true);
    setTimeout(() => colorInputRef.current?.focus(), 0);
  };

  const handleColorBlur = () => {
    if (/^#[0-9A-F]{6}$/i.test(color)) {
      setIsColorEditing(false);
      handleMutateColor();
    } else {
      alert("유효한 HEX 색상 코드를 입력하세요.");
      onChangeColor("#FFFFFF");
    }
  };

  const handleColorKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleColorBlur();
    }
  };

  return (
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
            <HexColorPicker color={color} onChange={onChangeColor} />
          </div>
        )}
      </div>
      {isColorEditing ? (
        <input
          ref={colorInputRef}
          value={color.toUpperCase()}
          onChange={(e) => onChangeColor(e.target.value)}
          onBlur={handleColorBlur}
          onKeyDown={handleColorKeyDown}
          className="w-[68px] text-sm font-semibold text-body1 outline-none"
        />
      ) : (
        <span
          className="w-[68px] cursor-pointer text-sm font-semibold text-body1"
          onClick={handleColorClick}
        >
          {color?.toUpperCase()}
        </span>
      )}
    </div>
  );
};

export default ColorPicker;
