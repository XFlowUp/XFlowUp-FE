'use client';
import { useQuery } from '@apollo/client';
import { gql } from '@/gql/gql';

const GET_DEPLOYMENTS_HISTORY = gql(`
    query GetDeploymentsHistory($page: Int, $perPage: Int, $projectSlug: String!, $serviceId: Float!) {
        deployments_history(page: $page, per_page: $perPage, project_slug: $projectSlug, service_id: $serviceId) {
            ... on DeploymentHistorySuccessResult {
                status
                data {
                    id
                    status
                    commitHash
                    branch
                    commiterAvatar
                    createdAt
                }
            }
            ... on DeploymentHistoryErrorResult {
                status
                message
            }
        }
    }
`);

const GET_DEPLOYMENT_BY_ID = gql(`
  query Deployment($deploymentId: String!) {
    deployment(id: $deploymentId) {
      ... on DeploymentInfoResultSuccess {
        status
        deployment {
          id
          serviceType
          status
          createdAt
          url
          environmentName
        }
      }
      ... on DeploymentInfoResultError {
        status
        message
      }
    }
  }
`);

export default function useDeploymentsHistory(
  projectSlug: string,
  serviceId: number,
  page?: number,
  perPage?: number,
  enabled?: boolean
) {
  return useQuery(GET_DEPLOYMENTS_HISTORY, {
    fetchPolicy: 'network-only',
    variables: {
      page: page || 1,
      perPage: perPage || 20,
      projectSlug,
      serviceId,
    },
    skip: !enabled,
    pollInterval: 2000,
  });
}

export function useDeploymentById(deploymentId: string, enabled?: boolean) {
  return useQuery(GET_DEPLOYMENT_BY_ID, {
    fetchPolicy: 'network-only',
    variables: {
      deploymentId,
    },
    skip: !enabled,
    pollInterval: 2000,
  });
}
