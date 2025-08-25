import { z } from 'zod';
import type { Todo as SharedTodo } from '../../shared/types';

export const todoSchema = z.object({
    title: z.string().min(2),
    description: z.string().min(1),
});

// ドメインのTodo型は共有型と同じ
export type Todo = SharedTodo;

export type CreateTodoInput = Omit<Todo, 'id' | 'createdAt' | 'updatedAt'>;
