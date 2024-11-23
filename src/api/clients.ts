import { authApiGet } from "./apiUtils";
import { GetClientInfo } from "./types/clients";

export const getClientInfo = async (clientId: number) => {
  return authApiGet<GetClientInfo>("/clients/info", { clientId });
};
