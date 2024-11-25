import Button from "@components/Button";
import { useState, useEffect } from "react";
import KeywordList from "./KeywordList";
import useGetKeywords from "@api/hooks/keywords/useGetKeywords";
import useGetEmails from "@api/hooks/keywords/useGetEmails";

const SettingPage = () => {
  const [selfKeywords, setSelfKeywords] = useState<string[]>([]);
  const [competitorKeywords, setCompetitorKeywords] = useState<string[]>([]);
  const [industryKeywords, setIndustryKeywords] = useState<string[]>([]);
  const [recipientEmails, setRecipientEmails] = useState<string[]>([]);
  const [ccEmails, setCcEmails] = useState<string[]>([]);
  const [activeTab, setActiveTab] = useState("검색 키워드");

  const { data: keywordsData } = useGetKeywords(1);
  const { data: emailsData } = useGetEmails(1);

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

  return (
    <div className="h-full bg-white">
      <div className="flex items-center justify-between px-8 py-5">
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
        <Button style="filled" className="w-[74px] py-2">
          저장
        </Button>
      </div>
      <div className="ml-8 flex h-[662px]">
        {activeTab === "검색 키워드" ? (
          <>
            <KeywordList
              title="자사"
              type="keyword"
              keywords={selfKeywords}
              onAddKeyword={(keyword) =>
                handleKeywordChange("SELF", keyword, "add")
              }
              onDeleteKeyword={(keyword) =>
                handleKeywordChange("SELF", keyword, "delete")
              }
            />
            <KeywordList
              title="경쟁사"
              type="keyword"
              keywords={competitorKeywords}
              onAddKeyword={(keyword) =>
                handleKeywordChange("COMPETITOR", keyword, "add")
              }
              onDeleteKeyword={(keyword) =>
                handleKeywordChange("COMPETITOR", keyword, "delete")
              }
            />
            <KeywordList
              title="업계"
              type="keyword"
              keywords={industryKeywords}
              onAddKeyword={(keyword) =>
                handleKeywordChange("INDUSTRY", keyword, "add")
              }
              onDeleteKeyword={(keyword) =>
                handleKeywordChange("INDUSTRY", keyword, "delete")
              }
              showBorder={false}
            />
          </>
        ) : (
          <>
            <KeywordList
              title="수신인"
              type="email"
              keywords={recipientEmails}
              onAddKeyword={(keyword) =>
                handleKeywordChange("RECIPIENT", keyword, "add")
              }
              onDeleteKeyword={(keyword) =>
                handleKeywordChange("RECIPIENT", keyword, "delete")
              }
            />
            <KeywordList
              title="참조인"
              type="email"
              keywords={ccEmails}
              onAddKeyword={(keyword) =>
                handleKeywordChange("CC", keyword, "add")
              }
              onDeleteKeyword={(keyword) =>
                handleKeywordChange("CC", keyword, "delete")
              }
            />
            <KeywordList title="메일서명" type="sign" showBorder={false} />
          </>
        )}
      </div>
    </div>
  );
};

export default SettingPage;
