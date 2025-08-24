import type { Context } from 'hono';
import type { CreateTodoInput } from '../../domain/entities/todo';
import { DIContainer } from '../../shared/container/DIContainer';
import { CreateTodoUseCase } from '../../use-cases/todo/CreateTodoUseCase';
import { GetTodosUseCase } from '../../use-cases/todo/GetTodosUseCase';

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
            const todoData = (await c.req.json()) as CreateTodoInput;
            const todo = await this.createTodoUseCase.execute(todoData);
            return c.json(todo, 201);
        } catch (error) {
            return c.json(
                {
                    error:
                        error instanceof Error
                            ? error.message
                            : 'Unknown error',
                },
                400,
            );
        }
    }

    async getTodos(c: Context) {
        try {
            const todos = await this.getTodosUseCase.execute();
            return c.json(todos);
        } catch (error) {
            return c.json(
                {
                    error:
                        error instanceof Error
                            ? error.message
                            : 'Unknown error',
                },
                500,
            );
        }
    }
}
