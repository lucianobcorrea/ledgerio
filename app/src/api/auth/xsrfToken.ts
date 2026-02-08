import { axiosInstance } from "@/api/_base/axiosInstance";

const URL_XSRF = "/sanctum/csrf-cookie";

export async function getXsrfToken() {
  await axiosInstance.get(URL_XSRF);
}
