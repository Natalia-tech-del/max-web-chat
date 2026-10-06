import { useSessionStore } from '@entities/session'
import { LoginPage } from '@pages/login'


export const App = () => {
  const session = useSessionStore((state) => state.session)

    return (
    session ? <h1>Чат</h1>: <LoginPage />
  )}