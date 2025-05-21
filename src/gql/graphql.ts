/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = {
  [_ in K]?: never;
};
export type Incremental<T> =
  | T
  | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string };
  String: { input: string; output: string };
  Boolean: { input: boolean; output: boolean };
  Int: { input: number; output: number };
  Float: { input: number; output: number };
  /** A date-time string at UTC, such as 2019-12-03T09:54:33Z, compliant with the date-time format. */
  DateTime: { input: any; output: any };
};

export type AcceptJoinTeamError = {
  __typename?: 'AcceptJoinTeamError';
  /** The error message */
  message?: Maybe<Scalars['String']['output']>;
  /** The status of the response */
  status: Status;
};

export type AcceptJoinTeamResult = AcceptJoinTeamError | AcceptJoinTeamSuccess;

export type AcceptJoinTeamSuccess = {
  __typename?: 'AcceptJoinTeamSuccess';
  /** The status of the response */
  status: Status;
};

export type AddEnvironmentValueInput = {
  /** The key of the environment value */
  key: Scalars['String']['input'];
  /** The value of the environment value */
  value: Scalars['String']['input'];
};

/** The error result of adding environments */
export type AddEnvironmentsError = {
  __typename?: 'AddEnvironmentsError';
  /** The error message */
  message?: Maybe<Scalars['String']['output']>;
  /** The status of the result */
  status: Status;
};

/** The input for adding environments */
export type AddEnvironmentsInput = {
  /** The description of the environment */
  description?: InputMaybe<Scalars['String']['input']>;
  /** The name of the environment */
  name: Scalars['String']['input'];
};

export type AddEnvironmentsResult = AddEnvironmentsError | AddEnvironmentsSuccess;

/** The result of adding environments */
export type AddEnvironmentsSuccess = {
  __typename?: 'AddEnvironmentsSuccess';
  /** The status of the result */
  status: Status;
};

export type AddTeamMemberErrorResult = {
  __typename?: 'AddTeamMemberErrorResult';
  /** The error message */
  message: Scalars['String']['output'];
  /** The status of the response */
  status: Status;
};

export type AddTeamMemberInput = {
  /** The email of the team member */
  email: Scalars['String']['input'];
  /** The permissions of the team member */
  permissions: Array<Scalars['Int']['input']>;
};

export type AddTeamMemberResult = AddTeamMemberErrorResult | AddTeamMemberSuccessResult;

export type AddTeamMemberSuccessResult = {
  __typename?: 'AddTeamMemberSuccessResult';
  /** The email of the team member */
  email: Scalars['String']['output'];
  /** The status of the response */
  status: Status;
};

export type BalanceResult = BalanceResultError | BalanceResultSuccess;

/** The balance of the user */
export type BalanceResultError = {
  __typename?: 'BalanceResultError';
  /** The error message */
  message?: Maybe<Scalars['String']['output']>;
  /** The status of the balance */
  status: Status;
};

/** The balance of the user */
export type BalanceResultSuccess = {
  __typename?: 'BalanceResultSuccess';
  /** The balance of the user */
  balance: Scalars['String']['output'];
  /** The currency of the balance */
  currency: Scalars['String']['output'];
  /** The status of the balance */
  status: Status;
};

/** The result of connecting a github branch to an environment error */
export type ConnectGithubBranchError = {
  __typename?: 'ConnectGithubBranchError';
  /** The message of the result */
  message?: Maybe<Scalars['String']['output']>;
  /** The status of the result */
  status: Status;
};

/** The result of connecting a github branch to an environment */
export type ConnectGithubBranchResult = ConnectGithubBranchError | ConnectGithubBranchSuccess;

/** The result of connecting a github branch to an environment */
export type ConnectGithubBranchSuccess = {
  __typename?: 'ConnectGithubBranchSuccess';
  /** The status of the result */
  status: Status;
};

/** Data of the created service */
export type CreateNewServiceData = {
  __typename?: 'CreateNewServiceData';
  /** The id of the created service */
  id: Scalars['String']['output'];
  /** ProjectId of the created service */
  projectId: Scalars['String']['output'];
  /** ServiceType of the created service */
  serviceType: Service_Type_Enum;
};

/** The result of the create new service */
export type CreateNewServiceErrorResult = {
  __typename?: 'CreateNewServiceErrorResult';
  /** The message of the create new service */
  message?: Maybe<Scalars['String']['output']>;
  /** The status of the create new service */
  status: Status;
};

/** Input for creating a new service */
export type CreateNewServiceInput = {
  /** Main branch of the created service */
  branch?: InputMaybe<Scalars['String']['input']>;
  /** DatabaseServiceId of the created service */
  database_service_id?: InputMaybe<Scalars['Int']['input']>;
  /** Description of the service */
  description: Scalars['String']['input'];
  /** DockerImageTag of the created service */
  docker_image_tag?: InputMaybe<Scalars['String']['input']>;
  /** DockerImage of the created service */
  docker_image_url?: InputMaybe<Scalars['String']['input']>;
  /** EnvironmentId of the created service */
  environmentId: Scalars['Int']['input'];
  /** Name of the service */
  name: Scalars['String']['input'];
  /** ProjectSlug of the created service */
  projectSlug: Scalars['String']['input'];
  /** Repository of the created service */
  repository?: InputMaybe<Scalars['String']['input']>;
  /** ServiceType of the created service */
  serviceType: Service_Type_Enum;
};

export type CreateNewServiceResult = CreateNewServiceErrorResult | CreateNewServiceSuccessResult;

/** The result of the create new service */
export type CreateNewServiceSuccessResult = {
  __typename?: 'CreateNewServiceSuccessResult';
  /** The data of the created service */
  data: CreateNewServiceData;
  /** The message of the create new service */
  message?: Maybe<Scalars['String']['output']>;
  /** The status of the create new service */
  status: Status;
};

export type CreatePaymentErrorResult = {
  __typename?: 'CreatePaymentErrorResult';
  /** Error message */
  message: Scalars['String']['output'];
  /** Status of the payment */
  status: Status;
};

export type CreatePaymentInput = {
  amount: Scalars['Float']['input'];
};

export type CreatePaymentResult = CreatePaymentErrorResult | CreatePaymentSuccessResult;

export type CreatePaymentSuccessResult = {
  __typename?: 'CreatePaymentSuccessResult';
  /** Payment URL */
  payment_url: Scalars['String']['output'];
  /** Status of the payment */
  status: Status;
};

export type CreateProjectData = {
  __typename?: 'CreateProjectData';
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['String']['output'];
  name: Scalars['String']['output'];
  slug: Scalars['String']['output'];
  url?: Maybe<Scalars['String']['output']>;
};

export type CreateProjectError = {
  __typename?: 'CreateProjectError';
  message: Scalars['String']['output'];
  status: Status;
};

export type CreateProjectResult = CreateProjectError | CreateProjectSuccess;

export type CreateProjectSuccess = {
  __typename?: 'CreateProjectSuccess';
  data: CreateProjectData;
  status: Status;
};

export type CreateSubscriptionCheckoutError = {
  __typename?: 'CreateSubscriptionCheckoutError';
  /** The error message */
  message?: Maybe<Scalars['String']['output']>;
  /** The status of the subscription */
  status: Status;
};

export type CreateSubscriptionCheckoutResult =
  | CreateSubscriptionCheckoutError
  | CreateSubscriptionCheckoutSuccess;

export type CreateSubscriptionCheckoutSuccess = {
  __typename?: 'CreateSubscriptionCheckoutSuccess';
  /** The status of the subscription */
  status: Status;
  subscription_url: Scalars['String']['output'];
};

export enum Deploy_Status {
  Failed = 'FAILED',
  Pending = 'PENDING',
  Success = 'SUCCESS',
}

/** The database service */
export type DatabaseService = {
  __typename?: 'DatabaseService';
  /** The icon of the database service */
  icon: Scalars['String']['output'];
  /** The id of the database service */
  id: Scalars['String']['output'];
  /** The name of the database service */
  name: Scalars['String']['output'];
};

/** The result of deleting an environment */
export type DeleteEnvironmentErrorResult = {
  __typename?: 'DeleteEnvironmentErrorResult';
  /** The message of the result */
  message?: Maybe<Scalars['String']['output']>;
  /** The status of the result */
  status: Status;
};

/** The result of deleting an environment */
export type DeleteEnvironmentResult = DeleteEnvironmentErrorResult | DeleteEnvironmentSuccessResult;

/** The result of deleting an environment */
export type DeleteEnvironmentSuccessResult = {
  __typename?: 'DeleteEnvironmentSuccessResult';
  /** The status of the result */
  status: Status;
};

export type DeleteProjectError = {
  __typename?: 'DeleteProjectError';
  message: Scalars['String']['output'];
  status: Status;
};

export type DeleteProjectResult = DeleteProjectError | DeleteProjectSuccess;

export type DeleteProjectSuccess = {
  __typename?: 'DeleteProjectSuccess';
  message: Scalars['String']['output'];
  status: Status;
};

export type DeleteServiceResult = DeleteServiceResultError | DeleteServiceResultSuccess;

export type DeleteServiceResultError = {
  __typename?: 'DeleteServiceResultError';
  /** Message of the operation */
  message?: Maybe<Scalars['String']['output']>;
  /** Status of the operation */
  status: Status;
};

