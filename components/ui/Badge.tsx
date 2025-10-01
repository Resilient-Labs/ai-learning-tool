import React from "react";

interface Props {
  children: React.ReactNode;
  variant?: "default" | "secondary" | "outline";
  className?: string;
}

export const Badge: React.FC<Props> = (props) => {
  const { children, variant = "default", className = "", ...rest } = props;
  const baseClasses = "px-2 py-1 text-xs rounded";

  const variantClasses = {
    default: "bg-green-100 text-green-800",
    secondary: "bg-gray-100 text-gray-800",
    outline: "border border-gray-300 text-gray-700",
  };

  return (
    <span
      className={`${baseClasses} ${variantClasses[variant]} ${className}`}
      {...rest}
    >
      {children}
    </span>
  );
};
