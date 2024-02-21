import * as z from "zod";

export const loginSchema = z.object({
  email: z
    .string()
    .email({ message: "Formato de e-mail inválido" })
    .min(5, { message: "O e-mail deve ter no mínimo 5 caracteres" }),
  password: z
    .string()
    .min(6, { message: "A senha deve ter no mínimo 6 caracteres" }),
});

export type LoginSchemaType = z.infer<typeof loginSchema>;
