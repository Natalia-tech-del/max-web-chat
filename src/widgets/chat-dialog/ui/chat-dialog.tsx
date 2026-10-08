import styles from './chat-dialog.module.css'
import { useChatStore } from '@entities/chat'
import { useMessageStore } from '@entities/message'
import { SendMessage } from '@features/send-message'

export const ChatDialog = () => {
    const chats = useChatStore((state) => state.chats)
    const selectedChatId = useChatStore((state) => state.selectedChatId)
    const closeChat = useChatStore((state) => state.closeChat)
    const messages = useMessageStore((state) => state.messages)

    const selectedChat = chats.find((chat) => chat.chatId === selectedChatId)
    const selectedChatMessages = messages.filter((message) => message.chatId === selectedChatId)
    return (
        <section className={styles.dialog}>
            {chats.length === 0 ? (
                <div className={styles.thread}>
                    <p className={styles.empty}>Выберите чат или создайте новый</p>
                </div>
            )
                : selectedChat ? (
                    <>
                        <header className={styles.header}>
                            <button type="button" className={styles.back} onClick={closeChat}>
                                ←
                            </button>
                            <h2 className={styles.phone}>{selectedChat.phoneNumber}</h2>
                        </header>
                        <div className={selectedChatMessages.length === 0 ? styles.thread : styles.threadList}>
                            {selectedChatMessages.length === 0 ? (
                                <p className={styles.empty}>Сообщений пока нет</p>
                            ) : (
                                selectedChatMessages.map((message) => (
                                    <p key={message.idMessage} className={styles.message}>
                                        {message.messageText}
                                    </p>
                                ))
                            )}
                        </div>
                        <SendMessage />
                    </>
                ) : (
                    <div className={styles.thread} />
                )}
        </section>
    )
}