export type DeleteServiceResultSuccess = {
  __typename?: 'DeleteServiceResultSuccess';
  /** Status of the operation */
  status: Status;
};

export type DeploymentData = {
  __typename?: 'DeploymentData';
  id: Scalars['String']['output'];
};

export type DeploymentHistory = {
  __typename?: 'DeploymentHistory';
  /** The branch of the deployment */
  branch?: Maybe<Scalars['String']['output']>;
  /** Commit hash of the deployment */
  commitHash?: Maybe<Scalars['String']['output']>;
  /** The repository of the deployment */
  commiterAvatar?: Maybe<Scalars['String']['output']>;
  /** Date of deployment */
  createdAt: Scalars['DateTime']['output'];
  /** The id of the deployment */
  id: Scalars['String']['output'];
  /** The status of the deployment */
  status: Deploy_Status;
};

/** Deployment history error */
export type DeploymentHistoryErrorResult = {
  __typename?: 'DeploymentHistoryErrorResult';
  /** The error message of the deployment */
  message?: Maybe<Scalars['String']['output']>;
  /** The status of the deployment */
  status: Status;
};

export type DeploymentHistoryResult = DeploymentHistoryErrorResult | DeploymentHistorySuccessResult;

/** Deployment history */
export type DeploymentHistorySuccessResult = {
  __typename?: 'DeploymentHistorySuccessResult';
  /** The deployment history */
  data: Array<DeploymentHistory>;
  /** The status of the deployment */
  status: Status;
};

/** The result of the deployment request */
export type DeploymentRequestErrorResult = {
  __typename?: 'DeploymentRequestErrorResult';
  /** The message of the deployment request */
  message?: Maybe<Scalars['String']['output']>;
  /** The status of the deployment request */
  status: Status;
};

export type DeploymentRequestResult = DeploymentRequestErrorResult | DeploymentRequestSuccessResult;

/** The result of the deployment request */
export type DeploymentRequestSuccessResult = {
  __typename?: 'DeploymentRequestSuccessResult';
  /** The deployment data */
  deployment: DeploymentData;
  /** The message of the deployment request */
  message?: Maybe<Scalars['String']['output']>;
  /** The status of the deployment request */
  status: Status;
};

/** The result of editing an environment error */
export type EditEnvironmentValueError = {
  __typename?: 'EditEnvironmentValueError';
  /** The message of the result */
  message?: Maybe<Scalars['String']['output']>;
  /** The status of the result */
  status: Status;
};

export type EditEnvironmentValueInput = {
  /** The id of the environment value */
  environmentId: Scalars['String']['input'];
  /** The environment values */
  environmentValues: Array<AddEnvironmentValueInput>;
  /** The slug of the project */
  projectSlug: Scalars['String']['input'];
};

/** The result of editing an environment value list */
export type EditEnvironmentValueResult = EditEnvironmentValueError | EditEnvironmentValueSuccess;

/** The result of editing an environment success */
export type EditEnvironmentValueSuccess = {
  __typename?: 'EditEnvironmentValueSuccess';
  /** The status of the result */
  status: Status;
};

export type Environment = {
  __typename?: 'Environment';
  /** The id of the environment */
  id: Scalars['String']['output'];
  /** The name of the environment */
  key: Scalars['String']['output'];
  /** The value of the environment */
  value: Scalars['String']['output'];
};

export type EnvironmentElement = {
  __typename?: 'EnvironmentElement';
  /** The description of the environment */
  description: Scalars['String']['output'];
  /** The id of the environment */
  id: Scalars['String']['output'];
  /** The name of the environment */
  name: Scalars['String']['output'];
};

export type EnvironmentInput = {
  /** The id of the environment */
  id: Scalars['String']['input'];
  /** The name of the environment */
  key: Scalars['String']['input'];
  /** The value of the environment */
  value: Scalars['String']['input'];
};

/** The result of the get all services */
export type GetAllServicesFailedResult = {
  __typename?: 'GetAllServicesFailedResult';
  /** The message of the get all services */
  message?: Maybe<Scalars['String']['output']>;
  /** The status of the get all services */
  status: Status;
};

export type GetAllServicesResult = GetAllServicesFailedResult | GetAllServicesSuccessResult;

/** Get all services for a project */
export type GetAllServicesSuccessResult = {
  __typename?: 'GetAllServicesSuccessResult';
  /** The services for the project */
  services: Array<Service>;
  /** The status of the get all services */
  status: Status;
};

export type GetBranchesErrorResult = {
  __typename?: 'GetBranchesErrorResult';
  /** The error message */
  message?: Maybe<Scalars['String']['output']>;
  /** The status of the response */
  status: Status;
};

export type GetBranchesResult = GetBranchesErrorResult | GetBranchesSuccessResult;

export type GetBranchesSuccessResult = {
  __typename?: 'GetBranchesSuccessResult';
  /** The branches */
  data: Array<Scalars['String']['output']>;
  /** The status of the response */
  status: Status;
};

/** The error response for getting database services */
export type GetDatabaseServiceError = {
  __typename?: 'GetDatabaseServiceError';
  message?: Maybe<Scalars['String']['output']>;
  status: Status;
};

/** The result of getting database services */
export type GetDatabaseServiceResult = GetDatabaseServiceError | GetDatabaseServiceSuccess;

/** The success response for getting database services */
export type GetDatabaseServiceSuccess = {
  __typename?: 'GetDatabaseServiceSuccess';
  /** The database services */
  data: Array<DatabaseService>;
  status: Status;
};

/** The error result of getting environment values */
export type GetEnvironmentValuesErrorResult = {
  __typename?: 'GetEnvironmentValuesErrorResult';
  /** The error message */
  message?: Maybe<Scalars['String']['output']>;
  /** The status of the result */
  status: Status;
};

export type GetEnvironmentValuesInput = {
  /** The id of the environment */
  environmentId: Scalars['String']['input'];
  /** The slug of the project */
  projectSlug: Scalars['String']['input'];
};

export type GetEnvironmentValuesResult =
  | GetEnvironmentValuesErrorResult
  | GetEnvironmentValuesSuccessResult;

/** The result of getting environment values */
export type GetEnvironmentValuesSuccessResult = {
  __typename?: 'GetEnvironmentValuesSuccessResult';
  /** The environment values */
  environmentValues: Array<Environment>;
  /** The status of the result */
  status: Status;
};

/** The error result of getting environments */
export type GetEnvironmentsError = {
  __typename?: 'GetEnvironmentsError';
  /** The error message */
  message?: Maybe<Scalars['String']['output']>;
  /** The status of the result */
  status: Status;
};

export type GetEnvironmentsResult = GetEnvironmentsError | GetEnvironmentsSuccess;

/** The result of getting environments */
export type GetEnvironmentsSuccess = {
  __typename?: 'GetEnvironmentsSuccess';
  /** The environments list */
  environments: Array<EnvironmentElement>;
  /** The status of the result */
  status: Status;
};

/** The result of getting a github service info error */
export type GetGithubServiceInfoError = {
  __typename?: 'GetGithubServiceInfoError';
  /** The message of the result */
  message?: Maybe<Scalars['String']['output']>;
  /** The status of the result */
  status: Status;
};

export type GetGithubServiceInfoResult = GetGithubServiceInfoError | GetGithubServiceInfoSuccess;

/** The result of getting a github service info */
export type GetGithubServiceInfoSuccess = {
  __typename?: 'GetGithubServiceInfoSuccess';
  /** The github service info */
  githubServiceInfo: GithubServiceInfo;
  /** The status of the result */
  status: Status;
};

export type GetProjectDetailsResult = GetProjectDetailsResultError | GetProjectDetailsResultSuccess;

export type GetProjectDetailsResultError = {
  __typename?: 'GetProjectDetailsResultError';
  /** The error message */
  message: Scalars['String']['output'];
  /** The status of the result */
  status: Status;
};

export type GetProjectDetailsResultSuccess = {
  __typename?: 'GetProjectDetailsResultSuccess';
  /** The project details */
  data: ProjectDetail;
  /** The status of the result */
  status: Status;
};

export type GetProjectPermissionsResult = ProjectPermissionError | ProjectPermissionSuccess;

export type GetRepositoryErrorResult = {
  __typename?: 'GetRepositoryErrorResult';
  /** The error message */
  message?: Maybe<Scalars['String']['output']>;
  /** The status of the response */
  status: Status;
};

export type GetRepositoryResult = GetRepositoryErrorResult | GetRepositorySuccessResult;

export type GetRepositorySuccessResult = {
  __typename?: 'GetRepositorySuccessResult';
  /** The repositories */
  data: Array<RepositoryObject>;
  /** The status of the response */
  status: Status;
};

/** Service settings */
export type GetServiceSettings = {
  __typename?: 'GetServiceSettings';
  /** Domain of the service */
  domain?: Maybe<Scalars['String']['output']>;
  /** Port of the service */
  port: Scalars['String']['output'];
  /** Use AI review */
  use_ai_review: Scalars['Boolean']['output'];
};

export type GetServiceSettingsErrorResult = {
  __typename?: 'GetServiceSettingsErrorResult';
  /** Error message */
  message?: Maybe<Scalars['String']['output']>;
  /** Status of the response */
  status: Status;
};

export type GetServiceSettingsResult =
  | GetServiceSettingsErrorResult
  | GetServiceSettingsSuccessResult;

