import type { Context } from 'hono';
import type { CreateTodoInput } from '../../domain/entities/todo';
import { DIContainer } from '../../shared/container/DIContainer';
import type {
    CreateTodoRequest,
    CreateTodoResponse,
    GetTodosResponse,
} from '../../shared/types';
import type { CreateTodoUseCase } from '../../use-cases/todo/CreateTodoUseCase';
import type { GetTodosUseCase } from '../../use-cases/todo/GetTodosUseCase';

export class TodoController {
    private createTodoUseCase: CreateTodoUseCase;
    private getTodosUseCase: GetTodosUseCase;

    constructor() {
        const container = DIContainer.getInstance();
        this.createTodoUseCase = container.getCreateTodoUseCase();
        this.getTodosUseCase = container.getGetTodosUseCase();
    }

    getHello(c: Context) {
        return c.json({ message: 'Hello Clean Architecture!' });
    }

    async createTodo(c: Context) {
        try {
            const todoData = (await c.req.json()) as CreateTodoRequest;
            const todo = await this.createTodoUseCase.execute({
                ...todoData,
                completed: false,
            } as CreateTodoInput);

            const response: CreateTodoResponse = {
                success: true,
                data: todo,
            };
            return c.json(response, 201);
        } catch (error) {
            const response: CreateTodoResponse = {
                success: false,
                error: error instanceof Error ? error.message : 'Unknown error',
            };
            return c.json(response, 400);
        }
    }

    async getTodos(c: Context) {
        try {
            const todos = await this.getTodosUseCase.execute();

            const response: GetTodosResponse = {
                success: true,
                data: todos,
            };
            return c.json(response);
        } catch (error) {
            const response: GetTodosResponse = {
                success: false,
                error: error instanceof Error ? error.message : 'Unknown error',
            };
            return c.json(response, 500);
        }
    }
}
