import { axiosInstance } from "@/api/_base/axiosInstance";

const URL_DELETE = "/api/employees/";

export async function deleteEmployee(id: string) {
  await axiosInstance.delete(URL_DELETE + id);
}