export type GetServiceSettingsSuccessResult = {
  __typename?: 'GetServiceSettingsSuccessResult';
  /** Service settings */
  data: GetServiceSettings;
  /** Status of the response */
  status: Status;
};

export type GetTeamError = {
  __typename?: 'GetTeamError';
  /** The error message */
  message: Scalars['String']['output'];
  /** The status of the response */
  status: Status;
};

export type GetTeamResult = GetTeamError | GetTeamSuccess;

export type GetTeamSuccess = {
  __typename?: 'GetTeamSuccess';
  /** The status of the response */
  status: Status;
  /** The team members of the project */
  team: Team;
};

export enum GithubRepositorySortBy {
  Created = 'CREATED',
  FullName = 'FULL_NAME',
  Pushed = 'PUSHED',
  Updated = 'UPDATED',
}

export enum GithubRepositorySortDirection {
  Asc = 'ASC',
  Desc = 'DESC',
}

/** The result of getting a github service info */
export type GithubServiceInfo = {
  __typename?: 'GithubServiceInfo';
  /** The connected branch */
  connectedBranch: Scalars['String']['output'];
  /** The name of the repository */
  name: Scalars['String']['output'];
  /** The owner of the github service */
  owner: Scalars['String']['output'];
};

export type MailResponse = {
  __typename?: 'MailResponse';
  message?: Maybe<Scalars['String']['output']>;
  success: Scalars['Boolean']['output'];
};

export type MailVariables = {
  name: Scalars['String']['input'];
  value: Scalars['String']['input'];
};

export type Mutation = {
  __typename?: 'Mutation';
  /** Accept a join team request */
  accept_join_team: AcceptJoinTeamResult;
  /** Add an environment to a project */
  add_environment: AddEnvironmentsResult;
  /** Add a team member to a project */
  add_team_member: AddTeamMemberResult;
  /** Connect a github branch to an environment */
  connect_github_branch: ConnectGithubBranchResult;
  createSubscriptionCheckout: CreateSubscriptionCheckoutResult;
  /** Create a new project */
  create_project: CreateProjectResult;
  /** Create a new service */
  create_service: CreateNewServiceResult;
  /** Delete an environment from a project */
  delete_environment: DeleteEnvironmentResult;
  /** Delete a project */
  delete_project: DeleteProjectResult;
  /** Delete a service */
  delete_service: DeleteServiceResult;
  /** Edit an environment value */
  edit_environment_value: EditEnvironmentValueResult;
  /** Remove a team member from a project */
  remove_team_member: RemoveTeamMemberResult;
  /** Request a deployment request */
  request_deployment: DeploymentRequestResult;
  /** Send an email */
  send_email: MailResponse;
  /** Send an email with a template */
  send_email_with_template: MailResponse;
  testQueue: Scalars['Boolean']['output'];
  topup: CreatePaymentResult;
  /** Update service settings */
  updateServiceSettings: UpdateServiceSettingsResult;
  /** Update the details of a project */
  update_project_details: UpdateProjectDetailsResult;
};

export type MutationAccept_Join_TeamArgs = {
  project_slug: Scalars['String']['input'];
};

export type MutationAdd_EnvironmentArgs = {
  environment: AddEnvironmentsInput;
  project_slug: Scalars['String']['input'];
};

export type MutationAdd_Team_MemberArgs = {
  member: AddTeamMemberInput;
  project_slug: Scalars['String']['input'];
};

export type MutationConnect_Github_BranchArgs = {
  branch: Scalars['String']['input'];
  environment_id: Scalars['Int']['input'];
  service_id: Scalars['Int']['input'];
};

export type MutationCreateSubscriptionCheckoutArgs = {
  planId: Scalars['Float']['input'];
};

export type MutationCreate_ProjectArgs = {
  description?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
};

export type MutationCreate_ServiceArgs = {
  input: CreateNewServiceInput;
};

export type MutationDelete_EnvironmentArgs = {
  environment_id: Scalars['String']['input'];
  project_slug: Scalars['String']['input'];
};

export type MutationDelete_ProjectArgs = {
  slug: Scalars['String']['input'];
};

export type MutationDelete_ServiceArgs = {
  project_slug: Scalars['String']['input'];
  service_id: Scalars['Float']['input'];
};

export type MutationEdit_Environment_ValueArgs = {
  input: EditEnvironmentValueInput;
};

export type MutationRemove_Team_MemberArgs = {
  email: Scalars['String']['input'];
  project_slug: Scalars['String']['input'];
};

export type MutationRequest_DeploymentArgs = {
  environment_id: Scalars['Float']['input'];
  project_slug: Scalars['String']['input'];
  service_id: Scalars['Float']['input'];
};

export type MutationSend_EmailArgs = {
  html?: InputMaybe<Scalars['String']['input']>;
  subject: Scalars['String']['input'];
  text: Scalars['String']['input'];
  to: Scalars['String']['input'];
};

export type MutationSend_Email_With_TemplateArgs = {
  subject: Scalars['String']['input'];
  template: Scalars['String']['input'];
  to: Scalars['String']['input'];
  variables?: InputMaybe<Array<MailVariables>>;
};

export type MutationTestQueueArgs = {
  branch: Scalars['String']['input'];
  repository_url: Scalars['String']['input'];
};

export type MutationTopupArgs = {
  data: CreatePaymentInput;
};

export type MutationUpdateServiceSettingsArgs = {
  domain: Scalars['String']['input'];
  port: Scalars['String']['input'];
  service_id: Scalars['Float']['input'];
  use_ai_review: Scalars['Boolean']['input'];
};

export type MutationUpdate_Project_DetailsArgs = {
  input: UpdateProjectDetailsInput;
  project_slug: Scalars['String']['input'];
};

/** The owner of the repository */
export type Owner = {
  __typename?: 'Owner';
  /** The avatar url of the owner */
  avatar_url: Scalars['String']['output'];
  /** The id of the owner */
  id: Scalars['Int']['output'];
  /** The login of the owner */
  login: Scalars['String']['output'];
};

/** The project */
export type Project = {
  __typename?: 'Project';
  /** The created at date of the project */
  created_at: Scalars['DateTime']['output'];
  /** The description of the project */
  description: Scalars['String']['output'];
  /** The id of the project */
  id: Scalars['String']['output'];
  /** The name of the project */
  name: Scalars['String']['output'];
  /** The slug of the project */
  slug: Scalars['String']['output'];
  /** The updated at date of the project */
  updated_at: Scalars['DateTime']['output'];
  /** The url of the project */
  url: Scalars['String']['output'];
};

export type ProjectDetail = {
  __typename?: 'ProjectDetail';
  /** The description of the project */
  description: Scalars['String']['output'];
  /** The name of the project */
  name: Scalars['String']['output'];
  /** The slug of the project */
  slug: Scalars['String']['output'];
};

export type ProjectError = {
  __typename?: 'ProjectError';
  /** The error message */
  message: Scalars['String']['output'];
  /** The status of the response */
  result: Status;
};

export type ProjectPermissionError = {
  __typename?: 'ProjectPermissionError';
  /** The error message */
  message?: Maybe<Scalars['String']['output']>;
  /** The status of the response */
  status: Status;
};

export type ProjectPermissionSuccess = {
  __typename?: 'ProjectPermissionSuccess';
  /** The permissions of the project */
  permissions: Array<Scalars['Int']['output']>;
  /** The status of the response */
  status: Status;
  /** The status of the user in the project */
  user_status: User_In_Team_Status;
};

export type ProjectResult = ProjectError | ProjectSuccess;

/** The success response of the project */
export type ProjectSuccess = {
  __typename?: 'ProjectSuccess';
  data: Array<Project>;
  /** The status of the response */
  result: Status;
};

export type Query = {
  __typename?: 'Query';
  addToQueue: Scalars['String']['output'];
  addUser: Scalars['String']['output'];
  /** Get all projects */
  all_projects: ProjectResult;
  balance: BalanceResult;
  /** Get deployments history */
  deployments_history: DeploymentHistoryResult;
  /** Get environment values */
  environment_values: GetEnvironmentValuesResult;
  /** Get all environments in a project */
  environments: GetEnvironmentsResult;
  /** Get service settings */
  getServiceSettings: GetServiceSettingsResult;
  /** Get all services for a project */
  get_all_services: GetAllServicesResult;
  /** Get branches of a repository */
  get_branches: GetBranchesResult;
  /** Get all database services for creating new service */
  get_database_services: GetDatabaseServiceResult;
  /** Get all github branches */
  get_github_service_info: GetGithubServiceInfoResult;
  /** Get the details of a project */
  get_project_details: GetProjectDetailsResult;
  /** Get the permissions of a project */
  get_project_permissions: GetProjectPermissionsResult;
  /** Get all repositories for creating new service */
  get_repositories: GetRepositoryResult;
  repositories: Array<Repository>;
  /** Search repositories */
  search_repositories: SearchRepositoryResult;
  /** Get the team members of a project */
  team_members: GetTeamResult;
  /** Get the user info */
  user_info: UserInfo;
};

export type QueryAddToQueueArgs = {
  group?: Scalars['String']['input'];
  jobType: Scalars['String']['input'];
  message: Scalars['String']['input'];
};

export type QueryAddUserArgs = {
  email: Scalars['String']['input'];
};

