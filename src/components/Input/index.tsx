import { ErrorIcon, VisibilityOffIcon, VisibilityOnIcon } from "@assets/svgs";
import { forwardRef, InputHTMLAttributes, useState } from "react";
import { twMerge } from "tailwind-merge";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  isInvalid?: boolean;
}

const style =
  "h-14 rounded w-full px-4 text-md font-regular focus:outline focus:outline-1 placeholder:text-disable";

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, isInvalid, disabled, ...props }, ref) => {
    const [showPassword, setShowPassword] = useState<boolean>(false);

    const inputStyle = twMerge(
      style,
      disabled
        ? "bg-surface-disable "
        : "bg-surface-primary focus:outline-primary-500",
      isInvalid ? "outline outline-1 outline-red-500" : "",
    );

    const hideEdgePasswordIcon = `
        input::-ms-reveal {
          display: none;
        }
      `;

    return (
      <div className={twMerge("relative", className)}>
        <style>{hideEdgePasswordIcon}</style>
        <input
          ref={ref}
          type={
            type === "password" ? (showPassword ? "text" : "password") : type
          }
          className={inputStyle}
          disabled={disabled}
          {...props}
        />
        {type === "password" &&
          !disabled &&
          (showPassword ? (
            <VisibilityOnIcon
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute right-6 top-1/2 -translate-y-1/2 transform cursor-pointer"
            />
          ) : (
            <VisibilityOffIcon
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute right-6 top-1/2 -translate-y-1/2 transform cursor-pointer"
            />
          ))}
        {isInvalid && (
          <ErrorIcon
            className={`absolute ${
              type === "password" && !disabled ? "right-14" : "right-6"
            } top-1/2 -translate-y-1/2 transform`}
          />
        )}
      </div>
    );
  },
);

Input.displayName = "Input";

export default Input;
