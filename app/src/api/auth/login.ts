import { axiosInstance } from "@/api/_base/axiosInstance";

const URL_LOGIN = "/api/login";

type Userdata = {
  email: string;
  password: string;
};

export async function login({ email, password }: Userdata) {
  const response = await axiosInstance.post(URL_LOGIN, {
    email,
    password,
  });
  return response.data;
}
