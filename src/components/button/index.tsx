import React from "react";

type IProps = {
  title: string;
  onClick?: () => void;
  className?: string;
  type?: "primary" | "secondary" | "warning" | "disabled" | "success";
  disabled?: boolean;
};

function Button({
  onClick,
  title,
  className,
  type = "primary",
  disabled,
}: IProps) {
  const buttonStyle = {
    primary: "text-sm bg-blue-800 text-white",
    secondary: "text-sm bg-white text-blue-800 border",
    warning: "text-sm bg-yellow-200 text-yellow-800",
    disabled: "text-sm bg-gray-200 text-gray-500",
    success: "text-sm bg-green-600 text-gray-100",
  };

  return (
    <button
      disabled={disabled}
      onClick={onClick}
      className={`rounded-lg  px-6 py-2 ${buttonStyle[type]} ${className}`}
    >
      {title}
    </button>
  );
}

export default Button;
