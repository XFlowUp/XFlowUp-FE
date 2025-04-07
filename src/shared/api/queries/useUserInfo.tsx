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

export default function useUserInfo() {
  return useQuery(GET_USER_INFO, {
    fetchPolicy: 'network-only',
  });
}
