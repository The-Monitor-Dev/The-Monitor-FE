import { CopyrightIcon } from "@assets/images";
import {
  BlogIcon,
  GrayLogoIcon,
  InstagramIcon,
  YoutubeIcon,
} from "@assets/svgs";

const Footer = () => {
  return (
    <footer className="flex w-full justify-center bg-neutral-50">
      <div className="w-[1280px] pb-[60px] pl-[107px] pt-[83px]">
        <GrayLogoIcon />
        <div className="mt-[14px] flex items-center gap-5 py-1">
          <p className="text-lg font-medium text-title">이용약관</p>
          <div className="h-[14px] w-[1px] bg-neutral-400" />
          <p className="text-lg font-semibold text-title">개인정보처리방침</p>
          <div className="h-[14px] w-[1px] bg-neutral-400" />
          <p className="text-lg font-medium text-title">공지사항</p>
          <div className="h-[14px] w-[1px] bg-neutral-400" />
          <p className="text-lg font-medium text-title">문의하기</p>
        </div>
        <div className="mt-[50px] flex">
          <div className="mr-[126px]">
            <p className="mb-[5px] text-lg font-semibold text-title">
              서울특별시 강남구 123로 45번지 6F
            </p>
            <p className="text-medium pb-[2px] font-regular text-body1">
              사업자등록번호 : 123-45-67890
            </p>
            <p className="text-medium pb-[2px] font-regular text-body1">
              대표이사 : 이현수
            </p>
          </div>
          <div className="mr-[154px]">
            <p className="mb-[5px] text-lg font-semibold text-title">
              대표 전화: 010-8516-2372
            </p>
            <p className="text-medium pb-[2px] font-regular text-body1">
              평일: 09:00 - 18:00
            </p>
            <p className="text-medium pb-[2px] font-regular text-body1">
              themonitor2024@gmail.com
            </p>
          </div>
          <div className="flex flex-col gap-2">
            <div className="flex gap-4">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white">
                <InstagramIcon />
              </div>
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white">
                <BlogIcon />
              </div>
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white">
                <YoutubeIcon />
              </div>
            </div>
            <div className="flex items-center gap-1">
              <img src={CopyrightIcon} className="h-4 w-4" />
              <p className="text-sm font-medium text-body3">
                The Monitor. All rights reserved
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
