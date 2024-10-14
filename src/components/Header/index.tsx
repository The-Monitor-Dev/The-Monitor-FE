import { LogoIcon } from "@assets/svg";
import React from "react";

const Header: React.FC = () => {
  return (
    <header className="flex h-[68px] items-center border-b-1 border-neutral-200 px-7">
      <div className="flex items-center gap-2">
        <LogoIcon />
        <h1 className="text-xl font-semibold">The Monitor</h1>
      </div>
    </header>
  );
};

export default Header;
