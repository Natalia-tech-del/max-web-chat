import { useSessionStore } from '@entities/session'
import { LoginPage } from '@pages/login'
import { ChatPage } from '@pages/chat'


export const App = () => {
  const session = useSessionStore((state) => state.session)

    return (
    session ? <ChatPage />: <LoginPage />
  )}