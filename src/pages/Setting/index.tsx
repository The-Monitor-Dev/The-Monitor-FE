import Button from "@components/Button";
import { useState, useEffect } from "react";
import useGetKeywords from "@api/hooks/keywords/useGetKeywords";
import usePutkeywords from "@api/hooks/keywords/usePutKeyword";
import SearchKeywordsTab from "./SearchKeywordsTab";
import MailTab from "./MailTab";
import useGetEmails from "@api/hooks/emails/useGetEmails";
import usePutEmails from "@api/hooks/emails/usePutEmails";

const SettingPage = () => {
  const [selfKeywords, setSelfKeywords] = useState<string[]>([]);
  const [competitorKeywords, setCompetitorKeywords] = useState<string[]>([]);
  const [industryKeywords, setIndustryKeywords] = useState<string[]>([]);
  const [recipientEmails, setRecipientEmails] = useState<string[]>([]);
  const [ccEmails, setCcEmails] = useState<string[]>([]);
  const [activeTab, setActiveTab] = useState("검색 키워드");
  const [signatureImageUrl, setSignatureImageUrl] = useState<string | null>(
    null,
  );

  const clientId = 5;

  const { data: keywordsData } = useGetKeywords(clientId);
  const { data: emailsData } = useGetEmails(clientId);

  const { mutate: mutateKeywords } = usePutkeywords();
  const { mutate: mutateEmails } = usePutEmails();

  const [uploadedImage, setUploadedImage] = useState<File | null>(null);

  const handleImageChange = (uploadedImage: File | null) => {
    setUploadedImage(uploadedImage);
  };

  const updateFunctions: Record<
    "SELF" | "COMPETITOR" | "INDUSTRY" | "RECIPIENT" | "CC",
    React.Dispatch<React.SetStateAction<string[]>>
  > = {
    SELF: setSelfKeywords,
    COMPETITOR: setCompetitorKeywords,
    INDUSTRY: setIndustryKeywords,
    RECIPIENT: setRecipientEmails,
    CC: setCcEmails,
  };

  useEffect(() => {
    if (keywordsData) {
      updateFunctions.SELF(
        keywordsData.SELF.map(
          (item: { keywordName: string }) => item.keywordName,
        ),
      );
      updateFunctions.COMPETITOR(
        keywordsData.COMPETITOR.map(
          (item: { keywordName: string }) => item.keywordName,
        ),
      );
      updateFunctions.INDUSTRY(
        keywordsData.INDUSTRY.map(
          (item: { keywordName: string }) => item.keywordName,
        ),
      );
    }
  }, [keywordsData]);

  useEffect(() => {
    if (emailsData) {
      updateFunctions.RECIPIENT(emailsData.recipients);
      updateFunctions.CC(emailsData.ccs);
      setSignatureImageUrl(emailsData.signatureImageUrl || null);
    }
  }, [emailsData]);

  const handleKeywordChange = (
    category: "SELF" | "COMPETITOR" | "INDUSTRY" | "RECIPIENT" | "CC",
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
    if (activeTab === "검색 키워드") {
      const data = {
        keywordsByCategory: {
          SELF: selfKeywords,
          COMPETITOR: competitorKeywords,
          INDUSTRY: industryKeywords,
        },
      };
      mutateKeywords({ clientId: clientId, data: data });
    }

    if (activeTab === "메일") {
      const formData = new FormData();

      const emailUpdate = {
        recipients: recipientEmails,
        ccs: ccEmails,
      };
      formData.append("emailUpdate", JSON.stringify(emailUpdate));
      if (uploadedImage) {
        formData.append("signatureImage", uploadedImage);
      }

      mutateEmails({
        clientId: clientId,
        data: formData,
      });
    }
  };

  return (
    <div className="h-full bg-white">
      <div className="flex w-[1208px] items-center justify-between px-8 py-5">
        <div className="flex">
          <button
            type="button"
            onClick={() => setActiveTab("검색 키워드")}
            className={`border-r-1 border-neutral-200 px-4 text-xl font-semibold ${
              activeTab === "검색 키워드" ? "text-body1" : "text-disable"
            }`}
          >
            검색 키워드
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("메일")}
            className={`px-4 text-xl font-semibold ${
              activeTab === "메일" ? "text-body1" : "text-disable"
            }`}
          >
            메일
          </button>
        </div>
        <Button style="filled" className="w-[74px] py-2" onClick={handleSave}>
          저장
        </Button>
      </div>
      <div className="ml-8 flex h-[662px]">
        {activeTab === "검색 키워드" ? (
          <SearchKeywordsTab
            selfKeywords={selfKeywords}
            competitorKeywords={competitorKeywords}
            industryKeywords={industryKeywords}
            handleKeywordChange={handleKeywordChange}
          />
        ) : (
          <MailTab
            recipientEmails={recipientEmails}
            ccEmails={ccEmails}
            signatureImageUrl={signatureImageUrl}
            handleKeywordChange={handleKeywordChange}
            handleImageChange={handleImageChange}
          />
        )}
      </div>
    </div>
  );
};

export default SettingPage;
