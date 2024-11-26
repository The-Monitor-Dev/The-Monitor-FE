import { ClockIcon, DeleteIcon, EditNoteIcon, PencilIcon } from "@assets/svgs";
import routes from "@constants/routes";
import { useNavigate } from "react-router-dom";
import convertUtcToKst from "@utils/convertUtcToKst";
import { useState } from "react";
import CancelModal from "@components/CancelModal";
import useDeleteReport from "@api/hooks/reports/useDeleteReport";
import { clientId } from "@constants/clientId";

interface ReportBoxProps {
  reportId: number;
  title: string;
  createdAt: string;
  updatedAt: string;
}

const ReportBox: React.FC<ReportBoxProps> = ({
  reportId,
  title,
  createdAt,
  updatedAt,
}) => {
  const navigate = useNavigate();
  const isEdited = createdAt !== updatedAt;

  const { mutate } = useDeleteReport();

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const handelDelete = () => {
    setIsDeleteModalOpen(false);
  };

  const handleDeleteModalClose = () => {
    mutate({ clientId: clientId, reportId });
    setIsDeleteModalOpen(false);
  };
  return (
    <>
      <div className="flex min-h-[108px] w-[700px] items-center border-b-1 border-b-neutral-200 pl-4 pr-7 hover:bg-neutral-50">
        <div className="flex w-[568px] flex-col gap-2">
          <span className="text-lg font-semibold text-title">{title}</span>
          <div className="flex items-center gap-2 text-md font-regular text-body3">
            <div className="flex items-center gap-1">
              <ClockIcon />
              {convertUtcToKst(createdAt)}
            </div>
            {isEdited && (
              <div className="flex items-center">
                <PencilIcon />
                <span className="mr-1">수정</span>
                <div>{convertUtcToKst(updatedAt)}</div>
              </div>
            )}
          </div>
        </div>
        <div className="flex flex-grow items-center gap-1">
          <button
            type="button"
            onClick={() => navigate(`${routes.reportEdit}/${reportId}`)}
            className="flex h-9 w-9 items-center justify-center rounded-[2px] hover:bg-neutral-100"
          >
            <EditNoteIcon />
          </button>
          <button
            type="button"
            onClick={() => setIsDeleteModalOpen(true)}
            className="flex h-9 w-9 items-center justify-center rounded-[2px] hover:bg-neutral-100"
          >
            <DeleteIcon className="fill-neutral-400" />
          </button>
        </div>
      </div>
      {isDeleteModalOpen && (
        <CancelModal
          onClose={handleDeleteModalClose}
          handleCancel={handelDelete}
          headingText="정말 삭제하시겠어요?"
          bodyText={`작성했던 모든 기록은 지워지며
        이후 복구가 불가능해요. `}
          closeButtonText="삭제하기"
          cancelButtonText="취소하기"
        />
      )}
    </>
  );
};

export default ReportBox;
