import { type SubmitEvent, type ChangeEvent, useState } from "react";
import styles from './create-chat.module.css'
import { createChatSchema } from "../model/create-chat.schema";
import { useSessionStore } from '@entities/session'
import { useChatStore } from "@entities/chat";
import { checkAccount } from "@shared/api/check-account";

export const CreateChat = () => {
    const [isOpen, setIsOpen] = useState(false)
    const [phoneNumber, setPhoneNumber] = useState('')
    const [phoneError, setPhoneError] = useState<string | null>(null)
    const session = useSessionStore((state) => state.session)
    const addChat = useChatStore((state) => state.addChat)

    const canSubmit = createChatSchema.safeParse({ phoneNumber }).success

    const handlePhoneChange = (event: ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value
        setPhoneNumber(value)

        const parsed = createChatSchema.shape.phoneNumber.safeParse(value)
        setPhoneError(value.trim() === '' || parsed.success ? null : parsed.error.issues[0].message)
    }

    const handleSubmit = async (event: SubmitEvent<HTMLFormElement>) => {
        event.preventDefault();

        const result = createChatSchema.safeParse({
            phoneNumber
        })

        if (!result.success || !session) {
            return;
        }

        setPhoneError(null);

        try {
            const chatIdResponse = await checkAccount(session.idInstance, session.apiTokenInstance, result.data.phoneNumber)
            if (chatIdResponse.exist === true) {
                addChat({
                    chatId: chatIdResponse.chatId,
                    phoneNumber: result.data.phoneNumber
                })
                setPhoneNumber('')
                setIsOpen(false)
            } else {
                setPhoneError('У номера отсутствует MAX аккаунт')
            }
        } catch (error) {
            setPhoneError('Ошибка при проверке аккаунта')
        }

    }
    return (
        <div className={styles.box}>
            <button
                type="button"
                className={styles.plus}
                onClick={() => setIsOpen((open) => !open)}
            >
                +
            </button>
            {isOpen ? (
                <form className={styles.panel} onSubmit={handleSubmit}>
                    <input className={styles.input}
                        type="text"
                        value={phoneNumber}
                        placeholder="79991234567"
                        onChange={handlePhoneChange} />
                    {phoneError ? <p className={styles.error}>{phoneError}</p> : null}
                    <button className={styles.create} type="submit" disabled={!canSubmit}>
                        Создать
                    </button>
                </form>
            ) : null}
        </div>
    )
}