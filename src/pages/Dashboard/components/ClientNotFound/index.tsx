import { DashboardImage } from "@assets/images";
import { AddCircleFillIcon } from "@assets/svgs";

interface ClientNotFoundProps {
  handleAddModalOpen: () => void;
}

const ClientNotFound: React.FC<ClientNotFoundProps> = ({
  handleAddModalOpen,
}) => {
  return (
    <div className="flex h-full items-center justify-center gap-8">
      <div>
        <h1 className="text-headingLarge font-bold">
          더 스마트하게. <br />더 모니터와 함께.
        </h1>
        <h2 className="mt-5 text-4xl font-semibold text-body1">
          고객사를 추가해 더욱 쉬운 모니터링 업무를 경험해보세요.
        </h2>
        <h2 className="text-xl font-medium text-body3">
          하나의 대시보드 화면에서 여러 고객사를 통합 관리할 수 있습니다.
        </h2>
        <button
          type="button"
          className="mt-11 flex items-center gap-1 rounded-sm border-[0.5px] border-primary-200 bg-primary-500 py-3 pl-3 pr-2 text-xl font-semibold text-white"
          onClick={handleAddModalOpen}
        >
          고객사 추가하기
          <AddCircleFillIcon className="h-5 w-5 fill-white" />
        </button>
      </div>
      <img src={DashboardImage} className="h-[441.911px] w-[520px]" />
    </div>
  );
};

export default ClientNotFound;
