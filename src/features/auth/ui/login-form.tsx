import { type SubmitEvent, type ChangeEvent, useState } from 'react'
import { loginFormSchema } from '../model/login-form.schema'
import styles from './login-form.module.css';
import { checkInstance } from '@shared/api/check-instance';
import { useSessionStore } from '@entities/session'

export const LoginForm = () => {
    const [idInstance, setIdInstance] = useState('');
    const [apiTokenInstance, setApiTokenInstance] = useState('');
    const [idError, setIdError] = useState<string | null>(null)
    const [formError, setFormError] = useState<string | null>(null)

    const login = useSessionStore((state) => state.login)

    const canSubmit = loginFormSchema.safeParse({ idInstance, apiTokenInstance }).success

    const handleIdInstanceChange = (event: ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value
        setIdInstance(value)
        setFormError(null)

        const parsed = loginFormSchema.shape.idInstance.safeParse(value)
        setIdError(value.trim() === '' || parsed.success ? null : parsed.error.issues[0].message)
    }

    const handleSubmit = async (event: SubmitEvent<HTMLFormElement>) => {
        event.preventDefault();

        const result = loginFormSchema.safeParse({
            idInstance,
            apiTokenInstance
        })

        if (!result.success) {
            return;
        }

        setFormError(null);

        try {
            const sessionResponse = await checkInstance(result.data.idInstance,
                result.data.apiTokenInstance)
           if (sessionResponse.stateInstance === 'authorized') {
                login(result.data)
            } else {
                setFormError('Инстанс не авторизован. Сначала авторизуйте инстанс по QR в кабинете GREEN-API')
            }
        } catch {
            setFormError('Ошибка при проверке инстанса')
        }
    }

    return (
        <form onSubmit={handleSubmit} className={styles.form}>
            <label className={styles.label}>idInstance
                <input className={styles.input} type="text" name="idInstance" value={idInstance} onChange={handleIdInstanceChange} />
                {idError ? <p className={styles.error}>{idError}</p> : null}
            </label>
            <label className={styles.label}>apiTokenInstance
                <input className={styles.input} type="text" name="apiTokenInstance" value={apiTokenInstance} onChange={(event) => {
                    setApiTokenInstance(event.target.value)
                    setFormError(null)
                }} />
            </label>
            {formError ? <p className={styles.error}>{formError}</p> : null}
            <button className={styles.button} type="submit" disabled={!canSubmit}>Войти</button>
        </form>
    )
}