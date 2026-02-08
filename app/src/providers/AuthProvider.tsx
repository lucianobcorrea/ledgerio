import { getRoles } from "@/api/user/roles";
import { useAuthStore } from "@/stores/useAuthStore";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const { setRoles } = useAuthStore();

  const { data: roles, isLoading } = useQuery({
    queryKey: ["userRoles"],
    queryFn: () => getRoles(),
    retry: false,
  });

  useEffect(() => {
    if (roles) {
      setRoles(roles);
    }
  }, [roles, setRoles]);

  if (isLoading) return <div>Loading...</div>;

  return <>{children}</>;
}
