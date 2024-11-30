export interface GetClientInfo {
  name: string;
  logoUrl: string;
}

export interface Client {
  clientId: number;
  name: string;
  managerName: string;
  logoUrl: string;
}

export interface PostClientParams {
  data: {
    name: string;
    manager_name: string;
    category_keywords: {
      SELF: string[];
      COMPETITOR: string[];
      INDUSTRY: string[];
    };
    recipient_emails: string[];
    cc_emails: string[];
  };
  logo: File | null;
}

export interface PutClientParams {
  clientId: number;
  data: {
    name: string;
    managerName: string;
  };
  logo: File | null;
}

export interface SearchClientResponse {
  clientId: number;
  name: string;
  managerName: string;
  logoUrl: string;
}
