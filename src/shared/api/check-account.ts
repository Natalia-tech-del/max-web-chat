import { apiUrl } from "../config/api-url";

type TCheckAccountResponse = {
    exist: boolean
    chatId: string
}

export const checkAccount = async (idInstance: string, apiTokenInstance: string, phoneNumber: string,): Promise<TCheckAccountResponse> => {
    const response = await fetch(`${apiUrl}/waInstance${idInstance}/checkAccount/${apiTokenInstance}`, 
        {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              phoneNumber: Number(phoneNumber),
            }),
          },
    )
    if (response.ok) {
    const data: TCheckAccountResponse = await response.json()
    return data
    } else {
        throw new Error('Ошибка при проверке номера')
    }
}