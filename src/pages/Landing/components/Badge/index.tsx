import React from "react";

interface BadgeProps {
  icon: React.ReactNode;
  label: string;
}

const Badge: React.FC<BadgeProps> = ({ icon, label }) => {
  return (
    <div className="inline-flex w-auto items-center gap-2 rounded-[32px] bg-surface-secondary px-4 py-2 text-lg font-semibold text-primary-500">
      <span className="flex-shrink-0">{icon}</span>
      <span>{label}</span>
    </div>
  );
};

export default Badge;
