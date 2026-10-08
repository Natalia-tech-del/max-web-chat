import { apiUrl } from "../config/api-url";

type TDeleteNotificationResponse = {
    result: boolean
  }

export const deleteNotification = async (idInstance: string, apiTokenInstance: string, receiptId: number): Promise<TDeleteNotificationResponse> => {
    const response = await fetch(`${apiUrl}/waInstance${idInstance}/deleteNotification/${apiTokenInstance}/${receiptId}`, {
        method: 'DELETE'
    })
    if (response.ok) {
        const data: TDeleteNotificationResponse = await response.json()
    return data
    } else {
        throw new Error('Ошибка при удалении уведомления')
    }
}