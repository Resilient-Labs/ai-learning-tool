import React from "react";

interface Props {
  placeholder?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
  type?: string;
}

export const Input: React.FC<Props> = (props) => {
  const {
    placeholder,
    value,
    onChange,
    className = "",
    type = "text",
    ...rest
  } = props;
  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className={`w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 ${className}`}
      {...rest}
    />
  );
};
