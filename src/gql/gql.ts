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
  '\n  mutation CreateProjectMutation($name: String!, $description: String) {\n    create_project(name: $name, description: $description) {\n      ... on CreateProjectSuccess {\n        status\n        data {\n          name\n          description\n          id\n          slug\n          url\n        }\n      }\n      ... on CreateProjectError {\n        status\n        message\n      }\n    }\n  }\n': typeof types.CreateProjectMutationDocument;
  '\n  mutation DeleteProjectMutation($slug: String!) {\n    delete_project(slug: $slug) {\n      ... on DeleteProjectSuccess {\n        message\n        status\n      }\n      ... on DeleteProjectError {\n        message\n        status\n      }\n    }\n  }\n': typeof types.DeleteProjectMutationDocument;
  '\n    query ProjectsQuery {\n    all_projects {\n      ... on ProjectSuccess {\n        result\n        data {\n            id\n            name\n            description\n            slug\n            url\n            created_at\n            updated_at\n        }\n      }\n      ... on ProjectError {\n        result\n        message\n      }\n    }\n}\n': typeof types.ProjectsQueryDocument;
  '\n  query GetUserInfoQuery {\n  user_info {\n    name\n    email\n    profile_pic_url\n  } \n}\n\n': typeof types.GetUserInfoQueryDocument;
};
const documents: Documents = {
  '\n  mutation CreateProjectMutation($name: String!, $description: String) {\n    create_project(name: $name, description: $description) {\n      ... on CreateProjectSuccess {\n        status\n        data {\n          name\n          description\n          id\n          slug\n          url\n        }\n      }\n      ... on CreateProjectError {\n        status\n        message\n      }\n    }\n  }\n':
    types.CreateProjectMutationDocument,
  '\n  mutation DeleteProjectMutation($slug: String!) {\n    delete_project(slug: $slug) {\n      ... on DeleteProjectSuccess {\n        message\n        status\n      }\n      ... on DeleteProjectError {\n        message\n        status\n      }\n    }\n  }\n':
    types.DeleteProjectMutationDocument,
  '\n    query ProjectsQuery {\n    all_projects {\n      ... on ProjectSuccess {\n        result\n        data {\n            id\n            name\n            description\n            slug\n            url\n            created_at\n            updated_at\n        }\n      }\n      ... on ProjectError {\n        result\n        message\n      }\n    }\n}\n':
    types.ProjectsQueryDocument,
  '\n  query GetUserInfoQuery {\n  user_info {\n    name\n    email\n    profile_pic_url\n  } \n}\n\n':
    types.GetUserInfoQueryDocument,
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
  source: '\n    query ProjectsQuery {\n    all_projects {\n      ... on ProjectSuccess {\n        result\n        data {\n            id\n            name\n            description\n            slug\n            url\n            created_at\n            updated_at\n        }\n      }\n      ... on ProjectError {\n        result\n        message\n      }\n    }\n}\n'
): (typeof documents)['\n    query ProjectsQuery {\n    all_projects {\n      ... on ProjectSuccess {\n        result\n        data {\n            id\n            name\n            description\n            slug\n            url\n            created_at\n            updated_at\n        }\n      }\n      ... on ProjectError {\n        result\n        message\n      }\n    }\n}\n'];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: '\n  query GetUserInfoQuery {\n  user_info {\n    name\n    email\n    profile_pic_url\n  } \n}\n\n'
): (typeof documents)['\n  query GetUserInfoQuery {\n  user_info {\n    name\n    email\n    profile_pic_url\n  } \n}\n\n'];

export function gql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> =
  TDocumentNode extends DocumentNode<infer TType, any> ? TType : never;
