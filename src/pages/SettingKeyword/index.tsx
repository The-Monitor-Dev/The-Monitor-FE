import { useState, useEffect, useMemo } from "react";
import useGetKeywords from "@api/hooks/keywords/useGetKeywords";
import usePutKeywords from "@api/hooks/keywords/usePutKeyword";
import SearchKeywordsTab from "./SearchKeywordsTab";

import TabNavigation from "@features/setting/TabNavigation";

const SettingKeywordPage = () => {
  const [selfKeywords, setSelfKeywords] = useState<string[]>([]);
  const [competitorKeywords, setCompetitorKeywords] = useState<string[]>([]);
  const [industryKeywords, setIndustryKeywords] = useState<string[]>([]);

  const { data: keywordsData } = useGetKeywords();

  const { mutate: mutateKeywords } = usePutKeywords();

  const updateFunctions = useMemo(
    () => ({
      SELF: setSelfKeywords,
      COMPETITOR: setCompetitorKeywords,
      INDUSTRY: setIndustryKeywords,
    }),
    [],
  );

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

  const handleKeywordChange = (
    category: "SELF" | "COMPETITOR" | "INDUSTRY",
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
    const data = {
      keywordsByCategory: {
        SELF: selfKeywords,
        COMPETITOR: competitorKeywords,
        INDUSTRY: industryKeywords,
      },
    };
    mutateKeywords({ data });
  };

  return (
    <div className="h-full bg-white">
      <TabNavigation onSave={handleSave} />
      <div className="ml-8 flex h-[662px]">
        <SearchKeywordsTab
          selfKeywords={selfKeywords}
          competitorKeywords={competitorKeywords}
          industryKeywords={industryKeywords}
          handleKeywordChange={handleKeywordChange}
        />
      </div>
    </div>
  );
};

export default SettingKeywordPage;
