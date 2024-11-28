import { useState, useEffect, useMemo } from "react";
import MailTab from "./MailTab";
import useGetEmails from "@api/hooks/emails/useGetEmails";
import usePutEmails from "@api/hooks/emails/usePutEmails";
import TabNavigation from "@features/setting/TabNavigation";
import { useToast } from "@chakra-ui/react";

const SettingEmailPage = () => {
  const [recipientEmails, setRecipientEmails] = useState<string[]>([]);
  const [ccEmails, setCcEmails] = useState<string[]>([]);
  const [signatureImageUrl, setSignatureImageUrl] = useState<string | null>(
    null,
  );
  const toast = useToast();

  const { data: emailsData } = useGetEmails();

  const { mutate: mutateEmails } = usePutEmails();

  const [uploadedImage, setUploadedImage] = useState<File | null>(null);

  const handleImageChange = (uploadedImage: File | null) => {
    setUploadedImage(uploadedImage);
  };

  const updateFunctions = useMemo(
    () => ({
      RECIPIENT: setRecipientEmails,
      CC: setCcEmails,
    }),
    [],
  );

  useEffect(() => {
    if (emailsData) {
      updateFunctions.RECIPIENT(emailsData.recipients);
      updateFunctions.CC(emailsData.ccs);
      setSignatureImageUrl(emailsData.signatureImageUrl || null);
    }
  }, [emailsData]);

  const handleKeywordChange = (
    category: "RECIPIENT" | "CC",
    keyword: string,
    action: "add" | "delete",
  ) => {
    const updateKeywords = (keywords: string[]) =>
      action === "add"
        ? [...new Set([...keywords, keyword])]
        : keywords.filter((k) => k !== keyword);

    updateFunctions[category]((prev) => updateKeywords(prev));
  };

  const handleSave = () => {
    if (recipientEmails.length === 0) {
      toast({
        title: "한 명 이상 받는 사람을 적어주세요.",
        status: "error",
        isClosable: false,
      });
      return;
    }
    const emailUpdate = {
      recipients: recipientEmails,
      ccs: ccEmails,
    };

    mutateEmails({
      data: emailUpdate,
      img: uploadedImage,
    });
  };

  return (
    <div className="h-full bg-white">
      <TabNavigation onSave={handleSave} />
      <div className="ml-8 flex h-[662px]">
        <MailTab
          recipientEmails={recipientEmails}
          ccEmails={ccEmails}
          signatureImageUrl={signatureImageUrl}
          handleKeywordChange={handleKeywordChange}
          handleImageChange={handleImageChange}
        />
      </div>
    </div>
  );
};

export default SettingEmailPage;
