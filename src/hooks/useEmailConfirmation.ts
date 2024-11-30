import { useState } from "react";
import { useToast } from "@chakra-ui/react";
import usePostSendEmailConfirm from "@api/hooks/accounts/usePostSendEmailConfirm";

const useEmailConfirmation = (email: string) => {
  const [isEmailSent, setIsEmailSent] = useState(false);
  const [isEmailConfirmButtonDisabled, setIsEmailConfirmButtonDisabled] =
    useState(false);
  const [remainedSeconds, setRemainedSeconds] = useState(0);
  const toast = useToast();
  const { mutate: sendEmailConfirm, isPending } = usePostSendEmailConfirm();

  const handleSendEmailConfirm = () => {
    if (isEmailConfirmButtonDisabled) {
      toast({
        title: `${remainedSeconds}초 후에 다시 시도해 주세요.`,
        status: "warning",
      });
      return;
    }
    setIsEmailSent(false);

    sendEmailConfirm(
      { email },
      {
        onSuccess: () => {
          setIsEmailSent(true);
          setIsEmailConfirmButtonDisabled(true);
          setRemainedSeconds(10);
          const countdown = setInterval(() => {
            setRemainedSeconds((prev) => {
              if (prev === 1) {
                clearInterval(countdown);
                setIsEmailConfirmButtonDisabled(false);
              }
              return prev - 1;
            });
          }, 1000);
        },
      },
    );
  };

  return {
    isPending,
    isEmailSent,
    isEmailConfirmButtonDisabled,
    handleSendEmailConfirm,
  };
};

export default useEmailConfirmation;
