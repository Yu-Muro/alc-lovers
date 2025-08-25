// Todo関連の型定義
export interface Todo {
    id: string;
    title: string;
    description: string;
    completed: boolean;
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

// APIレスポンスの共通型
export interface ApiResponse<T> {
    success: boolean;
    data?: T;
    error?: string;
}
