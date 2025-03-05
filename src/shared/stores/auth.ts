import { create } from 'zustand';
import { useSession, signIn, signOut } from 'next-auth/react';

interface AuthState {
  user: any;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: () => void;
  logout: () => void;
}

const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,
  isLoading: true,
  login: () => signIn(),
  logout: () => signOut(),
}));

const updateAuthState = () => {
  const { data: session, status } = useSession();

  useAuthStore.setState({
    user: session?.user,
    isAuthenticated: status === 'authenticated',
    isLoading: status === 'loading',
  });
};

export { useAuthStore, updateAuthState };
