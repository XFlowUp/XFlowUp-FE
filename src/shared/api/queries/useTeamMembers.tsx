import { gql } from '@/gql';
import { useQuery } from '@apollo/client';

const GET_TEAM_MEMBERS = gql(`
query GetTeamMembers($projectSlug: String!) {
  team_members(project_slug: $projectSlug) {
    ... on GetTeamSuccess {
      status
      team {
        slug
        members {
          email
          name
          profile_url
        }
      }
    }
    ... on GetTeamError {
      status
      message
    }
  }
}
`);

export default function useTeamMembers(projectSlug: string) {
  return useQuery(GET_TEAM_MEMBERS, {
    fetchPolicy: 'cache-first',
    variables: { projectSlug },
  });
}
