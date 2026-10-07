import { CreateChat } from '@features/create-chat'
import styles from './chat-page.module.css'
import { useSessionStore } from '@entities/session'

export const ChatPage = () => {
    const logout = useSessionStore((state) => state.logout)
    return(
        <main className={styles.page}>
      <aside className={styles.sidebar}>
        <header className={styles.sidebarHeader}>
          <h1 className={styles.title}>Чаты</h1>
          
          <CreateChat />
        </header>
        <p className={styles.placeholder}>Чатов пока нет</p>
        <button type="button" className={styles.logout} onClick={logout}>
            Выйти
          </button>
      </aside>
      <section className={styles.dialog}>
        <p className={styles.empty}>Выберите чат или создайте новый</p>
      </section>
    </main>
    )

}