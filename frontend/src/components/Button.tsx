import React from "react";
import BaseButton from "./BaseButton";

type Props = {
  children: React.ReactNode;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  className?: string;
};

export default function Button({
  children,
  onClick,
  type = "button",
  disabled,
  className = "",
}: Props) {
  return (
    <BaseButton
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={
        "bg-foreground hover:bg-m-gray text-background disabled:bg-gray-400 transition " + className
      }
    >
      {children}
    </BaseButton>
  );
}
