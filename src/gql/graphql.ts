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

export type Mutation = {
  __typename?: 'Mutation';
  add_environment: AddEnvironmentsResult;
  /** Create a new project */
  create_project: CreateProjectResult;
  /** Delete a project */
  delete_project: DeleteProjectResult;
};

export type MutationAdd_EnvironmentArgs = {
  environment: AddEnvironmentsInput;
  project_slug: Scalars['String']['input'];
};

export type MutationCreate_ProjectArgs = {
  description?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
};

export type MutationDelete_ProjectArgs = {
  slug: Scalars['String']['input'];
};

/** The project */
export type Project = {
  __typename?: 'Project';
  /** The created at date of the project */
  created_at: Scalars['DateTime']['output'];
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
  environments: GetEnvironmentsResult;
  get_database_services: GetDatabaseServiceResult;
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

export type QueryEnvironmentsArgs = {
  project_slug: Scalars['String']['input'];
};

export type QueryRepositoriesArgs = {
  username: Scalars['String']['input'];
};

export type QueryTeam_MembersArgs = {
  slug: Scalars['String']['input'];
};

export type Repository = {
  __typename?: 'Repository';
  id: Scalars['Float']['output'];
  name: Scalars['String']['output'];
  url: Scalars['String']['output'];
};

export enum Status {
  Error = 'ERROR',
  Success = 'SUCCESS',
}

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
