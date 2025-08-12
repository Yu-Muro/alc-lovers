import { Todo } from '../../domain/entities/todo';

export class TodoService {
    createTodo(todo: Todo): Todo {
        // ビジネスロジックをここに実装
        return todo;
    }

    getHelloMessage(): { message: string } {
        return { message: 'Hello Hono!' };
    }
}
