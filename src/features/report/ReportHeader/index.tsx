import React, { useState } from "react";
import Button from "@components/Button";
import { UndoIcon, ReportIcon, MailIcon } from "@assets/svgs";
import { useLocation, useNavigate } from "react-router-dom";
import routes from "@constants/routes";
import SendEmailModal from "../SendEmailModal";
import useGetExcel from "@api/hooks/excel/useGetExcel";
import usePatchUnScrap from "@api/hooks/scrap/usePatchUnScrap";
import ExitModal from "./ExitModal";

interface ReportHeaderProps {
  reportId?: number;
  onSave?: () => void;
  hasArticles?: boolean;
}

const ReportHeader: React.FC<ReportHeaderProps> = ({
  reportId,
  onSave,
  hasArticles,
}) => {
  const navigate = useNavigate();
  const location = useLocation();

  const [isExitModalOpen, setIsExitModalOpen] = useState(false);
  const [isSendEmailModalOpen, setIsSendEmailModalOpen] = useState(false);

  const { mutate: exportExcel } = useGetExcel();
  const { mutate: patchUnScrap } = usePatchUnScrap();

  const handleExitModalClose = () => {
    setIsExitModalOpen(false);
  };

  const handleDeleteExit = () => {
    patchUnScrap(undefined, {
      onSuccess: () => {
        navigate(routes.monitoring);
      },
    });
  };

  const handleSaveExit = () => {
    navigate(routes.monitoring);
  };

  const handleOpenExitModal = () => {
    if (!reportId && hasArticles) {
      setIsExitModalOpen(true);
    } else {
      navigate(routes.monitoring);
    }
  };

  const handleSendEmailModalClose = () => {
    setIsSendEmailModalOpen(false);
  };

  return (
    <div className="mt-[38px] flex justify-between">
      <Button
        type="button"
        style="outline-m"
        onClick={
          location.pathname === routes.reportNew
            ? handleOpenExitModal
            : () => navigate(routes.report)
        }
        className="flex items-center gap-1 py-2 pl-2 pr-3"
      >
        <UndoIcon />
        <span>나가기</span>
      </Button>
      <div className="flex items-center gap-3">
        {reportId && (
          <>
            <Button
              type="button"
              style="outline-m"
              onClick={() => exportExcel({ reportId })}
              className="flex items-center gap-1 py-2 pl-2 pr-3"
            >
              <ReportIcon />
              <span>엑셀 내보내기</span>
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
          </>
        )}
        {isSendEmailModalOpen && reportId && (
          <SendEmailModal
            reportId={reportId}
            onClose={handleSendEmailModalClose}
          />
        )}
        {location.pathname === routes.reportNew && (
          <Button
            type="button"
            style="filled"
            onClick={onSave}
            className="px-3 py-2"
          >
            저장하기
          </Button>
        )}
      </div>
      {isExitModalOpen && (
        <ExitModal
          onClose={handleExitModalClose}
          handleSaveExit={handleSaveExit}
          handleDeleteExit={handleDeleteExit}
        />
      )}
    </div>
  );
};

export default ReportHeader;
