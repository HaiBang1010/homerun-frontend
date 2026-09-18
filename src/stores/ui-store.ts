import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export type Theme = 'light' | 'dark' | 'system'

type UIState = {
  theme: Theme
  sidebarOpen: boolean
  setTheme: (theme: Theme) => void
  toggleSidebar: () => void
  setSidebarOpen: (open: boolean) => void
}

export const useUIStore = create<UIState>()(
  persist(
    (set) => ({
      // Light-only design, so 'system' on a dark OS would break shadcn's popover and inputs.
      theme: 'light',
      sidebarOpen: false,
      setTheme: (theme) => set({ theme }),
      toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),
      setSidebarOpen: (sidebarOpen) => set({ sidebarOpen }),
    }),
    // Key bumped so a persisted 'system' cannot override the new default.
    { name: 'homerun-ui', partialize: (state) => ({ theme: state.theme }) },
  ),
)
