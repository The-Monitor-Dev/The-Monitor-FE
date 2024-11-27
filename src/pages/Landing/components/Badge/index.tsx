import React from "react";

interface BadgeProps {
  icon: React.ReactNode;
  label: string;
}

const Badge: React.FC<BadgeProps> = ({ icon, label }) => {
  return (
    <div className="flex gap-2 rounded-[32px] bg-surface-secondary py-2 pl-4 pr-5 text-lg font-semibold text-primary-500">
      {icon}
      <p>{label}</p>
    </div>
  );
};

export default Badge;
