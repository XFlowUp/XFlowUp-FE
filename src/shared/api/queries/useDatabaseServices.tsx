import { gql } from '@/gql/gql';
import { useQuery } from '@apollo/client';

const GET_DATABASE_SERVICES = gql(`
    query DatabaseServicesQuery{
        get_database_services {
            ... on GetDatabaseServiceSuccess {
                status
                data {
                    id
                    name
                    icon
                }
            }
            ... on GetDatabaseServiceError {
                status
                message
            }
        }
    }
`);

export default function useDatabaseServices() {
  return useQuery(GET_DATABASE_SERVICES, {
    fetchPolicy: 'cache-first',
  });
}
