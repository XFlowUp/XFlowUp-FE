import { gql } from '@/gql';
import { EditEnvironmentValueInput } from '@/gql/graphql';
import { useMutation } from '@apollo/client';

const EDIT_ENVIRONMENT_VALUES = gql(`
    mutation Edit_environment_value($input: EditEnvironmentValueInput!) {
    edit_environment_value(input: $input) {
        ... on EditEnvironmentValueSuccess {
        status
        }
        ... on EditEnvironmentValueError {
        status
        message
        }
    }
    }
`);

export default function useEditEnvironmentValues(input: EditEnvironmentValueInput) {
  return useMutation(EDIT_ENVIRONMENT_VALUES, {
    variables: { input },
  });
}
