/** Single place to read env vars, failing fast on missing config. */
function required(key: keyof ImportMetaEnv): string {
  const value = import.meta.env[key]
  if (!value) {
    throw new Error(`Missing environment variable: ${key}`)
  }
  return value
}

export const env = {
  apiBaseUrl: required('VITE_API_BASE_URL'),
  appName: import.meta.env.VITE_APP_NAME ?? 'App',
  isDev: import.meta.env.DEV,
} as const
