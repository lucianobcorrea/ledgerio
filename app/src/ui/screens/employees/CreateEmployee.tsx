import { create } from "@/api/employee/create";
import { Card } from "@/components/ui/card";
import { Field, FieldGroup } from "@/components/ui/field";
import Button from "@/ui/components/button/Button";
import FormField from "@/ui/components/formField/FormField";
import Layout from "@/ui/components/layout/Layout";
import { zodResolver } from "@hookform/resolvers/zod";
import CardContent from "@mui/material/CardContent";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";
import z from "zod";

const formSchema = z
  .object({
    name: z
      .string()
      .min(3, "Your name must be at least 3 characters.")
      .max(255, "Your name must be at most 255 characters."),
    email: z.email(),
    password: z.string().min(6, "Password must be at least 6 characters."),
    password_confirmation: z
      .string()
      .min(6, "Password must be at least 6 characters."),
  })
  .refine((data) => data.password === data.password_confirmation, {
    message: "Passwords do not match.",
    path: ["password_confirmation"],
  });

export default function CreateEmployee() {
  const navigate = useNavigate();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      password_confirmation: "",
    },
  });

  const createEmployee = useMutation({
    mutationFn: create,
  });

  async function onSubmit(data: z.infer<typeof formSchema>) {
    try {
      const response = await createEmployee.mutateAsync(data);
      toast.success(response.message);
      navigate("/employees");
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
    <Layout>
      <h1 className="font-bold mb-3">Create Employee</h1>
      <Card>
        <CardContent>
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
                  id="email"
                  type="email"
                  label="E-mail"
                  name="email"
                  placeholder="m@example.com"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
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
              </div>
              <Field className="w-fit">
                <Button type="submit" form="formRegister">
                  Create Account
                </Button>
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </Layout>
  );
}