export type QueryDeployments_HistoryArgs = {
  page?: InputMaybe<Scalars['Int']['input']>;
  per_page?: InputMaybe<Scalars['Int']['input']>;
  project_slug: Scalars['String']['input'];
  service_id: Scalars['Float']['input'];
};

export type QueryEnvironment_ValuesArgs = {
  input: GetEnvironmentValuesInput;
};

export type QueryEnvironmentsArgs = {
  project_slug: Scalars['String']['input'];
};

export type QueryGetServiceSettingsArgs = {
  service_id: Scalars['Float']['input'];
};

export type QueryGet_All_ServicesArgs = {
  project_slug: Scalars['String']['input'];
};

export type QueryGet_BranchesArgs = {
  owner: Scalars['String']['input'];
  repo: Scalars['String']['input'];
};

export type QueryGet_Github_Service_InfoArgs = {
  environment_id: Scalars['Int']['input'];
  service_id: Scalars['Int']['input'];
};

export type QueryGet_Project_DetailsArgs = {
  project_slug: Scalars['String']['input'];
};

export type QueryGet_Project_PermissionsArgs = {
  project_slug: Scalars['String']['input'];
};

export type QueryGet_RepositoriesArgs = {
  page?: InputMaybe<Scalars['Int']['input']>;
  per_page?: InputMaybe<Scalars['Int']['input']>;
  sortBy?: InputMaybe<GithubRepositorySortBy>;
  sortDirection?: InputMaybe<GithubRepositorySortDirection>;
};

export type QueryRepositoriesArgs = {
  username: Scalars['String']['input'];
};

export type QuerySearch_RepositoriesArgs = {
  keyword: Scalars['String']['input'];
  page?: InputMaybe<Scalars['Int']['input']>;
  per_page?: InputMaybe<Scalars['Int']['input']>;
  sortBy?: InputMaybe<GithubRepositorySortBy>;
  sortDirection?: InputMaybe<GithubRepositorySortDirection>;
};

export type QueryTeam_MembersArgs = {
  project_slug: Scalars['String']['input'];
};

/** The result of removing a team member */
export type RemoveTeamMemberResult = RemoveTeamMemberResultError | RemoveTeamMemberResultSuccess;

export type RemoveTeamMemberResultError = {
  __typename?: 'RemoveTeamMemberResultError';
  /** The message of the result */
  message?: Maybe<Scalars['String']['output']>;
  /** The status of the result */
  status: Status;
};

export type RemoveTeamMemberResultSuccess = {
  __typename?: 'RemoveTeamMemberResultSuccess';
  /** The message of the result */
  message?: Maybe<Scalars['String']['output']>;
  /** The status of the result */
  status: Status;
};

export type Repository = {
  __typename?: 'Repository';
  id: Scalars['Float']['output'];
  name: Scalars['String']['output'];
  url: Scalars['String']['output'];
};

export type RepositoryObject = {
  __typename?: 'RepositoryObject';
  /** The created at date of the repository */
  created_at?: Maybe<Scalars['String']['output']>;
  /** The description of the repository */
  description?: Maybe<Scalars['String']['output']>;
  /** The git url of the repository */
  git_url: Scalars['String']['output'];
  /** The id of the repository */
  id: Scalars['Int']['output'];
  /** Whether the repository is private */
  is_private: Scalars['Boolean']['output'];
  /** The name of the repository */
  name: Scalars['String']['output'];
  /** The owner of the repository */
  owner: Owner;
  /** The updated at date of the repository */
  updated_at?: Maybe<Scalars['String']['output']>;
  /** The url of the repository */
  url: Scalars['String']['output'];
};

export enum Service_Type_Enum {
  Database = 'DATABASE',
  DockerImage = 'DOCKER_IMAGE',
  Functions = 'FUNCTIONS',
  GithubRepo = 'GITHUB_REPO',
}

export type SearchRepositoryErrorResult = {
  __typename?: 'SearchRepositoryErrorResult';
  /** The error message */
  message?: Maybe<Scalars['String']['output']>;
  /** The status of the response */
  status: Status;
};

export type SearchRepositoryResult = SearchRepositoryErrorResult | SearchRepositorySuccessResult;

export type SearchRepositorySuccessResult = {
  __typename?: 'SearchRepositorySuccessResult';
  /** The repositories */
  data: Array<RepositoryObject>;
  /** The status of the response */
  status: Status;
  /** The total count of the repositories */
  total_count: Scalars['Int']['output'];
};

/** Service type */
export type Service = {
  __typename?: 'Service';
  /** The id of the service */
  id: Scalars['String']['output'];
  /** Last deployment date */
  lastDeploymentDate?: Maybe<Scalars['DateTime']['output']>;
  /** The name of the service */
  name: Scalars['String']['output'];
  /** The type of the service */
  type: Service_Type_Enum;
};

export enum Status {
  Error = 'ERROR',
  Success = 'SUCCESS',
}

export type Subscription = {
  __typename?: 'Subscription';
  paymentStatus: Scalars['String']['output'];
};

export type SubscriptionPaymentStatusArgs = {
  id: Scalars['String']['input'];
};

export type Team = {
  __typename?: 'Team';
  /** The team members of the project */
  members: Array<TeamMember>;
  /** The slug of the project */
  slug: Scalars['String']['output'];
};

export type TeamMember = {
  __typename?: 'TeamMember';
  /** The email of the team member */
  email: Scalars['String']['output'];
  /** The name of the team member */
  name: Scalars['String']['output'];
  /** The permissions of the team member */
  permissions: Array<Scalars['Int']['output']>;
  /** The profile URL of the team member */
  profile_url?: Maybe<Scalars['String']['output']>;
  /** The status of the team member */
  status: User_In_Team_Status;
};

export enum User_In_Team_Status {
  Accepted = 'ACCEPTED',
  Pending = 'PENDING',
}

export type UpdateProjectDetailsInput = {
  /** The description of the project */
  description: Scalars['String']['input'];
  /** The name of the project */
  name: Scalars['String']['input'];
};

export type UpdateProjectDetailsResult =
  | UpdateProjectDetailsResultError
  | UpdateProjectDetailsResultSuccess;

export type UpdateProjectDetailsResultError = {
  __typename?: 'UpdateProjectDetailsResultError';
  /** The error message */
  message: Scalars['String']['output'];
  /** The status of the result */
  status: Status;
};

export type UpdateProjectDetailsResultSuccess = {
  __typename?: 'UpdateProjectDetailsResultSuccess';
  /** The status of the result */
  status: Status;
};

export type UpdateServiceSettingsErrorResult = {
  __typename?: 'UpdateServiceSettingsErrorResult';
  message: Scalars['String']['output'];
  /** Status of the response */
  status: Status;
};

export type UpdateServiceSettingsResult =
  | UpdateServiceSettingsErrorResult
  | UpdateServiceSettingsSuccessResult;

export type UpdateServiceSettingsSuccessResult = {
  __typename?: 'UpdateServiceSettingsSuccessResult';
  status: Status;
};

export type UserInfo = {
  __typename?: 'UserInfo';
  /** The current plan of the user */
  current_plan_id?: Maybe<Scalars['String']['output']>;
  /** The email of the user */
  email: Scalars['String']['output'];
  /** Whether the user is a trial */
  is_trial?: Maybe<Scalars['Boolean']['output']>;
  /** The name of the user */
  name: Scalars['String']['output'];
  /** The avatar URL of the user */
  profile_pic_url?: Maybe<Scalars['String']['output']>;
};

export type UpdateServiceSettingsMutationVariables = Exact<{
  serviceId: Scalars['Float']['input'];
  port: Scalars['String']['input'];
  useAiReview: Scalars['Boolean']['input'];
  domain: Scalars['String']['input'];
}>;

export type UpdateServiceSettingsMutation = {
  __typename?: 'Mutation';
  updateServiceSettings:
    | { __typename?: 'UpdateServiceSettingsErrorResult'; status: Status; message: string }
    | { __typename?: 'UpdateServiceSettingsSuccessResult'; status: Status };
};

export type ConnectGithubBranchMutationVariables = Exact<{
  serviceId: Scalars['Int']['input'];
  environmentId: Scalars['Int']['input'];
  branch: Scalars['String']['input'];
}>;

export type ConnectGithubBranchMutation = {
  __typename?: 'Mutation';
  connect_github_branch:
    | { __typename?: 'ConnectGithubBranchError'; status: Status; message?: string | null }
    | { __typename?: 'ConnectGithubBranchSuccess'; status: Status };
};

export type CreateEnvironmentMutationVariables = Exact<{
  projectSlug: Scalars['String']['input'];
  environment: AddEnvironmentsInput;
}>;

export type CreateEnvironmentMutation = {
  __typename?: 'Mutation';
  add_environment:
    | { __typename?: 'AddEnvironmentsError'; status: Status; message?: string | null }
    | { __typename?: 'AddEnvironmentsSuccess'; status: Status };
};

export type Edit_Environment_ValueMutationVariables = Exact<{
  input: EditEnvironmentValueInput;
}>;

export type Edit_Environment_ValueMutation = {
  __typename?: 'Mutation';
  edit_environment_value:
    | { __typename?: 'EditEnvironmentValueError'; status: Status; message?: string | null }
    | { __typename?: 'EditEnvironmentValueSuccess'; status: Status };
};

