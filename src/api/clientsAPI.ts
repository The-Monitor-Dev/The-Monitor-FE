import { authApiGet } from "./apiUtils";
import { Client } from "./types/clients";

export const getClients = async () => {
  return authApiGet<Client[]>("/clients");
};
