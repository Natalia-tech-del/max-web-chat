import { apiUrl } from "../config/api-url";

type TCheckInstanceResponse = {
    stateInstance: string
  }

export const checkInstance = async (idInstance: string, apiTokenInstance: string): Promise<TCheckInstanceResponse> => {
    const response = await fetch(`${apiUrl}/waInstance${idInstance}/getStateInstance/${apiTokenInstance}`)
    if (response.ok) {
        const data: TCheckInstanceResponse = await response.json()
    return data
    } else {
        throw new Error('Ошибка при проверке инстанса')
    }
}