export type CreateProjectMutationMutationVariables = Exact<{
  name: Scalars['String']['input'];
  description?: InputMaybe<Scalars['String']['input']>;
}>;

export type CreateProjectMutationMutation = {
  __typename?: 'Mutation';
  create_project:
    | { __typename?: 'CreateProjectError'; status: Status; message: string }
    | {
        __typename?: 'CreateProjectSuccess';
        status: Status;
        data: {
          __typename?: 'CreateProjectData';
          name: string;
          description?: string | null;
          id: string;
          slug: string;
          url?: string | null;
        };
      };
};

export type DeleteProjectMutationMutationVariables = Exact<{
  slug: Scalars['String']['input'];
}>;

export type DeleteProjectMutationMutation = {
  __typename?: 'Mutation';
  delete_project:
    | { __typename?: 'DeleteProjectError'; message: string; status: Status }
    | { __typename?: 'DeleteProjectSuccess'; message: string; status: Status };
};

export type UpdateProjectDetailsMutationMutationVariables = Exact<{
  projectSlug: Scalars['String']['input'];
  input: UpdateProjectDetailsInput;
}>;

export type UpdateProjectDetailsMutationMutation = {
  __typename?: 'Mutation';
  update_project_details:
    | { __typename?: 'UpdateProjectDetailsResultError'; status: Status; message: string }
    | { __typename?: 'UpdateProjectDetailsResultSuccess'; status: Status };
};

export type RequestDeploymentMutationVariables = Exact<{
  projectSlug: Scalars['String']['input'];
  serviceId: Scalars['Float']['input'];
  environmentId: Scalars['Float']['input'];
}>;

export type RequestDeploymentMutation = {
  __typename?: 'Mutation';
  request_deployment:
    | { __typename?: 'DeploymentRequestErrorResult'; status: Status; message?: string | null }
    | {
        __typename?: 'DeploymentRequestSuccessResult';
        status: Status;
        message?: string | null;
        deployment: { __typename?: 'DeploymentData'; id: string };
      };
};

export type CreateServiceMutationMutationVariables = Exact<{
  input: CreateNewServiceInput;
}>;

export type CreateServiceMutationMutation = {
  __typename?: 'Mutation';
  create_service:
    | { __typename?: 'CreateNewServiceErrorResult'; status: Status; message?: string | null }
    | {
        __typename?: 'CreateNewServiceSuccessResult';
        status: Status;
        message?: string | null;
        data: {
          __typename?: 'CreateNewServiceData';
          id: string;
          projectId: string;
          serviceType: Service_Type_Enum;
        };
      };
};

export type DeleteServiceMutationMutationVariables = Exact<{
  projectSlug: Scalars['String']['input'];
  serviceId: Scalars['Float']['input'];
}>;

export type DeleteServiceMutationMutation = {
  __typename?: 'Mutation';
  delete_service:
    | { __typename?: 'DeleteServiceResultError'; status: Status; message?: string | null }
    | { __typename?: 'DeleteServiceResultSuccess'; status: Status };
};

export type AddTeamMemberMutationVariables = Exact<{
  projectSlug: Scalars['String']['input'];
  member: AddTeamMemberInput;
}>;

export type AddTeamMemberMutation = {
  __typename?: 'Mutation';
  add_team_member:
    | { __typename?: 'AddTeamMemberErrorResult'; status: Status; message: string }
    | { __typename?: 'AddTeamMemberSuccessResult'; email: string; status: Status };
};

export type RemoveTeamMemberMutationVariables = Exact<{
  projectSlug: Scalars['String']['input'];
  email: Scalars['String']['input'];
}>;

export type RemoveTeamMemberMutation = {
  __typename?: 'Mutation';
  remove_team_member:
    | { __typename?: 'RemoveTeamMemberResultError'; status: Status; message?: string | null }
    | { __typename?: 'RemoveTeamMemberResultSuccess'; status: Status; message?: string | null };
};

export type GetAllServicesQueryVariables = Exact<{
  projectSlug: Scalars['String']['input'];
}>;

export type GetAllServicesQuery = {
  __typename?: 'Query';
  get_all_services:
    | { __typename?: 'GetAllServicesFailedResult'; status: Status; message?: string | null }
    | {
        __typename?: 'GetAllServicesSuccessResult';
        status: Status;
        services: Array<{
          __typename?: 'Service';
          id: string;
          type: Service_Type_Enum;
          name: string;
          lastDeploymentDate?: any | null;
        }>;
      };
};

export type DatabaseServicesQueryQueryVariables = Exact<{ [key: string]: never }>;

export type DatabaseServicesQueryQuery = {
  __typename?: 'Query';
  get_database_services:
    | { __typename?: 'GetDatabaseServiceError'; status: Status; message?: string | null }
    | {
        __typename?: 'GetDatabaseServiceSuccess';
        status: Status;
        data: Array<{ __typename?: 'DatabaseService'; id: string; name: string; icon: string }>;
      };
};

export type GetDeploymentsHistoryQueryVariables = Exact<{
  page?: InputMaybe<Scalars['Int']['input']>;
  perPage?: InputMaybe<Scalars['Int']['input']>;
  projectSlug: Scalars['String']['input'];
  serviceId: Scalars['Float']['input'];
}>;

export type GetDeploymentsHistoryQuery = {
  __typename?: 'Query';
  deployments_history:
    | { __typename?: 'DeploymentHistoryErrorResult'; status: Status; message?: string | null }
    | {
        __typename?: 'DeploymentHistorySuccessResult';
        status: Status;
        data: Array<{
          __typename?: 'DeploymentHistory';
          id: string;
          status: Deploy_Status;
          commitHash?: string | null;
          branch?: string | null;
          commiterAvatar?: string | null;
          createdAt: any;
        }>;
      };
};

export type GetServiceSettingsQueryVariables = Exact<{
  serviceId: Scalars['Float']['input'];
}>;

export type GetServiceSettingsQuery = {
  __typename?: 'Query';
  getServiceSettings:
    | { __typename?: 'GetServiceSettingsErrorResult'; status: Status; message?: string | null }
    | {
        __typename?: 'GetServiceSettingsSuccessResult';
        status: Status;
        data: {
          __typename?: 'GetServiceSettings';
          port: string;
          use_ai_review: boolean;
          domain?: string | null;
        };
      };
};

export type Get_Github_Service_InfoQueryVariables = Exact<{
  serviceId: Scalars['Int']['input'];
  environmentId: Scalars['Int']['input'];
}>;

export type Get_Github_Service_InfoQuery = {
  __typename?: 'Query';
  get_github_service_info:
    | { __typename?: 'GetGithubServiceInfoError'; status: Status; message?: string | null }
    | {
        __typename?: 'GetGithubServiceInfoSuccess';
        status: Status;
        githubServiceInfo: {
          __typename?: 'GithubServiceInfo';
          owner: string;
          name: string;
          connectedBranch: string;
        };
      };
};

export type GetEnvironmentValuesQueryVariables = Exact<{
  input: GetEnvironmentValuesInput;
}>;

export type GetEnvironmentValuesQuery = {
  __typename?: 'Query';
  environment_values:
    | { __typename?: 'GetEnvironmentValuesErrorResult'; status: Status; message?: string | null }
    | {
        __typename?: 'GetEnvironmentValuesSuccessResult';
        status: Status;
        environmentValues: Array<{
          __typename?: 'Environment';
          id: string;
          key: string;
          value: string;
        }>;
      };
};

export type EnvironmentsQueryQueryVariables = Exact<{
  projectSlug: Scalars['String']['input'];
}>;

export type EnvironmentsQueryQuery = {
  __typename?: 'Query';
  environments:
    | { __typename?: 'GetEnvironmentsError'; status: Status; message?: string | null }
    | {
        __typename?: 'GetEnvironmentsSuccess';
        status: Status;
        environments: Array<{ __typename?: 'EnvironmentElement'; id: string; name: string }>;
      };
};

export type ProjectsQueryQueryVariables = Exact<{ [key: string]: never }>;

export type ProjectsQueryQuery = {
  __typename?: 'Query';
  all_projects:
    | { __typename?: 'ProjectError'; result: Status; message: string }
    | {
        __typename?: 'ProjectSuccess';
        result: Status;
        data: Array<{
          __typename?: 'Project';
          id: string;
          name: string;
          description: string;
          slug: string;
          url: string;
          created_at: any;
          updated_at: any;
        }>;
      };
};

export type GetProjectDetailsQueryVariables = Exact<{
  projectSlug: Scalars['String']['input'];
}>;

export type GetProjectDetailsQuery = {
  __typename?: 'Query';
  get_project_details:
    | { __typename?: 'GetProjectDetailsResultError'; status: Status; message: string }
    | {
        __typename?: 'GetProjectDetailsResultSuccess';
        status: Status;
        data: { __typename?: 'ProjectDetail'; name: string; description: string; slug: string };
      };
};

export type GetRepositoriesQueryVariables = Exact<{
  page?: InputMaybe<Scalars['Int']['input']>;
  perPage?: InputMaybe<Scalars['Int']['input']>;
  sortBy?: InputMaybe<GithubRepositorySortBy>;
  sortDirection?: InputMaybe<GithubRepositorySortDirection>;
}>;

