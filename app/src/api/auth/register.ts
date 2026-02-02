import { axiosInstance } from "@/api/_base/axiosInstance";

const URL_REGISTER = "/api/register";

type Userdata = {
  name: string;
  company_name: string;
  email: string;
  password: string;
  password_confirmation: string;
  cnpj: string;
};

export async function register({
  name,
  email,
  company_name,
  password,
  password_confirmation,
  cnpj,
}: Userdata) {
  const response = await axiosInstance.post(URL_REGISTER, {
    name,
    email,
    company_name,
    password,
    password_confirmation,
    cnpj,
  });
  return response.data;
}
