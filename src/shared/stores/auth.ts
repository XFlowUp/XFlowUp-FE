import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type UserInfo = {
  id: number;
  email: string;
  profile_pic_url: string;
  plan_id: number;
  github_id: string;
  stripe_id: any;
  pm_type: any;
  pm_last_four: any;
  trial_ends_at: any;
};

interface AuthState {
  user?: UserInfo;
  isAuthenticated: boolean;
  isLoading: boolean;
  setIsLoading: (isLoading: boolean) => void;
  setUser: (user: UserInfo) => void;
  logout: () => void;
}

const useAuthStore = create<AuthState>()(persist(set => ({
  isAuthenticated: false,
  isLoading: true,
  setIsLoading: (isLoading: boolean) => set({ isLoading }),
  setUser: (user: UserInfo) => set({ user, isAuthenticated: true, isLoading: false }),
  logout: () => {
    set({ user: undefined, isAuthenticated: false, isLoading: false })
    if(typeof window !== 'undefined') {
      window.localStorage.removeItem('access_token');
    }
  }
}), {
  name: 'auth-storage',
}));

export { useAuthStore };
