import { VisibilityOffIcon, VisibilityOnIcon } from "@assets/svg";
import { forwardRef, InputHTMLAttributes, useState } from "react";
import { twMerge } from "tailwind-merge";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  className?: string;
}

const style =
  "h-14 rounded-[4px] bg-surface-primary w-full px-4 text-md font-regular placeholder:text-disable focus:outline focus:outline-1 focus:outline-primary-500";

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    const [showPassword, setShowPassword] = useState<boolean>(false);

    return type == "password" ? (
      <div className={twMerge("relative", className)}>
        <input
          ref={ref}
          type={showPassword ? "text" : "password"}
          className={twMerge(style, "pr-14")}
          {...props}
        />
        {showPassword ? (
          <VisibilityOnIcon
            onClick={() => setShowPassword((prev) => !prev)}
            className="absolute right-6 top-1/2 -translate-y-1/2 transform cursor-pointer"
          />
        ) : (
          <VisibilityOffIcon
            onClick={() => setShowPassword((prev) => !prev)}
            className="absolute right-6 top-1/2 -translate-y-1/2 transform cursor-pointer"
          />
        )}
      </div>
    ) : (
      <input
        ref={ref}
        type="text"
        className={twMerge(style, className)}
        {...props}
      />
    );
  },
);

Input.displayName = "Input";

export default Input;
