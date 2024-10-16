import { ButtonHTMLAttributes, ReactNode } from "react";
import { twMerge } from "tailwind-merge";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children?: ReactNode;
  className?: string;
}

const Button: React.FC<ButtonProps> = ({ children, className, ...props }) => {
  return (
    <button
      type="button"
      className={twMerge(
        "rounded-[4px] bg-primary-500 text-md font-semibold text-white hover:bg-primary-700 disabled:bg-surface-disable disabled:text-disable",
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
