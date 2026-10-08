import { useEffect } from "react";
import { useSessionStore } from "@entities/session";
import { useMessageStore } from "@entities/message";
import { receiveNotification } from "@shared/api/receive-notification";
import { deleteNotification } from "@shared/api/delete-notification";

export const useReceiveNotifications = () => {
    const session = useSessionStore((state) => state.session)
    const addMessage = useMessageStore((state) => state.addMessage)
    const messages = useMessageStore((state) => state.messages)

    useEffect(() => {
        if (!session) {
            return
        }

        let cancelled = false

        // Функция - опрос уведомлений в очередь. Ждет 5 сек - по умолчанию, если ответ - пустой, то новая итерация - пока cancelled=false - запрос идет заново. 
        const polling = async () => {

            while (!cancelled) {
                try {
                    const receiveNotificationResponse = await receiveNotification(session.idInstance, session.apiTokenInstance)

                    if (cancelled) {
                        return
                      }

                    // если ответ - пустой, то новая итерация
                    if (!receiveNotificationResponse) {
                        continue
                    }

                    // Получаем id уведомления для последующего удаления из очереди и body - для получения данных сообщения
                    const { receiptId, body } = receiveNotificationResponse
                    const messageText = body.messageData.textMessageData?.textMessage

                    // защита от добавления такого же сообщения, если запрос на удаление уведомления упал.
                    const alreadySaved = messages.some((message) => message.idMessage === body.idMessage)

                    if (body.typeWebhook === 'incomingMessageReceived' && body.messageData.typeMessage === 'textMessage' && messageText && !alreadySaved) {
                        addMessage({
                            idMessage: body.idMessage,
                            chatId: body.senderData.chatId,
                            messageText,
                            // признак сообщения - true - исходящее, false - входящее
                            messageSign: false
                        })
                    }

                    await deleteNotification(session.idInstance, session.apiTokenInstance, receiptId)
                    
                } catch {
                    await new Promise((resolve) => window.setTimeout(resolve, 3000))
                }
            }
        }

        void polling()

        return () => { 
            cancelled = true
        }

    }, [session, addMessage, messages])
}