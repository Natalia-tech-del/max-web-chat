import { LoginForm } from "@features/auth";
import styles from './login-page.module.css';

export const LoginPage = () => {
    return (
        <main className={styles.page}>
            <div className={styles.card}>
                <h1 className={styles.title}>Вход</h1>
                <p className={styles.subtitle}>
                    Введите idInstance и apiTokenInstance из кабинета GREEN-API
                </p>
                <p className={styles.hint}>
                    Сначала авторизуйте инстанс по QR в кабинете GREEN-API
                </p>
                <LoginForm />
            </div>
        </main >
    )
}
