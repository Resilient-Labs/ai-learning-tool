import React from "react";

interface Props {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  iconColor?: string;
  className?: string;
}

export const StatsCard: React.FC<Props> = (props) => {
  const {
    title,
    value,
    icon,
    iconColor = "text-red-600",
    className = "",
    ...rest
  } = props;
  return (
    <div
      className={`bg-white rounded-lg border border-gray-200 p-6 ${className}`}
      {...rest}
    >
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-3xl font-bold text-gray-900">{value}</p>
        </div>
        <div className={`p-3 rounded-lg bg-gray-50 ${iconColor}`}>{icon}</div>
      </div>
    </div>
  );
};
