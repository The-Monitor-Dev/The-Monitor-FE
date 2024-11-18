import React, { useState } from "react";
import Button from "@components/Button";
import { UndoIcon, ReportIcon, MailIcon } from "@assets/svgs";
import { useNavigate } from "react-router-dom";
import routes from "@constants/routes";
import SendEmailModal from "../SendEmailModal";

const ReportHeader: React.FC = () => {
  const navigate = useNavigate();

  const [isSendEmailModalOpen, setIsSendEmailModalOpen] = useState(false);
  const handleSendEmailModalClose = () => {
    setIsSendEmailModalOpen(false);
  };

  return (
    <div className="mt-[38px] flex justify-between">
      <Button
        type="button"
        style="outline-m"
        onClick={() => navigate(routes.monitoring)}
        className="flex items-center gap-1 py-2 pl-2 pr-3"
      >
        <UndoIcon />
        <span>나가기</span>
      </Button>
      <div className="flex items-center gap-3">
        <Button
          type="button"
          style="outline-m"
          className="flex items-center gap-1 py-2 pl-2 pr-3"
        >
          <ReportIcon />
          <span>액셀 내보내기</span>
        </Button>
        <Button
          type="button"
          style="outline-m"
          onClick={() => setIsSendEmailModalOpen(true)}
          className="flex items-center gap-1 py-2 pl-2 pr-3"
        >
          <MailIcon />
          <span>메일 전송하기</span>
        </Button>
        {isSendEmailModalOpen && (
          <SendEmailModal onClose={handleSendEmailModalClose} />
        )}
        <Button type="button" style="filled" className="px-3 py-2">
          저장하기
        </Button>
      </div>
    </div>
  );
};

export default ReportHeader;
