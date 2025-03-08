"use client"
import ENDPOINTS from '@/shared/constants/api';
import { QK } from '@/shared/constants/api/qk';
import axiosClient from '@/shared/lib/axios';
import { useAuthStore } from '@/shared/stores/auth';
import { useQuery, UseQueryOptions } from '@tanstack/react-query';

type APIResponse<T> = {
  success: boolean;
  data: T;
  message?: string;
};

type UserInfoT = {
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

export default function useUserInfo() {
  return useQuery<APIResponse<UserInfoT>, Error>({
    queryKey: [QK.userInfo],
    queryFn: async () => {
      const response = await axiosClient.get<APIResponse<UserInfoT>>(ENDPOINTS.user.me);
      return response.data;
    },
    staleTime: Infinity,
    retry: 1,
  } as UseQueryOptions<APIResponse<UserInfoT>, Error>);
}
