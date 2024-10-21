import usePostSignIn from "@api/hooks/accounts/usePostSignIn";
import Button from "@components/Button";
import Input from "@components/Input";
import routes from "@constants/routes";
import { SubmitHandler, useForm } from "react-hook-form";
import { Link } from "react-router-dom";

type SignInFormData = {
  email: string;
  password: string;
};

const SignInPage: React.FC = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<SignInFormData>();
  const { mutate } = usePostSignIn();

  const [email, password] = watch(["email", "password"]);

  const onSubmit: SubmitHandler<SignInFormData> = (data) => {
    mutate(data);
  };
  return (
    <div className="flex h-full items-center justify-center">
      <div className="flex h-[580px] w-[500px] flex-col bg-white px-[70px] shadow-form">
        <h2 className="mt-[62px] text-4xl font-semibold text-title">로그인</h2>
        <Link
          to={routes.signUp}
          className="text-base font-normal text-title underline"
        >
          아직 계정이 없으신가요?
        </Link>
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <div className="mt-10 flex flex-col gap-10">
            <div className="relative flex flex-col gap-2">
              <label className="text-sm font-semibold text-title">이메일</label>
              <Input
                type="email"
                placeholder="이메일(E-mail) 주소를 입력해주세요."
                maxLength={24}
                isInvalid={!!errors.email}
                {...register("email", {
                  required: true,
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: "*잘못된 이메일 형식입니다.",
                  },
                })}
              />
              {errors.email && (
                <p className="absolute -bottom-5 left-4 text-xs font-regular text-error-500">
                  {errors.email?.message?.toString()}
                </p>
              )}
            </div>
            <div className="relative flex flex-col gap-2">
              <label className="text-sm font-semibold text-title">
                비밀번호
              </label>
              <Input
                type="password"
                placeholder="비밀번호를 입력해주세요."
                maxLength={24}
                isInvalid={!!errors.password}
                {...register("password", {
                  required: true,
                  minLength: {
                    value: 8,
                    message: "*비밀번호가 잘못 되었습니다.",
                  },
                  pattern: {
                    value:
                      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/,
                    message: "*비밀번호가 잘못 되었습니다.",
                  },
                })}
              />
              {errors.password && (
                <p className="absolute -bottom-5 left-4 text-xs font-regular text-error-500">
                  {errors.password?.message?.toString()}
                </p>
              )}
            </div>
          </div>
          <Button
            type="submit"
            disabled={!(email && password)}
            className="mt-[60px] w-full py-3"
          >
            로그인
          </Button>
        </form>
        <Link
          to={routes.password}
          className="mt-3 w-full text-center text-sm font-regular text-body1"
        >
          비밀번호 찾기
        </Link>
      </div>
    </div>
  );
};

export default SignInPage;
