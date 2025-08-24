import { z } from 'zod';

export const todoSchema = z.object({
    title: z.string().min(2),
    description: z.string().nullable(),
});

export interface Todo {
    id: string;
    title: string;
    description: string | null;
    completed: boolean;
    createdAt: Date;
    updatedAt: Date;
}

export type CreateTodoInput = z.infer<typeof todoSchema>;
