import { axiosInstance } from "@/api/_base/axiosInstance";

const URL_LIST = "/api/employees";

export async function list(params: { page: number; perPage: number }) {
  const response = await axiosInstance.get(URL_LIST, {
    params: {
      page: params.page,
      per_page: params.perPage,
    },
  });
  return response.data;
}
