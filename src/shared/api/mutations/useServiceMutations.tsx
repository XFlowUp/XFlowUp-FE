import { gql } from '@/gql/gql';
import { CreateNewServiceInput } from '@/gql/graphql';
import { useMutation } from '@apollo/client';

const CREATE_SERVICE = gql(`
  mutation CreateServiceMutation($input: CreateNewServiceInput!) {
  create_service(input: $input) {
    ... on CreateNewServiceSuccessResult {
      status
      data {
        id
        projectId
        serviceType
      }
      message
    }
    ... on CreateNewServiceErrorResult {
      status
      message
    }
  }
}
`);

const DELETE_SERVICE = gql(`
  mutation DeleteServiceMutation($projectSlug: String!, $serviceId: Float!) {
    delete_service(project_slug: $projectSlug, service_id: $serviceId) {
      ... on DeleteServiceResultSuccess {
        status
      }
      ... on DeleteServiceResultError {
        status
        message
      }
    }
  }
`);

export function useCreateService(input: CreateNewServiceInput) {
  return useMutation(CREATE_SERVICE, {
    fetchPolicy: 'network-only',
    variables: { input },
  });
}

export function useDeleteService() {
  return useMutation(DELETE_SERVICE, {
    fetchPolicy: 'network-only',
  });
}
