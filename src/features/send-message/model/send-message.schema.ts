import { z } from "zod";

export const sendMessageSchema = z.object({
    messageText: z
    .string()
    .trim()
    .min(1, 'Введите сообщение')
});

export type TSendMessageSchema = z.infer<typeof sendMessageSchema>;