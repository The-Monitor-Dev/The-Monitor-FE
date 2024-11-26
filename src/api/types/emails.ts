export interface PostSendEmailParams {
  clientId: number;
  subject: string;
  content?: string;
}

export interface putEmailsParams {
  clientId: number;
  data: FormData;
}

export interface putEmailsData {
  recipients: string[];
  ccs: string[];
}

export interface GetEmailsResponse {
  recipients: string[];
  ccs: string[];
  signatureImageUrl: string | null;
}
