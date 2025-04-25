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

const GET_PROJECT_DETAILS = gql(`
query GetProjectDetails($projectSlug: String!) {
  get_project_details(project_slug: $projectSlug) {
    ... on GetProjectDetailsResultSuccess {
      status
      data {
        name
        description
        slug
      }
    }
    ... on GetProjectDetailsResultError {
      status
      message
    }
  }
}
`);

export default function useProjects() {
  return useQuery(GET_PROJECTS, {
    fetchPolicy: 'no-cache',
  });
}

export function useProjectDetails(projectSlug: string) {
  return useQuery(GET_PROJECT_DETAILS, {
    variables: { projectSlug },
    fetchPolicy: 'cache-first',
  });
}
