'use client';
import { useQuery } from '@apollo/client';
import { gql } from '@/gql/gql';

const GET_ALL_SERVICES = gql(`
  query GetAllServices($projectSlug: String!) {
    get_all_services(project_slug: $projectSlug) {
      ... on GetAllServicesSuccessResult {
        status
        services {
          id
          type
          name
          lastDeploymentDate
        }
      }
      ... on GetAllServicesFailedResult {
        status
        message
      }
    }
  }
`);

export default function useAllServices(projectSlug: string) {
  return useQuery(GET_ALL_SERVICES, {
    fetchPolicy: 'network-only',
    variables: { projectSlug },
  });
}