export type GetRepositoriesQuery = {
  __typename?: 'Query';
  get_repositories:
    | { __typename?: 'GetRepositoryErrorResult'; status: Status; message?: string | null }
    | {
        __typename?: 'GetRepositorySuccessResult';
        status: Status;
        data: Array<{
          __typename?: 'RepositoryObject';
          id: number;
          name: string;
          description?: string | null;
          url: string;
          git_url: string;
          is_private: boolean;
          created_at?: string | null;
          updated_at?: string | null;
          owner: { __typename?: 'Owner'; id: number; login: string; avatar_url: string };
        }>;
      };
};

export type SearchRepositoriesQueryVariables = Exact<{
  keyword: Scalars['String']['input'];
  page?: InputMaybe<Scalars['Int']['input']>;
  perPage?: InputMaybe<Scalars['Int']['input']>;
  sortBy?: InputMaybe<GithubRepositorySortBy>;
  sortDirection?: InputMaybe<GithubRepositorySortDirection>;
}>;

export type SearchRepositoriesQuery = {
  __typename?: 'Query';
  search_repositories:
    | { __typename?: 'SearchRepositoryErrorResult'; status: Status; message?: string | null }
    | {
        __typename?: 'SearchRepositorySuccessResult';
        status: Status;
        total_count: number;
        data: Array<{
          __typename?: 'RepositoryObject';
          id: number;
          name: string;
          description?: string | null;
          url: string;
          git_url: string;
          is_private: boolean;
          created_at?: string | null;
          updated_at?: string | null;
          owner: { __typename?: 'Owner'; id: number; login: string; avatar_url: string };
        }>;
      };
};

export type GetBranchesQueryVariables = Exact<{
  owner: Scalars['String']['input'];
  repo: Scalars['String']['input'];
}>;

export type GetBranchesQuery = {
  __typename?: 'Query';
  get_branches:
    | { __typename?: 'GetBranchesErrorResult'; status: Status; message?: string | null }
    | { __typename?: 'GetBranchesSuccessResult'; status: Status; data: Array<string> };
};

export type GetTeamMembersQueryVariables = Exact<{
  projectSlug: Scalars['String']['input'];
}>;

export type GetTeamMembersQuery = {
  __typename?: 'Query';
  team_members:
    | { __typename?: 'GetTeamError'; status: Status; message: string }
    | {
        __typename?: 'GetTeamSuccess';
        status: Status;
        team: {
          __typename?: 'Team';
          slug: string;
          members: Array<{
            __typename?: 'TeamMember';
            email: string;
            name: string;
            profile_url?: string | null;
            status: User_In_Team_Status;
            permissions: Array<number>;
          }>;
        };
      };
};

export type GetUserInfoQueryQueryVariables = Exact<{ [key: string]: never }>;

export type GetUserInfoQueryQuery = {
  __typename?: 'Query';
  user_info: {
    __typename?: 'UserInfo';
    name: string;
    email: string;
    profile_pic_url?: string | null;
    current_plan_id?: string | null;
    is_trial?: boolean | null;
  };
};

export type BalanceQueryVariables = Exact<{ [key: string]: never }>;

export type BalanceQuery = {
  __typename?: 'Query';
  balance:
    | { __typename?: 'BalanceResultError'; status: Status; message?: string | null }
    | { __typename?: 'BalanceResultSuccess'; status: Status; balance: string; currency: string };
};

export const UpdateServiceSettingsDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'UpdateServiceSettings' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'serviceId' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'Float' } },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'port' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'useAiReview' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'Boolean' } },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'domain' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'updateServiceSettings' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'service_id' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'serviceId' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'port' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'port' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'use_ai_review' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'useAiReview' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'domain' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'domain' } },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'InlineFragment',
                  typeCondition: {
                    kind: 'NamedType',
                    name: { kind: 'Name', value: 'UpdateServiceSettingsSuccessResult' },
                  },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [{ kind: 'Field', name: { kind: 'Name', value: 'status' } }],
                  },
                },
                {
                  kind: 'InlineFragment',
                  typeCondition: {
                    kind: 'NamedType',
                    name: { kind: 'Name', value: 'UpdateServiceSettingsErrorResult' },
                  },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'status' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'message' } },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<UpdateServiceSettingsMutation, UpdateServiceSettingsMutationVariables>;
export const ConnectGithubBranchDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'ConnectGithubBranch' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'serviceId' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'Int' } },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'environmentId' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'Int' } },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'branch' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'connect_github_branch' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'service_id' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'serviceId' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'environment_id' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'environmentId' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'branch' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'branch' } },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'InlineFragment',
                  typeCondition: {
                    kind: 'NamedType',
                    name: { kind: 'Name', value: 'ConnectGithubBranchSuccess' },
                  },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [{ kind: 'Field', name: { kind: 'Name', value: 'status' } }],
                  },
                },
                {
                  kind: 'InlineFragment',
                  typeCondition: {
                    kind: 'NamedType',
                    name: { kind: 'Name', value: 'ConnectGithubBranchError' },
                  },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'status' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'message' } },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<ConnectGithubBranchMutation, ConnectGithubBranchMutationVariables>;
export const CreateEnvironmentDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'CreateEnvironment' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'projectSlug' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'environment' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'AddEnvironmentsInput' } },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'add_environment' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'project_slug' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'projectSlug' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'environment' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'environment' } },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'InlineFragment',
                  typeCondition: {
                    kind: 'NamedType',
                    name: { kind: 'Name', value: 'AddEnvironmentsSuccess' },
                  },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [{ kind: 'Field', name: { kind: 'Name', value: 'status' } }],
                  },
                },
                {
                  kind: 'InlineFragment',
                  typeCondition: {
                    kind: 'NamedType',
                    name: { kind: 'Name', value: 'AddEnvironmentsError' },
                  },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'status' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'message' } },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<CreateEnvironmentMutation, CreateEnvironmentMutationVariables>;
export const Edit_Environment_ValueDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'Edit_environment_value' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'input' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'EditEnvironmentValueInput' } },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'edit_environment_value' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'input' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'input' } },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'InlineFragment',
                  typeCondition: {
                    kind: 'NamedType',
                    name: { kind: 'Name', value: 'EditEnvironmentValueSuccess' },
                  },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [{ kind: 'Field', name: { kind: 'Name', value: 'status' } }],
                  },
                },
                {
                  kind: 'InlineFragment',
                  typeCondition: {
                    kind: 'NamedType',
                    name: { kind: 'Name', value: 'EditEnvironmentValueError' },
                  },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'status' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'message' } },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  Edit_Environment_ValueMutation,
  Edit_Environment_ValueMutationVariables
>;
export const CreateProjectMutationDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'CreateProjectMutation' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'name' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'description' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'create_project' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'name' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'name' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'description' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'description' } },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'InlineFragment',
                  typeCondition: {
                    kind: 'NamedType',
                    name: { kind: 'Name', value: 'CreateProjectSuccess' },
                  },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'status' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'data' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                            { kind: 'Field', name: { kind: 'Name', value: 'description' } },
                            { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                            { kind: 'Field', name: { kind: 'Name', value: 'slug' } },
                            { kind: 'Field', name: { kind: 'Name', value: 'url' } },
                          ],
                        },
                      },
                    ],
                  },
                },
                {
                  kind: 'InlineFragment',
                  typeCondition: {
                    kind: 'NamedType',
                    name: { kind: 'Name', value: 'CreateProjectError' },
                  },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'status' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'message' } },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<CreateProjectMutationMutation, CreateProjectMutationMutationVariables>;
export const DeleteProjectMutationDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'DeleteProjectMutation' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'slug' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'delete_project' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'slug' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'slug' } },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'InlineFragment',
                  typeCondition: {
                    kind: 'NamedType',
                    name: { kind: 'Name', value: 'DeleteProjectSuccess' },
                  },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'message' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'status' } },
                    ],
                  },
                },
                {
                  kind: 'InlineFragment',
                  typeCondition: {
                    kind: 'NamedType',
                    name: { kind: 'Name', value: 'DeleteProjectError' },
                  },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'message' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'status' } },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<DeleteProjectMutationMutation, DeleteProjectMutationMutationVariables>;
export const UpdateProjectDetailsMutationDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'UpdateProjectDetailsMutation' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'projectSlug' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'input' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'UpdateProjectDetailsInput' } },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'update_project_details' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'project_slug' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'projectSlug' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'input' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'input' } },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'InlineFragment',
                  typeCondition: {
                    kind: 'NamedType',
                    name: { kind: 'Name', value: 'UpdateProjectDetailsResultSuccess' },
                  },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [{ kind: 'Field', name: { kind: 'Name', value: 'status' } }],
                  },
                },
                {
                  kind: 'InlineFragment',
                  typeCondition: {
                    kind: 'NamedType',
                    name: { kind: 'Name', value: 'UpdateProjectDetailsResultError' },
                  },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'status' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'message' } },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  UpdateProjectDetailsMutationMutation,
  UpdateProjectDetailsMutationMutationVariables
>;
export const RequestDeploymentDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'RequestDeployment' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'projectSlug' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'serviceId' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'Float' } },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'environmentId' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'Float' } },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'request_deployment' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'project_slug' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'projectSlug' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'service_id' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'serviceId' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'environment_id' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'environmentId' } },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'InlineFragment',
                  typeCondition: {
                    kind: 'NamedType',
                    name: { kind: 'Name', value: 'DeploymentRequestSuccessResult' },
                  },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'status' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'deployment' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [{ kind: 'Field', name: { kind: 'Name', value: 'id' } }],
                        },
                      },
                      { kind: 'Field', name: { kind: 'Name', value: 'message' } },
                    ],
                  },
                },
                {
                  kind: 'InlineFragment',
                  typeCondition: {
                    kind: 'NamedType',
                    name: { kind: 'Name', value: 'DeploymentRequestErrorResult' },
                  },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'status' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'message' } },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<RequestDeploymentMutation, RequestDeploymentMutationVariables>;
