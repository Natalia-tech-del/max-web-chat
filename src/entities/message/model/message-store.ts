import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import type { TMessage, TMessageStore } from '../types/types'

export const useMessageStore = create<TMessageStore>()(
    persist(
        (set) => (
            {
                messages: [],
                addMessage: (newMessage: TMessage) => set((state) => ({
                  messages: [...state.messages, newMessage],
                  })),
                clearMessages: () => set({ messages: []})
            }),
        {
            name: 'messages',
            storage: createJSONStorage(() => localStorage),
        },
    )
)