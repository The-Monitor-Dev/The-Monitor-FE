import React from "react";
import { Link, useLocation } from "react-router-dom";
import Button from "@components/Button";
import routes from "@constants/routes";
import { LoadingIcon } from "@assets/svgs";

interface TabNavigationProps {
  onSave: () => void;
  isPending?: boolean;
}

const TabNavigation: React.FC<TabNavigationProps> = ({ isPending, onSave }) => {
  const location = useLocation();

  const isActive = (path: string) =>
    location.pathname === path ? "text-body1" : "text-disable";

  return (
    <div className="flex w-[1208px] items-center justify-between px-8 py-5">
      <div className="flex">
        <Link
          to={routes.settingKeyword}
          className={`border-r-1 border-neutral-200 px-4 text-xl font-semibold ${isActive(
            routes.settingKeyword,
          )}`}
        >
          검색 키워드
        </Link>
        <Link
          to={routes.settingEmail}
          className={`px-4 text-xl font-semibold ${isActive(routes.settingEmail)}`}
        >
          메일
        </Link>
      </div>
      <Button
        disabled={isPending}
        style="filled"
        className="flex w-[74px] justify-center py-2"
        onClick={onSave}
      >
        {isPending ? <LoadingIcon className="h-6 w-6 animate-spin" /> : "저장"}
      </Button>
    </div>
  );
};

export default TabNavigation;
