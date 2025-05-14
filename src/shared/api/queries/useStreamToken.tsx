import { ENDPOINT } from '@/shared/constants/endpoint';
import axiosClient from '@/shared/lib/axios';
import { useQuery } from '@tanstack/react-query';

export default function useStreamToken() {
  const { data, isLoading, error } = useQuery({
    queryKey: ['stream-token'],
    queryFn: async () => {
      const response = await axiosClient.get<{ token: string; user_id: string }>(
        ENDPOINT.STREAM_GET_TOKEN
      );
      return response.data;
    },
    staleTime: Infinity,
  });

  return { data, isLoading, error };
}
