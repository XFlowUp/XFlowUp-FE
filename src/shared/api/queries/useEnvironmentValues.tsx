'use client';
import { useQuery } from '@apollo/client';
import { gql } from '@/gql/gql';
import { GetEnvironmentValuesInput } from '@/gql/graphql';

const GET_ENVIROMENT_VALUES = gql(`
  query GetEnvironmentValues($input: GetEnvironmentValuesInput!) {
    environment_values(input: $input) {
        ... on GetEnvironmentValuesSuccessResult {
        environmentValues {
            id
            key
            value
        }
        status
        }
        ... on GetEnvironmentValuesErrorResult {
        status
        message
        }
    }
}
`);

export default function useEnvironmentValues(input: GetEnvironmentValuesInput) {
  return useQuery(GET_ENVIROMENT_VALUES, {
    fetchPolicy: 'cache-first',
    variables: { input },
  });
}
