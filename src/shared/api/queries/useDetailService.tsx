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
        prompt
      }
    }
    ... on GetServiceSettingsErrorResult {
      status
      message
    }
  }
}
`);

const GET_GITHUB_SERVICE_INFO = gql(`
  query Get_github_service_info($serviceId: Int!, $environmentId: Int!) {
    get_github_service_info(service_id: $serviceId, environment_id: $environmentId) {
      ... on GetGithubServiceInfoSuccess {
        status
        githubServiceInfo {
          owner
          name
          connectedBranch
        }
      }
      ... on GetGithubServiceInfoError {
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

export function useGetGithubServiceInfo(serviceId: number, environmentId: number) {
  return useQuery(GET_GITHUB_SERVICE_INFO, {
    variables: { serviceId, environmentId },
    fetchPolicy: 'cache-first',
  });
}
