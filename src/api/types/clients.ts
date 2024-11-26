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
export interface putClientParams {
  clientId: number;
  data: FormData;
}

export interface SearchClientResponse {
  clientId: number;
  name: string;
  managerName: string;
  logoUrl: string;
}
