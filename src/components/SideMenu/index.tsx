import { useState } from "react";
import { DefaultImage } from "@assets/images";
import { AnalyzeIcon, HamburgerIcon, NewsIcon } from "@assets/svgs";
import { useLocation, useNavigate } from "react-router-dom";
import routes from "@constants/routes";
import useGetClientInfo from "@api/hooks/clients/useGetClientInfo";

const SideMenu: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const { data: clientData } = useGetClientInfo(1);

  const [selectedMenu, setSelectedMenu] = useState<string>(
    location.pathname.slice(1),
  );

  const handleSelectMenu = (menu: string) => {
    setSelectedMenu(menu);
    navigate(`/${menu}`);
  };

  return (
    <div className="h-full">
      <div className="inline-block h-full bg-white">
        <div className="flex h-full w-[232px] flex-col justify-between border-r border-neutral-200 p-5">
          <div className="flex flex-col">
            <div className="flex h-[52px] items-center gap-1 border-b border-neutral-200 pb-4 pt-3">
              <img
                src={clientData?.logoUrl || DefaultImage}
                className="h-6 w-6"
              />
              <span className="text-xl font-semibold text-title">
                {clientData?.name}
              </span>
            </div>
            <div className="mt-4 flex items-center gap-1">
              <NewsIcon />
              <span className="text-md font-semibold text-body1">
                뉴스 모니터링
              </span>
            </div>
            <div className="mt-2 flex flex-col gap-1 text-sm font-semibold">
              <button
                className={`px-6 py-2 text-left ${
                  selectedMenu === "monitoring"
                    ? "bg-surface-primary text-neutral-700"
                    : "text-body3"
                } hover:bg-surface-primary`}
                onClick={() => handleSelectMenu("monitoring")}
              >
                데일리 모니터링
              </button>
              <button
                className={`px-6 py-2 text-left ${
                  selectedMenu === "report"
                    ? "bg-surface-primary text-neutral-700"
                    : "text-body3"
                } hover:bg-surface-primary`}
                onClick={() => handleSelectMenu("report")}
              >
                보고서 관리
              </button>
              <button
                className={`px-6 py-2 text-left ${
                  selectedMenu === "setting"
                    ? "bg-surface-primary text-neutral-700"
                    : "text-body3"
                } hover:bg-surface-primary`}
                onClick={() => handleSelectMenu("setting")}
              >
                모니터링 설정
              </button>
            </div>
            <div className="mt-5 flex items-center gap-1">
              <AnalyzeIcon />
              <span className="text-md font-semibold text-body3">뉴스분석</span>
            </div>
          </div>
          <button
            onClick={() => navigate(routes.dashboard)}
            className="flex items-center gap-1"
          >
            <HamburgerIcon />
            <span className="text-md font-medium text-neutral-700">
              고객사 목록으로
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default SideMenu;
