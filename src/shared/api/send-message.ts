import { apiUrl } from "../config/api-url";

type TSendMessageResponse = {
    idMessage: string
  }

export const sendMessage = async (idInstance: string, apiTokenInstance: string, chatId: string, message: string): Promise<TSendMessageResponse> => {
    const response = await fetch(`${apiUrl}/waInstance${idInstance}/sendMessage/${apiTokenInstance}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          chatId,
          message
        }),
      },)
    if (response.ok) {
      const data: TSendMessageResponse = await response.json()
    return data
    } else {
        throw new Error('Ошибка при отправке сообщения')
    }
}