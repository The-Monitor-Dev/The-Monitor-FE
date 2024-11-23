import Button from "@components/Button";
import KeywordInput from "@components/KeywordInput";
import { useState } from "react";

const SettingPage = () => {
  const [selfKeywords, setSelfKeywords] = useState<string[]>([]);
  const [competitorKeywords, setCompetitorKeywords] = useState<string[]>([]);
  const [industryKeywords, setIndustryKeywords] = useState<string[]>([]);
  const [activeTab, setActiveTab] = useState("검색 키워드");

  const handleKeywordChange = (
    category: "SELF" | "COMPETITOR" | "INDUSTRY",
    keyword: string,
    action: "add" | "delete",
  ) => {
    const updateKeywords = (keywords: string[]) =>
      action === "add"
        ? [...new Set([...keywords, keyword])]
        : keywords.filter((k) => k !== keyword);

    if (category === "SELF") {
      setSelfKeywords((prev) => updateKeywords(prev));
    } else if (category === "COMPETITOR") {
      setCompetitorKeywords((prev) => updateKeywords(prev));
    } else if (category === "INDUSTRY") {
      setIndustryKeywords((prev) => updateKeywords(prev));
    }
  };

  return (
    <div className="h-full w-full bg-white">
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
      <div className="ml-8 flex h-[662px] w-full">
        <div className="w-[340px] border-r-1 border-neutral-200">
          <div className="border-b-1 border-neutral-200 px-5 py-4 text-xl font-medium">
            자사
          </div>
          <div className="my-5 max-h-[600px] overflow-y-auto px-6">
            <KeywordInput
              placeholder="키워드 입력 후 엔터(Enter)를 눌러주세요."
              keywords={selfKeywords}
              onAddKeyword={(keyword) =>
                handleKeywordChange("SELF", keyword, "add")
              }
              onDeleteKeyword={(keyword) =>
                handleKeywordChange("SELF", keyword, "delete")
              }
              duplicateErrorMessage="*이미 추가된 키워드입니다."
            />
          </div>
        </div>
        <div className="w-[340px] border-r-1 border-neutral-200">
          <div className="border-b-1 border-neutral-200 px-5 py-4 text-xl font-medium">
            경쟁사
          </div>
          <div className="my-5 max-h-[600px] overflow-y-auto px-6">
            <KeywordInput
              placeholder="키워드 입력 후 엔터(Enter)를 눌러주세요."
              keywords={competitorKeywords}
              onAddKeyword={(keyword) =>
                handleKeywordChange("COMPETITOR", keyword, "add")
              }
              onDeleteKeyword={(keyword) =>
                handleKeywordChange("COMPETITOR", keyword, "delete")
              }
              duplicateErrorMessage="*이미 추가된 키워드입니다."
            />
          </div>
        </div>
        <div className="h-full w-[340px]">
          <div className="border-b-1 border-neutral-200 px-5 py-4 text-xl font-medium">
            업계
          </div>
          <div className="my-5 max-h-[600px] overflow-y-auto px-6">
            <KeywordInput
              placeholder="키워드 입력 후 엔터(Enter)를 눌러주세요."
              keywords={industryKeywords}
              onAddKeyword={(keyword) =>
                handleKeywordChange("INDUSTRY", keyword, "add")
              }
              onDeleteKeyword={(keyword) =>
                handleKeywordChange("INDUSTRY", keyword, "delete")
              }
              duplicateErrorMessage="*이미 추가된 키워드입니다."
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingPage;
