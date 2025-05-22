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

const SEARCH_REPOSITORIES = gql(
  `query SearchRepositories($keyword: String!, $page: Int, $perPage: Int, $sortBy: GithubRepositorySortBy, $sortDirection: GithubRepositorySortDirection) {
    search_repositories(keyword: $keyword, page: $page, per_page: $perPage, sortBy: $sortBy, sortDirection: $sortDirection) {
      ... on SearchRepositorySuccessResult {
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
        total_count
      }
      ... on SearchRepositoryErrorResult {
        status
        message
      }
    }
  }
`
);

const GET_BRANCHES = gql(
  `query GetBranches($owner: String!, $repo: String!) {
      get_branches(owner: $owner, repo: $repo) {
      ... on GetBranchesSuccessResult {
        status
        data
      }
      ... on GetBranchesErrorResult {
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
    fetchPolicy: 'cache-and-network',
  });
}

export function useSearchRepositories(options: {
  keyword: string;
  page?: number;
  perPage?: number;
  sortBy?: GithubRepositorySortBy;
  sortDirection?: GithubRepositorySortDirection;
}) {
  return useQuery(SEARCH_REPOSITORIES, {
    variables: {
      keyword: options.keyword,
      page: options?.page || 1,
      perPage: options?.perPage || 20,
      sortBy: options?.sortBy || GithubRepositorySortBy.Updated,
      sortDirection: options?.sortDirection || GithubRepositorySortDirection.Desc,
    },
    fetchPolicy: 'cache-and-network',
  });
}

export function useGetRepositoryBranches(
  options: { owner: string; repo: string },
  queryOptions?: { skip?: boolean }
) {
  return useQuery(GET_BRANCHES, {
    variables: {
      owner: options.owner,
      repo: options.repo,
    },
    fetchPolicy: 'cache-first',
    skip: queryOptions?.skip,
  });
}
