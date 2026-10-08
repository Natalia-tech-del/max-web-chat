import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import type { TChat, TChatStore } from '../types/types'

export const useChatStore = create<TChatStore>()(
    persist(
        (set) => (
            {
                chats: [],
                selectedChatId: null,
                addChat: (newChat: TChat) => set((state) => ({
                  chats: [...state.chats, newChat],
                  selectedChatId: newChat.chatId,
                  })),
                selectChat: (chatId: string) => set({ selectedChatId: chatId }),
                clearChats: () => set({ chats: [], selectedChatId: null }),
                closeChat: () => set({selectedChatId: null})
            }),
        {
            name: 'chats',
            storage: createJSONStorage(() => localStorage),
        },
    )
)