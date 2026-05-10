export interface ApiClientError {
  status: number;
  details: string[];
  message: string;
}

export function createApiClientError(
  status: number,
  details: string[] = [],
  fallbackMessage = "Request failed"
): ApiClientError {
  return {
    status,
    details,
    message: details[0] ?? fallbackMessage,
  };
}