import { gql } from '@/gql/gql';
import { useQuery } from '@apollo/client';

const GET_BUILD_LOG_STREAM = gql(`
  query GetBuildLogStream($buildLogId: String!) {
    getBuildLogStream(buildLogId: $buildLogId)
}
`);

const GET_DEPLOY_LOG_STREAM = gql(`
  query GetDeployLogStream($deploymentId: String!) {
    getDeployLogStream(deploymentId: $deploymentId)
  }
`);

export function useGetBuildLogStream(buildLogId: string) {
  return useQuery(GET_BUILD_LOG_STREAM, {
    variables: { buildLogId },
    fetchPolicy: 'no-cache',
    pollInterval: 1000,
  });
}

export function useGetDeployLogStream(deploymentId: string) {
  return useQuery(GET_DEPLOY_LOG_STREAM, {
    variables: { deploymentId },
    fetchPolicy: 'no-cache',
    pollInterval: 1000,
  });
}
