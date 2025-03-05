import ENDPOINTS from '@/shared/constants/api';
import { useQuery } from '@tanstack/react-query';


export default function useExampleQuery() {
  return useQuery({
    queryKey: ["example"],
    queryFn: () => fetch(ENDPOINTS.auth.login).then((res) => res.json()),
  });
}