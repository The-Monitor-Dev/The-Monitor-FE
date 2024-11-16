import cn from "@utils/cn";
import { cva, VariantProps } from "class-variance-authority";
import { ButtonHTMLAttributes, ReactNode } from "react";

const ButtonVariants = cva(
  "rounded text-md font-semibold disabled:bg-surface-disable disabled:text-disable",
  {
    variants: {
      style: {
        filled: "bg-primary-500 text-white hover:bg-primary-700",
        tonal:
          "bg-surface-secondary text-primary-700 border-[0.5px] border-primary-200 hover:bg-primary-100 ",
        "outline-m":
          "bg-white text-primary-700 border-[0.5px] border-primary-200 hover:bg-surface-secondary",
        "outline-s":
          "rounded-[2px] border-[0.5px] border-primary-500 bg-white text-primary-700 hover:bg-surface-secondary",
        tertiary:
          "rounded-[2px] bg-white text-primary-700 hover:bg-surface-primary",
      },
    },
  },
);

interface ButtonProps
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "style">,
    VariantProps<typeof ButtonVariants> {
  children?: ReactNode;
  className?: string;
}

const Button: React.FC<ButtonProps> = ({
  style,
  children,
  className,
  ...props
}) => {
  return (
    <button
      type="button"
      className={cn(ButtonVariants({ style }), className)}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
