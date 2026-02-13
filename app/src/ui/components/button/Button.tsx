import { Button as ShadcnBtn } from "@/components/ui/button";

type ButtonProps = {
  children: React.ReactNode;
  type: "submit" | "reset" | "button";
  className?: string;
  form?: string;
};

export default function Button({
  children,
  type,
  className,
  form,
}: ButtonProps) {
  return (
    <ShadcnBtn
      form={form}
      type={type}
      className={`${className} 
  transition 
  bg-blue-600 text-white 
  hover:bg-blue-700 
  px-8 py-2 rounded-md`}
    >
      {children}
    </ShadcnBtn>
  );
}
