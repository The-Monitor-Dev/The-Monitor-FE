import { CheckboxFillIcon, CloseIcon } from "@assets/svgs";
import Button from "@components/Button";
import routes from "@constants/routes";
import React from "react";
import { useNavigate } from "react-router-dom";

interface PasswordSentModalProps {
  onClose: () => void;
}

const PasswordSentModal: React.FC<PasswordSentModalProps> = ({ onClose }) => {
  const navigate = useNavigate();
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-65 text-center">
      <div className="relative flex h-[318px] w-[460px] flex-col items-center rounded bg-white">
        <CloseIcon
          type="button"
          onClick={onClose}
          className="absolute right-7 top-7 cursor-pointer fill-neutral-700"
        />
        <CheckboxFillIcon className="mt-10 h-[52px] w-[52px]" />
        <span className="mt-5 text-2xl font-semibold text-title">
          임시 비밀번호가 전송되었습니다.
        </span>
        <p className="mt-2 text-md font-regular text-body3">
          확인 버튼을 누르시면
          <br />
          로그인 페이지로 바로 이동됩니다.
        </p>
        <Button
          style="filled"
          onClick={() => navigate(routes.signIn)}
          className="mt-[29px] h-11 w-[111px]"
        >
          확인
        </Button>
      </div>
    </div>
  );
};

export default PasswordSentModal;
