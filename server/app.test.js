const request = require('supertest');
const app = require('./index');

describe('Todo App API Tests', () => {
    test('Login with valid credentials', async () => {
        const res = await request(app).post('/login').send({
        email: 'test@rem.com',
        password: '123456'
        });
        expect(res.statusCode).toBe(200);
        expect(res.body.success).toBe(true);
    });

    test('Login with invalid credentials', async () => {
        const res = await request(app).post('/login').send({
        email: 'wrong@email.com',
        password: 'wrong'
        });
        expect(res.statusCode).toBe(401);
        expect(res.body.success).toBe(false);
    });

    test('Create a new todo (valid)', async () => {
        const res = await request(app).post('/items').send({ task: 'Test task' });
        expect(res.statusCode).toBe(200);
        expect(res.body.task).toBe('Test task');
        expect(res.body).toHaveProperty('id');
    });

    test('Create a new todo (missing task)', async () => {
        const res = await request(app).post('/items').send({});
        expect(res.statusCode).toBe(400);
    });

    test('Get all todos', async () => {
        const res = await request(app).get('/items');
        expect(res.statusCode).toBe(200);
        expect(Array.isArray(res.body)).toBe(true);
    });

    test('Update an existing todo', async () => {
        const post = await request(app).post('/items').send({ task: 'Old task' });
        const id = post.body.id;

        const res = await request(app).put(`/items/${id}`).send({ task: 'New task' });
        expect(res.statusCode).toBe(200);
        expect(res.body.task).toBe('New task');
    });

    test('Update a non-existent todo', async () => {
        const res = await request(app).put('/items/nonexistent').send({ task: 'Fail task' });
        expect(res.statusCode).toBe(404);
        expect(res.body.message).toBe('Item not found');
    });

    test('Delete an existing todo', async () => {
        const post = await request(app).post('/items').send({ task: 'To delete' });
        const id = post.body.id;

        const res = await request(app).delete(`/items/${id}`);
        expect(res.statusCode).toBe(200);
        expect(res.body.message).toBe('Deleted successfully');
    });

    test('Delete a non-existent todo', async () => {
        const res = await request(app).delete('/items/does-not-exist');
        expect(res.statusCode).toBe(200);
        expect(res.body.message).toBe('Deleted successfully');
    });
});
