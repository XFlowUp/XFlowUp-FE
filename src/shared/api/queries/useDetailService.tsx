import { gql } from '@/gql/gql';
import { useQuery } from '@apollo/client';
const GET_SERVICE_SETTINGS = gql(`
query GetServiceSettings($serviceId: Float!) {
  getServiceSettings(service_id: $serviceId) {
    ... on GetServiceSettingsSuccessResult {
      status
      data {
        port
        use_ai_review
        domain
      }
    }
    ... on GetServiceSettingsErrorResult {
      status
      message
    }
  }
}
`);

export function useGetServiceSettings(serviceId: number) {
  return useQuery(GET_SERVICE_SETTINGS, {
    variables: { serviceId },
    fetchPolicy: 'cache-first',
  });
}
