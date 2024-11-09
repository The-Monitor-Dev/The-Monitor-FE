import { ErrorIcon, VisibilityOffIcon, VisibilityOnIcon } from "@assets/svgs";
import { forwardRef, InputHTMLAttributes, useState } from "react";
import { twMerge } from "tailwind-merge";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  isInvalid?: boolean;
  className?: string;
}

const style =
  "h-14 rounded bg-surface-primary w-full px-4 text-md font-regular placeholder:text-disable focus:outline focus:outline-1";

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, isInvalid, ...props }, ref) => {
    const [showPassword, setShowPassword] = useState<boolean>(false);

    const inputStyle = twMerge(
      style,
      isInvalid
        ? "outline outline-1 outline-red-500"
        : "focus:outline-primary-500",
    );

    const hideEdgePasswordIcon = `
        input::-ms-reveal {
          display: none;
        }
      `;

    const renderPasswordToggleIcon = () =>
      showPassword ? (
        <VisibilityOnIcon
          onClick={() => setShowPassword((prev) => !prev)}
          className="absolute right-6 top-1/2 -translate-y-1/2 transform cursor-pointer"
        />
      ) : (
        <VisibilityOffIcon
          onClick={() => setShowPassword((prev) => !prev)}
          className="absolute right-6 top-1/2 -translate-y-1/2 transform cursor-pointer"
        />
      );

    return (
      <div className={twMerge("relative", className)}>
        <style>{hideEdgePasswordIcon}</style>
        <input
          ref={ref}
          type={
            type === "password" ? (showPassword ? "text" : "password") : type
          }
          className={inputStyle}
          {...props}
        />
        {type === "password" && renderPasswordToggleIcon()}
        {isInvalid && (
          <ErrorIcon
            className={`absolute ${type === "password" ? "right-14" : "right-6"} top-1/2 -translate-y-1/2 transform`}
          />
        )}
      </div>
    );
  },
);

Input.displayName = "Input";

export default Input;
