import type { Todo } from '../../domain/entities/todo';
import type { TodoRepository } from '../../use-cases/todo/CreateTodoUseCase';

export class InMemoryTodoRepository implements TodoRepository {
    private todos: Todo[] = [];

    async save(todo: Todo): Promise<Todo> {
        const existingIndex = this.todos.findIndex((t) => t.id === todo.id);

        if (existingIndex >= 0) {
            this.todos[existingIndex] = { ...todo, updatedAt: new Date() };
            return this.todos[existingIndex];
        } else {
            this.todos.push(todo);
            return todo;
        }
    }

    async findById(id: string): Promise<Todo | null> {
        return this.todos.find((todo) => todo.id === id) || null;
    }

    async findAll(): Promise<Todo[]> {
        return [...this.todos];
    }
}
