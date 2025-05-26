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

const SUBCRIPTION_CHECKOUT = gql(`
  mutation CreateSubscriptionCheckout($planId: Float!, $redirectUrl: String!, $cancelUrl: String!) {
  createSubscriptionCheckout(planId: $planId, redirectUrl: $redirectUrl, cancelUrl: $cancelUrl) {
    ... on CreateSubscriptionCheckoutSuccess {
      status
      subscription_url
    }
    ... on CreateSubscriptionCheckoutError {
      status
      message
    }
  }
}
`);

export function useTopupMutation() {
  return useMutation(TOPUP);
}

export function useCreateSubscriptionCheckoutMutation() {
  return useMutation(SUBCRIPTION_CHECKOUT);
}
