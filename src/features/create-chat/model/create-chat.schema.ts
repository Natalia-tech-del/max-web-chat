import { z } from "zod";

export const createChatSchema = z.object({
    phoneNumber: z
    .string()
    .trim()
    .regex(/^7\d{10}$/, 'Введите номер в формате 79991234567'),
});

export type TCreateChatSchema = z.infer<typeof createChatSchema>;