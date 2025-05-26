import { gql } from '@/gql/gql';
import { useQuery } from '@apollo/client';

const REVIEW_LOGS = gql(`
  query ReviewLogs($serviceId: Float!) {
  getReviewLogs(service_id: $serviceId) {
    ... on GetReviewLogsSuccessResult {
      reviewLogs {
        id
        pull_request_id
        pull_request_url
        pull_request_title
        status
        commit_author_name
        commit_author_avatar
        commit_message
        commit_url
        review_comment
        created_at
      }
      status
    }
    ... on GetReviewLogsErrorResult {
      status
      message
    }
  }
}
`);

export function useReviewLogs(serviceId: number) {
  return useQuery(REVIEW_LOGS, {
    variables: {
      serviceId: serviceId,
    },
  });
}
