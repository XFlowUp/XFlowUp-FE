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

const REMOVE_TEAM_MEMBER = gql(`
  mutation RemoveTeamMember($projectSlug: String!, $email: String!) {
  remove_team_member(project_slug: $projectSlug, email: $email) {
    ... on RemoveTeamMemberResultSuccess {
      status
      message
    }
    ... on RemoveTeamMemberResultError {
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

export function useRemoveTeamMember() {
  return useMutation(REMOVE_TEAM_MEMBER, {
    fetchPolicy: 'network-only',
  });
}
