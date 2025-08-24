import { InMemoryTodoRepository } from '../../interface-adapters/repositories/InMemoryTodoRepository';
import {
    CreateTodoUseCase,
    type TodoRepository,
} from '../../use-cases/todo/CreateTodoUseCase';
import { GetTodosUseCase } from '../../use-cases/todo/GetTodosUseCase';

export class DIContainer {
    private static instance: DIContainer;
    private todoRepository: TodoRepository;

    private constructor() {
        // リポジトリの初期化
        this.todoRepository = new InMemoryTodoRepository();
    }

    static getInstance(): DIContainer {
        if (!DIContainer.instance) {
            DIContainer.instance = new DIContainer();
        }
        return DIContainer.instance;
    }

    getTodoRepository(): TodoRepository {
        return this.todoRepository;
    }

    getCreateTodoUseCase(): CreateTodoUseCase {
        return new CreateTodoUseCase(this.todoRepository);
    }

    getGetTodosUseCase(): GetTodosUseCase {
        return new GetTodosUseCase(this.todoRepository);
    }
}
