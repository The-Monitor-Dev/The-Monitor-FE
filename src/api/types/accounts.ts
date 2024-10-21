export interface PostSendEmailConfirmData {
  email: string;
}

export interface PostVerifyCodeData {
  email: string;
  verificationCode: string;
}

export interface PostSignUpData {
  email: string;
  password: string;
  companyName: string;
  managerName: string;
  managerPhone: string;
  agreement: boolean;
}
export interface PostSignInData {
  email: string;
  password: string;
}
export interface PostSendPasswordChangeEmailData {
  email: string;
}
