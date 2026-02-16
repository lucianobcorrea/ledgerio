import { ArrowLeft } from "lucide-react";
import { Link } from "react-router";

export default function BackTitle({ title }: { title: string }) {
  return (
    <div className="flex items-center gap-2">
      <Link to={".."} className="bg-black rounded-md px-2 py-1">
        <ArrowLeft className="text-white" size="18px" />
      </Link>
      <h1 className="font-bold mb-0">{title}</h1>
    </div>
  );
}
