import { useAuthStore } from '../stores/auth';
import { useRouter } from 'next/navigation';
export default function useAuth() {
  const router = useRouter();
  const {
    user,
    isAuthenticated,
    isLoading,
    setIsLoading,
    setUser,
    logout: logoutFromStore,
  } = useAuthStore();

  const logout = () => {
    logoutFromStore();
    router.push('/');
  };

  return { user, isAuthenticated, isLoading, setIsLoading, setUser, logout };
}
