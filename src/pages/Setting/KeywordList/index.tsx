import useValidateEmail from "@hooks/useValidateEmail";
import KeywordInput from "@components/KeywordInput";

interface KeywordListProps {
  title: string;
  keywords: string[];
  onAddKeyword: (keyword: string) => void;
  onDeleteKeyword: (keyword: string) => void;
  type: string;
}

const KeywordList = ({
  title,
  keywords,
  onAddKeyword,
  onDeleteKeyword,
  type,
}: KeywordListProps) => {
  const validateEmail = useValidateEmail(type);

  return (
    <div className="w-[340px] border-r-1 border-neutral-200">
      <div className="border-b-1 border-neutral-200 px-5 py-4 text-xl font-medium">
        {title}
      </div>
      <div className="my-5 max-h-[600px] overflow-y-auto px-6">
        <KeywordInput
          placeholder={
            type === "email"
              ? "메일 주소 입력 후 엔터(Enter)를 눌러주세요."
              : "키워드 입력 후 엔터(Enter)를 눌러주세요."
          }
          keywords={keywords}
          onAddKeyword={onAddKeyword}
          onDeleteKeyword={onDeleteKeyword}
          validateKeyword={validateEmail}
          duplicateErrorMessage={
            type === "email"
              ? "*이미 추가된 이메일입니다."
              : "*이미 추가된 키워드입니다."
          }
          errorMessage={type === "email" ? "*잘못된 이메일 형식입니다." : ""}
        />
      </div>
    </div>
  );
};

export default KeywordList;
