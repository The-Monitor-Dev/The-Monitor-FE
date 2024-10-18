import { apiGet, apiPost } from "./apiUtils";

export interface PostSendEmailConfirmData {
  email: string;
}

export const postSendEmailConfirm = async (data: PostSendEmailConfirmData) => {
  return apiPost("/accounts/sendEmailConfirm", data);
};

export interface PostVerifyCodeData {
  email: string;
  verificationCode: string;
}

export const postVerifyCode = async (data: PostVerifyCodeData) => {
  return apiPost("/accounts/verifyCode", data);
};

export interface PostSignUpData {
  email: string;
  password: string;
  companyName: string;
  managerName: string;
  managerPhone: string;
  agreement: boolean;
}

export const postSignUp = async (data: PostSignUpData) => {
  return apiPost("/accounts/signUp", data);
};

export interface PostSignInData {
  email: string;
  password: string;
}

export const postSignIn = async (data: PostSignInData) => {
  return apiPost("/accounts/signIn", data);
};

export interface PostSendPasswordChangeEmailData {
  email: string;
}

export const postSendPasswordChangeEmail = async (
  data: PostSendPasswordChangeEmailData,
) => {
  return apiPost("/accounts/sendEmailConfirm", data);
};

export interface GetCheckEmailParams {
  email: string;
}

export const GetCheckEmail = async (params: GetCheckEmailParams) => {
  return apiGet("/accounts/checkEmail", params);
};
