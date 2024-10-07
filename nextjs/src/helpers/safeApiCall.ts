export function safeApiCall<T>(apiCall: () => Promise<T>): Promise<T | []> {
  return apiCall().catch((error) => {
    console.error(`API call failed: ${error}`);
    return [] as unknown as T;
  });
}
