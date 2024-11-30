import AddNews from "./components/AddNews";
import ReportHeader from "@features/report/ReportHeader";
import { useMemo, useState } from "react";
import ReportSection from "./components/ReportSection";
import usePostReport from "@api/hooks/reports/usePostReport";
import { useToast } from "@chakra-ui/react";
import useGetScrap from "@api/hooks/reports/useGetScrap";
import { CategoryTypeEn } from "types/category";

const ReportNewPage: React.FC = () => {
  const toast = useToast();
  const [title, setTitle] = useState("보고서 제목");
  const [color, setColor] = useState("#FFFFFF");
  const [media, setMedia] = useState(true);
  const [reporter, setReporter] = useState(true);
  const [logo, setLogo] = useState<string | null>(null);
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [reportId, setReportId] = useState<number | undefined>(undefined);

  const [selectedArticles, setSelectedArticles] = useState<{
    [key in CategoryTypeEn]: number[];
  }>({
    SELF: [],
    COMPETITOR: [],
    INDUSTRY: [],
  });

  const handleToggleArticleSelection = (
    categoryType: CategoryTypeEn,
    articleId: number,
  ) => {
    setSelectedArticles((prev) => {
      const exists = prev[categoryType].includes(articleId);
      return {
        ...prev,
        [categoryType]: exists
          ? prev[categoryType].filter((id) => id !== articleId)
          : [...prev[categoryType], articleId],
      };
    });
  };

  const { mutate: postReport } = usePostReport();

  const handleChangeTitle = (title: string) => {
    setTitle(title);
  };

  const handleChangeColor = (color: string) => {
    setColor(color);
  };

  const handleChangeLogo = (logoUrl: string | null, file?: File) => {
    setLogo(logoUrl);
    if (file) {
      setLogoFile(file);
    }
  };

  const handleSave = async () => {
    const articles = {
      SELF: [
        {
          reportCategoryName: "default",
          reportCategoryDescription: "",
          articleId: selectedArticles.SELF,
        },
      ],
      COMPETITOR: [
        {
          reportCategoryName: "default",
          reportCategoryDescription: "",
          articleId: selectedArticles.COMPETITOR,
        },
      ],
      INDUSTRY: [
        {
          reportCategoryName: "default",
          reportCategoryDescription: "",
          articleId: selectedArticles.INDUSTRY,
        },
      ],
    };

    const requestData = {
      data: {
        reportTitle: title,
        color,
        media,
        reporter,
        articles,
      },
      logo: logoFile,
    };

    postReport(requestData, {
      onSuccess: (res) => {
        toast({ title: "보고서가 저장되었습니다.", status: "success" });
        setReportId(res.result?.reportId);
      },
    });
  };

  const { data: scrappedArticles } = useGetScrap();

  const hasArticles = useMemo(() => {
    return scrappedArticles
      ? Object.values(scrappedArticles).some(
          (articles) => articles && articles.length > 0,
        )
      : false;
  }, [scrappedArticles]);

  return (
    <div className="flex min-h-full justify-center bg-base-bg p-10">
      <div className="flex w-[1280px] flex-col">
        <ReportHeader
          reportId={reportId}
          onSave={handleSave}
          hasArticles={hasArticles}
        />
        <div className="mt-4 flex flex-grow gap-7">
          <ReportSection
            title={title}
            onChangeTitle={handleChangeTitle}
            color={color}
            onChangeColor={handleChangeColor}
            logo={logo}
            onChangeLogo={handleChangeLogo}
            media={media}
            onChangeMedia={setMedia}
            reporter={reporter}
            onChangeReporter={setReporter}
            selectedArticles={selectedArticles}
            scrappedArticles={scrappedArticles}
          />
          <AddNews
            scrappedArticles={scrappedArticles}
            selectedArticles={selectedArticles}
            onToggleArticleSelection={handleToggleArticleSelection}
          />
        </div>
      </div>
    </div>
  );
};

export default ReportNewPage;
