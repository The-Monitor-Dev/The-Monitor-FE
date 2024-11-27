import useGetKeywords from "@api/hooks/keywords/useGetKeywords";
import useGetReportArticlesOptions from "@api/hooks/reports/useGetReportArticlesOptions";
import usePostReportArticle from "@api/hooks/reports/usePostReportArticle";
import Button from "@components/Button";
import Dropdown from "@components/Dropdown";
import Input from "@components/Input";
import { krToEnCategoryMap } from "@constants/category";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

type AddArticleFromData = {
  headLine: string;
  url: string;
  publishedDate: string;
  media: string;
  reporter: string;
};

interface AddArticleFormProps {
  reportId: number;
}

const AddArticleForm: React.FC<AddArticleFormProps> = ({ reportId }) => {
  const { register, handleSubmit, watch, reset } = useForm<AddArticleFromData>({
    defaultValues: {
      headLine: "제목",
      url: "www.naver.com",
      publishedDate: "2024.11.03",
    },
  });
  const [headLine, url, publishedDate, media, reporter] = watch([
    "headLine",
    "url",
    "publishedDate",
    "media",
    "reporter",
  ]);

  const categoryOptions = ["자사", "경쟁사", "업계"];
  const [selectedCategory, setSelectedCategory] = useState("자사");
  const handleSelectCategory = (category: string) => {
    setSelectedCategory(category);
  };

  const { data: keywordsData } = useGetKeywords();
  const [keywordsOptions, setKeywordsOptions] = useState<string[]>([]);
  const [selectedKeyword, setSelectedKeyword] = useState("");

  useEffect(() => {
    if (keywordsData && selectedCategory) {
      const engCategory = krToEnCategoryMap[selectedCategory];
      const categoryKeywords =
        keywordsData[engCategory]?.map(
          (keyword: { keywordId: number; keywordName: string }) =>
            keyword.keywordName,
        ) || [];
      setKeywordsOptions(categoryKeywords);

      if (categoryKeywords.length > 0) {
        setSelectedKeyword(categoryKeywords[0]);
      } else {
        setSelectedKeyword("");
      }
    }
  }, [keywordsData, selectedCategory]);

  const handleSelectKeyword = (keyword: string) => {
    setSelectedKeyword(keyword);
  };

  const { mutate } = usePostReportArticle();
  const onSubmit: SubmitHandler<AddArticleFromData> = ({
    headLine,
    url,
    publishedDate,
    media,
    reporter,
  }) => {
    mutate(
      {
        reportId,
        data: {
          categoryType: krToEnCategoryMap[selectedCategory],
          keyword: selectedKeyword,
          headLine,
          url,
          publishedDate,
          media,
          reporter,
        },
      },
      {
        onSuccess: () => {
          reset();
        },
      },
    );
  };

  const { data: options } = useGetReportArticlesOptions({ reportId });

  const isButtonDisabled =
    !headLine ||
    !url ||
    !publishedDate ||
    (options?.media ? !media : false) ||
    (options?.reporter ? !reporter : false);

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex h-[667px] flex-col rounded bg-white"
    >
      <span className="border-b-1 border-neutral-200 px-6 py-5 text-xl font-semibold text-title">
        기사 추가하기
      </span>
      <div className="flex flex-col gap-5 px-7 py-6">
        <div className="flex items-center gap-5">
          <div className="flex w-[108px] flex-col gap-2">
            <div className="text-sm font-medium text-title">카테고리</div>
            <Dropdown
              width={108}
              options={categoryOptions}
              selectedOption={selectedCategory}
              onSelectOption={handleSelectCategory}
            />
          </div>
          <div className="flex flex-grow flex-col gap-2">
            <div className="text-sm font-medium text-title">키워드</div>
            <Dropdown
              width={216}
              options={keywordsOptions}
              selectedOption={selectedKeyword}
              onSelectOption={handleSelectKeyword}
            />
          </div>
        </div>
        <div className="flex w-[344px] flex-col gap-3 text-sm font-medium">
          <div className="flex flex-col gap-2">
            <label>헤드라인</label>
            <Input
              placeholder="기사제목을 입력해주세요."
              {...register("headLine", { required: true })}
            />
          </div>
          <div className="flex flex-col gap-2">
            <label>URL</label>
            <Input
              placeholder="기사의 링크를 첨부해주세요."
              {...register("url", { required: true })}
            />
          </div>
          <div className="flex flex-col gap-2">
            <label>발행일자</label>
            <Input
              placeholder="YYYY.MM.DD "
              {...register("publishedDate", { required: true })}
            />
          </div>
          <div className="flex items-center gap-5">
            <div className="flex flex-col gap-2">
              <label>미디어</label>
              <Input
                disabled={!options?.media}
                placeholder={`${!options?.media ? "-" : "예) 가나일보"}`}
                {...register("media")}
              />
            </div>
            <div className="flex flex-col gap-2">
              <label>기자</label>
              <Input
                disabled={!options?.reporter}
                placeholder={`${!options?.reporter ? "-" : "예) 홍길동"}`}
                {...register("reporter")}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-center">
        <Button
          type="submit"
          disabled={isButtonDisabled}
          style="filled"
          className="w-[360px] py-3"
        >
          추가하기
        </Button>
      </div>
    </form>
  );
};

export default AddArticleForm;
