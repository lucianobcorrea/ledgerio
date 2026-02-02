import { Button } from "@/components/ui/button";
import { Field, FieldDescription, FieldGroup } from "@/components/ui/field";
import { Link, useNavigate } from "react-router";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import FormField from "@/ui/components/formField/FormField";
import CardForm from "@/ui/components/cardForm/CardForm";
import toast from "react-hot-toast";
import { useMutation } from "@tanstack/react-query";
import { register } from "@/api/auth/register";
import axios from "axios";

const formSchema = z
  .object({
    name: z
      .string()
      .min(3, "Your name must be at least 3 characters.")
      .max(255, "Your name must be at most 255 characters."),
    company_name: z
      .string()
      .min(3, "Company name must be at least 3 characters.")
      .max(255, "Company name must be at most 255 characters."),
    email: z.email(),
    password: z.string().min(6, "Password must be at least 6 characters."),
    password_confirmation: z
      .string()
      .min(6, "Password must be at least 6 characters."),
    cnpj: z
      .string()
      .refine((cnpj) => {
        const replacedCnpj = cnpj.replace(/\D/g, "");
        return replacedCnpj.length <= 14;
      }, "CNPJ must be at most 14 characters.")
      .refine((cnpj) => {
        const replacedCnpj = cnpj.replace(/\D/g, "");
        return !!Number(replacedCnpj);
      }, "CNPJ must be a number."),
  })
  .refine((data) => data.password === data.password_confirmation, {
    message: "Passwords do not match.",
    path: ["password_confirmation"],
  });

export default function Register() {
  const navigate = useNavigate();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      company_name: "",
      email: "",
      password: "",
      password_confirmation: "",
      cnpj: "",
    },
  });

  function formatCnpj(cnpj: string) {
    let replacedCnpj = cnpj.replace(/\D/g, "");

    if (replacedCnpj.length > 14) {
      replacedCnpj = cnpj.substring(0, 14);
    }

    return replacedCnpj.replace(
      /(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/,
      "$1.$2.$3/$4-$5",
    );
  }

  const createUser = useMutation({
    mutationFn: register,
  });

  async function onSubmit(data: z.infer<typeof formSchema>) {
    const newData = {
      ...data,
      cnpj: data.cnpj.replace(/\D/g, ""),
    };

    try {
      const response = await createUser.mutateAsync(newData);
      toast.success(response.message);
      form.reset();
      navigate("/login");
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        const message = err.response?.data?.message || "Unexpected error";
        toast.error(message);
      } else if (err instanceof Error) {
        toast.error(err.message);
      }
    }
  }

  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <CardForm
        cardSize="max-w-xl"
        cardTitle="Create your account"
        cardDescription="Fill the form below to create your account"
      >
        <form id="formRegister" onSubmit={form.handleSubmit(onSubmit)}>
          <FieldGroup>
            <div className="grid grid-cols-2 gap-3">
              <FormField
                control={form.control}
                id="yourName"
                type="text"
                label="Your name"
                name="name"
                placeholder="Your full name"
              />
              <FormField
                control={form.control}
                id="companyName"
                type="text"
                label="Company name"
                name="company_name"
                placeholder="Your company name"
              />
            </div>
            <FormField
              control={form.control}
              id="cnpj"
              type="text"
              label="CNPJ"
              name="cnpj"
              placeholder="00.000.000/0000-00"
              transform={(value) => formatCnpj(value.replace(/\D/g, ""))}
            />
            <FormField
              control={form.control}
              id="email"
              type="email"
              label="E-mail"
              name="email"
              placeholder="m@example.com"
            />
            <FormField
              control={form.control}
              id="password"
              type="password"
              label="Password"
              name="password"
            />
            <FormField
              control={form.control}
              id="repeatPassword"
              type="password"
              label="Repeat password"
              name="password_confirmation"
            />
            <Field>
              <Button type="submit" form="formRegister">
                Create Account
              </Button>
              <FieldDescription className="text-center">
                Already have an account? <Link to="/login">Sign in</Link>
              </FieldDescription>
            </Field>
          </FieldGroup>
        </form>
      </CardForm>
    </div>
  );
}
