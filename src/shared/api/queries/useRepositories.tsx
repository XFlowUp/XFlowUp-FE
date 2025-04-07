import { gql } from '@/gql/gql';
import { useQuery } from '@apollo/client';
import { GithubRepositorySortBy, GithubRepositorySortDirection } from '@/gql/graphql';

const GET_REPOSITORIES = gql(
  `query GetRepositories($page: Int, $perPage: Int, $sortBy: GithubRepositorySortBy, $sortDirection: GithubRepositorySortDirection) {
        get_repositories(page: $page, per_page: $perPage, sortBy: $sortBy, sortDirection: $sortDirection) {
            ... on GetRepositorySuccessResult {
                status
                data {
                    id
                    name
                    owner {
                        id
                        login
                        avatar_url
                    }
                    description
                    url
                    git_url
                    is_private
                    created_at
                    updated_at
                }
            }
            ... on GetRepositoryErrorResult {
                status
                message
            }
        }
    }`
);

export default function useRepositories(options?: {
  page?: number;
  perPage?: number;
  sortBy?: GithubRepositorySortBy;
  sortDirection?: GithubRepositorySortDirection;
}) {
  return useQuery(GET_REPOSITORIES, {
    variables: {
      page: options?.page || 1,
      perPage: options?.perPage || 20,
      sortBy: options?.sortBy || GithubRepositorySortBy.Updated,
      sortDirection: options?.sortDirection || GithubRepositorySortDirection.Desc,
    },
    fetchPolicy: 'cache-first',
  });
}
