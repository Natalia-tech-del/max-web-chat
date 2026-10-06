import {  type SubmitEvent, useState } from 'react'
import { loginFormSchema } from '../model/login-form.schema'
import styles from './login-form.module.css';

export const LoginForm = () => {
    const [idInstance, setIdInstance] = useState('');
    const [apiTokenInstance, setApiTokenInstance] = useState('');
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = (event: SubmitEvent<HTMLFormElement>) => {
        event.preventDefault();

        const result = loginFormSchema.safeParse({
            idInstance,
            apiTokenInstance
        })

        if (!result.success) {
            setError(result.error.issues[0].message);
            return;
        }

        setError(null);
    }

    return (
        <form onSubmit={handleSubmit} className={styles.form}>
            <label className={styles.label}>idInstance
                <input className={styles.input} type="text" name="idInstance" value={idInstance} onChange={(event) => setIdInstance(event.target.value)} />
            </label>
            <label className={styles.label}>apiTokenInstance
                <input className={styles.input} type="text" name="apiTokenInstance" value={apiTokenInstance} onChange={(event) => setApiTokenInstance(event.target.value)} />
            </label>
            {error ? <p className={styles.error}>{error}</p> : null}
            <button className={styles.button} type="submit">Войти</button>
        </form>
    )
}