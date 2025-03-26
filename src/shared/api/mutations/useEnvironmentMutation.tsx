import { gql } from '@/gql/gql';
import { useMutation } from '@apollo/client';

const CREATE_ENVIRONMENT = gql(`
    mutation CreateEnvironment($projectSlug: String!, $environment: AddEnvironmentsInput!) {
        add_environment(project_slug: $projectSlug, environment: $environment) {
            ... on AddEnvironmentsSuccess {
                status
            }
            ... on AddEnvironmentsError {
                status
                message
            }
        }
    }
`);

export function useCreateEnvironment() {
  return useMutation(CREATE_ENVIRONMENT);
}
