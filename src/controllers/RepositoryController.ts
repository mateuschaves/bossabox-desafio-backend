
import {Request, Response} from 'express';

import { Repository } from '../models';

class RepositoryController {
    async store(request: Request, response: Response) {
        try {
            const { title, link, description, tags } = request.body;
            if(!title || !link || !description || !tags)
                return response.status(400).json({
                    error: true,
                    message: 'fill all required fields'
                });
            const repository = await Repository.create({
                title,
                link,
                description,
                tags
            });
            return response.status(201).json(repository);
        } catch (error) {
            return response.status(400).json(error);
        }
    }
}

export default new RepositoryController();
