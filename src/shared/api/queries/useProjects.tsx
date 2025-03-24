import { gql } from '@/gql/gql';
import { useQuery } from '@apollo/client';
const GET_PROJECTS = gql(`
    query ProjectsQuery {
    all_projects {
      ... on ProjectSuccess {
        result
        data {
            id
            name
            description
            slug
            url
            created_at
            updated_at
        }
      }
      ... on ProjectError {
        result
        message
      }
    }
}
`);

export default function useProjects() {
  return useQuery(GET_PROJECTS, {
    fetchPolicy: 'cache-first',
  });
}
