import { gql } from '@/gql/gql';
import { UpdateProjectDetailsInput } from '@/gql/graphql';
import { useMutation } from '@apollo/client';

const CREATE_PROJECT = gql(`
  mutation CreateProjectMutation($name: String!, $description: String) {
    create_project(name: $name, description: $description) {
      ... on CreateProjectSuccess {
        status
        data {
          name
          description
          id
          slug
          url
        }
      }
      ... on CreateProjectError {
        status
        message
      }
    }
  }
`);

const DELETE_PROJECT = gql(`
  mutation DeleteProjectMutation($slug: String!) {
    delete_project(slug: $slug) {
      ... on DeleteProjectSuccess {
        message
        status
      }
      ... on DeleteProjectError {
        message
        status
      }
    }
  }
`);

const UPDATE_PROJECT = gql(`
mutation UpdateProjectDetailsMutation($projectSlug: String!, $input: UpdateProjectDetailsInput!) {
  update_project_details(project_slug: $projectSlug, input: $input) {
    ... on UpdateProjectDetailsResultSuccess {
      status
    }
    ... on UpdateProjectDetailsResultError {
      status
      message
    }
  }
}
`);

export function useCreateProject() {
  return useMutation(CREATE_PROJECT);
}

export function useDeleteProject() {
  return useMutation(DELETE_PROJECT);
}

export function useUpdateProjectDetails(projectSlug: string, input: UpdateProjectDetailsInput) {
  return useMutation(UPDATE_PROJECT, {
    variables: {
      projectSlug,
      input,
    },
  });
}
