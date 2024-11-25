import KeywordList from "../KeywordList";

interface SearchKeywordsTabProps {
  selfKeywords: string[];
  competitorKeywords: string[];
  industryKeywords: string[];
  handleKeywordChange: (
    category: "SELF" | "COMPETITOR" | "INDUSTRY",
    keyword: string,
    action: "add" | "delete",
  ) => void;
}

const SearchKeywordsTab = ({
  selfKeywords,
  competitorKeywords,
  industryKeywords,
  handleKeywordChange,
}: SearchKeywordsTabProps) => (
  <>
    <KeywordList
      title="자사"
      type="keyword"
      keywords={selfKeywords}
      onAddKeyword={(keyword) => handleKeywordChange("SELF", keyword, "add")}
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
);

export default SearchKeywordsTab;
