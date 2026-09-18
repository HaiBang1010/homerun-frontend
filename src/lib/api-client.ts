import axios, { AxiosError, type AxiosRequestConfig } from 'axios'

import { env } from '@/lib/env'

export const apiClient = axios.create({
  baseURL: env.apiBaseUrl,
  timeout: 15_000,
  headers: { 'Content-Type': 'application/json' },
})

/** Read lazily to avoid the store -> api-client -> store import cycle. */
let authTokenGetter: () => string | null = () => null

export function setAuthTokenGetter(getter: () => string | null) {
  authTokenGetter = getter
}

let onUnauthorized: (() => void) | null = null

export function setUnauthorizedHandler(handler: () => void) {
  onUnauthorized = handler
}

apiClient.interceptors.request.use((config) => {
  const token = authTokenGetter()
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

apiClient.interceptors.response.use(
  (response) => response,
  (error: AxiosError<{ message?: string }>) => {
    if (error.response?.status === 401) {
      onUnauthorized?.()
    }
    return Promise.reject(error)
  },
)

/** Extracts a user-readable message from any error. */
export function getErrorMessage(error: unknown): string {
  if (axios.isAxiosError<{ message?: string }>(error)) {
    return error.response?.data?.message ?? error.message
  }
  if (error instanceof Error) return error.message
  return 'Đã có lỗi xảy ra'
}

export async function request<T>(config: AxiosRequestConfig): Promise<T> {
  const response = await apiClient.request<T>(config)
  return response.data
}
