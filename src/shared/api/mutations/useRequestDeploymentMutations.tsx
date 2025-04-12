import { gql } from '@/gql/gql';
import { useMutation } from '@apollo/client';

const REQUEST_DEPLOYMENT = gql(`
    mutation RequestDeployment($projectSlug: String!, $serviceId: Float!, $environmentId: Float!) {
        request_deployment(project_slug: $projectSlug, service_id: $serviceId, environment_id: $environmentId) {
            ... on DeploymentRequestSuccessResult {
                status
                deployment {
                    id
                }
                message
            }
            ... on DeploymentRequestErrorResult {
                status
                message
            }
        }
    }
`);

export function useRequestDeployment(
  projectSlug: string,
  serviceId: number,
  environmentId: number
) {
  return useMutation(REQUEST_DEPLOYMENT, {
    fetchPolicy: 'network-only',
    variables: {
      projectSlug,
      serviceId,
      environmentId,
    },
  });
}
