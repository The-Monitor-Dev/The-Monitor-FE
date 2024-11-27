import {
  ClientManagementImage,
  Function1Image,
  Function2Image,
  Function3Image,
  InsightsImage,
  OutputImage,
  PerformanceImage,
  TestimonialsImage,
} from "@assets/images";
import {
  ArrowNextFillIcon,
  BarChartIcon,
  ClockIcon,
  LightBulbIcon,
  UnlimitedIcon,
} from "@assets/svgs";
import Button from "@components/Button";
import Badge from "./Badge";
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import routes from "@constants/routes";
import Footer from "@components/Footer";

const LandingPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: false,
    });

    const handleScroll = () => {
      AOS.refresh();
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleClick = () => {
    navigate(routes.signUp);
  };

  return (
    <div className="flex w-full flex-col items-center bg-white">
      <div
        className="flex h-[600px] w-full justify-center overflow-hidden bg-cover bg-center"
        style={{ backgroundImage: `url(${TestimonialsImage})` }}
      >
        <div className="mt-[114px] w-[1280px] pl-[120px]">
          <h1 className="mb-[9px] text-heading1 font-bold text-white">
            더 스마트하게. <br /> 더모니터와 함께.
          </h1>
          <p className="mb-[60px] text-heading4 font-regular text-white">
            뉴스 모니터링의 모든 것
          </p>
          <Button
            onClick={handleClick}
            className="flex items-center py-4 pl-8 pr-5 text-white"
            style="filled"
          >
            <p className="text-heading4 font-bold">무료로 사용해보기</p>
            <ArrowNextFillIcon className="ml-[10px] h-[40px] w-[40px] fill-white" />
          </Button>
        </div>
      </div>
      <div className="w-[1280px]">
        <div
          className="flex items-center justify-center gap-[108px]"
          data-aos="fade-up"
        >
          <div>
            <Badge icon={<UnlimitedIcon />} label="고객사 개별 관리" />
            <h2 className="mb-4 mt-5 text-heading3 font-semibold text-title">
              번거로운 고객사 모니터링 관리, <br />
              하나의 워크스페이스에서.
            </h2>
            <p className="text-xl font-medium text-body2">
              모든 클라이언트의 모니터링 업무를 <br />한 곳에서 관리해보세요.
            </p>
          </div>
          <img
            src={ClientManagementImage}
            className="mb-[33px] mt-[97px] h-[470px] w-[443px]"
          />
        </div>
        <div
          className="flex justify-center gap-[185px] px-[120px] pb-[95px] pt-24"
          data-aos="fade-up"
        >
          <img src={OutputImage} className="h-[409px] w-[566px]" />
          <div>
            <Badge
              icon={<ClockIcon className="h-6 w-6 fill-primary-500" />}
              label="빠른 결과물 산출"
            />
            <h2 className="mb-4 mt-6 text-heading3 font-semibold text-title">
              검색부터 보고서까지
              <br />단 20분만에!
            </h2>
            <p className="text-xl font-medium text-body2">
              효율적인 모니터링 업무 프로세스를 <br /> 직접 경험해보세요.
            </p>
          </div>
        </div>
        <div
          className="flex items-center justify-center gap-[104px]"
          data-aos="fade-up"
        >
          <div>
            <Badge icon={<BarChartIcon />} label="성과 측정" />
            <h2 className="mb-4 mt-5 text-heading3 font-semibold text-title">
              데일리 보고서를 기반으로
              <br />
              자동으로 성과를 측정해요
            </h2>
            <p className="text-xl font-medium text-body2">
              매일 산출되는 데일리 보고서, 이제는 <br />
              성과데이터까지 편리하게 산출해보세요.
            </p>
          </div>
          <img
            src={PerformanceImage}
            className="mb-[72px] mt-[135px] h-[393px] w-[576px]"
          />
        </div>
        <div
          className="flex items-center justify-center gap-[313px]"
          data-aos="fade-up"
        >
          <img
            src={InsightsImage}
            className="mb-[101px] mt-[93px] h-[406px] w-[400px]"
          />
          <div>
            <Badge icon={<LightBulbIcon />} label="인사이트" />
            <h2 className="mb-4 mt-6 text-title">
              이슈, 트렌드 분석까지
              <br />한 번에 파악해요
            </h2>
            <p className="text-xl font-medium text-body2">
              키워드 기반 기사들의 PR 토픽과 <br /> 관련 핵심 이슈를 관계도로 볼
              수 있어요.
            </p>
          </div>
        </div>
        <div
          className="flex flex-col items-center justify-center bg-gradient pb-[171px]"
          data-aos="fade-up"
        >
          <div className="mb-[74px] flex flex-col items-center">
            <p className="mt-[111px] text-xl font-medium text-body2">
              더 모니터의 기능을 만나보세요
            </p>
            <h2 className="text-heading3 font-semibold text-title">
              더 스마트하게, 더 모니터답게
            </h2>
          </div>
          <div className="flex gap-8">
            <div className="flex flex-col items-center justify-center gap-5">
              <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary-500 text-lg font-bold text-white">
                1
              </div>
              <img
                src={Function1Image}
                className="h-[318px] w-[300px] shadow-landing"
              />
            </div>
            <div className="flex flex-col items-center justify-center gap-5 text-lg font-bold">
              <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary-500 text-white">
                2
              </div>
              <img
                src={Function2Image}
                className="h-[318px] w-[300px] shadow-landing"
              />
            </div>
            <div className="flex flex-col items-center justify-center gap-5">
              <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary-500 text-lg font-bold text-white">
                3
              </div>
              <img
                src={Function3Image}
                className="h-[318px] w-[300px] shadow-landing"
              />
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default LandingPage;
