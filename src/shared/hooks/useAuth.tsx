import { useSession, signIn, signOut } from "next-auth/react";

export default function useAuth() {
  const { data: session, status } = useSession();

  const login = () => signIn();
  const logout = () => signOut();

  return {
    user: session?.user,
    isAuthenticated: status === "authenticated",
    isLoading: status === "loading",
    login,
    logout,
  };
}
