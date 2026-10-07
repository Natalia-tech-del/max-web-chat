import { CreateChat } from '@features/create-chat'
import styles from './chat-page.module.css'
import { useSessionStore } from '@entities/session'
import { useChatStore } from '@entities/chat'

export const ChatPage = () => {
    const logout = useSessionStore((state) => state.logout)
    const chats = useChatStore((state) => state.chats)
    const selectedChatId = useChatStore((state) => state.selectedChatId)
    const selectChat = useChatStore((state) => state.selectChat)
    const clearChats = useChatStore((state) => state.clearChats)

    const selectedChat = chats.find((chat) => chat.chatId === selectedChatId)

    const handleLogout = () => {
        logout()
        clearChats()
    }

    return (
        <main className={styles.page}>
            <aside className={styles.sidebar}>
                <header className={styles.sidebarHeader}>
                    <h1 className={styles.title}>Чаты</h1>
                    <CreateChat />
                </header>
                {(chats.length === 0) ? (<p className={styles.placeholder}>Чатов пока нет</p>) : (
                    <ul className={styles.list}>
                        {chats.map((chat) => (
                            <li key={chat.chatId}>
                                <button
                                    type="button"
                                    className={
                                        chat.chatId === selectedChatId ? styles.chatActive : styles.chat
                                    }
                                    onClick={() => selectChat(chat.chatId)}
                                >
                                    {chat.phoneNumber}
                                </button>
                            </li>
                        ))}
                    </ul>
                )}
                <button type="button" className={styles.logout} onClick={handleLogout}>
                    Выйти
                </button>
            </aside>
            <section className={styles.dialog}>
                {chats.length === 0 ? (
                    <p className={styles.empty}>Выберите чат или создайте новый</p>
                )
                    : selectedChat ? <p className={styles.empty}>{selectedChat.phoneNumber}</p> : null}
            </section>
        </main>
    )
}