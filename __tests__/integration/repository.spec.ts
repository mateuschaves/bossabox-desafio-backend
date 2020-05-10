import request from 'supertest';
import app from '../../src/app';

describe('Repository', () => {
    it('should be able to register a repository', async () => {
        const response = await request(app)
            .post('/repository')
            .send({
                "title": 'hotel',
                "link": "https://github.com/typicode/hotel",
                "description": "Local app manager. Start apps within your browser, developer tool with local .localhost domain and https out of the box.",
                "tags": ["node", "organizing", "webapps", "domain", "developer", "https", "proxy"]
            });

        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty('title', 'hotel');
        expect(response.body).toHaveProperty('link', 'https://github.com/typicode/hotel');
        expect(response.body).toHaveProperty('description', 'Local app manager. Start apps within your browser, developer tool with local .localhost domain and https out of the box.');
        expect(response.body).toHaveProperty('tags', ["node", "organizing", "webapps", "domain", "developer", "https", "proxy"]);
    });

    it('should not be able to register a repository', async () => {
        const response = await request(app)
            .post('/repository')
            .send({
                title: 'hotel'
            });

        expect(response.status).toBe(400);
        expect(response.body).toHaveProperty('message', 'fill all required fields');
        expect(response.body).toHaveProperty('error');
    });
});
