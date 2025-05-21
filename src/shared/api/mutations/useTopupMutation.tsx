import { gql } from '@/gql/gql';
import { useMutation } from '@apollo/client';

const TOPUP = gql(`
   mutation Topup($data: CreatePaymentInput!) {
    topup(data: $data) {
        ... on CreatePaymentSuccessResult {
        status
        payment_url
        }
        ... on CreatePaymentErrorResult {
        status
        message
        }
    }
}
`);

export function useTopupMutation() {
  return useMutation(TOPUP);
}
