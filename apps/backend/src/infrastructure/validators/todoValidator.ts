import { zValidator } from '@hono/zod-validator';
import type { Context } from 'hono';
import { todoSchema } from '../../domain/entities/todo';

export const todoValidator = zValidator(
    'json',
    todoSchema,
    (result, c: Context) => {
        if (!result.success) {
            return c.text(result.error.issues[0].message, 400);
        }
    },
);
