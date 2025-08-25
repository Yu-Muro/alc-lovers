// APIレスポンスの型定義
export interface Todo {
    id: string;
    title: string;
    description: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface CreateTodoRequest {
    title: string;
    description: string;
}

export interface CreateTodoResponse {
    success: boolean;
    data?: Todo;
    error?: string;
}

export interface GetTodosResponse {
    success: boolean;
    data?: Todo[];
    error?: string;
}

// APIクライアントの型定義
export interface ApiClient {
    api: {
        todos: {
            $post: (options: { json: CreateTodoRequest }) => Promise<{
                ok: boolean;
                json: () => Promise<CreateTodoResponse>;
                text: () => Promise<string>;
            }>;
            $get: () => Promise<{
                ok: boolean;
                json: () => Promise<GetTodosResponse>;
                text: () => Promise<string>;
            }>;
        };
    };
}
