export type TChat = {
    phoneNumber: string;
    chatId: string;
}

export type TChatState = {
    chats: TChat[]
    selectedChatId: string | null
}

export type TChatActions = {
    addChat: (chat: TChat) => void
    selectChat: (chatId: string) => void
    clearChats: () => void
}

export type TChatStore = TChatState & TChatActions