import { gql } from '@/gql/gql';
import { useQuery } from '@apollo/client';
const GET_ENVIRONMENTS = gql(`
    query EnvironmentsQuery($projectSlug: String!) {
        environments(project_slug: $projectSlug) {
            ... on GetEnvironmentsSuccess {
                environments {
                    id
                    name
                }
                status
            }
            ... on GetEnvironmentsError {
                status
                message
            }
        }
    }
`);

export default function useEnvironments(projectSlug?: string) {
  return useQuery(GET_ENVIRONMENTS, {
    variables: projectSlug ? { projectSlug } : undefined,
    fetchPolicy: 'cache-first',
    skip: !projectSlug,
  });
}
