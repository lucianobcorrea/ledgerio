import { create } from "zustand";

interface AuthState {
  roles: string[];
  setRoles: (roles: string[]) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  roles: [],
  setRoles: (roles) => set({ roles }),
}));
