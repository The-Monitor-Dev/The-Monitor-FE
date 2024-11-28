import { authApiGet, authApiPost, authApiPut } from "./apiUtils";
import {
  GetEmailsResponse,
  PostSendEmailParams,
  PutEmailsParams,
} from "./types/emails";

export const postSendEmail = ({ reportId, data }: PostSendEmailParams) => {
  return authApiPost("/emails/send", data, {
    reportId,
  });
};

export const putEmails = async ({ data, img }: PutEmailsParams) => {
  const formData = new FormData();

  formData.append("emailUpdate", JSON.stringify(data));

  if (img) {
    formData.append("signatureImage", img);
  }

  return authApiPut("/emails", formData);
};

export const getEmails = async () => {
  return authApiGet<GetEmailsResponse>("/emails");
};