export const CreateServiceMutationDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'CreateServiceMutation' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'input' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'CreateNewServiceInput' } },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'create_service' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'input' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'input' } },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'InlineFragment',
                  typeCondition: {
                    kind: 'NamedType',
                    name: { kind: 'Name', value: 'CreateNewServiceSuccessResult' },
                  },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'status' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'data' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                            { kind: 'Field', name: { kind: 'Name', value: 'projectId' } },
                            { kind: 'Field', name: { kind: 'Name', value: 'serviceType' } },
                          ],
                        },
                      },
                      { kind: 'Field', name: { kind: 'Name', value: 'message' } },
                    ],
                  },
                },
                {
                  kind: 'InlineFragment',
                  typeCondition: {
                    kind: 'NamedType',
                    name: { kind: 'Name', value: 'CreateNewServiceErrorResult' },
                  },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'status' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'message' } },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<CreateServiceMutationMutation, CreateServiceMutationMutationVariables>;
export const DeleteServiceMutationDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'DeleteServiceMutation' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'projectSlug' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'serviceId' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'Float' } },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'delete_service' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'project_slug' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'projectSlug' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'service_id' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'serviceId' } },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'InlineFragment',
                  typeCondition: {
                    kind: 'NamedType',
                    name: { kind: 'Name', value: 'DeleteServiceResultSuccess' },
                  },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [{ kind: 'Field', name: { kind: 'Name', value: 'status' } }],
                  },
                },
                {
                  kind: 'InlineFragment',
                  typeCondition: {
                    kind: 'NamedType',
                    name: { kind: 'Name', value: 'DeleteServiceResultError' },
                  },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'status' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'message' } },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<DeleteServiceMutationMutation, DeleteServiceMutationMutationVariables>;
export const AddTeamMemberDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'AddTeamMember' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'projectSlug' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'member' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'AddTeamMemberInput' } },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'add_team_member' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'project_slug' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'projectSlug' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'member' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'member' } },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'InlineFragment',
                  typeCondition: {
                    kind: 'NamedType',
                    name: { kind: 'Name', value: 'AddTeamMemberSuccessResult' },
                  },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'email' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'status' } },
                    ],
                  },
                },
                {
                  kind: 'InlineFragment',
                  typeCondition: {
                    kind: 'NamedType',
                    name: { kind: 'Name', value: 'AddTeamMemberErrorResult' },
                  },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'status' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'message' } },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<AddTeamMemberMutation, AddTeamMemberMutationVariables>;
export const RemoveTeamMemberDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'RemoveTeamMember' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'projectSlug' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'email' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'remove_team_member' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'project_slug' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'projectSlug' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'email' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'email' } },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'InlineFragment',
                  typeCondition: {
                    kind: 'NamedType',
                    name: { kind: 'Name', value: 'RemoveTeamMemberResultSuccess' },
                  },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'status' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'message' } },
                    ],
                  },
                },
                {
                  kind: 'InlineFragment',
                  typeCondition: {
                    kind: 'NamedType',
                    name: { kind: 'Name', value: 'RemoveTeamMemberResultError' },
                  },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'status' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'message' } },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<RemoveTeamMemberMutation, RemoveTeamMemberMutationVariables>;
export const GetAllServicesDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'GetAllServices' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'projectSlug' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'get_all_services' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'project_slug' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'projectSlug' } },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'InlineFragment',
                  typeCondition: {
                    kind: 'NamedType',
                    name: { kind: 'Name', value: 'GetAllServicesSuccessResult' },
                  },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'status' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'services' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                            { kind: 'Field', name: { kind: 'Name', value: 'type' } },
                            { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                            { kind: 'Field', name: { kind: 'Name', value: 'lastDeploymentDate' } },
                          ],
                        },
                      },
                    ],
                  },
                },
                {
                  kind: 'InlineFragment',
                  typeCondition: {
                    kind: 'NamedType',
                    name: { kind: 'Name', value: 'GetAllServicesFailedResult' },
                  },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'status' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'message' } },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<GetAllServicesQuery, GetAllServicesQueryVariables>;
export const DatabaseServicesQueryDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'DatabaseServicesQuery' },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'get_database_services' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'InlineFragment',
                  typeCondition: {
                    kind: 'NamedType',
                    name: { kind: 'Name', value: 'GetDatabaseServiceSuccess' },
                  },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'status' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'data' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                            { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                            { kind: 'Field', name: { kind: 'Name', value: 'icon' } },
                          ],
                        },
                      },
                    ],
                  },
                },
                {
                  kind: 'InlineFragment',
                  typeCondition: {
                    kind: 'NamedType',
                    name: { kind: 'Name', value: 'GetDatabaseServiceError' },
                  },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'status' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'message' } },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<DatabaseServicesQueryQuery, DatabaseServicesQueryQueryVariables>;
export const GetDeploymentsHistoryDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'GetDeploymentsHistory' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'page' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'Int' } },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'perPage' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'Int' } },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'projectSlug' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'serviceId' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'Float' } },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'deployments_history' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'page' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'page' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'per_page' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'perPage' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'project_slug' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'projectSlug' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'service_id' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'serviceId' } },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'InlineFragment',
                  typeCondition: {
                    kind: 'NamedType',
                    name: { kind: 'Name', value: 'DeploymentHistorySuccessResult' },
                  },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'status' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'data' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                            { kind: 'Field', name: { kind: 'Name', value: 'status' } },
                            { kind: 'Field', name: { kind: 'Name', value: 'commitHash' } },
                            { kind: 'Field', name: { kind: 'Name', value: 'branch' } },
                            { kind: 'Field', name: { kind: 'Name', value: 'commiterAvatar' } },
                            { kind: 'Field', name: { kind: 'Name', value: 'createdAt' } },
                          ],
                        },
                      },
                    ],
                  },
                },
                {
                  kind: 'InlineFragment',
                  typeCondition: {
                    kind: 'NamedType',
                    name: { kind: 'Name', value: 'DeploymentHistoryErrorResult' },
                  },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'status' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'message' } },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<GetDeploymentsHistoryQuery, GetDeploymentsHistoryQueryVariables>;
export const GetServiceSettingsDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'GetServiceSettings' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'serviceId' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'Float' } },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'getServiceSettings' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'service_id' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'serviceId' } },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'InlineFragment',
                  typeCondition: {
                    kind: 'NamedType',
                    name: { kind: 'Name', value: 'GetServiceSettingsSuccessResult' },
                  },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'status' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'data' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            { kind: 'Field', name: { kind: 'Name', value: 'port' } },
                            { kind: 'Field', name: { kind: 'Name', value: 'use_ai_review' } },
                            { kind: 'Field', name: { kind: 'Name', value: 'domain' } },
                          ],
                        },
                      },
                    ],
                  },
                },
                {
                  kind: 'InlineFragment',
                  typeCondition: {
                    kind: 'NamedType',
                    name: { kind: 'Name', value: 'GetServiceSettingsErrorResult' },
                  },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'status' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'message' } },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<GetServiceSettingsQuery, GetServiceSettingsQueryVariables>;
export const Get_Github_Service_InfoDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'Get_github_service_info' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'serviceId' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'Int' } },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'environmentId' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'Int' } },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'get_github_service_info' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'service_id' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'serviceId' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'environment_id' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'environmentId' } },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'InlineFragment',
                  typeCondition: {
                    kind: 'NamedType',
                    name: { kind: 'Name', value: 'GetGithubServiceInfoSuccess' },
                  },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'status' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'githubServiceInfo' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            { kind: 'Field', name: { kind: 'Name', value: 'owner' } },
                            { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                            { kind: 'Field', name: { kind: 'Name', value: 'connectedBranch' } },
                          ],
                        },
                      },
                    ],
                  },
                },
                {
                  kind: 'InlineFragment',
                  typeCondition: {
                    kind: 'NamedType',
                    name: { kind: 'Name', value: 'GetGithubServiceInfoError' },
                  },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'status' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'message' } },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<Get_Github_Service_InfoQuery, Get_Github_Service_InfoQueryVariables>;
export const GetEnvironmentValuesDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'GetEnvironmentValues' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'input' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'GetEnvironmentValuesInput' } },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'environment_values' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'input' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'input' } },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'InlineFragment',
                  typeCondition: {
                    kind: 'NamedType',
                    name: { kind: 'Name', value: 'GetEnvironmentValuesSuccessResult' },
                  },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'environmentValues' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                            { kind: 'Field', name: { kind: 'Name', value: 'key' } },
                            { kind: 'Field', name: { kind: 'Name', value: 'value' } },
                          ],
                        },
                      },
                      { kind: 'Field', name: { kind: 'Name', value: 'status' } },
                    ],
                  },
                },
                {
                  kind: 'InlineFragment',
                  typeCondition: {
                    kind: 'NamedType',
                    name: { kind: 'Name', value: 'GetEnvironmentValuesErrorResult' },
                  },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'status' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'message' } },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<GetEnvironmentValuesQuery, GetEnvironmentValuesQueryVariables>;
