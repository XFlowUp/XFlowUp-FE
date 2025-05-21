/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 * Learn more about it here: https://the-guild.dev/graphql/codegen/plugins/presets/preset-client#reducing-bundle-size
 */
type Documents = {
  '\n    mutation UpdateServiceSettings($serviceId: Float!, $port: String!, $useAiReview: Boolean!, $domain: String!) {\n      updateServiceSettings(service_id: $serviceId, port: $port, use_ai_review: $useAiReview, domain: $domain) {\n          ... on UpdateServiceSettingsSuccessResult {\n          status\n          }\n          ... on UpdateServiceSettingsErrorResult {\n          status\n          message\n          }\n      }\n    }\n': typeof types.UpdateServiceSettingsDocument;
  '\n  mutation ConnectGithubBranch($serviceId: Int!, $environmentId: Int!, $branch: String!) {\n    connect_github_branch(service_id: $serviceId, environment_id: $environmentId, branch: $branch) {\n      ... on ConnectGithubBranchSuccess {\n        status\n      }\n      ... on ConnectGithubBranchError {\n        status\n        message\n      }\n    }\n  }\n': typeof types.ConnectGithubBranchDocument;
  '\n    mutation CreateEnvironment($projectSlug: String!, $environment: AddEnvironmentsInput!) {\n        add_environment(project_slug: $projectSlug, environment: $environment) {\n            ... on AddEnvironmentsSuccess {\n                status\n            }\n            ... on AddEnvironmentsError {\n                status\n                message\n            }\n        }\n    }\n': typeof types.CreateEnvironmentDocument;
  '\n    mutation Edit_environment_value($input: EditEnvironmentValueInput!) {\n    edit_environment_value(input: $input) {\n        ... on EditEnvironmentValueSuccess {\n        status\n        }\n        ... on EditEnvironmentValueError {\n        status\n        message\n        }\n    }\n    }\n': typeof types.Edit_Environment_ValueDocument;
  '\n  mutation CreateProjectMutation($name: String!, $description: String) {\n    create_project(name: $name, description: $description) {\n      ... on CreateProjectSuccess {\n        status\n        data {\n          name\n          description\n          id\n          slug\n          url\n        }\n      }\n      ... on CreateProjectError {\n        status\n        message\n      }\n    }\n  }\n': typeof types.CreateProjectMutationDocument;
  '\n  mutation DeleteProjectMutation($slug: String!) {\n    delete_project(slug: $slug) {\n      ... on DeleteProjectSuccess {\n        message\n        status\n      }\n      ... on DeleteProjectError {\n        message\n        status\n      }\n    }\n  }\n': typeof types.DeleteProjectMutationDocument;
  '\nmutation UpdateProjectDetailsMutation($projectSlug: String!, $input: UpdateProjectDetailsInput!) {\n  update_project_details(project_slug: $projectSlug, input: $input) {\n    ... on UpdateProjectDetailsResultSuccess {\n      status\n    }\n    ... on UpdateProjectDetailsResultError {\n      status\n      message\n    }\n  }\n}\n': typeof types.UpdateProjectDetailsMutationDocument;
  '\n    mutation RequestDeployment($projectSlug: String!, $serviceId: Float!, $environmentId: Float!) {\n        request_deployment(project_slug: $projectSlug, service_id: $serviceId, environment_id: $environmentId) {\n            ... on DeploymentRequestSuccessResult {\n                status\n                deployment {\n                    id\n                }\n                message\n            }\n            ... on DeploymentRequestErrorResult {\n                status\n                message\n            }\n        }\n    }\n': typeof types.RequestDeploymentDocument;
  '\n  mutation CreateServiceMutation($input: CreateNewServiceInput!) {\n  create_service(input: $input) {\n    ... on CreateNewServiceSuccessResult {\n      status\n      data {\n        id\n        projectId\n        serviceType\n      }\n      message\n    }\n    ... on CreateNewServiceErrorResult {\n      status\n      message\n    }\n  }\n}\n': typeof types.CreateServiceMutationDocument;
  '\n  mutation DeleteServiceMutation($projectSlug: String!, $serviceId: Float!) {\n    delete_service(project_slug: $projectSlug, service_id: $serviceId) {\n      ... on DeleteServiceResultSuccess {\n        status\n      }\n      ... on DeleteServiceResultError {\n        status\n        message\n      }\n    }\n  }\n': typeof types.DeleteServiceMutationDocument;
  '\n    mutation AddTeamMember($projectSlug: String!, $member: AddTeamMemberInput!) {\n    add_team_member(project_slug: $projectSlug, member: $member) {\n      ... on AddTeamMemberSuccessResult {\n        email\n        status\n      }\n      ... on AddTeamMemberErrorResult {\n        status\n        message\n      }\n    }\n  }\n': typeof types.AddTeamMemberDocument;
  '\n  mutation RemoveTeamMember($projectSlug: String!, $email: String!) {\n  remove_team_member(project_slug: $projectSlug, email: $email) {\n    ... on RemoveTeamMemberResultSuccess {\n      status\n      message\n    }\n    ... on RemoveTeamMemberResultError {\n      status\n      message\n    }\n  }\n}\n': typeof types.RemoveTeamMemberDocument;
  '\n   mutation Topup($data: CreatePaymentInput!) {\n    topup(data: $data) {\n        ... on CreatePaymentSuccessResult {\n        status\n        payment_url\n        }\n        ... on CreatePaymentErrorResult {\n        status\n        message\n        }\n    }\n}\n': typeof types.TopupDocument;
  '\n  query GetAllServices($projectSlug: String!) {\n    get_all_services(project_slug: $projectSlug) {\n      ... on GetAllServicesSuccessResult {\n        status\n        services {\n          id\n          type\n          name\n          lastDeploymentDate\n        }\n      }\n      ... on GetAllServicesFailedResult {\n        status\n        message\n      }\n    }\n  }\n': typeof types.GetAllServicesDocument;
  '\n    query DatabaseServicesQuery{\n        get_database_services {\n            ... on GetDatabaseServiceSuccess {\n                status\n                data {\n                    id\n                    name\n                    icon\n                }\n            }\n            ... on GetDatabaseServiceError {\n                status\n                message\n            }\n        }\n    }\n': typeof types.DatabaseServicesQueryDocument;
  '\n    query GetDeploymentsHistory($page: Int, $perPage: Int, $projectSlug: String!, $serviceId: Float!) {\n        deployments_history(page: $page, per_page: $perPage, project_slug: $projectSlug, service_id: $serviceId) {\n            ... on DeploymentHistorySuccessResult {\n                status\n                data {\n                    id\n                    status\n                    commitHash\n                    branch\n                    commiterAvatar\n                    createdAt\n                }\n            }\n            ... on DeploymentHistoryErrorResult {\n                status\n                message\n            }\n        }\n    }\n': typeof types.GetDeploymentsHistoryDocument;
  '\nquery GetServiceSettings($serviceId: Float!) {\n  getServiceSettings(service_id: $serviceId) {\n    ... on GetServiceSettingsSuccessResult {\n      status\n      data {\n        port\n        use_ai_review\n        domain\n      }\n    }\n    ... on GetServiceSettingsErrorResult {\n      status\n      message\n    }\n  }\n}\n': typeof types.GetServiceSettingsDocument;
  '\n  query Get_github_service_info($serviceId: Int!, $environmentId: Int!) {\n    get_github_service_info(service_id: $serviceId, environment_id: $environmentId) {\n      ... on GetGithubServiceInfoSuccess {\n        status\n        githubServiceInfo {\n          owner\n          name\n          connectedBranch\n        }\n      }\n      ... on GetGithubServiceInfoError {\n        status\n        message\n      }\n    }\n  }\n': typeof types.Get_Github_Service_InfoDocument;
  '\n  query GetEnvironmentValues($input: GetEnvironmentValuesInput!) {\n    environment_values(input: $input) {\n        ... on GetEnvironmentValuesSuccessResult {\n        environmentValues {\n            id\n            key\n            value\n        }\n        status\n        }\n        ... on GetEnvironmentValuesErrorResult {\n        status\n        message\n        }\n    }\n}\n': typeof types.GetEnvironmentValuesDocument;
  '\n    query EnvironmentsQuery($projectSlug: String!) {\n        environments(project_slug: $projectSlug) {\n            ... on GetEnvironmentsSuccess {\n                environments {\n                    id\n                    name\n                }\n                status\n            }\n            ... on GetEnvironmentsError {\n                status\n                message\n            }\n        }\n    }\n': typeof types.EnvironmentsQueryDocument;
  '\n    query ProjectsQuery {\n    all_projects {\n      ... on ProjectSuccess {\n        result\n        data {\n            id\n            name\n            description\n            slug\n            url\n            created_at\n            updated_at\n        }\n      }\n      ... on ProjectError {\n        result\n        message\n      }\n    }\n}\n': typeof types.ProjectsQueryDocument;
  '\nquery GetProjectDetails($projectSlug: String!) {\n  get_project_details(project_slug: $projectSlug) {\n    ... on GetProjectDetailsResultSuccess {\n      status\n      data {\n        name\n        description\n        slug\n      }\n    }\n    ... on GetProjectDetailsResultError {\n      status\n      message\n    }\n  }\n}\n': typeof types.GetProjectDetailsDocument;
  'query GetRepositories($page: Int, $perPage: Int, $sortBy: GithubRepositorySortBy, $sortDirection: GithubRepositorySortDirection) {\n        get_repositories(page: $page, per_page: $perPage, sortBy: $sortBy, sortDirection: $sortDirection) {\n            ... on GetRepositorySuccessResult {\n                status\n                data {\n                    id\n                    name\n                    owner {\n                        id\n                        login\n                        avatar_url\n                    }\n                    description\n                    url\n                    git_url\n                    is_private\n                    created_at\n                    updated_at\n                }\n            }\n            ... on GetRepositoryErrorResult {\n                status\n                message\n            }\n        }\n    }': typeof types.GetRepositoriesDocument;
  'query SearchRepositories($keyword: String!, $page: Int, $perPage: Int, $sortBy: GithubRepositorySortBy, $sortDirection: GithubRepositorySortDirection) {\n    search_repositories(keyword: $keyword, page: $page, per_page: $perPage, sortBy: $sortBy, sortDirection: $sortDirection) {\n      ... on SearchRepositorySuccessResult {\n        status\n        data {\n          id\n          name\n          owner {\n            id\n            login\n            avatar_url\n          }\n          description\n          url\n          git_url\n          is_private\n          created_at\n          updated_at\n        }\n        total_count\n      }\n      ... on SearchRepositoryErrorResult {\n        status\n        message\n      }\n    }\n  }\n': typeof types.SearchRepositoriesDocument;
  'query GetBranches($owner: String!, $repo: String!) {\n      get_branches(owner: $owner, repo: $repo) {\n      ... on GetBranchesSuccessResult {\n        status\n        data\n      }\n      ... on GetBranchesErrorResult {\n        status\n        message\n      }\n    }\n  }': typeof types.GetBranchesDocument;
  '\nquery GetTeamMembers($projectSlug: String!) {\n  team_members(project_slug: $projectSlug) {\n    ... on GetTeamSuccess {\n      status\n      team {\n        slug\n        members {\n          email\n          name\n          profile_url\n          status\n          permissions\n        }\n      }\n    }\n    ... on GetTeamError {\n      status\n      message\n    }\n  }\n}\n': typeof types.GetTeamMembersDocument;
  '\n  query GetUserInfoQuery {\n  user_info {\n    name\n    email\n    profile_pic_url\n    current_plan_id\n    is_trial\n    }\n  }\n\n': typeof types.GetUserInfoQueryDocument;
  '\n  query Balance {\n    balance {\n      ... on BalanceResultSuccess {\n        status\n        balance\n        currency\n      }\n      ... on BalanceResultError {\n        status\n        message\n      }\n    }\n  }\n': typeof types.BalanceDocument;
};
const documents: Documents = {
  '\n    mutation UpdateServiceSettings($serviceId: Float!, $port: String!, $useAiReview: Boolean!, $domain: String!) {\n      updateServiceSettings(service_id: $serviceId, port: $port, use_ai_review: $useAiReview, domain: $domain) {\n          ... on UpdateServiceSettingsSuccessResult {\n          status\n          }\n          ... on UpdateServiceSettingsErrorResult {\n          status\n          message\n          }\n      }\n    }\n':
    types.UpdateServiceSettingsDocument,
  '\n  mutation ConnectGithubBranch($serviceId: Int!, $environmentId: Int!, $branch: String!) {\n    connect_github_branch(service_id: $serviceId, environment_id: $environmentId, branch: $branch) {\n      ... on ConnectGithubBranchSuccess {\n        status\n      }\n      ... on ConnectGithubBranchError {\n        status\n        message\n      }\n    }\n  }\n':
    types.ConnectGithubBranchDocument,
  '\n    mutation CreateEnvironment($projectSlug: String!, $environment: AddEnvironmentsInput!) {\n        add_environment(project_slug: $projectSlug, environment: $environment) {\n            ... on AddEnvironmentsSuccess {\n                status\n            }\n            ... on AddEnvironmentsError {\n                status\n                message\n            }\n        }\n    }\n':
    types.CreateEnvironmentDocument,
  '\n    mutation Edit_environment_value($input: EditEnvironmentValueInput!) {\n    edit_environment_value(input: $input) {\n        ... on EditEnvironmentValueSuccess {\n        status\n        }\n        ... on EditEnvironmentValueError {\n        status\n        message\n        }\n    }\n    }\n':
    types.Edit_Environment_ValueDocument,
  '\n  mutation CreateProjectMutation($name: String!, $description: String) {\n    create_project(name: $name, description: $description) {\n      ... on CreateProjectSuccess {\n        status\n        data {\n          name\n          description\n          id\n          slug\n          url\n        }\n      }\n      ... on CreateProjectError {\n        status\n        message\n      }\n    }\n  }\n':
    types.CreateProjectMutationDocument,
  '\n  mutation DeleteProjectMutation($slug: String!) {\n    delete_project(slug: $slug) {\n      ... on DeleteProjectSuccess {\n        message\n        status\n      }\n      ... on DeleteProjectError {\n        message\n        status\n      }\n    }\n  }\n':
    types.DeleteProjectMutationDocument,
  '\nmutation UpdateProjectDetailsMutation($projectSlug: String!, $input: UpdateProjectDetailsInput!) {\n  update_project_details(project_slug: $projectSlug, input: $input) {\n    ... on UpdateProjectDetailsResultSuccess {\n      status\n    }\n    ... on UpdateProjectDetailsResultError {\n      status\n      message\n    }\n  }\n}\n':
    types.UpdateProjectDetailsMutationDocument,
  '\n    mutation RequestDeployment($projectSlug: String!, $serviceId: Float!, $environmentId: Float!) {\n        request_deployment(project_slug: $projectSlug, service_id: $serviceId, environment_id: $environmentId) {\n            ... on DeploymentRequestSuccessResult {\n                status\n                deployment {\n                    id\n                }\n                message\n            }\n            ... on DeploymentRequestErrorResult {\n                status\n                message\n            }\n        }\n    }\n':
    types.RequestDeploymentDocument,
  '\n  mutation CreateServiceMutation($input: CreateNewServiceInput!) {\n  create_service(input: $input) {\n    ... on CreateNewServiceSuccessResult {\n      status\n      data {\n        id\n        projectId\n        serviceType\n      }\n      message\n    }\n    ... on CreateNewServiceErrorResult {\n      status\n      message\n    }\n  }\n}\n':
    types.CreateServiceMutationDocument,
  '\n  mutation DeleteServiceMutation($projectSlug: String!, $serviceId: Float!) {\n    delete_service(project_slug: $projectSlug, service_id: $serviceId) {\n      ... on DeleteServiceResultSuccess {\n        status\n      }\n      ... on DeleteServiceResultError {\n        status\n        message\n      }\n    }\n  }\n':
    types.DeleteServiceMutationDocument,
  '\n    mutation AddTeamMember($projectSlug: String!, $member: AddTeamMemberInput!) {\n    add_team_member(project_slug: $projectSlug, member: $member) {\n      ... on AddTeamMemberSuccessResult {\n        email\n        status\n      }\n      ... on AddTeamMemberErrorResult {\n        status\n        message\n      }\n    }\n  }\n':
    types.AddTeamMemberDocument,
  '\n  mutation RemoveTeamMember($projectSlug: String!, $email: String!) {\n  remove_team_member(project_slug: $projectSlug, email: $email) {\n    ... on RemoveTeamMemberResultSuccess {\n      status\n      message\n    }\n    ... on RemoveTeamMemberResultError {\n      status\n      message\n    }\n  }\n}\n':
    types.RemoveTeamMemberDocument,
  '\n   mutation Topup($data: CreatePaymentInput!) {\n    topup(data: $data) {\n        ... on CreatePaymentSuccessResult {\n        status\n        payment_url\n        }\n        ... on CreatePaymentErrorResult {\n        status\n        message\n        }\n    }\n}\n':
    types.TopupDocument,
  '\n  query GetAllServices($projectSlug: String!) {\n    get_all_services(project_slug: $projectSlug) {\n      ... on GetAllServicesSuccessResult {\n        status\n        services {\n          id\n          type\n          name\n          lastDeploymentDate\n        }\n      }\n      ... on GetAllServicesFailedResult {\n        status\n        message\n      }\n    }\n  }\n':
    types.GetAllServicesDocument,
  '\n    query DatabaseServicesQuery{\n        get_database_services {\n            ... on GetDatabaseServiceSuccess {\n                status\n                data {\n                    id\n                    name\n                    icon\n                }\n            }\n            ... on GetDatabaseServiceError {\n                status\n                message\n            }\n        }\n    }\n':
    types.DatabaseServicesQueryDocument,
  '\n    query GetDeploymentsHistory($page: Int, $perPage: Int, $projectSlug: String!, $serviceId: Float!) {\n        deployments_history(page: $page, per_page: $perPage, project_slug: $projectSlug, service_id: $serviceId) {\n            ... on DeploymentHistorySuccessResult {\n                status\n                data {\n                    id\n                    status\n                    commitHash\n                    branch\n                    commiterAvatar\n                    createdAt\n                }\n            }\n            ... on DeploymentHistoryErrorResult {\n                status\n                message\n            }\n        }\n    }\n':
    types.GetDeploymentsHistoryDocument,
  '\nquery GetServiceSettings($serviceId: Float!) {\n  getServiceSettings(service_id: $serviceId) {\n    ... on GetServiceSettingsSuccessResult {\n      status\n      data {\n        port\n        use_ai_review\n        domain\n      }\n    }\n    ... on GetServiceSettingsErrorResult {\n      status\n      message\n    }\n  }\n}\n':
    types.GetServiceSettingsDocument,
  '\n  query Get_github_service_info($serviceId: Int!, $environmentId: Int!) {\n    get_github_service_info(service_id: $serviceId, environment_id: $environmentId) {\n      ... on GetGithubServiceInfoSuccess {\n        status\n        githubServiceInfo {\n          owner\n          name\n          connectedBranch\n        }\n      }\n      ... on GetGithubServiceInfoError {\n        status\n        message\n      }\n    }\n  }\n':
    types.Get_Github_Service_InfoDocument,
  '\n  query GetEnvironmentValues($input: GetEnvironmentValuesInput!) {\n    environment_values(input: $input) {\n        ... on GetEnvironmentValuesSuccessResult {\n        environmentValues {\n            id\n            key\n            value\n        }\n        status\n        }\n        ... on GetEnvironmentValuesErrorResult {\n        status\n        message\n        }\n    }\n}\n':
    types.GetEnvironmentValuesDocument,
  '\n    query EnvironmentsQuery($projectSlug: String!) {\n        environments(project_slug: $projectSlug) {\n            ... on GetEnvironmentsSuccess {\n                environments {\n                    id\n                    name\n                }\n                status\n            }\n            ... on GetEnvironmentsError {\n                status\n                message\n            }\n        }\n    }\n':
    types.EnvironmentsQueryDocument,
  '\n    query ProjectsQuery {\n    all_projects {\n      ... on ProjectSuccess {\n        result\n        data {\n            id\n            name\n            description\n            slug\n            url\n            created_at\n            updated_at\n        }\n      }\n      ... on ProjectError {\n        result\n        message\n      }\n    }\n}\n':
    types.ProjectsQueryDocument,
  '\nquery GetProjectDetails($projectSlug: String!) {\n  get_project_details(project_slug: $projectSlug) {\n    ... on GetProjectDetailsResultSuccess {\n      status\n      data {\n        name\n        description\n        slug\n      }\n    }\n    ... on GetProjectDetailsResultError {\n      status\n      message\n    }\n  }\n}\n':
    types.GetProjectDetailsDocument,
  'query GetRepositories($page: Int, $perPage: Int, $sortBy: GithubRepositorySortBy, $sortDirection: GithubRepositorySortDirection) {\n        get_repositories(page: $page, per_page: $perPage, sortBy: $sortBy, sortDirection: $sortDirection) {\n            ... on GetRepositorySuccessResult {\n                status\n                data {\n                    id\n                    name\n                    owner {\n                        id\n                        login\n                        avatar_url\n                    }\n                    description\n                    url\n                    git_url\n                    is_private\n                    created_at\n                    updated_at\n                }\n            }\n            ... on GetRepositoryErrorResult {\n                status\n                message\n            }\n        }\n    }':
    types.GetRepositoriesDocument,
  'query SearchRepositories($keyword: String!, $page: Int, $perPage: Int, $sortBy: GithubRepositorySortBy, $sortDirection: GithubRepositorySortDirection) {\n    search_repositories(keyword: $keyword, page: $page, per_page: $perPage, sortBy: $sortBy, sortDirection: $sortDirection) {\n      ... on SearchRepositorySuccessResult {\n        status\n        data {\n          id\n          name\n          owner {\n            id\n            login\n            avatar_url\n          }\n          description\n          url\n          git_url\n          is_private\n          created_at\n          updated_at\n        }\n        total_count\n      }\n      ... on SearchRepositoryErrorResult {\n        status\n        message\n      }\n    }\n  }\n':
    types.SearchRepositoriesDocument,
  'query GetBranches($owner: String!, $repo: String!) {\n      get_branches(owner: $owner, repo: $repo) {\n      ... on GetBranchesSuccessResult {\n        status\n        data\n      }\n      ... on GetBranchesErrorResult {\n        status\n        message\n      }\n    }\n  }':
    types.GetBranchesDocument,
  '\nquery GetTeamMembers($projectSlug: String!) {\n  team_members(project_slug: $projectSlug) {\n    ... on GetTeamSuccess {\n      status\n      team {\n        slug\n        members {\n          email\n          name\n          profile_url\n          status\n          permissions\n        }\n      }\n    }\n    ... on GetTeamError {\n      status\n      message\n    }\n  }\n}\n':
    types.GetTeamMembersDocument,
  '\n  query GetUserInfoQuery {\n  user_info {\n    name\n    email\n    profile_pic_url\n    current_plan_id\n    is_trial\n    }\n  }\n\n':
    types.GetUserInfoQueryDocument,
  '\n  query Balance {\n    balance {\n      ... on BalanceResultSuccess {\n        status\n        balance\n        currency\n      }\n      ... on BalanceResultError {\n        status\n        message\n      }\n    }\n  }\n':
    types.BalanceDocument,
};

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = gql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function gql(source: string): unknown;

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: '\n    mutation UpdateServiceSettings($serviceId: Float!, $port: String!, $useAiReview: Boolean!, $domain: String!) {\n      updateServiceSettings(service_id: $serviceId, port: $port, use_ai_review: $useAiReview, domain: $domain) {\n          ... on UpdateServiceSettingsSuccessResult {\n          status\n          }\n          ... on UpdateServiceSettingsErrorResult {\n          status\n          message\n          }\n      }\n    }\n'
): (typeof documents)['\n    mutation UpdateServiceSettings($serviceId: Float!, $port: String!, $useAiReview: Boolean!, $domain: String!) {\n      updateServiceSettings(service_id: $serviceId, port: $port, use_ai_review: $useAiReview, domain: $domain) {\n          ... on UpdateServiceSettingsSuccessResult {\n          status\n          }\n          ... on UpdateServiceSettingsErrorResult {\n          status\n          message\n          }\n      }\n    }\n'];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: '\n  mutation ConnectGithubBranch($serviceId: Int!, $environmentId: Int!, $branch: String!) {\n    connect_github_branch(service_id: $serviceId, environment_id: $environmentId, branch: $branch) {\n      ... on ConnectGithubBranchSuccess {\n        status\n      }\n      ... on ConnectGithubBranchError {\n        status\n        message\n      }\n    }\n  }\n'
): (typeof documents)['\n  mutation ConnectGithubBranch($serviceId: Int!, $environmentId: Int!, $branch: String!) {\n    connect_github_branch(service_id: $serviceId, environment_id: $environmentId, branch: $branch) {\n      ... on ConnectGithubBranchSuccess {\n        status\n      }\n      ... on ConnectGithubBranchError {\n        status\n        message\n      }\n    }\n  }\n'];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: '\n    mutation CreateEnvironment($projectSlug: String!, $environment: AddEnvironmentsInput!) {\n        add_environment(project_slug: $projectSlug, environment: $environment) {\n            ... on AddEnvironmentsSuccess {\n                status\n            }\n            ... on AddEnvironmentsError {\n                status\n                message\n            }\n        }\n    }\n'
): (typeof documents)['\n    mutation CreateEnvironment($projectSlug: String!, $environment: AddEnvironmentsInput!) {\n        add_environment(project_slug: $projectSlug, environment: $environment) {\n            ... on AddEnvironmentsSuccess {\n                status\n            }\n            ... on AddEnvironmentsError {\n                status\n                message\n            }\n        }\n    }\n'];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: '\n    mutation Edit_environment_value($input: EditEnvironmentValueInput!) {\n    edit_environment_value(input: $input) {\n        ... on EditEnvironmentValueSuccess {\n        status\n        }\n        ... on EditEnvironmentValueError {\n        status\n        message\n        }\n    }\n    }\n'
): (typeof documents)['\n    mutation Edit_environment_value($input: EditEnvironmentValueInput!) {\n    edit_environment_value(input: $input) {\n        ... on EditEnvironmentValueSuccess {\n        status\n        }\n        ... on EditEnvironmentValueError {\n        status\n        message\n        }\n    }\n    }\n'];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: '\n  mutation CreateProjectMutation($name: String!, $description: String) {\n    create_project(name: $name, description: $description) {\n      ... on CreateProjectSuccess {\n        status\n        data {\n          name\n          description\n          id\n          slug\n          url\n        }\n      }\n      ... on CreateProjectError {\n        status\n        message\n      }\n    }\n  }\n'
): (typeof documents)['\n  mutation CreateProjectMutation($name: String!, $description: String) {\n    create_project(name: $name, description: $description) {\n      ... on CreateProjectSuccess {\n        status\n        data {\n          name\n          description\n          id\n          slug\n          url\n        }\n      }\n      ... on CreateProjectError {\n        status\n        message\n      }\n    }\n  }\n'];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: '\n  mutation DeleteProjectMutation($slug: String!) {\n    delete_project(slug: $slug) {\n      ... on DeleteProjectSuccess {\n        message\n        status\n      }\n      ... on DeleteProjectError {\n        message\n        status\n      }\n    }\n  }\n'
): (typeof documents)['\n  mutation DeleteProjectMutation($slug: String!) {\n    delete_project(slug: $slug) {\n      ... on DeleteProjectSuccess {\n        message\n        status\n      }\n      ... on DeleteProjectError {\n        message\n        status\n      }\n    }\n  }\n'];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: '\nmutation UpdateProjectDetailsMutation($projectSlug: String!, $input: UpdateProjectDetailsInput!) {\n  update_project_details(project_slug: $projectSlug, input: $input) {\n    ... on UpdateProjectDetailsResultSuccess {\n      status\n    }\n    ... on UpdateProjectDetailsResultError {\n      status\n      message\n    }\n  }\n}\n'
): (typeof documents)['\nmutation UpdateProjectDetailsMutation($projectSlug: String!, $input: UpdateProjectDetailsInput!) {\n  update_project_details(project_slug: $projectSlug, input: $input) {\n    ... on UpdateProjectDetailsResultSuccess {\n      status\n    }\n    ... on UpdateProjectDetailsResultError {\n      status\n      message\n    }\n  }\n}\n'];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: '\n    mutation RequestDeployment($projectSlug: String!, $serviceId: Float!, $environmentId: Float!) {\n        request_deployment(project_slug: $projectSlug, service_id: $serviceId, environment_id: $environmentId) {\n            ... on DeploymentRequestSuccessResult {\n                status\n                deployment {\n                    id\n                }\n                message\n            }\n            ... on DeploymentRequestErrorResult {\n                status\n                message\n            }\n        }\n    }\n'
): (typeof documents)['\n    mutation RequestDeployment($projectSlug: String!, $serviceId: Float!, $environmentId: Float!) {\n        request_deployment(project_slug: $projectSlug, service_id: $serviceId, environment_id: $environmentId) {\n            ... on DeploymentRequestSuccessResult {\n                status\n                deployment {\n                    id\n                }\n                message\n            }\n            ... on DeploymentRequestErrorResult {\n                status\n                message\n            }\n        }\n    }\n'];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: '\n  mutation CreateServiceMutation($input: CreateNewServiceInput!) {\n  create_service(input: $input) {\n    ... on CreateNewServiceSuccessResult {\n      status\n      data {\n        id\n        projectId\n        serviceType\n      }\n      message\n    }\n    ... on CreateNewServiceErrorResult {\n      status\n      message\n    }\n  }\n}\n'
): (typeof documents)['\n  mutation CreateServiceMutation($input: CreateNewServiceInput!) {\n  create_service(input: $input) {\n    ... on CreateNewServiceSuccessResult {\n      status\n      data {\n        id\n        projectId\n        serviceType\n      }\n      message\n    }\n    ... on CreateNewServiceErrorResult {\n      status\n      message\n    }\n  }\n}\n'];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: '\n  mutation DeleteServiceMutation($projectSlug: String!, $serviceId: Float!) {\n    delete_service(project_slug: $projectSlug, service_id: $serviceId) {\n      ... on DeleteServiceResultSuccess {\n        status\n      }\n      ... on DeleteServiceResultError {\n        status\n        message\n      }\n    }\n  }\n'
): (typeof documents)['\n  mutation DeleteServiceMutation($projectSlug: String!, $serviceId: Float!) {\n    delete_service(project_slug: $projectSlug, service_id: $serviceId) {\n      ... on DeleteServiceResultSuccess {\n        status\n      }\n      ... on DeleteServiceResultError {\n        status\n        message\n      }\n    }\n  }\n'];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: '\n    mutation AddTeamMember($projectSlug: String!, $member: AddTeamMemberInput!) {\n    add_team_member(project_slug: $projectSlug, member: $member) {\n      ... on AddTeamMemberSuccessResult {\n        email\n        status\n      }\n      ... on AddTeamMemberErrorResult {\n        status\n        message\n      }\n    }\n  }\n'
): (typeof documents)['\n    mutation AddTeamMember($projectSlug: String!, $member: AddTeamMemberInput!) {\n    add_team_member(project_slug: $projectSlug, member: $member) {\n      ... on AddTeamMemberSuccessResult {\n        email\n        status\n      }\n      ... on AddTeamMemberErrorResult {\n        status\n        message\n      }\n    }\n  }\n'];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: '\n  mutation RemoveTeamMember($projectSlug: String!, $email: String!) {\n  remove_team_member(project_slug: $projectSlug, email: $email) {\n    ... on RemoveTeamMemberResultSuccess {\n      status\n      message\n    }\n    ... on RemoveTeamMemberResultError {\n      status\n      message\n    }\n  }\n}\n'
): (typeof documents)['\n  mutation RemoveTeamMember($projectSlug: String!, $email: String!) {\n  remove_team_member(project_slug: $projectSlug, email: $email) {\n    ... on RemoveTeamMemberResultSuccess {\n      status\n      message\n    }\n    ... on RemoveTeamMemberResultError {\n      status\n      message\n    }\n  }\n}\n'];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: '\n   mutation Topup($data: CreatePaymentInput!) {\n    topup(data: $data) {\n        ... on CreatePaymentSuccessResult {\n        status\n        payment_url\n        }\n        ... on CreatePaymentErrorResult {\n        status\n        message\n        }\n    }\n}\n'
): (typeof documents)['\n   mutation Topup($data: CreatePaymentInput!) {\n    topup(data: $data) {\n        ... on CreatePaymentSuccessResult {\n        status\n        payment_url\n        }\n        ... on CreatePaymentErrorResult {\n        status\n        message\n        }\n    }\n}\n'];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: '\n  query GetAllServices($projectSlug: String!) {\n    get_all_services(project_slug: $projectSlug) {\n      ... on GetAllServicesSuccessResult {\n        status\n        services {\n          id\n          type\n          name\n          lastDeploymentDate\n        }\n      }\n      ... on GetAllServicesFailedResult {\n        status\n        message\n      }\n    }\n  }\n'
): (typeof documents)['\n  query GetAllServices($projectSlug: String!) {\n    get_all_services(project_slug: $projectSlug) {\n      ... on GetAllServicesSuccessResult {\n        status\n        services {\n          id\n          type\n          name\n          lastDeploymentDate\n        }\n      }\n      ... on GetAllServicesFailedResult {\n        status\n        message\n      }\n    }\n  }\n'];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: '\n    query DatabaseServicesQuery{\n        get_database_services {\n            ... on GetDatabaseServiceSuccess {\n                status\n                data {\n                    id\n                    name\n                    icon\n                }\n            }\n            ... on GetDatabaseServiceError {\n                status\n                message\n            }\n        }\n    }\n'
): (typeof documents)['\n    query DatabaseServicesQuery{\n        get_database_services {\n            ... on GetDatabaseServiceSuccess {\n                status\n                data {\n                    id\n                    name\n                    icon\n                }\n            }\n            ... on GetDatabaseServiceError {\n                status\n                message\n            }\n        }\n    }\n'];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: '\n    query GetDeploymentsHistory($page: Int, $perPage: Int, $projectSlug: String!, $serviceId: Float!) {\n        deployments_history(page: $page, per_page: $perPage, project_slug: $projectSlug, service_id: $serviceId) {\n            ... on DeploymentHistorySuccessResult {\n                status\n                data {\n                    id\n                    status\n                    commitHash\n                    branch\n                    commiterAvatar\n                    createdAt\n                }\n            }\n            ... on DeploymentHistoryErrorResult {\n                status\n                message\n            }\n        }\n    }\n'
): (typeof documents)['\n    query GetDeploymentsHistory($page: Int, $perPage: Int, $projectSlug: String!, $serviceId: Float!) {\n        deployments_history(page: $page, per_page: $perPage, project_slug: $projectSlug, service_id: $serviceId) {\n            ... on DeploymentHistorySuccessResult {\n                status\n                data {\n                    id\n                    status\n                    commitHash\n                    branch\n                    commiterAvatar\n                    createdAt\n                }\n            }\n            ... on DeploymentHistoryErrorResult {\n                status\n                message\n            }\n        }\n    }\n'];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: '\nquery GetServiceSettings($serviceId: Float!) {\n  getServiceSettings(service_id: $serviceId) {\n    ... on GetServiceSettingsSuccessResult {\n      status\n      data {\n        port\n        use_ai_review\n        domain\n      }\n    }\n    ... on GetServiceSettingsErrorResult {\n      status\n      message\n    }\n  }\n}\n'
): (typeof documents)['\nquery GetServiceSettings($serviceId: Float!) {\n  getServiceSettings(service_id: $serviceId) {\n    ... on GetServiceSettingsSuccessResult {\n      status\n      data {\n        port\n        use_ai_review\n        domain\n      }\n    }\n    ... on GetServiceSettingsErrorResult {\n      status\n      message\n    }\n  }\n}\n'];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: '\n  query Get_github_service_info($serviceId: Int!, $environmentId: Int!) {\n    get_github_service_info(service_id: $serviceId, environment_id: $environmentId) {\n      ... on GetGithubServiceInfoSuccess {\n        status\n        githubServiceInfo {\n          owner\n          name\n          connectedBranch\n        }\n      }\n      ... on GetGithubServiceInfoError {\n        status\n        message\n      }\n    }\n  }\n'
): (typeof documents)['\n  query Get_github_service_info($serviceId: Int!, $environmentId: Int!) {\n    get_github_service_info(service_id: $serviceId, environment_id: $environmentId) {\n      ... on GetGithubServiceInfoSuccess {\n        status\n        githubServiceInfo {\n          owner\n          name\n          connectedBranch\n        }\n      }\n      ... on GetGithubServiceInfoError {\n        status\n        message\n      }\n    }\n  }\n'];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: '\n  query GetEnvironmentValues($input: GetEnvironmentValuesInput!) {\n    environment_values(input: $input) {\n        ... on GetEnvironmentValuesSuccessResult {\n        environmentValues {\n            id\n            key\n            value\n        }\n        status\n        }\n        ... on GetEnvironmentValuesErrorResult {\n        status\n        message\n        }\n    }\n}\n'
): (typeof documents)['\n  query GetEnvironmentValues($input: GetEnvironmentValuesInput!) {\n    environment_values(input: $input) {\n        ... on GetEnvironmentValuesSuccessResult {\n        environmentValues {\n            id\n            key\n            value\n        }\n        status\n        }\n        ... on GetEnvironmentValuesErrorResult {\n        status\n        message\n        }\n    }\n}\n'];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: '\n    query EnvironmentsQuery($projectSlug: String!) {\n        environments(project_slug: $projectSlug) {\n            ... on GetEnvironmentsSuccess {\n                environments {\n                    id\n                    name\n                }\n                status\n            }\n            ... on GetEnvironmentsError {\n                status\n                message\n            }\n        }\n    }\n'
): (typeof documents)['\n    query EnvironmentsQuery($projectSlug: String!) {\n        environments(project_slug: $projectSlug) {\n            ... on GetEnvironmentsSuccess {\n                environments {\n                    id\n                    name\n                }\n                status\n            }\n            ... on GetEnvironmentsError {\n                status\n                message\n            }\n        }\n    }\n'];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: '\n    query ProjectsQuery {\n    all_projects {\n      ... on ProjectSuccess {\n        result\n        data {\n            id\n            name\n            description\n            slug\n            url\n            created_at\n            updated_at\n        }\n      }\n      ... on ProjectError {\n        result\n        message\n      }\n    }\n}\n'
): (typeof documents)['\n    query ProjectsQuery {\n    all_projects {\n      ... on ProjectSuccess {\n        result\n        data {\n            id\n            name\n            description\n            slug\n            url\n            created_at\n            updated_at\n        }\n      }\n      ... on ProjectError {\n        result\n        message\n      }\n    }\n}\n'];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: '\nquery GetProjectDetails($projectSlug: String!) {\n  get_project_details(project_slug: $projectSlug) {\n    ... on GetProjectDetailsResultSuccess {\n      status\n      data {\n        name\n        description\n        slug\n      }\n    }\n    ... on GetProjectDetailsResultError {\n      status\n      message\n    }\n  }\n}\n'
): (typeof documents)['\nquery GetProjectDetails($projectSlug: String!) {\n  get_project_details(project_slug: $projectSlug) {\n    ... on GetProjectDetailsResultSuccess {\n      status\n      data {\n        name\n        description\n        slug\n      }\n    }\n    ... on GetProjectDetailsResultError {\n      status\n      message\n    }\n  }\n}\n'];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: 'query GetRepositories($page: Int, $perPage: Int, $sortBy: GithubRepositorySortBy, $sortDirection: GithubRepositorySortDirection) {\n        get_repositories(page: $page, per_page: $perPage, sortBy: $sortBy, sortDirection: $sortDirection) {\n            ... on GetRepositorySuccessResult {\n                status\n                data {\n                    id\n                    name\n                    owner {\n                        id\n                        login\n                        avatar_url\n                    }\n                    description\n                    url\n                    git_url\n                    is_private\n                    created_at\n                    updated_at\n                }\n            }\n            ... on GetRepositoryErrorResult {\n                status\n                message\n            }\n        }\n    }'
): (typeof documents)['query GetRepositories($page: Int, $perPage: Int, $sortBy: GithubRepositorySortBy, $sortDirection: GithubRepositorySortDirection) {\n        get_repositories(page: $page, per_page: $perPage, sortBy: $sortBy, sortDirection: $sortDirection) {\n            ... on GetRepositorySuccessResult {\n                status\n                data {\n                    id\n                    name\n                    owner {\n                        id\n                        login\n                        avatar_url\n                    }\n                    description\n                    url\n                    git_url\n                    is_private\n                    created_at\n                    updated_at\n                }\n            }\n            ... on GetRepositoryErrorResult {\n                status\n                message\n            }\n        }\n    }'];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: 'query SearchRepositories($keyword: String!, $page: Int, $perPage: Int, $sortBy: GithubRepositorySortBy, $sortDirection: GithubRepositorySortDirection) {\n    search_repositories(keyword: $keyword, page: $page, per_page: $perPage, sortBy: $sortBy, sortDirection: $sortDirection) {\n      ... on SearchRepositorySuccessResult {\n        status\n        data {\n          id\n          name\n          owner {\n            id\n            login\n            avatar_url\n          }\n          description\n          url\n          git_url\n          is_private\n          created_at\n          updated_at\n        }\n        total_count\n      }\n      ... on SearchRepositoryErrorResult {\n        status\n        message\n      }\n    }\n  }\n'
): (typeof documents)['query SearchRepositories($keyword: String!, $page: Int, $perPage: Int, $sortBy: GithubRepositorySortBy, $sortDirection: GithubRepositorySortDirection) {\n    search_repositories(keyword: $keyword, page: $page, per_page: $perPage, sortBy: $sortBy, sortDirection: $sortDirection) {\n      ... on SearchRepositorySuccessResult {\n        status\n        data {\n          id\n          name\n          owner {\n            id\n            login\n            avatar_url\n          }\n          description\n          url\n          git_url\n          is_private\n          created_at\n          updated_at\n        }\n        total_count\n      }\n      ... on SearchRepositoryErrorResult {\n        status\n        message\n      }\n    }\n  }\n'];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: 'query GetBranches($owner: String!, $repo: String!) {\n      get_branches(owner: $owner, repo: $repo) {\n      ... on GetBranchesSuccessResult {\n        status\n        data\n      }\n      ... on GetBranchesErrorResult {\n        status\n        message\n      }\n    }\n  }'
): (typeof documents)['query GetBranches($owner: String!, $repo: String!) {\n      get_branches(owner: $owner, repo: $repo) {\n      ... on GetBranchesSuccessResult {\n        status\n        data\n      }\n      ... on GetBranchesErrorResult {\n        status\n        message\n      }\n    }\n  }'];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: '\nquery GetTeamMembers($projectSlug: String!) {\n  team_members(project_slug: $projectSlug) {\n    ... on GetTeamSuccess {\n      status\n      team {\n        slug\n        members {\n          email\n          name\n          profile_url\n          status\n          permissions\n        }\n      }\n    }\n    ... on GetTeamError {\n      status\n      message\n    }\n  }\n}\n'
): (typeof documents)['\nquery GetTeamMembers($projectSlug: String!) {\n  team_members(project_slug: $projectSlug) {\n    ... on GetTeamSuccess {\n      status\n      team {\n        slug\n        members {\n          email\n          name\n          profile_url\n          status\n          permissions\n        }\n      }\n    }\n    ... on GetTeamError {\n      status\n      message\n    }\n  }\n}\n'];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: '\n  query GetUserInfoQuery {\n  user_info {\n    name\n    email\n    profile_pic_url\n    current_plan_id\n    is_trial\n    }\n  }\n\n'
): (typeof documents)['\n  query GetUserInfoQuery {\n  user_info {\n    name\n    email\n    profile_pic_url\n    current_plan_id\n    is_trial\n    }\n  }\n\n'];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: '\n  query Balance {\n    balance {\n      ... on BalanceResultSuccess {\n        status\n        balance\n        currency\n      }\n      ... on BalanceResultError {\n        status\n        message\n      }\n    }\n  }\n'
): (typeof documents)['\n  query Balance {\n    balance {\n      ... on BalanceResultSuccess {\n        status\n        balance\n        currency\n      }\n      ... on BalanceResultError {\n        status\n        message\n      }\n    }\n  }\n'];

export function gql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> =
  TDocumentNode extends DocumentNode<infer TType, any> ? TType : never;
