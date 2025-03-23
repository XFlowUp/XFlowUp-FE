import { GetUserInfoQueryQuery } from '@/gql/graphql';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface AuthState {
  user?: GetUserInfoQueryQuery['user_info'];
  isAuthenticated: boolean;
  isLoading: boolean;
  setIsLoading: (isLoading: boolean) => void;
  setUser: (user: GetUserInfoQueryQuery['user_info']) => void;
  logout: () => void;
}

const useAuthStore = create<AuthState>()(
  persist(
    set => ({
      isAuthenticated: false,
      isLoading: true,
      setIsLoading: (isLoading: boolean) => set({ isLoading }),
      setUser: (user: GetUserInfoQueryQuery['user_info']) =>
        set({ user, isAuthenticated: true, isLoading: false }),
      logout: () => {
        set({ user: undefined, isAuthenticated: false, isLoading: false });
        if (typeof window !== 'undefined') {
          window.localStorage.removeItem('access-token');
          window.localStorage.removeItem('access_token');
        }
      },
    }),
    {
      name: 'auth-storage',
    }
  )
);

export { useAuthStore };
