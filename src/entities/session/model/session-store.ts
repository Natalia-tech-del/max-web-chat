import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import type { TSession, TSessionStore } from '../types/types'

export const useSessionStore = create<TSessionStore>()(
    persist(
        (set) => (
            {
                session: null,
                login: (session: TSession) => set({ session }),
                logout: () => set({ session: null })
            }),
        {
            name: 'session',
            storage: createJSONStorage(() => localStorage),
        },
    )
)




