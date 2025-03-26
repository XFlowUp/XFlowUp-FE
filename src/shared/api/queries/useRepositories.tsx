import { gql } from '@/gql/gql';
import { useQuery } from '@apollo/client';

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

export default function useRepositories() {
  return useQuery(GET_REPOSITORIES, {
    fetchPolicy: 'cache-first',
  });
}
