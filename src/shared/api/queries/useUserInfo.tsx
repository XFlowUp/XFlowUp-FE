'use client';
import { useQuery } from '@apollo/client';
import { gql } from '@/gql/gql';

const GET_USER_INFO = gql(`
  query GetUserInfoQuery {
  user_info {
    name
    email
    profile_pic_url
  } 
}

`);

const GET_BALANCE = gql(`
  query Balance {
    balance {
      ... on BalanceResultSuccess {
        status
        balance
        currency
      }
      ... on BalanceResultError {
        status
        message
      }
    }
  }
`);

export function useUserInfo() {
  return useQuery(GET_USER_INFO, {
    fetchPolicy: 'network-only',
  });
}

export function useBalance() {
  return useQuery(GET_BALANCE, {
    fetchPolicy: 'network-only',
  });
}
