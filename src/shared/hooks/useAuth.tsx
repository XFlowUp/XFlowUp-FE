import { useAuthStore } from '../stores/auth';
import { useRouter } from 'next/navigation';
import { useApolloClient } from '@apollo/client';

export default function useAuth() {
  const router = useRouter();
  const client = useApolloClient();
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
    client.resetStore();
    router.push('/');
  };

  return { user, isAuthenticated, isLoading, setIsLoading, setUser, logout };
}
