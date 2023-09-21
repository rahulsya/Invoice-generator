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
  styleLabel?: string;
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
  styleLabel,
}: IProps) {
  if (type == "text-area") {
    return (
      <div className={`w-full ${styles}`}>
        <div className="pb-1 text-gray-500 ">{title}</div>
        <textarea
          name={name}
          value={value}
          placeholder={placeholder}
          className="w-full rounded-md border border-gray-400 p-2"
          onChange={onChange}
        ></textarea>
      </div>
    );
  }

  return (
    <div className={`w-full ${styles}`}>
      {title && (
        <div className={`pb-1 text-xs text-gray-500 ${styleLabel}`}>
          {title}
        </div>
      )}
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        className="w-full rounded-md border border-gray-400 p-2"
        onChange={onChange}
        value={value}
        disabled={disable}
      />
    </div>
  );
}
