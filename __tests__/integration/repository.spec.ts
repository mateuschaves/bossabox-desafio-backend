import request from 'supertest';
import app from '../../src/app';

import mongoose from 'mongoose';

describe('Repository', () => {
    it('should be able to register a repository', async () => {
        const response = await request(app)
            .post('/tools')
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
            .post('/tools')
            .send({
                title: 'hotel'
            });

        expect(response.status).toBe(400);
        expect(response.body).toHaveProperty('message', 'fill all required fields');
        expect(response.body).toHaveProperty('error');
    });

    it('should be able to list all repository registered', async () => {

        const repository = {
            "title": 'hotel',
            "link": "https://github.com/typicode/hotel",
            "description": "Local app manager. Start apps within your browser, developer tool with local .localhost domain and https out of the box.",
            "tags": ["node", "organizing", "webapps", "domain", "developer", "https", "proxy"]
        }

        await request(app)
            .post('/tools')
            .send(repository);

        const response = await request(app)
            .get('/tools');

        expect(response.status).toBe(200);
        expect(Array.isArray(response.body)).toBe(true);
        expect(response.body).toHaveLength(1);
        const [ firstElement ] =  response.body;
        expect(firstElement).toHaveProperty('title', repository.title);
        expect(firstElement).toHaveProperty('link', repository.link);
        expect(firstElement).toHaveProperty('description', repository.description);
        expect(firstElement).toHaveProperty('tags', repository.tags);
    });

    it('should not list repositories if there is no one registered', async () => {
        const response = await request(app)
            .get('/tools');

        expect(response.status).toBe(200);
        expect(Array.isArray(response.body)).toBe(true);
        expect(response.body).toHaveLength(0);
    });

    beforeEach( async () => {
        return new Promise( async (resolve, reject) => {
            const connection = await mongoose.connection.db;
            if(!connection) return resolve(true);
            const collections = await connection.collections();
            Promise.all(
                collections.map(collection => collection.drop())
            )
                .then(() => resolve(true))
                .catch(() => reject(false));
        })
    });

    afterAll( async () => await mongoose.connection.close() );
});
