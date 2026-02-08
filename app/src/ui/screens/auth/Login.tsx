import { login } from "@/api/auth/login";
import { getXsrfToken } from "@/api/auth/xsrfToken";
import { Button } from "@/components/ui/button";
import { Field, FieldDescription, FieldGroup } from "@/components/ui/field";
import CardForm from "@/ui/components/cardForm/CardForm";
import FormField from "@/ui/components/formField/FormField";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router";
import z from "zod";

const formSchema = z.object({
  email: z.email(),
  password: z.string().min(6, "Password must be at least 6 characters."),
});

export default function Login() {
  const navigate = useNavigate();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const loginUser = useMutation({
    mutationFn: login,
  });

  async function onSubmit(data: z.infer<typeof formSchema>) {
    try {
      await getXsrfToken();
      const response = await loginUser.mutateAsync(data);
      toast.success(response.message);
      navigate("/");
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
        cardTitle="Login to your account"
        cardDescription="Enter your email below to login to your account"
      >
        <form id="formLogin" onSubmit={form.handleSubmit(onSubmit)}>
          <FieldGroup>
            <FormField
              control={form.control}
              id="email"
              type="email"
              label="Email"
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
            <Field>
              <Button type="submit">Login</Button>
              <FieldDescription className="text-center">
                Don&apos;t have an account? <Link to="/register">Sign up</Link>
              </FieldDescription>
            </Field>
          </FieldGroup>
        </form>
      </CardForm>
    </div>
  );
}
