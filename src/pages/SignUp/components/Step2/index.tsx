import Input from "@components/Input";
import { Checkbox } from "@chakra-ui/react";
import Button from "@components/Button";
import { useFormContext } from "react-hook-form";

interface Step2Props {
  handleBack: () => void;
}

const Step2: React.FC<Step2Props> = ({ handleBack }) => {
  const {
    register,
    formState: { errors, isValid },
  } = useFormContext();

  return (
    <div className="w-full px-[70px]">
      <div className="mt-[62px] flex items-center justify-between">
        <h2 className="text-4xl font-semibold text-title">정보 작성하기</h2>
        <div className="flex items-center gap-2">
          <button type="button" onClick={handleBack}>
            <div className="h-3 w-3 rounded-full bg-neutral-300" />
          </button>
          <div className="h-3 w-3 rounded-full bg-primary-500" />
        </div>
      </div>
      <div className="mt-9 flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <label className="text-sm font-semibold text-title">기업명</label>
          <Input
            type="text"
            maxLength={24}
            placeholder="기업명을 입력해주세요."
            isInvalid={!!errors.companyName}
            {...register("companyName", { required: true })}
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-sm font-semibold text-title">담당자명</label>
          <Input
            type="text"
            maxLength={24}
            placeholder="담당자 성함을 입력해주세요."
            isInvalid={!!errors.managerName}
            {...register("managerName", {
              required: true,
            })}
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-sm font-semibold text-title">
            담당자 전화번호 (선택)
          </label>
          <Input
            type="text"
            maxLength={11}
            placeholder="'-'를 제외하고 숫자만 입력해주세요."
            {...register("managerPhone")}
          />
        </div>
      </div>
      <div className="mt-8 flex items-center gap-2">
        <Checkbox
          {...register("agreement", { required: true })}
          borderColor="#A3A3A3"
          sx={{
            "& .chakra-checkbox__control": {
              width: "16px",
              height: "16px",
              borderRadius: "0px",
              bg: "white",
              borderWidth: "2px",
            },
            "& .chakra-checkbox__control[data-checked]": {
              bg: "#0050F0",
              borderColor: "#0050F0",
              _hover: {
                bg: "#0050F0",
                borderColor: "#0050F0",
              },
            },
          }}
        />
        <span className="text-sm font-semibold text-body3 underline">
          이용 약관 및 개인정보 수집에 동의합니다
        </span>
      </div>
      <Button type="submit" disabled={!isValid} className="mt-5 w-full py-3">
        완료
      </Button>
      <div className="mt-3 flex w-full justify-center">
        <span className="text-xs font-regular">
          도움이 필요하시면{" "}
          <a
            href="mailto:themonitor2024@gmail.com"
            className="text-primary-500"
          >
            themonitor2024@gmail.com
          </a>
          로 문의주세요
        </span>
      </div>
    </div>
  );
};

export default Step2;
