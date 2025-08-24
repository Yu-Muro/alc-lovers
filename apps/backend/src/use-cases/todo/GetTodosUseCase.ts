import type { Todo } from '../../domain/entities/todo';
import type { TodoRepository } from './CreateTodoUseCase';

export class GetTodosUseCase {
    constructor(private todoRepository: TodoRepository) {}

    async execute(): Promise<Todo[]> {
        return await this.todoRepository.findAll();
    }
}
