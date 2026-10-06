import {  type SubmitEvent, useState } from 'react'
import { loginFormSchema } from '../model/login-form.schema'

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
        <form onSubmit={handleSubmit}>
            <label>idInstance
                <input type="number" name="idInstance" value={idInstance} onChange={(event) => setIdInstance(event.target.value)} />
            </label>
            <label>apiTokenInstance
                <input type="text" name="apiTokenInstance" value={apiTokenInstance} onChange={(event) => setApiTokenInstance(event.target.value)} />
            </label>
            {error ? <p>{error}</p> : null}
            <button type="submit">Войти</button>
        </form>
    )
}