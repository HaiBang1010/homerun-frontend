import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export type User = {
  id: number
  name: string
  email: string
}

type AuthState = {
  user: User | null
  token: string | null
  isAuthenticated: boolean
  login: (payload: { user: User; token: string }) => void
  logout: () => void
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      login: ({ user, token }) => set({ user, token, isAuthenticated: true }),
      logout: () => set({ user: null, token: null, isAuthenticated: false }),
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({ user: state.user, token: state.token }),
      onRehydrateStorage: () => (state) => {
        if (state) state.isAuthenticated = Boolean(state.token)
      },
    },
  ),
)
