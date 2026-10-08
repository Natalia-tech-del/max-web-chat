import { type SubmitEvent, useState } from 'react'
import styles from './send-message.module.css'
import { sendMessage } from '@shared/api/send-message'
import { sendMessageSchema } from '../model/send-message.schema'
import { useChatStore } from '@entities/chat'
import { useMessageStore } from '@entities/message'
import { useSessionStore } from '@entities/session'

export const SendMessage = () => {
    const [messageText, setMessageText] = useState('')
    const [formError, setFormError] = useState<string | null>(null)
    const session = useSessionStore((state) => state.session)
    const selectedChatId = useChatStore((state) => state.selectedChatId)
    const addMessage = useMessageStore((state) => state.addMessage)

    const canSubmit = sendMessageSchema.safeParse({ messageText }).success

    const handleSubmit = async (event: SubmitEvent) => {
        event.preventDefault()

        const result = sendMessageSchema.safeParse({
            messageText
        })

        if (!result.success || !session || !selectedChatId) {
            return;
        }

        setFormError(null)

        try {
            const messageResponse = await sendMessage(session.idInstance, session.apiTokenInstance, selectedChatId, result.data.messageText)
                addMessage({
                    idMessage: messageResponse.idMessage,
                    chatId: selectedChatId,
                    messageText: result.data.messageText,
                    // признак сообщения - true - исходящее
                    messageSign: true
                })
                setMessageText('')
        } catch {
            setFormError('Ошибка при отправке сообщения')
        }
    }

    return (
        <form className={styles.form} onSubmit={handleSubmit}>
            <input
                className={styles.input}
                type="text"
                value={messageText}
                placeholder="Сообщение"
                onChange={(event) => {
                    setMessageText(event.target.value)
                    setFormError(null)
                }}
            />
            <button className={styles.button} type="submit" disabled={!canSubmit}>
                Отправить
            </button>
            {formError ? <p className={styles.error}>{formError}</p> : null}
        </form>
    )
}