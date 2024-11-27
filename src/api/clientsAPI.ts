import { authApiDelete, authApiGet, authApiPost, authApiPut } from "./apiUtils";
import {
  Client,
  GetClientInfo,
  PostClientParams,
  PutClientParams,
  SearchClientResponse,
} from "./types/clients";

export const getClients = async () => {
  return authApiGet<Client[]>("/clients");
};

export const postClient = async ({ data, logo }: PostClientParams) => {
  const formData = new FormData();

  formData.append("clientRequest", JSON.stringify(data));

  if (logo) {
    formData.append("logo", logo);
  }

  return authApiPost("/clients", formData);
};

export const getClientInfo = async (clientId: number) => {
  return authApiGet<GetClientInfo>("/clients/info", { clientId });
};

export const deleteClient = (clientId: number) => {
  return authApiDelete("/clients", {
    clientId,
  });
};

export const putClient = ({ clientId, data, logo }: PutClientParams) => {
  const formData = new FormData();

  formData.append("clientData", JSON.stringify(data));

  if (logo) {
    formData.append("logo", logo);
  }

  return authApiPut(`/clients/update`, formData, { clientId });
};

export const postSearchClient = (searchText: string) => {
  return authApiPost<SearchClientResponse[]>("/clients/search", {
    searchText,
  });
};
