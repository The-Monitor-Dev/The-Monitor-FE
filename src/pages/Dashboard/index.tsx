import { DefaultImage } from "@assets/images";
import {
  AddCircleFillIcon,
  MoreHorizIcon,
  PersonIcon,
  SearchIcon,
} from "@assets/svg";

const DashboardPage: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center">
      <div className="mt-[63px] flex w-[1048px] justify-between">
        <div className="flex h-11 w-[480px] items-center rounded border bg-white focus-within:border-primary-500">
          <input
            className="w-[436px] px-4 text-md font-regular placeholder:text-md placeholder:font-regular focus:outline-none"
            placeholder="고객사명을 입력하세요."
          />
          <SearchIcon className="mx-[10px]" />
        </div>
        <button className="flex h-10 items-center gap-1 rounded border-[0.5px] border-primary-200 bg-surface-BG p-2 pl-3 text-md font-semibold text-primary-700">
          고객사 추가하기
          <AddCircleFillIcon className="fill-primary-500" />
        </button>
      </div>
      <button
        type="button"
        className="group mt-4 flex h-[108px] w-[1048px] items-center rounded bg-white shadow-main"
      >
        <div className="flex w-full group-hover:bg-neutral-100">
          <img src={DefaultImage} className="m-4 w-24 rounded" />
          <div className="flex w-full flex-col gap-1 py-5 pl-4 pr-5">
            <h2 className="text-left text-2xl font-semibold text-title">
              한솥
            </h2>
            <div className="flex items-center">
              <PersonIcon className="mr-1" />
              <p className="mr-2 text-md font-regular text-body3">담당자</p>
              <p className="text-md font-semibold text-body1">이현수</p>
            </div>
          </div>
        </div>
        <div
          className="flex h-full w-[92px] cursor-default items-center border-l-[0.5px] border-neutral-200 px-7 group-hover:bg-neutral-100"
          onMouseEnter={(e) =>
            e.currentTarget.parentElement?.classList.remove("group")
          }
          onMouseLeave={(e) =>
            e.currentTarget.parentElement?.classList.add("group")
          }
        >
          <button
            type="button"
            className="rounded-[2.25px] p-[6px] hover:bg-neutral-100"
          >
            <MoreHorizIcon />
          </button>
        </div>
      </button>
    </div>
  );
};

export default DashboardPage;
