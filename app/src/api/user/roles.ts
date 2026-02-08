import { axiosInstance } from "@/api/_base/axiosInstance";

const URL_ROLES = "/api/roles";

export async function getRoles() {
  const response = await axiosInstance.get(URL_ROLES);
  return response.data;
}
