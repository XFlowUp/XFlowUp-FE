import { gql } from '@/gql';
import { useMutation } from '@apollo/client';

const ADD_TEAM_MEMBER = gql(`
    mutation AddTeamMember($projectSlug: String!, $member: AddTeamMemberInput!) {
    add_team_member(project_slug: $projectSlug, member: $member) {
        ... on AddTeamMemberSuccessResult {
        email
        status
        }
        ... on AddTeamMemberErrorResult {
        status
        message
        }
    }
    }
`);

export function useAddTeamMember() {
  return useMutation(ADD_TEAM_MEMBER, {
    fetchPolicy: 'network-only',
  });
}
