export type TMessage = {
    idMessage: string;
    chatId: string;
    messageText: string;
    // признак сообщения - true - исходящее, false - входящее
    messageSign: boolean;
}

export type TMessageState = {
    messages: TMessage[]
}

export type TMessageActions = {
    addMessage: (message: TMessage) => void
    clearMessages: () => void
}

export type TMessageStore = TMessageState & TMessageActions