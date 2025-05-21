import { gql } from '@/gql/gql';
import { useMutation } from '@apollo/client';

const UPDATE_SERVICE_SETTINGS = gql(`
    mutation UpdateServiceSettings($serviceId: Float!, $port: String!, $useAiReview: Boolean!, $domain: String!) {
      updateServiceSettings(service_id: $serviceId, port: $port, use_ai_review: $useAiReview, domain: $domain) {
          ... on UpdateServiceSettingsSuccessResult {
          status
          }
          ... on UpdateServiceSettingsErrorResult {
          status
          message
          }
      }
    }
`);

const CONNECT_GITHUB_BRANCH = gql(`
  mutation ConnectGithubBranch($serviceId: Int!, $environmentId: Int!, $branch: String!) {
    connect_github_branch(service_id: $serviceId, environment_id: $environmentId, branch: $branch) {
      ... on ConnectGithubBranchSuccess {
        status
      }
      ... on ConnectGithubBranchError {
        status
        message
      }
    }
  }
`);

export function useUpdateServiceSettings() {
  return useMutation(UPDATE_SERVICE_SETTINGS);
}

export function useConnectGithubBranch() {
  return useMutation(CONNECT_GITHUB_BRANCH);
}
