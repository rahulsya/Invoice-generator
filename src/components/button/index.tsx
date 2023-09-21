import React from "react";

type IProps = {
  title: string;
  onClick?: () => void;
  className?: string;
  type?: "primary" | "secondary" | "warning" | "disabled";
};

function Button({ onClick, title, className, type = "primary" }: IProps) {
  const buttonStyle = {
    primary: "bg-blue-800 text-white",
    secondary: "bg-white text-blue-800",
    warning: "bg-yellow-200 text-yellow-800",
    disabled: "bg-gray-200 text-gray-500",
  };

  return (
    <button
      onClick={onClick}
      className={`rounded-lg  px-6 py-2 ${buttonStyle[type]} ${className}`}
    >
      {title}
    </button>
  );
}

export default Button;
