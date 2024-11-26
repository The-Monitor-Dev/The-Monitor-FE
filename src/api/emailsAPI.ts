import { authApiGet, authApiPost, authApiPut } from "./apiUtils";
import { GetEmailsResponse, PostSendEmailParams } from "./types/emails";

export const postSendEmail = ({
  clientId,
  subject,
  content,
}: PostSendEmailParams) => {
  return authApiPost(
    "/emails/send",
    {
      subject,
      content,
    },
    {
      clientId,
    },
  );
};

export const putEmails = async (clientId: number, data: FormData) => {
  return authApiPut("/emails", data, { clientId });
};

export const getEmails = async (clientId: number) => {
  return authApiGet<GetEmailsResponse>("/emails", { clientId });
};
