import { z } from "zod";

export const loginFormSchema = z.object({
    idInstance: z
    .string()
    .trim()
    .regex(/^\d+$/, 'idInstance должен состоять из цифр'),
  apiTokenInstance: z.string().trim().min(1, 'Введите apiTokenInstance'),
});

export type TLoginFormSchema = z.infer<typeof loginFormSchema>;