export const EnvironmentsQueryDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'EnvironmentsQuery' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'projectSlug' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'environments' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'project_slug' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'projectSlug' } },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'InlineFragment',
                  typeCondition: {
                    kind: 'NamedType',
                    name: { kind: 'Name', value: 'GetEnvironmentsSuccess' },
                  },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'environments' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                            { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                          ],
                        },
                      },
                      { kind: 'Field', name: { kind: 'Name', value: 'status' } },
                    ],
                  },
                },
                {
                  kind: 'InlineFragment',
                  typeCondition: {
                    kind: 'NamedType',
                    name: { kind: 'Name', value: 'GetEnvironmentsError' },
                  },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'status' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'message' } },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<EnvironmentsQueryQuery, EnvironmentsQueryQueryVariables>;
export const ProjectsQueryDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'ProjectsQuery' },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'all_projects' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'InlineFragment',
                  typeCondition: {
                    kind: 'NamedType',
                    name: { kind: 'Name', value: 'ProjectSuccess' },
                  },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'result' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'data' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                            { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                            { kind: 'Field', name: { kind: 'Name', value: 'description' } },
                            { kind: 'Field', name: { kind: 'Name', value: 'slug' } },
                            { kind: 'Field', name: { kind: 'Name', value: 'url' } },
                            { kind: 'Field', name: { kind: 'Name', value: 'created_at' } },
                            { kind: 'Field', name: { kind: 'Name', value: 'updated_at' } },
                          ],
                        },
                      },
                    ],
                  },
                },
                {
                  kind: 'InlineFragment',
                  typeCondition: {
                    kind: 'NamedType',
                    name: { kind: 'Name', value: 'ProjectError' },
                  },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'result' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'message' } },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<ProjectsQueryQuery, ProjectsQueryQueryVariables>;
export const GetProjectDetailsDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'GetProjectDetails' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'projectSlug' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'get_project_details' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'project_slug' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'projectSlug' } },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'InlineFragment',
                  typeCondition: {
                    kind: 'NamedType',
                    name: { kind: 'Name', value: 'GetProjectDetailsResultSuccess' },
                  },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'status' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'data' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                            { kind: 'Field', name: { kind: 'Name', value: 'description' } },
                            { kind: 'Field', name: { kind: 'Name', value: 'slug' } },
                          ],
                        },
                      },
                    ],
                  },
                },
                {
                  kind: 'InlineFragment',
                  typeCondition: {
                    kind: 'NamedType',
                    name: { kind: 'Name', value: 'GetProjectDetailsResultError' },
                  },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'status' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'message' } },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<GetProjectDetailsQuery, GetProjectDetailsQueryVariables>;
export const GetRepositoriesDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'GetRepositories' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'page' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'Int' } },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'perPage' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'Int' } },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'sortBy' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'GithubRepositorySortBy' } },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'sortDirection' } },
          type: {
            kind: 'NamedType',
            name: { kind: 'Name', value: 'GithubRepositorySortDirection' },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'get_repositories' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'page' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'page' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'per_page' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'perPage' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'sortBy' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'sortBy' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'sortDirection' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'sortDirection' } },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'InlineFragment',
                  typeCondition: {
                    kind: 'NamedType',
                    name: { kind: 'Name', value: 'GetRepositorySuccessResult' },
                  },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'status' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'data' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                            { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'owner' },
                              selectionSet: {
                                kind: 'SelectionSet',
                                selections: [
                                  { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                                  { kind: 'Field', name: { kind: 'Name', value: 'login' } },
                                  { kind: 'Field', name: { kind: 'Name', value: 'avatar_url' } },
                                ],
                              },
                            },
                            { kind: 'Field', name: { kind: 'Name', value: 'description' } },
                            { kind: 'Field', name: { kind: 'Name', value: 'url' } },
                            { kind: 'Field', name: { kind: 'Name', value: 'git_url' } },
                            { kind: 'Field', name: { kind: 'Name', value: 'is_private' } },
                            { kind: 'Field', name: { kind: 'Name', value: 'created_at' } },
                            { kind: 'Field', name: { kind: 'Name', value: 'updated_at' } },
                          ],
                        },
                      },
                    ],
                  },
                },
                {
                  kind: 'InlineFragment',
                  typeCondition: {
                    kind: 'NamedType',
                    name: { kind: 'Name', value: 'GetRepositoryErrorResult' },
                  },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'status' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'message' } },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<GetRepositoriesQuery, GetRepositoriesQueryVariables>;
export const SearchRepositoriesDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'SearchRepositories' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'keyword' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'page' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'Int' } },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'perPage' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'Int' } },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'sortBy' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'GithubRepositorySortBy' } },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'sortDirection' } },
          type: {
            kind: 'NamedType',
            name: { kind: 'Name', value: 'GithubRepositorySortDirection' },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'search_repositories' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'keyword' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'keyword' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'page' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'page' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'per_page' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'perPage' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'sortBy' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'sortBy' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'sortDirection' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'sortDirection' } },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'InlineFragment',
                  typeCondition: {
                    kind: 'NamedType',
                    name: { kind: 'Name', value: 'SearchRepositorySuccessResult' },
                  },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'status' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'data' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                            { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'owner' },
                              selectionSet: {
                                kind: 'SelectionSet',
                                selections: [
                                  { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                                  { kind: 'Field', name: { kind: 'Name', value: 'login' } },
                                  { kind: 'Field', name: { kind: 'Name', value: 'avatar_url' } },
                                ],
                              },
                            },
                            { kind: 'Field', name: { kind: 'Name', value: 'description' } },
                            { kind: 'Field', name: { kind: 'Name', value: 'url' } },
                            { kind: 'Field', name: { kind: 'Name', value: 'git_url' } },
                            { kind: 'Field', name: { kind: 'Name', value: 'is_private' } },
                            { kind: 'Field', name: { kind: 'Name', value: 'created_at' } },
                            { kind: 'Field', name: { kind: 'Name', value: 'updated_at' } },
                          ],
                        },
                      },
                      { kind: 'Field', name: { kind: 'Name', value: 'total_count' } },
                    ],
                  },
                },
                {
                  kind: 'InlineFragment',
                  typeCondition: {
                    kind: 'NamedType',
                    name: { kind: 'Name', value: 'SearchRepositoryErrorResult' },
                  },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'status' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'message' } },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<SearchRepositoriesQuery, SearchRepositoriesQueryVariables>;
export const GetBranchesDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'GetBranches' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'owner' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'repo' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'get_branches' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'owner' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'owner' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'repo' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'repo' } },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'InlineFragment',
                  typeCondition: {
                    kind: 'NamedType',
                    name: { kind: 'Name', value: 'GetBranchesSuccessResult' },
                  },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'status' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'data' } },
                    ],
                  },
                },
                {
                  kind: 'InlineFragment',
                  typeCondition: {
                    kind: 'NamedType',
                    name: { kind: 'Name', value: 'GetBranchesErrorResult' },
                  },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'status' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'message' } },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<GetBranchesQuery, GetBranchesQueryVariables>;
export const GetTeamMembersDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'GetTeamMembers' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'projectSlug' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'team_members' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'project_slug' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'projectSlug' } },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'InlineFragment',
                  typeCondition: {
                    kind: 'NamedType',
                    name: { kind: 'Name', value: 'GetTeamSuccess' },
                  },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'status' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'team' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            { kind: 'Field', name: { kind: 'Name', value: 'slug' } },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'members' },
                              selectionSet: {
                                kind: 'SelectionSet',
                                selections: [
                                  { kind: 'Field', name: { kind: 'Name', value: 'email' } },
                                  { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                                  { kind: 'Field', name: { kind: 'Name', value: 'profile_url' } },
                                  { kind: 'Field', name: { kind: 'Name', value: 'status' } },
                                  { kind: 'Field', name: { kind: 'Name', value: 'permissions' } },
                                ],
                              },
                            },
                          ],
                        },
                      },
                    ],
                  },
                },
                {
                  kind: 'InlineFragment',
                  typeCondition: {
                    kind: 'NamedType',
                    name: { kind: 'Name', value: 'GetTeamError' },
                  },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'status' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'message' } },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<GetTeamMembersQuery, GetTeamMembersQueryVariables>;
export const GetUserInfoQueryDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'GetUserInfoQuery' },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'user_info' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                { kind: 'Field', name: { kind: 'Name', value: 'email' } },
                { kind: 'Field', name: { kind: 'Name', value: 'profile_pic_url' } },
                { kind: 'Field', name: { kind: 'Name', value: 'current_plan_id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'is_trial' } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<GetUserInfoQueryQuery, GetUserInfoQueryQueryVariables>;
export const BalanceDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'Balance' },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'balance' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'InlineFragment',
                  typeCondition: {
                    kind: 'NamedType',
                    name: { kind: 'Name', value: 'BalanceResultSuccess' },
                  },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'status' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'balance' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'currency' } },
                    ],
                  },
                },
                {
                  kind: 'InlineFragment',
                  typeCondition: {
                    kind: 'NamedType',
                    name: { kind: 'Name', value: 'BalanceResultError' },
                  },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'status' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'message' } },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<BalanceQuery, BalanceQueryVariables>;
