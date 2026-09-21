/**
 * Single place to read env vars.
 * Every variable has a default so a fresh clone runs without a `.env`;
 * copy `.env.example` only when you need to point at a different API.
 */
const DEFAULTS = {
  VITE_API_BASE_URL: 'https://jsonplaceholder.typicode.com',
  VITE_APP_NAME: 'Frontend Test',
} as const

function read(key: keyof typeof DEFAULTS): string {
  const value = import.meta.env[key]
  if (value) return value

  if (import.meta.env.DEV) {
    console.warn(`[env] ${key} is not set, falling back to "${DEFAULTS[key]}".`)
  }
  return DEFAULTS[key]
}

export const env = {
  apiBaseUrl: read('VITE_API_BASE_URL'),
  appName: read('VITE_APP_NAME'),
  isDev: import.meta.env.DEV,
} as const
