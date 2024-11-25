import KeywordList from "../KeywordList";

interface MailTabProps {
  recipientEmails: string[];
  ccEmails: string[];
  signatureImageUrl: string | null;
  handleKeywordChange: (
    category: "RECIPIENT" | "CC",
    keyword: string,
    action: "add" | "delete",
  ) => void;
  handleImageChange: (uploadedImage: File | null) => void;
}

const MailTab = ({
  recipientEmails,
  ccEmails,
  signatureImageUrl,
  handleKeywordChange,
  handleImageChange,
}: MailTabProps) => (
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
      onAddKeyword={(keyword) => handleKeywordChange("CC", keyword, "add")}
      onDeleteKeyword={(keyword) =>
        handleKeywordChange("CC", keyword, "delete")
      }
    />
    <KeywordList
      title="메일서명"
      type="sign"
      signatureImageUrl={signatureImageUrl}
      showBorder={false}
      onImageChange={handleImageChange}
    />
  </>
);

export default MailTab;
