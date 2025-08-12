import type { Context } from 'hono';
import { TodoService } from '../../application/services/todoService';
import type { Todo } from '../../domain/entities/todo';

export class TodoController {
    private todoService: TodoService;

    constructor() {
        this.todoService = new TodoService();
    }

    getHello(c: Context) {
        const message = this.todoService.getHelloMessage();
        return c.json(message);
    }

    async createTodo(c: Context) {
        const { title, description } = (await c.req.json()) as Todo;
        const todo = this.todoService.createTodo({ title, description });
        return c.json(todo);
    }
}
