import { Link } from "react-router";

type LinkButtonProps = {
  route: string;
  children: React.ReactNode;
  className?: string;
};

export default function LinkButton({
  route,
  children,
  className,
}: LinkButtonProps) {
  return (
    <Link
      className={`${className} 
  transition 
  bg-blue-600 text-white 
  hover:bg-blue-700 
  px-8 py-2 rounded-md`}
      to={route}
    >
      {children}
    </Link>
  );
}
