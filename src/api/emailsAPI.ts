import { authApiPost } from "./apiUtils";
import { PostSendEmailParams } from "./types/emails";

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
