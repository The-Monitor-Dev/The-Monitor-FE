import usePostSendEmail from "@api/hooks/emails/usePostSendEmail";
import { CloseIcon } from "@assets/svgs";
import Button from "@components/Button";
import Input from "@components/Input";
import { SubmitHandler, useForm } from "react-hook-form";

interface SendEmailModalProps {
  onClose: () => void;
}

type SendEmailFormData = {
  subject: string;
  content: string;
};

const SendEmailModal: React.FC<SendEmailModalProps> = ({ onClose }) => {
  const { register, handleSubmit, watch } = useForm<SendEmailFormData>();
  const [subject, content] = watch(["subject", "content"]);
  const { mutate } = usePostSendEmail();
  const onSubmit: SubmitHandler<SendEmailFormData> = ({ subject, content }) => {
    mutate({
      subject,
      content,
    });
  };

  return (
    <div className="fixed inset-0 z-10 flex items-center justify-center bg-black bg-opacity-65">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="h-[663px] w-[580px] bg-white"
      >
        <div className="mr-5 mt-5 flex justify-end">
          <button
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center"
          >
            <CloseIcon className="h-7 w-7 fill-neutral-700" />
          </button>
        </div>
        <div className="mt-3 flex flex-col px-[50px]">
          <span className="text-4xl font-semibold text-title">
            메일 전송하기
          </span>
          <div className="mt-8 flex flex-col bg-surface-disable px-3 py-4 text-body3">
            <span>
              &nbsp;&bull;&nbsp; 미리 설정된 수신인에게 메일이 발송됩니다.
            </span>
            <span>
              &nbsp;&bull;&nbsp; 파일 미리보기와 엑셀 파일이 포함되어
              전송됩니다.
            </span>
          </div>
          <div className="mt-6 flex flex-col gap-6 px-1">
            <div className="flex flex-col gap-2">
              <label className="flex items-end gap-1">
                <span className="text-md font-semibold text-title">
                  메일 제목
                </span>
                <span className="text-sm font-medium text-body3">(필수)</span>
              </label>
              <Input
                type="text"
                placeholder="메일 제목을 입력해주세요."
                {...register("subject", { required: true })}
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="flex items-end gap-1">
                <span className="text-md font-semibold text-title">
                  메일 본문
                </span>
                <span className="text-sm font-medium text-body3">(선택)</span>
              </label>
              <div className="flex flex-col gap-2 rounded border-1 border-transparent bg-surface-primary px-4 pb-2 pt-3 focus-within:border-primary-500">
                <textarea
                  {...register("content")}
                  maxLength={500}
                  placeholder="본문 내용을 입력해주세요."
                  className="h-[96px] resize-none bg-surface-primary text-md font-regular outline-none placeholder:text-disable"
                />
                <div className="self-end text-xs font-medium text-body3">
                  {content?.length || 0}/500
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-[39px] flex w-full justify-center">
          <Button
            type="submit"
            style="filled"
            disabled={!subject}
            className="w-[360px] py-3 text-md font-semibold"
          >
            전송하기
          </Button>
        </div>
      </form>
    </div>
  );
};

export default SendEmailModal;
