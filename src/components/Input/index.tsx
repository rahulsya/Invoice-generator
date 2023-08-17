import React from "react";

type IProps = {
  name?: string;
  title?: string;
  type: "text" | "number" | "date" | "text-area" | "email" | "password";
  styles?: string;
  placeholder?: string;
  onChange: (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  value?: string;
  disable?: boolean;
};

export default function Input({
  name,
  title,
  type,
  styles,
  placeholder,
  onChange,
  value,
  disable = false,
}: IProps) {
  if (type == "text-area") {
    return (
      <div className={`w-full ${styles}`}>
        <div className="text-gray-500 pb-1">{title}</div>
        <textarea
          name={name}
          value={value}
          placeholder={placeholder}
          className="border rounded-md border-gray-400 w-full p-2"
          onChange={onChange}
        ></textarea>
      </div>
    );
  }

  return (
    <div className={`w-full ${styles}`}>
      {title && <div className="text-gray-500 pb-1 text-xs">{title}</div>}
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        className="border rounded-md border-gray-400 w-full p-2"
        onChange={onChange}
        value={value}
        disabled={disable}
      />
    </div>
  );
}
