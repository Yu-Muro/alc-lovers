import { zValidator } from '@hono/zod-validator';
import type { Context } from 'hono';
import { todoSchema } from '../../domain/entities/todo';

export const todoValidator = zValidator(
    'json',
    todoSchema,
    (result, c: Context) => {
        if (!result.success) {
            return c.json(
                {
                    error: 'Validation failed',
                    details: result.error.issues,
                },
                400,
            );
        }
    },
);
