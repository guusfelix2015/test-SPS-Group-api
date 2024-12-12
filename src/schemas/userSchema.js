const { z } = require('zod');
const { randomUUID } = require('crypto');

const userSchemas = {
  login: z.object({
    email: z.string().email('Email inválido'),
    password: z.string().min(4, 'Senha deve ter no mínimo 4 caracteres'),
  }),

  create: z
    .object({
      email: z.string().email('Email inválido'),
      name: z.string().min(2, 'Nome deve ter no mínimo 2 caracteres'),
      password: z.string().min(4, 'Senha deve ter no mínimo 4 caracteres'),
      type: z.enum(['admin', 'user'], {
        errorMap: () => ({ message: 'Tipo deve ser admin ou user' }),
      }),
    })
    .transform((data) => ({
      ...data,
      id: randomUUID(),
    })),

  update: z.object({
    name: z.string().min(2, 'Nome deve ter no mínimo 2 caracteres').optional(),
    password: z
      .string()
      .min(4, 'Senha deve ter no mínimo 4 caracteres')
      .optional(),
    type: z
      .enum(['admin', 'user'], {
        errorMap: () => ({ message: 'Tipo deve ser admin ou user' }),
      })
      .optional(),
  }),
};

module.exports = userSchemas;
