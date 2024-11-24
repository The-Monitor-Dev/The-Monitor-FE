import { authApiGet, authApiPost } from "./apiUtils";
import { Client, GetClientInfo } from "./types/clients";

export const getClients = async () => {
  return authApiGet<Client[]>("/clients");
};

export const postClient = async (data: FormData) => {
  return authApiPost("/clients", data);
};

export const getClientInfo = async (clientId: number) => {
  return authApiGet<GetClientInfo>("/clients/info", { clientId });
};
