import type { Todo } from '../../domain/entities/todo';

export interface TodoRepository {
    save(todo: Todo): Promise<Todo>;
    findById(id: string): Promise<Todo | null>;
    findAll(): Promise<Todo[]>;
}

export class CreateTodoUseCase {
    constructor(private todoRepository: TodoRepository) {}

    async execute(todoData: Omit<Todo, 'id'>): Promise<Todo> {
        // ビジネスルールの検証
        if (!todoData.title || todoData.title.trim().length < 2) {
            throw new Error('Title must be at least 2 characters long');
        }

        // ドメインオブジェクトの作成
        const todo: Todo = {
            id: crypto.randomUUID(),
            title: todoData.title.trim(),
            description: todoData.description,
            completed: false,
            createdAt: new Date(),
            updatedAt: new Date(),
        };

        // リポジトリを通じて永続化
        return await this.todoRepository.save(todo);
    }
}
