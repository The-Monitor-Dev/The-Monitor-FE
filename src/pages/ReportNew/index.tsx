import AddNews from "./components/AddNews";
import ReportHeader from "@features/report/ReportHeader";
import { useState } from "react";
import ReportSection from "./components/ReportSection";
import usePostReport from "@api/hooks/reports/usePostReport";
import { useToast } from "@chakra-ui/react";

const ReportNewPage: React.FC = () => {
  const toast = useToast();
  const [title, setTitle] = useState("보고서 제목");
  const [color, setColor] = useState("#FFFFFF");
  const [media, setMedia] = useState(true);
  const [reporter, setReporter] = useState(true);
  const [logo, setLogo] = useState<string | null>(null);
  const [logoFile, setLogoFile] = useState<File | null>(null);
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

  const handleSave = () => {
    const requestData = {
      data: {
        reportTitle: title,
        color,
        media,
        reporter,
        articles: {
          SELF: [],
          COMPETITOR: [],
          INDUSTRY: [],
        },
      },
      logo: logoFile,
    };

    postReport(requestData, {
      onSuccess: () => {
        toast({ title: "보고서가 저장되었습니다.", status: "success" });
      },
    });
  };

  return (
    <div className="flex h-full justify-center">
      <div className="flex w-[1280px] flex-col">
        <ReportHeader onSave={handleSave} />
        <div className="mt-4 flex flex-grow gap-7">
          <ReportSection
            title={title}
            onChangeTitle={handleChangeTitle}
            color={color}
            onChangeColor={handleChangeColor}
            logo={logo}
            onChangeLogo={(logoUrl: string | null, file?: File) =>
              handleChangeLogo(logoUrl, file)
            }
            media={media}
            onChangeMedia={setMedia}
            reporter={reporter}
            onChangeReporter={setReporter}
          />
          <AddNews />
        </div>
      </div>
    </div>
  );
};

export default ReportNewPage;
