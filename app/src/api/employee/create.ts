import { axiosInstance } from "@/api/_base/axiosInstance";

const URL_CREATE = "/api/employees";

type Userdata = {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
};

export async function create({
  name,
  email,
  password,
  password_confirmation,
}: Userdata) {
  const response = await axiosInstance.post(URL_CREATE, {
    name,
    email,
    password,
    password_confirmation,
  });
  return response.data;
}
