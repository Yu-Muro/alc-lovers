import { Hono } from 'hono';
import { todoValidator } from '../../infrastructure/validators/todoValidator';
import { TodoController } from '../controllers/todoController';

export const createTodoRoutes = () => {
    const router = new Hono();
    const todoController = new TodoController();

    router.get('/hello', (c) => todoController.getHello(c));
    router.get('/todos', (c) => todoController.getTodos(c));
    router.post('/todos', todoValidator, (c) => todoController.createTodo(c));

    return router;
};
