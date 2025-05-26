import { gql } from '@/gql/gql';
import { useMutation } from '@apollo/client';

const UPDATE_SERVICE_PROMPT = gql(`
  mutation UpdateServicePrompt($serviceId: Float!, $prompt: String!) {
    updateServicePrompt(service_id: $serviceId, prompt: $prompt) {
        ... on UpdateServiceSettingsSuccessResult {
        status
        }
        ... on UpdateServiceSettingsErrorResult {
        status
        message
        }
    }
}
`);

export function useUpdateServicePrompt() {
  return useMutation(UPDATE_SERVICE_PROMPT);
}
