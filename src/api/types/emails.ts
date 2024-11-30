export interface PostSendEmailParams {
  reportId: number;
  data: {
    subject: string;
    content?: string;
  };
}

export interface PutEmailsParams {
  data: {
    recipients: string[];
    ccs: string[];
  };
  img: File | null;
}

export interface GetEmailsResponse {
  recipients: string[];
  ccs: string[];
  signatureImageUrl: string | null;
}
