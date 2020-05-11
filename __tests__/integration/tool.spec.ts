import request from 'supertest';
import app from '../../src/app';

import mongoose from 'mongoose';


interface ITool {
    id: string,
    title: string;
    link: string;
    description: string;
    tags: string[];
    createdAt?: Date,
    updatedAt?: Date
}

describe('Tools', () => {
    it('should be able to register a tool', async () => {
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

    it('should not be able to register a tool', async () => {
        const response = await request(app)
            .post('/tools')
            .send({
                title: 'hotel'
            });

        expect(response.status).toBe(400);
        expect(response.body).toHaveProperty('message', 'fill all required fields');
        expect(response.body).toHaveProperty('error');
    });

    it('should be able to list all tools registered', async () => {

        const tool = {
            "title": 'hotel',
            "link": "https://github.com/typicode/hotel",
            "description": "Local app manager. Start apps within your browser, developer tool with local .localhost domain and https out of the box.",
            "tags": ["node", "organizing", "webapps", "domain", "developer", "https", "proxy"]
        }

        await request(app)
            .post('/tools')
            .send(tool);

        const response = await request(app)
            .get('/tools');

        expect(response.status).toBe(200);
        expect(Array.isArray(response.body)).toBe(true);
        expect(response.body).toHaveLength(1);
        const [ firstElement ] =  response.body;
        expect(firstElement).toHaveProperty('title', tool.title);
        expect(firstElement).toHaveProperty('link', tool.link);
        expect(firstElement).toHaveProperty('description', tool.description);
        expect(firstElement).toHaveProperty('tags', tool.tags);
    });

    it('should not list tools if there is no one registered', async () => {
        const response = await request(app)
            .get('/tools');

        expect(response.status).toBe(200);
        expect(Array.isArray(response.body)).toBe(true);
        expect(response.body).toHaveLength(0);
    });

    it('should be able to filter only one tool by tag name between two tools registered', async () => {
        const firstTool = {
            "title": 'hotel',
            "link": "https://github.com/typicode/hotel",
            "description": "Local app manager. Start apps within your browser, developer tool with local .localhost domain and https out of the box.",
            "tags": ["node", "organizing", "webapps", "domain", "developer", "https", "proxy"]
        }

        const secondTool = {
            "title": 'bossabox-desafio-backend',
            "link": "https://github.com/mateuschaves/bossabox-desafio-backend",
            "description": "Sua tarefa é construir uma API e banco de dados para a aplicação VUTTR (Very Useful Tools to Remember). A aplicação é um simples repositório para gerenciar ferramentas com seus respectivos nomes, links, descrições e tags. Utilize um repositório Git (público, de preferência) para versionamento e disponibilização do código.",
            "tags": ["typescript", "nodejs", "mongoose", "mongodb"]
        }

        await request(app)
            .post('/tools')
            .send(firstTool);

        await request(app)
            .post('/tools')
            .send(secondTool);

        const response = await request(app)
            .get('/tools')
            .query({
                tag: 'typescript'
            });

        expect(response.status).toBe(200);
        expect(Array.isArray(response.body)).toBe(true);
        expect(response.body).toHaveLength(1);
        const [element] = response.body;
        expect(element).toHaveProperty('title', secondTool.title);
        expect(element).toHaveProperty('link', secondTool.link);
        expect(element).toHaveProperty('description', secondTool.description);
        expect(element).toHaveProperty('tags', secondTool.tags);
    });

    it('should be able to filter only two tool by tag name between two tools registered', async () => {
        const tools = [
            {
                "title": 'hotel',
                "link": "https://github.com/typicode/hotel",
                "description": "Local app manager. Start apps within your browser, developer tool with local .localhost domain and https out of the box.",
                "tags": ["node", "organizing", "webapps", "domain", "developer", "https", "proxy"]
            },
            {
                "title": 'bossabox-desafio-backend',
                "link": "https://github.com/mateuschaves/bossabox-desafio-backend",
                "description": "Sua tarefa é construir uma API e banco de dados para a aplicação VUTTR (Very Useful Tools to Remember). A aplicação é um simples repositório para gerenciar ferramentas com seus respectivos nomes, links, descrições e tags. Utilize um repositório Git (público, de preferência) para versionamento e disponibilização do código.",
                "tags": ["typescript", "nodejs", "mongoose", "mongodb", "https"]
            }
        ];

        const [firstTool, secondTool] = tools;

        await request(app)
            .post('/tools')
            .send(firstTool);

        await request(app)
            .post('/tools')
            .send(secondTool);

        const response = await request(app)
            .get('/tools')
            .query({
                tag: 'https'
            });

        expect(response.status).toBe(200);
        expect(Array.isArray(response.body)).toBe(true);
        expect(response.body).toHaveLength(2);
        response.body.map((tool: ITool, index: number) => {
            expect(tool).toHaveProperty('_id');
            expect(tool).toHaveProperty('title', tools[index].title);
            expect(tool).toHaveProperty('description', tools[index].description);
            expect(tool).toHaveProperty('link', tools[index].link);
            expect(tool).toHaveProperty('tags', tools[index].tags);
        });
    });
    
    it('should return empty array when no result found', async () => {
        const response = await request(app)
            .get('/tools')
            .query({
                tag: 'typescript'
            });

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
