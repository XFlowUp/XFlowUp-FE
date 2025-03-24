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

export type Environment = {
  __typename?: 'Environment';
  /** The id of the environment */
  id: Scalars['String']['output'];
  /** The name of the environment */
  name: Scalars['String']['output'];
};

export type EnvironmentInput = {
  /** The id of the environment */
  id: Scalars['String']['input'];
  /** The name of the environment */
  name: Scalars['String']['input'];
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
  environments: Array<Environment>;
  /** The status of the result */
  status: Status;
};

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
  /** Add an environment to a project */
  add_environment: AddEnvironmentsResult;
  /** Add a team member to a project */
  add_team_member: AddTeamMemberResult;
  /** Create a new project */
  create_project: CreateProjectResult;
  /** Delete a project */
  delete_project: DeleteProjectResult;
  /** Send an email */
  send_email: MailResponse;
  /** Send an email with a template */
  send_email_with_template: MailResponse;
  topup: CreatePaymentResult;
};

export type MutationAdd_EnvironmentArgs = {
  environment: AddEnvironmentsInput;
  project_slug: Scalars['String']['input'];
};

export type MutationAdd_Team_MemberArgs = {
  member: AddTeamMemberInput;
  project_slug: Scalars['String']['input'];
};

export type MutationCreate_ProjectArgs = {
  description?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
};

export type MutationDelete_ProjectArgs = {
  slug: Scalars['String']['input'];
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

export type MutationTopupArgs = {
  data: CreatePaymentInput;
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

export type ProjectError = {
  __typename?: 'ProjectError';
  /** The error message */
  message: Scalars['String']['output'];
  /** The status of the response */
  result: Status;
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
  /** Get environment values */
  environment_values: GetEnvironmentValuesResult;
  /** Get all environments in a project */
  environments: GetEnvironmentsResult;
  /** Get all database services for creating new service */
  get_database_services: GetDatabaseServiceResult;
  /** Get all repositories for creating new service */
  get_repositories: GetRepositoryResult;
  repositories: Array<Repository>;
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

export type QueryEnvironment_ValuesArgs = {
  input: GetEnvironmentValuesInput;
};

export type QueryEnvironmentsArgs = {
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

export type QueryTeam_MembersArgs = {
  project_slug: Scalars['String']['input'];
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
  /** The name of the repository */
  name: Scalars['String']['output'];
  /** The owner of the repository */
  owner: Owner;
  /** The updated at date of the repository */
  updated_at?: Maybe<Scalars['String']['output']>;
  /** The url of the repository */
  url: Scalars['String']['output'];
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
  /** The profile URL of the team member */
  profile_url?: Maybe<Scalars['String']['output']>;
};

export type UserInfo = {
  __typename?: 'UserInfo';
  /** The email of the user */
  email: Scalars['String']['output'];
  /** The name of the user */
  name: Scalars['String']['output'];
  /** The avatar URL of the user */
  profile_pic_url?: Maybe<Scalars['String']['output']>;
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

export type GetUserInfoQueryQueryVariables = Exact<{ [key: string]: never }>;

export type GetUserInfoQueryQuery = {
  __typename?: 'Query';
  user_info: {
    __typename?: 'UserInfo';
    name: string;
    email: string;
    profile_pic_url?: string | null;
  };
};

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
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<GetUserInfoQueryQuery, GetUserInfoQueryQueryVariables>;
