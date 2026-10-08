import { apiUrl } from "../config/api-url";

type TReceiveNotificationResponse = {
    receiptId: number;
    body: {
        typeWebhook: string;
        idMessage: string;
        senderData: {
            chatId: string;
        }
        messageData: {
            typeMessage: string;
            textMessageData?: {
                textMessage: string;
            }
        }
    }
  }

export const receiveNotification = async (idInstance: string, apiTokenInstance: string, timeout: number = 5): Promise<TReceiveNotificationResponse | null> => {
    const response = await fetch(`${apiUrl}/waInstance${idInstance}/receiveNotification/${apiTokenInstance}?receiveTimeout=${timeout}`)
    if (!response.ok) {
        throw new Error('Ошибка при получении уведомления')
    } 

    const text = await response.text()

    if (!text) {
        return null
      }

      return JSON.parse(text) as TReceiveNotificationResponse
}