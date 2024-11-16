import { NotFoundIcon } from "@assets/svgs";
import Button from "@components/Button";
import routes from "@constants/routes";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="flex h-full flex-col items-center justify-center bg-white">
      <div className="flex flex-col items-center pb-[70px]">
        <NotFoundIcon />
        <span className="text-[40px] font-semibold text-primary-500">
          페이지를 찾을 수 없습니다.
        </span>
        <p className="text-center text-xl font-medium text-body3">
          존재하지 않는 주소를 입력하셨거나,
          <br />
          주소가 변경, 삭제되어 찾을 수 없습니다.{" "}
        </p>
        <div className="mt-[58px] flex items-center gap-[21px]">
          <Button
            style="outline-l"
            onClick={() => navigate(-1)}
            className="w-[120px] py-3"
          >
            이전으로
          </Button>
          <Button
            style="filled"
            onClick={() => navigate(routes.main)}
            className="w-[120px] py-3"
          >
            메인으로
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
