import { ArrowDownIcon, LogoIcon, ProfileIcon } from "@assets/svgs";
import Button from "@components/Button";
import routes from "@constants/routes";
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

const Header: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const paths = [routes.main, routes.signIn, routes.signUp, routes.password];
  const isPathInPaths = paths.includes(
    location.pathname as (typeof paths)[number],
  );

  return (
    <header className="flex h-[68px] items-center justify-between border-b-1 border-neutral-200 px-7">
      <button
        type="button"
        className="flex items-center gap-2"
        onClick={() => navigate(isPathInPaths ? routes.main : routes.dashboard)}
      >
        <LogoIcon />
        <h1 className="text-xl font-semibold">The Monitor</h1>
      </button>
      {isPathInPaths && (
        <div className="flex items-center gap-2">
          <Button
            type="button"
            style="tonal"
            onClick={() => navigate(routes.signIn)}
            className="px-3 py-1"
          >
            로그인
          </Button>
          <Button
            type="button"
            style="filled"
            onClick={() => navigate(routes.signUp)}
            className="px-3 py-1"
          >
            회원가입
          </Button>
        </div>
      )}
      {!isPathInPaths && (
        <div className="flex items-center rounded bg-surface-primary p-1">
          <ProfileIcon className="mr-2" />
          <div className="font-semibold text-body1">name</div>
          <ArrowDownIcon className="fill-neutral-700" />
        </div>
      )}
    </header>
  );
};

export default Header;
